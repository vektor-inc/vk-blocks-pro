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
	returnHtml,
	getAllHeadings,
	getAllHeadingBlocks,
	getAllBlocksRecursively,
} from './toc-utils';
import {
	generateHeadingLevels,
	getCurrentMaxLevel,
} from '@vkblocks/utils/heading-level-utils';

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
		const { getEntityRecord } = select('core');
		const settings = getEntityRecord('root', 'site');

		// グローバル設定を取得（フォールバック付き）
		const globalSettings = settings?.vk_blocks_options
			?.toc_heading_levels ||
			window.vkBlocksOptions?.toc_heading_levels || [
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
			];

		return globalSettings;
	}, []);
};

const stripHtml = (html) => {
	const tmp = document.createElement('div');
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || '';
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

	const blocks = useSelect(
		(select) => select('core/block-editor').getBlocks(),
		[]
	);
	const tocSettings = useTocSettings();

	// 見出しブロックの一覧を取得
	const allHeadings = useAllHeadingBlocks();

	useEffect(() => {
		const { updateBlockAttributes } = dispatch('core/block-editor');

		const headingBlocks = ['core/heading', 'vk-blocks/heading'];

		// すべての見出しブロックを取得
		const allHeadingBlocks = getAllHeadingBlocks(blocks);

		// 見出しにカスタムIDを追加
		allHeadingBlocks.forEach((block) => {
			if (block.attributes.anchor === undefined) {
				updateBlockAttributes(block.clientId, {
					anchor: `vk-htags-${block.clientId}`,
				});
			}
		});

		// 目次ブロックをアップデート
		const allHeadings = getAllHeadings(blocks, headingBlocks, {
			useCustomLevels,
			customHeadingLevels,
			excludedHeadings,
		});

		// 新しい位置情報ベースのソートを使用（getAllHeadings内で既にソート済み）
		const allHeadingsSorted = allHeadings.map((heading) => ({
			index: heading.position,
			block: heading,
		}));

		const render = returnHtml(allHeadingsSorted);

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

	// 見出しの順番を取得する関数
	const getHeadingOrder = (heading) => {
		const allBlocks = getAllBlocksRecursively(blocks);
		const index = allBlocks.findIndex(
			(block) => block.clientId === heading.clientId
		);
		return index >= 0 ? index : Infinity;
	};

	const handleMaxLevelChange = (maxLevel) => {
		const levels = generateHeadingLevels(maxLevel);
		setAttributes({ customHeadingLevels: levels });
	};

	// 現在の最大レベルを取得
	const getCurrentMaxLevelForBlock = () => {
		return getCurrentMaxLevel(customHeadingLevels);
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
									value={getCurrentMaxLevelForBlock()}
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
					help={__(
						'Select headings to exclude from the table of contents.',
						'vk-blocks-pro'
					)}
				>
					<BaseControl>
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
								const headingLevel =
									heading.attributes.level || 2;
								const isExcluded =
									excludedHeadings.includes(headingId);

								// 見出しレベル設定で除外された見出しレベルかチェック
								const allowedLevels = useCustomLevels
									? customHeadingLevels || [
											'h2',
											'h3',
											'h4',
											'h5',
											'h6',
										]
									: tocSettings ||
										window.vkBlocksOptions
											?.toc_heading_levels || [
											'h2',
											'h3',
											'h4',
											'h5',
											'h6',
										];
								const isAllowedLevel = allowedLevels.includes(
									`h${headingLevel}`
								);

								// 無効な見出しレベルは非活性化状態で表示
								if (!isAllowedLevel) {
									return (
										<ToggleControl
											key={headingId}
											label={`${stripHtml(headingText)}`}
											checked={false}
											disabled={true}
										/>
									);
								}

								return (
									<ToggleControl
										key={headingId}
										label={stripHtml(headingText)}
										checked={isExcluded}
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
