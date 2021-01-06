/**
 * table-of-contents-new-new block type
 */

import { schema } from './schema';
import {
	isAllowedBlock,
	getBlocksByName,
	returnHtml,
	getAllHeadings,
	removeUnnecessaryElements,
	AsyncGetBlocksByName,
} from './toc-utils';
import { ReactComponent as Icon } from './icon.svg';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, SelectControl, BaseControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { dispatch } from '@wordpress/data';
import TocBody from './TocBody';

registerBlockType('vk-blocks/table-of-contents-new', {
	title: __('Table of Contents', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat',
	attributes: schema,
	edit(props) {
		const { attributes, setAttributes } = props;
		const { style, open } = attributes;
		return (
			<Fragment>
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
								onChange={(value) =>
									setAttributes({ open: value })
								}
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
				<TocBody {...props} />
			</Fragment>
		);
	},

	save(props) {
		return <TocBody {...props} />;
	},
});

const getHeadings = (props) => {
	const { className, name, clientId, attributes } = props;
	const { anchor } = attributes;

	const tocs = getBlocksByName('vk-blocks/table-of-contents-new');
	const tocClientId = tocs[0] ? tocs[0].clientId : '';
	const tocAttributes = tocs[0] ? tocs[0].attributes : '';
	const { updateBlockAttributes } = dispatch('core/block-editor')
		? dispatch('core/block-editor')
		: dispatch('core/editor');
	const headingList = ['core/heading', 'vk-blocks/heading'];

	if (
		anchor === undefined &&
		isAllowedBlock(name, headingList) !== undefined
	) {
		updateBlockAttributes(clientId, {
			anchor: `vk-htags-${clientId}`,
		});
	}

	const asyncToc = AsyncGetBlocksByName('vk-blocks/table-of-contents-new');
	const open = asyncToc[0] ? asyncToc[0].attributes.open : '';

	const headingsRaw = getAllHeadings(headingList);
	const headings = removeUnnecessaryElements(headingsRaw);
	const render = returnHtml(headings, tocAttributes, className, open);

	if (isAllowedBlock(name, headingList) !== undefined) {
		updateBlockAttributes(tocClientId, {
			renderHtml: render,
		});
	}
};

const updateTableOfContents = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		// 投稿に目次ブロックがある時のみ、見出しにカスタムIDを追加。
		const blocks = wp.data.select('core/block-editor').getBlocks();
		const findBlocks = blocks.find(
			(block) => block.name === 'vk-blocks/table-of-contents-new'
		);

		if (findBlocks) {
			const allowedBlocks = [
				'vk-blocks/heading',
				'vk-blocks/outer',
				'core/heading',
				'core/cover',
				'core/group',
			];
			if (isAllowedBlock(props.name, allowedBlocks)) {
				getHeadings(props);
			}
		}

		return <BlockListBlock {...props} />;
	};
}, 'updateTableOfContents');

// eslint-disable-next-line no-undef
if (5.3 <= parseFloat(wpVersion)) {
	addFilter(
		'editor.BlockListBlock',
		'vk-blocks/table-of-contents-new',
		updateTableOfContents
	);
}
