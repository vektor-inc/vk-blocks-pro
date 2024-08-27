/**
 * card block type
 *
 */
import { title, content, pictureJson } from '@vkblocks/utils/example-data';
import { ReactComponent as Icon } from './icon.svg';

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

export const prefix = 'vk_card_';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecatedHooks from './deprecated/hooks';
import deprecated from './deprecated/save';
const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	example: {
		attributes: {
			layout: 'card',
			col_xs: 1,
			col_sm: 1,
			col_md: 1,
			col_lg: 1,
			col_xl: 1,
			col_xxl: 1,
			display_title: true,
			display_excerpt: true,
			display_image: true,
			display_btn: true,
			btn_text: 'Read more',
			activeControl: '{"title": "left", "text":"left", "button":"right"}',
		},
		innerBlocks: [
			{
				name: 'vk-blocks/card-item',
				attributes: {
					layout: 'card',
					col_xs: 1,
					col_sm: 1,
					col_md: 1,
					col_lg: 1,
					col_xl: 1,
					col_xxl: 1,
					display_title: true,
					display_excerpt: true,
					display_image: true,
					display_btn: true,
					btn_text: 'Read more',
					activeControl:
						'{"title": "left", "text":"left", "button":"right"}',
					title,
					excerpt_text: content,
					image: pictureJson,
				},
			},
		],
	},
	edit,
	save,
	deprecated,
};

const generateInlineCss = (attributes) => {
	let { blockId, mobile, tablet, pc, unit } = attributes;

	//For recovering block.
	if (undefined === unit) {
		unit = 'px';
	}
	if (undefined === mobile) {
		mobile = 150;
	}
	if (undefined === tablet) {
		tablet = 150;
	}
	if (undefined === pc) {
		pc = 150;
	}

	const cardImgSelector = `.${prefix}${blockId} .vk_card_item .vk_post_imgOuter::before`;
	return `@media (max-width: 575.98px) {
		${cardImgSelector}{
			padding-top:${mobile}${unit}!important;
		}
	}
	@media (min-width: 576px) and (max-width: 991.98px) {
		${cardImgSelector}{
			padding-top:${tablet}${unit}!important;
		}
	}
	@media (min-width: 992px) {
		${cardImgSelector}{
			padding-top:${pc}${unit}!important;
		}
	}`;
};

const VKCardInlineEditorCss = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { attributes } = props;

		if ('vk-blocks/card' === props.name) {
			const cssTag = generateInlineCss(attributes);

			return (
				<>
					<BlockEdit {...props} />
					<style type="text/css">{cssTag}</style>
				</>
			);
		}
		return <BlockEdit {...props} />;
	};
}, 'VKCardInlineEditorCss');
addFilter('editor.BlockEdit', 'vk-blocks/card', VKCardInlineEditorCss);

const VKCardInlineCss = (el, type, attributes) => {
	if ('vk-blocks/card' === type.name) {
		//現在実行されている deprecated内の save関数のindexを取得
		const deprecatedFuncIndex = deprecated.findIndex(
			(item) => item.save === type.save
		);

		// 最新版
		if (-1 === deprecatedFuncIndex) {
			// NOTE: useBlockProps + style要素を挿入する場合、useBlockPropsを使った要素が最初（上）にこないと、
			// カスタムクラスを追加する処理が失敗する
			const cssTag = generateInlineCss(attributes);
			return (
				<>
					{el}
					<style type="text/css">{cssTag}</style>
				</>
			);

			//後方互換
		}
		let DeprecatedHook;
		// Deprecated Hooks が Deprecated Save関数より少ない場合にエラーが出ないように。
		if (deprecatedHooks.length > deprecatedFuncIndex) {
			DeprecatedHook = deprecatedHooks[deprecatedFuncIndex];
		} else {
			DeprecatedHook = deprecatedHooks[deprecatedHooks.length - 1];
		}
		return <DeprecatedHook el={el} attributes={attributes} />;
	}
	return el;
};
addFilter('blocks.getSaveElement', 'vk-blocks/card', VKCardInlineCss, 11);
