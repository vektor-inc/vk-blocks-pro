/**
 * Slider block type
 *
 */
import replaceClientId from '@vkblocks/utils/replaceClientId';
import { ReactComponent as Icon } from './icon.svg';
import compareVersions from 'compare-versions';

import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

import deprecated from './deprecated/';
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
	const post = select('core/editor').getCurrentPost();

	if ('vk-blocks/slider' === type.name) {
		const {
			clientId,
			pagination,
			autoPlay,
			autoPlayDelay,
			loop,
			effect,
			speed,
		} = attributes;
		const cssSelector = `.vk_slider_${clientId},`;

		if (post.hasOwnProperty('meta')) {
			//0.49.8未満（_vkb_saved_block_version が ""）のみJSタグ挿入
			if (!post.meta._vkb_saved_block_version) {
				const cssTag = generateHeightCss(attributes, cssSelector);

				let autoPlayScripts;
				if (autoPlay) {
					autoPlayScripts = `autoplay: {
						delay: ${autoPlayDelay},
						disableOnInteraction: false,
					},`;
				} else {
					autoPlayScripts = '';
				}

				let paginationScripts;
				if (pagination) {
					paginationScripts = `
					// If we need pagination
					pagination: {
						el: '.swiper-pagination',
						clickable : true,
					},`;
				} else {
					paginationScripts = '';
				}

				let speedScripts;
				if (speed) {
					speedScripts = `speed: ${speed},`;
				} else {
					speedScripts = '';
				}

				return (
					<div className={el.props.className}>
						{el}
						<style type="text/css">{cssTag}</style>
						<script>
							{`
						var swiper${replaceClientId(clientId)} = new Swiper ('.vk_slider_${clientId}', {

						${speedScripts}

						// Optional parameters
						loop: ${loop},

						effect: '${effect}',

						${paginationScripts}

						// navigation arrows
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},

						// And if we need scrollbar
						scrollbar: {
							el: '.swiper-scrollbar',
						},

						${autoPlayScripts}
						})`}
						</script>
					</div>
				);

				// 保存したブロックのバージョンが0.56.4以下の時
			} else if (
				compareVersions('0.56.4', post.meta._vkb_saved_block_version) >
				0
			) {
				const cssTag = generateHeightCss(attributes, cssSelector);
				return (
					<div>
						{el}
						<style type="text/css">{cssTag}</style>
					</div>
				);
			}
		}

		const cssTag = generateHeightCss(attributes, cssSelector);
		return (
			<div className={el.props.className}>
				{el}
				<style type="text/css">{cssTag}</style>
			</div>
		);
	}
	return el;
};
addFilter('blocks.getSaveElement', 'vk-blocks/slider', addSwiperConfig);
