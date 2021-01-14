/**
 * Slider block type
 *
 */
import { ColumnResponsive } from './component';
import { schema } from './schema';
import replaceClientId from '@vkblocks/utils/replaceClientId';
import { AdvancedToggleControl } from '@vkblocks/components/advanced-toggle-control';
import AdvancedViewportControl from '@vkblocks/components/advanced-viewport-control';
import AdvancedUnitControl from '@vkblocks/components/advanced-unit-control';
import deprecated from './deprecated/';
import BlockIcon from './icon.svg';
import compareVersions from 'compare-versions';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment, useEffect } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
} from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';
import {
	PanelBody,
	BaseControl,
	TextControl,
	ButtonGroup,
	Button,
	SelectControl,
} from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

let displayInserter = false;
if (window.wpVersion && 5.4 <= parseFloat(window.wpVersion)) {
	displayInserter = true;
}

registerBlockType('vk-blocks/slider', {
	title: __('Slider', 'vk-blocks'),
	icon: <BlockIcon />,
	category: 'vk-blocks-cat-layout',
	attributes: schema,
	description: __('Slider is do not move in edit screen.', 'vk-blocks'),
	supports: {
		className: true,
		inserter: displayInserter,
	},

	edit(props) {
		const { attributes, setAttributes, className, clientId } = props;
		const {
			autoPlay,
			autoPlayDelay,
			pagination,
			width,
			loop,
			effect,
			speed,
		} = attributes;
		const { updateBlockAttributes } = dispatch('core/block-editor');
		const customClientId = replaceClientId(clientId);

		useEffect(() => {
			updateBlockAttributes(clientId, {
				clientId: customClientId,
			});
		}, []);

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={width}
						onChange={(nextWidth) =>
							setAttributes({ width: nextWidth })
						}
						controls={['full']}
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody
						title={__('Width', 'vk-blocks')}
						initialOpen={true}
					>
						<BaseControl id={`vk_slider-width`}>
							<ButtonGroup>
								<Button
									isSmall
									isPrimary={width === ''}
									isSecondary={width !== ''}
									onClick={() => setAttributes({ width: '' })}
								>
									{__('Normal', 'vk-blocks')}
								</Button>
								<Button
									isSmall
									isPrimary={width === 'full'}
									isSecondary={width !== 'full'}
									onClick={() =>
										setAttributes({ width: 'full' })
									}
								>
									{__('Full Wide', 'vk-blocks')}
								</Button>
							</ButtonGroup>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={__('Height', 'vk-blocks')}
						initialOpen={false}
					>
						<AdvancedUnitControl {...props} />
						<BaseControl
							label={__(
								'Slide Height for each device.',
								'vk-blocks'
							)}
							id={`vk_slider-SlideHeight`}
						>
							<AdvancedViewportControl
								{...props}
								initial={{
									iPc: 600,
									iTablet: 600,
									iMobile: 600,
								}}
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={__('Slider Settings', 'vk-blocks')}
						initialOpen={false}
					>
						<BaseControl
							label={__('Effect ', 'vk-blocks')}
							id={`vk_slider-effect`}
						>
							<SelectControl
								value={effect}
								onChange={(value) =>
									setAttributes({ effect: value })
								}
								options={[
									{
										label: __('Slide', 'vk-blocks'),
										value: 'slide',
									},
									{
										label: __('Fade', 'vk-blocks'),
										value: 'fade',
									},
								]}
							/>
						</BaseControl>
						<BaseControl
							label={__('Loop ', 'vk-blocks')}
							id={`vk_slider-loop`}
						>
							<AdvancedToggleControl
								initialFixedTable={loop}
								schema={'loop'}
								{...props}
							/>
						</BaseControl>
						<BaseControl
							label={__('AutoPlay', 'vk-blocks')}
							id={`vk_slider-autoPlay`}
						>
							<AdvancedToggleControl
								initialFixedTable={autoPlay}
								schema={'autoPlay'}
								{...props}
							/>
							<TextControl
								label={__('Display Time', 'vk-blocks')}
								value={autoPlayDelay}
								onChange={(value) =>
									setAttributes({
										autoPlayDelay: parseInt(value, 10),
									})
								}
								type={'number'}
							/>
						</BaseControl>
						<BaseControl
							label={__('Change Speed', 'vk-blocks')}
							id={`vk_slider-changeSpeed`}
						>
							<TextControl
								value={speed}
								onChange={(value) =>
									setAttributes({
										speed: parseInt(value, 10),
									})
								}
								type={'number'}
							/>
						</BaseControl>
						<BaseControl
							label={__('Display Pagination', 'vk-blocks')}
							id={`vk_slider-displayPagination`}
						>
							<AdvancedToggleControl
								initialFixedTable={pagination}
								schema={'pagination'}
								{...props}
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<ColumnResponsive
					attributes={attributes}
					className={className}
					setAttributes={setAttributes}
					for_={'edit'}
				/>
			</Fragment>
		);
	},
	save({ attributes }) {
		return <ColumnResponsive attributes={attributes} for_={'save'} />;
	},
	deprecated,
});

const generateHeightCss = (attributes, for_) => {
	const { clientId, mobile, tablet, pc, unit } = attributes;

	let cssSelector = '';
	if ('save' === for_) {
		cssSelector = `.vk_slider_${clientId},`;
	}

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
				const cssTag = generateHeightCss(props.attributes, 'edit');
				return (
					<Fragment>
						<style type="text/css">{cssTag}</style>
						<BlockListBlock {...props} />
					</Fragment>
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
		if (post.hasOwnProperty('meta')) {
			//0.49.8未満（_vkb_saved_block_version が ""）のみJSタグ挿入
			if (!post.meta._vkb_saved_block_version) {
				const {
					clientId,
					pagination,
					autoPlay,
					autoPlayDelay,
					loop,
					effect,
					speed,
				} = attributes;
				const cssTag = generateHeightCss(attributes, 'save');

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
				const cssTag = generateHeightCss(attributes, 'save');
				return (
					<div>
						{el}
						<style type="text/css">{cssTag}</style>
					</div>
				);
			}
		}

		const cssTag = generateHeightCss(attributes, 'save');
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
