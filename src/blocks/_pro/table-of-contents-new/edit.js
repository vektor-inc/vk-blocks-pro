import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, BaseControl } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import ReactHtmlParser from 'react-html-parser';
import {
	isAllowedBlock,
	returnHtml,
	getHeadings,
	getInnerHeadings,
	removeUnnecessaryElements,
} from './toc-utils';
import { useCurrentBlocks, useBlocksByName } from '@vkblocks/utils/hooks';

export default function TOCEdit(props) {
	const { attributes, setAttributes, className } = props;
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

		blocks.forEach(function (block) {
			const { updateBlockAttributes } = dispatch('core/block-editor');
			const headingBlocks = ['core/heading', 'vk-blocks/heading'];
			const hasInnerBlocks = [
				'vk-blocks/outer',
				'core/cover',
				'core/group',
			];

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

			// 目次ブロックをアップデート
			if (
				isAllowedBlock(block.name, ['vk-blocks/table-of-contents-new'])
			) {
				const headings = getHeadings(headingBlocks);
				const innerHeadings = getInnerHeadings(headingBlocks, hasInnerBlocks)
				const allHeadings = headings.concat(innerHeadings);
				// const headings = removeUnnecessaryElements(headingsRaw);
				const render = returnHtml(
					allHeadings,
					block.attributes,
					className,
					block.attributes.open
				);

				updateBlockAttributes(block.clientId, {
					renderHtml: render,
				});
			}
		});
	}, [blocks]);

	/* eslint jsx-a11y/label-has-associated-control: 0 */
	return (
		<>
			<InspectorControls>
				<PanelBody>
					<BaseControl
						id={`vk-toc-style`}
						label={__('Style', 'vk-blocks')}
					>
						<SelectControl
							value={style}
							onChange={(value) =>
								setAttributes({ style: value })
							}
							options={[
								{
									value: 'default',
									label: __('Default', 'vk-blocks'),
								},
								{
									value: '',
									label: __('No frame', 'vk-blocks'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						id={`vk_toc-displayStaus`}
						label={__('Default Display Status', 'vk-blocks')}
					>
						<SelectControl
							value={open}
							onChange={(value) => setAttributes({ open: value })}
							options={[
								{
									value: 'open',
									label: __('OPEN', 'vk-blocks'),
								},
								{
									value: 'close',
									label: __('CLOSE', 'vk-blocks'),
								},
							]}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="tab">
					<div className={'vk_tableOfContents_title'}>
						{__('Table of Contents', 'vk-blocks')}
					</div>
					<input type="checkbox" id="chck1" />
					<label
						className={`tab-label vk_tableOfContents_openCloseBtn button_status button_status-${open}`}
						htmlFor="chck1"
					/>
					<ul
						className={`vk_tableOfContents_list tab_content-${open}`}
					>
						{ReactHtmlParser(renderHtml)}
					</ul>
				</div>
			</div>
		</>
	);
}
