/**
 * Slider block type
 *
 */
import { ColumnResponsive04413 } from "./component";
import classNames from "classnames";
import { convertToGrid } from "../../../../_helper/convert-to-grid";
import replaceClientId from "../../../../_helper/replaceClientId";
const { Fragment } = wp.element;
const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;

export default ({ attributes, className }) => {
	return (
		<ColumnResponsive04413
			attributes={ attributes }
			className={ className }
			for_={ "save" }
		/>
	);
}

// const generateHeightCss = (attributes, for_) =>{

// 	const { clientId, mobile, tablet, pc, unit }  = attributes

// 	let cssSelector = ''
// 	if("save" === for_){
// 		cssSelector = `.vk_slider_${clientId},`
// 	}

// 	return `@media (max-width: 576px) {
// 		${cssSelector}
// 		.vk_slider_${clientId} .vk_slider_item{
// 			height:${mobile}${unit}!important;
// 		}
// 	}
// 	@media (min-width: 577px) and (max-width: 768px) {
// 		${cssSelector}
// 		.vk_slider_${clientId} .vk_slider_item{
// 			height:${tablet}${unit}!important;
// 		}
// 	}
// 	@media (min-width: 769px) {
// 		${cssSelector}
// 		.vk_slider_${clientId} .vk_slider_item{
// 			height:${pc}${unit}!important;
// 		}
// 	}`
// }

// // Add column css for editor.
// const vkbwithClientIdClassName = createHigherOrderComponent(
// 	(BlockListBlock) => {
// 		return (props) => {
// 			if ("vk-blocks/slider" === props.name) {
// 				const cssTag = generateHeightCss( props.attributes, "edit" )
// 				return (
// 					<Fragment>
// 						<style type='text/css'>{ cssTag }</style>
// 						<BlockListBlock { ...props } />
// 					</Fragment>
// 				)
// 			}else if (props.name === "vk-blocks/slider-item") {
// 				const { col_xs, col_sm, col_md, col_lg, col_xl, col_xxl } = props.attributes;
// 				const customClass = classNames(props.className, `col-${convertToGrid(col_xs)} col-sm-${convertToGrid(col_sm)} col-md-${convertToGrid(col_md)} col-lg-${convertToGrid(col_lg)} col-xl-${convertToGrid(col_xl)} col-xxl-${convertToGrid(col_xxl)} `);
// 				return (
// 					<BlockListBlock
// 						{ ...props }
// 						className={ customClass }
// 					/>
// 				);
// 			}
// 			return <BlockListBlock { ...props } />;

// 		};
// 	},
// 	"vkbwithClientIdClassName"
// );
// addFilter(
// 	"editor.BlockListBlock",
// 	"vk-blocks/slider-item",
// 	vkbwithClientIdClassName
// );

// // Add swiper-js script for front side.
// const addSwiperConfig = (el, type, attributes) => {

// 	if ("vk-blocks/slider" === type.name) {
// 		const { clientId, pagination, autoPlay, autoPlayDelay, loop, effect }  = attributes

// 		const cssTag = generateHeightCss( attributes, "save" )

// 		let autoPlayScripts;
// 		if(autoPlay){
// 			autoPlayScripts = `autoplay: {
// 				delay: ${autoPlayDelay},
// 				disableOnInteraction: false,
// 			},`
// 		}else{
// 			autoPlayScripts = ''
// 		}

// 		let paginationScripts;
// 		if(pagination){
// 			paginationScripts = `
// 			// If we need pagination
// 			pagination: {
// 			  el: '.swiper-pagination',
// 			  clickable : true,
// 			},`;
// 		}else{
// 			paginationScripts = ''
// 		}

// 		return<div>
// 			{ el }
// 			<style type='text/css'>{ cssTag }</style>
// 			<script>{ `
// 			var swiper${replaceClientId(clientId)} = new Swiper ('.vk_slider_${clientId}', {
// 				// Optional parameters
// 				loop: ${loop},

// 				effect: '${effect}',

// 				${paginationScripts}

// 				// navigation arrows
// 				navigation: {
// 					nextEl: '.swiper-button-next',
// 					prevEl: '.swiper-button-prev',
// 				},

// 				// And if we need scrollbar
// 				scrollbar: {
// 				  el: '.swiper-scrollbar',
// 				},

// 				${autoPlayScripts}
// 			  })`
// 			  }
// 			</script>
// 		  </div>
// 	}
// 		return el

// }
// addFilter(
//   "blocks.getSaveElement",
//   "vk-blocks/slider",
//   addSwiperConfig
// );
