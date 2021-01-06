/**
 * table-of-contents-new-new block type
 */

import {
	isAllowedBlock,
	getBlocksByName,
	returnHtml,
	getAllHeadings,
	removeUnnecessaryElements,
	AsyncGetBlocksByName,
} from './toc-utils';
import { ReactComponent as Icon } from './icon.svg';
import compareVersions from 'compare-versions';

import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { dispatch } from '@wordpress/data';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated/';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Table of Contents', 'vk-blocks'),
	icon: <Icon />,
	edit,
	save,
	deprecated,
};

const getHeadings = (props) => {
	// eslint-disable-next-line no-shadow
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
if (window.wpVersion && compareVersions(window.wpVersion, '5.3') >= 0) {
	addFilter(
		'editor.BlockListBlock',
		'vk-blocks/table-of-contents-new',
		updateTableOfContents
	);
}
