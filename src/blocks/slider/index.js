/**
 * Slider block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

import deprecatedHooks from './deprecated/hooks';
import deprecated from './deprecated/save';
import edit from './edit';
import metadata from './block.json';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	edit,
	save,
	deprecated,
};

const generateHeightCss = (attributes, cssSelector = '') => {
	const { blockId, mobile, tablet, pc, unit } = attributes;
	let css = '';
	if (unit !== undefined && unit !== null) {
		if (mobile !== undefined && mobile !== null && !isNaN(mobile)) {
			css += `@media (max-width: 575.98px) {
				${cssSelector}
				.vk_slider_${blockId} .vk_slider_item{
					height:${mobile}${unit}!important;
				}
			}`;
		}
		if (tablet !== undefined && tablet !== null && !isNaN(tablet)) {
			css += `@media (min-width: 576px) and (max-width: 991.98px) {
				${cssSelector}
				.vk_slider_${blockId} .vk_slider_item{
					height:${tablet}${unit}!important;
				}
			}`;
		}
		if (pc !== undefined && pc !== null && !isNaN(pc)) {
			css += `@media (min-width: 992px) {
				${cssSelector}
				.vk_slider_${blockId} .vk_slider_item{
					height:${pc}${unit}!important;
				}
			}`;
		}
	}

	return css;
};

const generateZoomAnimationCss = (attributes = '') => {
	const {
		blockId,
		zoomAnimation,
		zoomInitialScale,
		zoomFinalScale,
		autoPlayDelay,
		speed,
	} = attributes;

	let css = '';

	if (zoomAnimation) {
		// ズーム用のセレクターは ::before 専用にして、親要素への副作用を防ぐ
		const zoomSelector = `.vk_slider_${blockId}`;

		css += `
			${zoomSelector} .vk_slider_item {
				position: relative;
				overflow: hidden;
			}
			
			${zoomSelector} .vk_slider_item::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-size: cover;
				background-position: center;
				background-image: inherit;
				will-change: transform;
				transform: scale(${zoomInitialScale !== undefined ? zoomInitialScale : 1});
				transition: transform ${(autoPlayDelay + speed + autoPlayDelay * 0.5) / 1000 || 6}s linear;
			}
			
			${zoomSelector} .vk_slider_item.swiper-slide-active::before,
			${zoomSelector} .vk_slider_item.swiper-slide-duplicate-active::before {
				transform: scale(${zoomFinalScale !== undefined ? zoomFinalScale : 1.25});
			}
			
			${zoomSelector} .vk_slider_item.swiper-slide-prev::before,
			${zoomSelector} .vk_slider_item.swiper-slide-next::before {
				transform: scale(${zoomInitialScale !== undefined ? zoomInitialScale : 1});
			}
		`;
	}

	return css;
};

// Add column css for editor.
const vkbwithClientIdClassName = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			if ('vk-blocks/slider' === props.name) {
				const heightCss = generateHeightCss(props.attributes, '');
				const zoomCss = generateZoomAnimationCss(props.attributes, '');
				const cssTag = heightCss + zoomCss;
				return (
					<>
						<BlockListBlock {...props} />
						{(() => {
							if (cssTag) {
								return <style type="text/css">{cssTag}</style>;
							}
						})()}
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
	'vk-blocks/slider',
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
	if ('vk-blocks/slider' === type.name) {
		//現在実行されている deprecated内の save関数のindexを取得
		const deprecatedFuncIndex = deprecated.findIndex(
			(item) => item.save === type.save
		);

		// 最新版
		if (-1 === deprecatedFuncIndex) {
			const cssSelector = `.vk_slider_${attributes.blockId},`;
			const heightCss = generateHeightCss(attributes, cssSelector);
			const zoomCss = generateZoomAnimationCss(attributes, cssSelector);
			const cssTag = heightCss + zoomCss;
			return (
				<>
					{el}
					{(() => {
						if (cssTag) {
							return <style type="text/css">{cssTag}</style>;
						}
					})()}
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
addFilter('blocks.getSaveElement', 'vk-blocks/slider', addSwiperConfig, 11);
