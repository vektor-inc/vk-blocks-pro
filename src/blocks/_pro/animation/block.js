/**
 * Animation block
 *
 */
import classNames from "classnames";
import { schema } from "./schema";
import { deprecated } from './deprecated/';
import {vkbBlockEditor} from "../../_helper/depModules"
import replaceClientId from "../../_helper/replaceClientId"
import BlockIcon from "./icon.svg";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = vkbBlockEditor;
const { PanelBody, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { select } = wp.data;

registerBlockType("vk-blocks/animation", {
	title: __("Animation", "vk-blocks"),
	icon: <BlockIcon />,
	category: "vk-blocks-cat",
	attributes: schema,
	supports: {
		className: true,
	},

	edit(props) {
		const { className, attributes, setAttributes, clientId } = props;
		const {effect, speed, range} = attributes;
		const customClientId = replaceClientId(clientId);
		setAttributes({clientId:customClientId})

			return (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ __("Animation Settings", "vk-blocks") }>
							<label>{ __("Animation effect", "vk-blocks") }</label>
							<SelectControl
								value={ effect }
								onChange={ value => setAttributes({ effect: value }) }
								options={ [
									{ label: __("Fade In", "vk-blocks"), value: "fade-in" },
									{ label: __("Slide Up", "vk-blocks"), value: "slide-up" },
									{ label: __("Slide Left", "vk-blocks"), value: "slide-left" },
									{ label: __("Slide Right", "vk-blocks"), value: "slide-right" },
									{ label: __("Left Right", "vk-blocks"), value: "left-right" },
									{ label: __("Up Down", "vk-blocks"), value: "up-down" },
									{ label: __("Trembling Y", "vk-blocks"), value: "trembling-y" },
									{ label: __("Trembling X", "vk-blocks"), value: "trembling-x" },
									{ label: __("Pounding", "vk-blocks"), value: "pounding" },
									{ label: __("Shaking", "vk-blocks"), value: "shaking" },
								] }
							/>
							<label>{ __("Animation speed", "vk-blocks") }</label>
							<SelectControl
								value={ speed }
								onChange={ value => setAttributes({ speed: value }) }
								options={ [
									{ label: __("Very Slow", "vk-blocks"), value: "very-slow" },
									{ label: __("Slow", "vk-blocks"), value: "slow" },
									{ label: __("Normal", "vk-blocks"), value: "normal" },
									{ label: __("Fast", "vk-blocks"), value: "fast" },
									{ label: __("Very Fast", "vk-blocks"), value: "very-fast" },
								] }
							/>
							<label>{ __("Animation range", "vk-blocks") }</label>
							<SelectControl
								value={ range }
								onChange={ value => setAttributes({ range: value }) }
								options={ [
									{ label: __("Short", "vk-blocks"), value: "short" },
									{ label: __("Normal", "vk-blocks"), value: "normal" },
									{ label: __("Long", "vk-blocks"), value: "long" },
								] }
							/>
						</PanelBody>
					</InspectorControls>
					<div className={ classNames(className, `vk_animation vk_animation-${effect} vk_animation-speed-${speed} vk_animation-range-${range} vk_animation-${customClientId}`) }>
						<InnerBlocks
							templateInsertUpdatesSelection={ false }
						/>
					</div>
				</Fragment>
			);
	},

	save(props) {
		let {effect, speed, range, clientId} = props.attributes;

		//For recovering block.
		effect = effect ? effect : "slide-up"
		speed = speed ? speed : "fast"
		range = range ? range : "short"

		return (
			<div className={ classNames(`vk_animation vk_animation-${effect} vk_animation-speed-${speed} vk_animation-range-${range} vk_animation-${clientId}`) }>
				<InnerBlocks.Content />
			</div>
		);
	},
    deprecated,
});


/**
 * 	表示領域に入ったら、アニメーションエフェクトを適用させるフィルター。
 *  0.49.8で、jSをfooterに出力するよう構造変更。
 *
 * @param {*} el
 * @param {*} type
 * @param {*} attributes
 */
const addAnimationActiveClass = (el, type, attributes) => {
	const post = select( 'core/editor' ).getCurrentPost();

	console.log(post);

	//0.49.8未満（_vkb_saved_block_version が ""）のみフィルターを使う。
	if ( "vk-blocks/animation" === type.name && post.hasOwnProperty('meta') && !post.meta._vkb_saved_block_version) {
		return<div>
				<script>{ `window.addEventListener('load', (event) => {
				let animationElm = document.querySelector('.vk_animation-${attributes.clientId}');
				if(animationElm){
					const observer = new IntersectionObserver((entries) => {
						if(entries[0].isIntersecting){
							animationElm.classList.add('vk_animation-active');
						}else{
							animationElm.classList.remove('vk_animation-active');
						}
					});
					observer.observe(animationElm);
				}
			}, false);` }</script>
				{ el }
			</div>
	} else if ( post.hasOwnProperty('content') && post.content.match(/<script>.*<\/script>/)) {
		console.log("script tag is existed!");
	} else {
		return el
	}
}

addFilter(
  "blocks.getSaveElement",
  "vk-blocks/animation",
  addAnimationActiveClass
);
