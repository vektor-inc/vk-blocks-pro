/**
 * Slider block type
 *
 */
import { ColumnResponsive } from "./component";
import { schema } from "./schema";
import classNames from "classnames";
import { convertToGrid } from "../../_helper/convert-to-grid";
import replaceClientId from "../../_helper/replaceClientId"
import { AdvancedToggleControl } from "./../../../components/advanced-toggle-control";
import AdvancedViewportControl from "../../../components/advanced-viewport-control"
import AdvancedUnitControl from "../../../components/advanced-unit-control"
import deprecated from "./deprecated/"

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment, useEffect } = wp.element;
const { InspectorControls, BlockControls, BlockAlignmentToolbar} = wp.blockEditor;
const { select, dispatch } = wp.data;
const { PanelBody, BaseControl, TextControl, ButtonGroup, Button, SelectControl } = wp.components;
const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;

const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 576">
		<path d="M456.1,1320.7H118.4v36.6H533V945.2h-35.5v334C497.6,1302.1,479,1320.7,456.1,1320.7z" />
		<path d="M56.5,363.5c5.6,7,15.3,2.1,15.3-8V220.4c0-10.1-9.7-15-15.3-8L2.6,280.1c-3.5,4.4-3.5,11.5,0,15.9L56.5,363.5z" />
		<path d="M519.5,363.5c-5.6,7-15.3,2.1-15.3-8V220.4c0-10.1,9.7-15,15.3-8l53.9,67.6c3.5,4.4,3.5,11.5,0,15.9L519.5,363.5z" />
		<g>
			<g>
				<circle cx="240.3" cy="195.8" r="23.8" />
				<path d="M181.7,311.7h56h36.7h120c10.6,0,16.4-13.7,9.5-22.6l-64.9-83.6c-5-6.4-13.9-6.4-18.9,0l-52.1,67.1
				c-5.2,6.7-14.9,6.3-19.6-1l-22.3-34.3c-5-7.6-15.3-7.6-20.3,0L171.5,290C165.7,299.1,171.5,311.7,181.7,311.7z" />
				<path d="M392.7,404H183.3c-7.8,0-14.1-6.3-14.1-14.1v-24.1c0-7.8,6.3-14.1,14.1-14.1h209.3c7.8,0,14.1,6.3,14.1,14.1v24.1
				C406.8,397.7,400.5,404,392.7,404z" />
			</g>
			<path d="M436.1,87.8H139.9c-25.4,0-46,20.6-46,46v308.3c0,25.4,20.6,46,46,46h296.2c25.4,0,46-20.6,46-46V133.8
			C482.1,108.5,461.5,87.8,436.1,87.8z M436.1,442.2H139.9V133.8h296.2V442.2z" />
		</g>
	</svg>
);

let displayInserter = false;
if (window.wpVersion && 5.4 <= parseFloat(window.wpVersion)) {
	displayInserter = true;
}

registerBlockType("vk-blocks/slider", {
	title: __("Slider", "vk-blocks"),
	icon: BlockIcon,
	category: "vk-blocks-cat-layout",
	attributes: schema,
	description: __( 'Slider is do not move in edit screen.','vk-blocks'),
	supports: {
		className: true,
		inserter: displayInserter,
	},

	edit(props) {
		const { attributes, setAttributes, className, clientId } = props;
		const { autoPlay, autoPlayDelay, pagination, width, loop, effect, speed } = attributes;
		const { getBlocksByClientId } = select("core/block-editor");
		const { updateBlockAttributes } = dispatch("core/block-editor");

		const thisBlock = getBlocksByClientId(clientId);

		let beforeLength;
		let afterLength;

		const customClientId = replaceClientId(clientId);

		useEffect(() => {
			updateBlockAttributes(clientId, {
				clientId:customClientId,
			});
		}, [])

		if (
			thisBlock !== undefined &&
			thisBlock[0] !== null &&
			thisBlock[0].innerBlocks !== undefined
		) {
			const innerBlocks = thisBlock[0].innerBlocks;
			beforeLength = innerBlocks.length;

			if (beforeLength !== undefined) {
				if (beforeLength !== afterLength) {
					for (let i = 0; i < innerBlocks.length; i++) {
						if (innerBlocks[i] !== undefined) {
							updateBlockAttributes(innerBlocks[i].clientId, attributes);
						}
					}
				}
				afterLength = beforeLength;
			}
		}
		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ width }
						onChange={ ( nextWidth ) =>
							setAttributes( { width: nextWidth } )
						}
						controls={ [ 'full' ] }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody
						title={ __("Width", "vk-blocks") }
						initialOpen={ true }
					>
						<BaseControl>
							<ButtonGroup>
								<Button
									isSmall
									isPrimary={ width === '' }
									isSecondary={ width !== '' }
									onClick={ () => setAttributes({ width: '' }) }
								>
									{ __('Normal', 'vk-blocks') }
								</Button>
								<Button
									isSmall
									isPrimary={ width === 'full' }
									isSecondary={ width !== 'full' }
									onClick={ () => setAttributes({ width: 'full' }) }
								>
									{ __('Full Wide', 'vk-blocks') }
								</Button>
							</ButtonGroup>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __("Height", "vk-blocks") }
						initialOpen={ false }
					>
						<AdvancedUnitControl { ...props } />
						<BaseControl label={ __('Slide Height for each device.', 'vk-blocks') }>
							<AdvancedViewportControl { ...props } initial={ { iPc:600, iTablet:600, iMobile:600 } } />
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __("Slider Settings", "vk-blocks") }
						initialOpen={ false }
					>
						<BaseControl label={ __("Effect ", "vk-blocks") }>
							<SelectControl
								value={ effect }
								onChange={ value => setAttributes({ effect: value }) }
								options={ [
									{ label: __("Slide", "vk-blocks"), value: "slide" },
									{ label: __("Fade", "vk-blocks"), value: "fade" },
								] }
							/>
						</BaseControl>
						<BaseControl label={ __("Loop ", "vk-blocks") }>
							<AdvancedToggleControl
								initialFixedTable={ loop }
								schema={ "loop" }
								{ ...props }
							/>
						</BaseControl>
						<BaseControl label={ __("AutoPlay", "vk-blocks") }>
							<AdvancedToggleControl
								initialFixedTable={ autoPlay }
								schema={ "autoPlay" }
								{ ...props }
							/>
							<TextControl
								label={ __('Display Time', 'vk-blocks') }
								value={ autoPlayDelay }
								onChange={ value => setAttributes({ autoPlayDelay: parseInt(value,10) }) }
								type={ "number" }
							/>
						</BaseControl>
						<BaseControl label={ __("Change Speed", "vk-blocks") }>
								<TextControl
									value={ speed }
									onChange={ value => setAttributes({ speed: parseInt(value,10) }) }
									type={ "number" }
									/>
						</BaseControl>
						<BaseControl label={ __("Display Pagination", "vk-blocks") }>
							<AdvancedToggleControl
								initialFixedTable={ pagination }
								schema={ "pagination" }
								{ ...props }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<ColumnResponsive
					attributes={ attributes }
					className={ className }
					setAttributes={ setAttributes }
					for_={ "edit" }
				/>
			</Fragment>
		);
	},
	save({ attributes, className }) {
		return (
			<ColumnResponsive
				attributes={ attributes }
				className={ className }
				for_={ "save" }
			/>
		);
	},

	deprecated
});

