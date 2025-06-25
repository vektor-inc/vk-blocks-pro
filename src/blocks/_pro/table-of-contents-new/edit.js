import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	BaseControl,
	ToggleControl,
	ExternalLink,
} from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { dispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import parse from 'html-react-parser';
import {
	isAllowedBlock,
	returnHtml,
	getAllHeadings,
	getAllHeadingBlocks,
} from './toc-utils';

// 現在のブロックを取得するカスタムフック
export const useCurrentBlocks = () => {
	return useSelect((select) => select('core/block-editor').getBlocks(), []);
};

// 指定された名前のブロックを取得するカスタムフック
export const useBlocksByName = (blockName) => {
	return useSelect(
		(select) => {
			const { getBlocks } = select('core/block-editor');
			return getBlocks().filter((block) => block.name === blockName);
		},
		[blockName]
	);
};

// 見出しブロックを再帰的に取得するカスタムフック
export const useAllHeadingBlocks = () => {
	return useSelect((select) => {
		const { getBlocks } = select('core/block-editor');
		return getAllHeadingBlocks(getBlocks());
	}, []);
};

// 設定の変更を監視するカスタムフック
export const useTocSettings = () => {
	return useSelect((select) => {
		// エンティティから取得を試行
		const { getEntityRecord } = select('core');
		const settings = getEntityRecord('root', 'site');
		let tocLevels = settings?.vk_blocks_options?.toc_heading_levels;

		// エンティティから取得できない場合は、wp_optionsから直接取得
		if (!tocLevels && window.vkBlocksOptions?.toc_heading_levels) {
			tocLevels = window.vkBlocksOptions.toc_heading_levels;
		}

		// それでも取得できない場合はデフォルト値を使用
		if (!tocLevels) {
			tocLevels = ['h2', 'h3', 'h4', 'h5', 'h6'];
		}

		return tocLevels;
	}, []);
};

export default function TOCEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		style,
		open,
		renderHtml,
		useCustomLevels,
		customHeadingLevels,
		excludedHeadings = [],
	} = attributes;
	const blockProps = useBlockProps({
		className: `vk_tableOfContents vk_tableOfContents-style-${style} tabs`,
	});

	const HEADING_BLOCKS = ['core/heading', 'vk-blocks/heading'];

	const blocks = useCurrentBlocks();
	const findBlocks = useBlocksByName('vk-blocks/table-of-contents-new');
	const tocSettings = useTocSettings();

	// 見出しブロックの一覧を取得
	const allHeadings = useAllHeadingBlocks();

	// 再帰的にブロックを処理してアンカーを設定する関数
	const processBlocksRecursively = (
		blocks,
		headingBlocks,
		updateBlockAttributes
	) => {
		blocks.forEach(function (block) {
			// 見出しにカスタムIDを追加
			if (
				block.attributes.anchor === undefined &&
				isAllowedBlock(block.name, headingBlocks)
			) {
				updateBlockAttributes(block.clientId, {
					anchor: `vk-htags-${block.clientId}`,
				});
			}

			// すべてのブロックのinnerBlocksを再帰的に処理
			if (block.innerBlocks && block.innerBlocks.length > 0) {
				processBlocksRecursively(
					block.innerBlocks,
					headingBlocks,
					updateBlockAttributes
				);
			}
		});
	};

	useEffect(() => {
		// 投稿に目次ブロックがなければ処理を実行しない
		if (!findBlocks) {
			return;
		}
		const { updateBlockAttributes } = dispatch('core/block-editor');

		// 再帰的にブロックを処理
		processBlocksRecursively(blocks, HEADING_BLOCKS, updateBlockAttributes);

		// 目次ブロックをアップデート
		const headingsForRender = getAllHeadings(blocks, HEADING_BLOCKS, [], {
			useCustomLevels,
			customHeadingLevels,
			excludedHeadings,
			globalSettings: tocSettings,
		});

		// 新しい位置計算ロジックにより、headingsForRenderは既に正しい順序でソートされている
		const render = returnHtml(
			headingsForRender.map((heading) => ({ block: heading }))
		);

		updateBlockAttributes(clientId, {
			renderHtml: render,
		});
	}, [
		blocks,
		tocSettings,
		useCustomLevels,
		customHeadingLevels,
		excludedHeadings,
	]);

	// 見出しの順番を取得する関数（パフォーマンス最適化）
	const getHeadingOrder = (heading) => {
		// 除外設定UI用の見出し一覧をメモ化
		const allHeadingsWithPosition = getAllHeadings(
			blocks,
			HEADING_BLOCKS,
			[],
			{
				skipLevelFiltering: true,
				globalSettings: tocSettings,
			}
		);

		const foundHeading = allHeadingsWithPosition.find(
			(h) => h.clientId === heading.clientId
		);
		return foundHeading ? foundHeading.position : Infinity;
	};

	const handleMaxLevelChange = (maxLevel) => {
		const levels = ['h2'];
		const levelNumbers = ['h3', 'h4', 'h5', 'h6'];
		const maxIndex = levelNumbers.indexOf(maxLevel);

		if (maxIndex !== -1) {
			levels.push(...levelNumbers.slice(0, maxIndex + 1));
		}

		setAttributes({ customHeadingLevels: levels });
	};

	// 現在の最大レベルを取得
	const getCurrentMaxLevel = () => {
		const maxLevel =
			customHeadingLevels?.[customHeadingLevels.length - 1] || 'h2';
		return maxLevel;
	};

	// 見出しレベル設定で既に除外されているかどうかを判定する関数
	const isHeadingDisabledByLevel = (heading) => {
		const headingLevel = heading.attributes.level || 2;
		const headingLevelStr = `h${headingLevel}`;

		// カスタムレベル設定が有効な場合
		if (useCustomLevels && customHeadingLevels) {
			return !customHeadingLevels.includes(headingLevelStr);
		}

		// グローバル設定を使用する場合
		const globalSettings = tocSettings || ['h2', 'h3', 'h4', 'h5', 'h6'];

		return !globalSettings.includes(headingLevelStr);
	};

	/* eslint jsx-a11y/label-has-associated-control: 0 */
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Note on duplicating headings', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl>
						<p>
							{__(
								'If you duplicate a heading, the table of contents block will not work properly, please reassign the ID.',
								'vk-blocks-pro'
							)}
						</p>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Display type', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						id={`vk-toc-style`}
						label={__('Style', 'vk-blocks-pro')}
					>
						<SelectControl
							value={style}
							onChange={(value) =>
								setAttributes({ style: value })
							}
							options={[
								{
									value: 'default',
									label: __('Default', 'vk-blocks-pro'),
								},
								{
									value: '',
									label: __('No frame', 'vk-blocks-pro'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						id={`vk_toc-displayStaus`}
						label={__('Default Display Status', 'vk-blocks-pro')}
					>
						<SelectControl
							value={open}
							onChange={(value) => setAttributes({ open: value })}
							options={[
								{
									value: 'open',
									label: __('OPEN', 'vk-blocks-pro'),
								},
								{
									value: 'close',
									label: __('CLOSE', 'vk-blocks-pro'),
								},
							]}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Heading Levels', 'vk-blocks-pro')}
					initialOpen={true}
				>
					<BaseControl>
						<p style={{ marginBottom: '1em' }}>
							{__(
								'Global heading level settings:',
								'vk-blocks-pro'
							)}{' '}
							<ExternalLink href="/wp-admin/options-general.php?page=vk_blocks_options#toc-setting">
								{__('VK Blocks Setting', 'vk-blocks-pro')}
							</ExternalLink>
						</p>
						<ToggleControl
							label={__(
								'Use custom heading levels',
								'vk-blocks-pro'
							)}
							checked={useCustomLevels}
							onChange={(value) =>
								setAttributes({
									useCustomLevels: value,
									customHeadingLevels: value
										? ['h2', 'h3', 'h4', 'h5', 'h6']
										: [],
								})
							}
							help={
								useCustomLevels
									? __(
											'Using custom heading levels for this block.',
											'vk-blocks-pro'
										)
									: __(
											'Using global heading levels settings.',
											'vk-blocks-pro'
										)
							}
						/>
						{useCustomLevels && (
							<>
								<p
									style={{
										marginTop: '1em',
										marginBottom: '0.5em',
									}}
								>
									{__(
										'Include Headings Up To:',
										'vk-blocks-pro'
									)}
								</p>
								<SelectControl
									value={getCurrentMaxLevel()}
									options={[
										{ label: 'H2', value: 'h2' },
										{ label: 'H3', value: 'h3' },
										{ label: 'H4', value: 'h4' },
										{ label: 'H5', value: 'h5' },
										{ label: 'H6', value: 'h6' },
									]}
									onChange={(value) =>
										handleMaxLevelChange(value)
									}
								/>
							</>
						)}
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Exclude Headings', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						help={__(
							'Select headings to exclude from the table of contents. Headings that are already excluded by heading level settings are disabled.',
							'vk-blocks-pro'
						)}
					>
						{allHeadings
							.filter((heading) => {
								const headingLevel =
									heading.attributes.level || 2;
								return headingLevel !== 1; // h1を除外
							})
							.sort(
								(a, b) =>
									getHeadingOrder(a) - getHeadingOrder(b)
							)
							.map((heading) => {
								const headingId =
									heading.attributes.anchor ||
									`vk-htags-${heading.clientId}`;
								const headingText =
									heading.attributes.title ||
									heading.attributes.content;
								const isExcluded =
									excludedHeadings.includes(headingId);
								const isDisabled =
									isHeadingDisabledByLevel(heading);

								return (
									<ToggleControl
										key={headingId}
										label={
											<span
												dangerouslySetInnerHTML={{
													__html: headingText,
												}}
											/>
										}
										checked={isExcluded}
										disabled={isDisabled}
										onChange={(value) => {
											const newExcludedHeadings = value
												? [
														...excludedHeadings,
														headingId,
													]
												: excludedHeadings.filter(
														(id) => id !== headingId
													);
											setAttributes({
												excludedHeadings:
													newExcludedHeadings,
											});
										}}
									/>
								);
							})}
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="tab">
					<div className={'vk_tableOfContents_title'}>
						{__('Table of Contents', 'vk-blocks-pro')}
					</div>
					<input type="checkbox" id="chck1" />
					<label
						className={`tab-label vk_tableOfContents_openCloseBtn button_status button_status-${open}`}
						htmlFor="chck1"
					/>
					<ul
						className={`vk_tableOfContents_list tab_content-${open}`}
					>
						{parse(renderHtml)}
					</ul>
				</div>
			</div>
		</>
	);
}
