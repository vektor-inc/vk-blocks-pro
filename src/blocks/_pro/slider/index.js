/**
 * Slider block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

import deprecatedHooks from './deprecated/hooks';
import deprecated from './deprecated/save';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import classnames from 'classnames';

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

	if ('vk-blocks/slider' === type.name) {
		//現在実行されている deprecated内の save関数のindexを取得
		const deprecatedFuncIndex = deprecated.findIndex(
			(item) => item.save === type.save
		);

		// 最新版
		if (-1 === deprecatedFuncIndex) {
			const cssTag = generateHeightCss(attributes, cssSelector);
			const {
				vkb_hidden, // eslint-disable-line camelcase
				vkb_hidden_xxl, // eslint-disable-line camelcase
				vkb_hidden_xl_v2, // eslint-disable-line camelcase
				vkb_hidden_xl, // eslint-disable-line camelcase
				vkb_hidden_lg, // eslint-disable-line camelcase
				vkb_hidden_md, // eslint-disable-line camelcase
				vkb_hidden_sm, // eslint-disable-line camelcase
				vkb_hidden_xs, // eslint-disable-line camelcase
			} = attributes;

			if (
				vkb_hidden || // eslint-disable-line camelcase
				vkb_hidden_xxl || // eslint-disable-line camelcase
				vkb_hidden_xl_v2 || // eslint-disable-line camelcase
				vkb_hidden_xl || // eslint-disable-line camelcase
				vkb_hidden_lg || // eslint-disable-line camelcase
				vkb_hidden_md || // eslint-disable-line camelcase
				vkb_hidden_sm || // eslint-disable-line camelcase
				vkb_hidden_xs // eslint-disable-line camelcase
			) {
				const custom = vkb_hidden && 'vk_hidden'; // eslint-disable-line camelcase
				const customXxl = vkb_hidden_xxl && 'vk_hidden-xxl'; // eslint-disable-line camelcase
				const customXl2 = vkb_hidden_xl_v2 && 'vk_hidden-xl-v2'; // eslint-disable-line camelcase
				const customXl = vkb_hidden_xl && 'vk_hidden-xl'; // eslint-disable-line camelcase
				const customLg = vkb_hidden_lg && 'vk_hidden-lg'; // eslint-disable-line camelcase
				const customMd = vkb_hidden_md && 'vk_hidden-md'; // eslint-disable-line camelcase
				const customSm = vkb_hidden_sm && 'vk_hidden-sm'; // eslint-disable-line camelcase
				const customXs = vkb_hidden_xs && 'vk_hidden-xs'; // eslint-disable-line camelcase

				if (el) {
					el = {
						...el,
						...{
							props: {
								...el.props,
								...{
									className: classnames(
										el.props.className,
										custom,
										customXxl,
										customXl2,
										customXl,
										customLg,
										customMd,
										customSm,
										customXs
									),
								},
							},
						},
					};
				}
			}
			return (
				<>
					{el}
					<style type="text/css">{cssTag}</style>
				</>
			);

			//後方互換
		}
		const DeprecatedHook = deprecatedHooks[deprecatedFuncIndex];
		return <DeprecatedHook el={el} attributes={attributes} />;
	}
	// Slider以外のブロック
	return el;
};
addFilter('blocks.getSaveElement', 'vk-blocks/slider', addSwiperConfig);
