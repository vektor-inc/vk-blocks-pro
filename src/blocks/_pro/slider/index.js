/**
 * Slider block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

import deprecatedHooks from './deprecated/hooks'
import deprecated from './deprecated/save';
import edit from './edit';
import metadata from './block.json';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Slider', 'vk-blocks'),
	icon: <Icon />,
	description: __('Slider is do not move in edit screen.', 'vk-blocks'),
	edit,
	save,
	deprecated,
};

const generateHeightCss = (attributes, cssSelector = '') => {
	const { clientId, mobile, tablet, pc, unit } = attributes;

	return `@media (max-width: 576px) {
		${cssSelector}
		.vk_slider_${clientId} .vk_slider_item{
			height:${mobile}${unit}!important;
		}
	}
	@media (min-width: 577px) and (max-width: 768px) {
		${cssSelector}
		.vk_slider_${clientId} .vk_slider_item{
			height:${tablet}${unit}!important;
		}
	}
	@media (min-width: 769px) {
		${cssSelector}
		.vk_slider_${clientId} .vk_slider_item{
			height:${pc}${unit}!important;
		}
	}`;
};

// Add column css for editor.
const vkbwithClientIdClassName = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			if ('vk-blocks/slider' === props.name) {
				const cssTag = generateHeightCss(props.attributes, '');
				return (
					<>
						<style type="text/css">{cssTag}</style>
						<BlockListBlock {...props} />
					</>
				);
			}
			return <BlockListBlock {...props} />;
		};
	},
	'vkbwithClientIdClassName'
);
addFilter(
	'editor.BlockListBlock',
	'vk-blocks/slider-item',
	vkbwithClientIdClassName
);

/**
 * 	Swiperの設定をフロント側に出力するフィルター。
 *  0.49.8で、jSをfooterに出力するよう構造変更。CSSは継続して出力。
 *
 * @param {*} el
 * @param {*} type
 * @param {*} attributes
 */
const addSwiperConfig = (el, type, attributes) => {

	const cssSelector = `.vk_slider_${attributes.clientId},`;

	if ('vk-blocks/slider' === type.name && type.save.name) {

		const saveFunName = type.save.name;

		console.log(type)
		console.log(saveFunName)

		// save : build でビルド時
		// slider_save_save : build:dev でビルド時
		if('save' === saveFunName || 'slider_save_save' === saveFunName) {
			//最新版
			const cssTag = generateHeightCss(attributes, cssSelector);
			return (
				<>
					{el}
					<style type="text/css">{cssTag}</style>
				</>
			);
		} else {
			//後方互換
			return deprecatedHooks( el, attributes, saveFunName );
		}

	} else {
		// Slider以外のブロック
		return el;
	}
};
addFilter('blocks.getSaveElement', 'vk-blocks/slider', addSwiperConfig);
