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
import BlockIcon from "./icon.svg";
import compareVersions from 'compare-versions';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment, useEffect } = wp.element;
const { InspectorControls, BlockControls, BlockAlignmentToolbar} = wp.blockEditor;
const { select, dispatch } = wp.data;
const { PanelBody, BaseControl, TextControl, ButtonGroup, Button, SelectControl } = wp.components;
const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;


let displayInserter = false;
if (window.wpVersion && 5.4 <= parseFloat(window.wpVersion)) {
	displayInserter = true;
}

registerBlockType("vk-blocks/slider", {
	title: __("Slider", "vk-blocks"),
	icon: <BlockIcon />,
	category: "vk-blocks-cat-layout",
	attributes: schema,
	description: __( 'Slider is do not move in edit screen.','vk-blocks'),
	supports: {
		className: true,
		inserter: displayInserter,
	},

	edit( props ) {
		const { attributes, setAttributes, className, clientId } = props;
		const { autoPlay, autoPlayDelay, pagination, width, loop, effect, speed } = attributes;
		const { updateBlockAttributes } = dispatch("core/block-editor");
		const customClientId = replaceClientId(clientId);

		useEffect(() => {
			updateBlockAttributes( clientId, {
				clientId:customClientId,
			});
		}, [])

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
	save({ attributes }) {
		return (
			<ColumnResponsive
				attributes={ attributes }
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

/**
 * 	Swiperの設定をフロント側に出力するフィルター。
 *  0.49.8で、jSをfooterに出力するよう構造変更。CSSは継続して出力。
 *
 * @param {*} el
 * @param {*} type
 * @param {*} attributes
 */
const addSwiperConfig = ( el, type, attributes ) => {

	const post = select( 'core/editor' ).getCurrentPost();

	if( "vk-blocks/slider" === type.name ){

		if (  post.hasOwnProperty('meta') ){
			//0.49.8未満（_vkb_saved_block_version が ""）のみJSタグ挿入
			if( !post.meta._vkb_saved_block_version ){
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

				return<div className={ el.props.className } >
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

			// 保存したブロックのバージョンが0.56.4以下の時
			} else if ( compareVersions('0.56.4', post.meta._vkb_saved_block_version) ) {
				const cssTag = generateHeightCss( attributes, "save" )
				return <div>{ el }<style type='text/css'>{ cssTag }</style></div>;
			}

		} else {
			const cssTag = generateHeightCss( attributes, "save" )
			return <div className={ el.props.className } >{ el }<style type='text/css'>{ cssTag }</style></div>;
		}
	} else {
		return el
	}
}
addFilter(
  "blocks.getSaveElement",
  "vk-blocks/slider",
  addSwiperConfig
);