const generateHeightCss = (attributes, for_) =>{

	const { clientId, mobile, tablet, pc, unit }  = attributes

	let cssSelector = ''
	if("save" === for_){
		cssSelector = `.vk_slider_${clientId},`
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
	}`
}

// Add column css for editor.
const vkbwithClientIdClassName = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			if ("vk-blocks/slider" === props.name) {
				const cssTag = generateHeightCss( props.attributes, "edit" )
				return (
					<Fragment>
						<style type='text/css'>{ cssTag }</style>
						<BlockListBlock { ...props } />
					</Fragment>
				)
			}else if (props.name === "vk-blocks/slider-item") {
				const { col_xs, col_sm, col_md, col_lg, col_xl, col_xxl } = props.attributes;
				const customClass = classNames(props.className, `col-${convertToGrid(col_xs)} col-sm-${convertToGrid(col_sm)} col-md-${convertToGrid(col_md)} col-lg-${convertToGrid(col_lg)} col-xl-${convertToGrid(col_xl)} col-xxl-${convertToGrid(col_xxl)} `);
				return (
					<BlockListBlock
						{ ...props }
						className={ customClass }
					/>
				);
			}
			return <BlockListBlock { ...props } />;

		};
	},
	"vkbwithClientIdClassName"
);
addFilter(
	"editor.BlockListBlock",
	"vk-blocks/slider-item",
	vkbwithClientIdClassName
);

// Add swiper-js script for front side.
const addSwiperConfig = (el, type, attributes) => {
	const post = select( 'core/editor' ).getCurrentPost();

	if(post.hasOwnProperty('meta')){
		//0.49.8で、jSをfooterに出力するよう構造変更。
		//0.49.8未満（_vkb_saved_block_version が ""）のみフィルターを使う。
		if ("vk-blocks/slider" === type.name && !post.meta._vkb_saved_block_version) {
			const { clientId, pagination, autoPlay, autoPlayDelay, loop, effect, speed }  = attributes
			const cssTag = generateHeightCss( attributes, "save" )

			let autoPlayScripts;
			if(autoPlay){
				autoPlayScripts = `autoplay: {
					delay: ${autoPlayDelay},
					disableOnInteraction: false,
				},`
			}else{
				autoPlayScripts = ''
			}

			let paginationScripts;
			if(pagination){
				paginationScripts = `
				// If we need pagination
				pagination: {
				  el: '.swiper-pagination',
				  clickable : true,
				},`;
			}else{
				paginationScripts = ''
			}

			let speedScripts;
			if(speed){
				speedScripts = `speed: ${speed},`
			}else{
				speedScripts = ''
			}

			return<div>
				{ el }
				<style type='text/css'>{ cssTag }</style>
				<script>{ `
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
				  })`
				  }
				</script>
			  </div>
		}
	}
	return el
}

addFilter(
  "blocks.getSaveElement",
  "vk-blocks/slider",
  addSwiperConfig
);
