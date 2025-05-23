import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, BaseControl } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { dispatch, select, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import parse from 'html-react-parser';
import {
	isAllowedBlock,
	returnHtml,
	getAllHeadings,
} from './toc-utils';

const useCurrentBlocks = () => {
	return useSelect(
		(select) => select('core/block-editor').getBlocks(),
		[] // 固定のセレクションなので空の依存配列でOK
	);
};

const useBlocksByName = (blockName) => {
	return useSelect(
		(select) => {
			const { getBlocks } = select('core/block-editor');
			return getBlocks().filter((block) => block.name === blockName);
		},
		[blockName] // blockNameが変わったときだけ再評価
	);
};

export default function TOCEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { style, open, renderHtml } = attributes;
	const blockProps = useBlockProps({
		className: `vk_tableOfContents vk_tableOfContents-style-${style} tabs`,
	});

	const blocks = useCurrentBlocks();
	const findBlocks = useBlocksByName('vk-blocks/table-of-contents-new');

	useEffect(() => {
		// 投稿に目次ブロックがなければ処理を実行しない
		if (!findBlocks) {
			return;
		}
		const { updateBlockAttributes } = dispatch('core/block-editor');
		const { getBlockOrder, getBlockRootClientId } =
			select('core/block-editor');

		const headingBlocks = ['core/heading', 'vk-blocks/heading'];
		const hasInnerBlocks = ['vk-blocks/outer', 'core/cover', 'core/group'];
		blocks.forEach(function (block) {
			// 見出しにカスタムIDを追加
			if (
				block.attributes.anchor === undefined &&
				isAllowedBlock(block.name, headingBlocks)
			) {
				updateBlockAttributes(block.clientId, {
					anchor: `vk-htags-${block.clientId}`,
				});

				// InnerBlock内の見出しにカスタムIDを追加
			} else if (isAllowedBlock(block.name, hasInnerBlocks)) {
				block.innerBlocks.forEach(function (innerBlock) {
					// 見出しにカスタムIDを追加
					if (
						innerBlock.attributes.anchor === undefined &&
						isAllowedBlock(innerBlock.name, headingBlocks)
					) {
						updateBlockAttributes(innerBlock.clientId, {
							anchor: `vk-htags-${innerBlock.clientId}`,
						});
					}
				});
			}
		});
		// 目次ブロックをアップデート
		const blocksOrder = getBlockOrder();
		const allHeadings = getAllHeadings(
			blocks,
			headingBlocks,
			hasInnerBlocks
		);

		const allHeadingsSorted = allHeadings.map((heading) => {
			const index = blocksOrder.indexOf(heading.clientId);
			const rootIndex = blocksOrder.indexOf(
				getBlockRootClientId(heading.clientId)
			);
			let finalIndex;

			if (index >= 0) {
				finalIndex = index;
			} else if (rootIndex >= 0) {
				finalIndex = rootIndex;
			}

			return { index: finalIndex, block: heading };
		});
		allHeadingsSorted.sort((first, second) => first.index - second.index);

		const render = returnHtml(allHeadingsSorted);

		updateBlockAttributes(clientId, {
			renderHtml: render,
		});
	}, [blocks]);

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
