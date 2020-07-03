/**
 * card-item block type
 *
 */
import classNames from "classnames";
import { schema } from "./schema";
import {vkbBlockEditor} from "../../_helper/depModules"
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = vkbBlockEditor;
const { PanelBody, SelectControl } = wp.components;
const { Fragment,useRef } = wp.element;

const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 576">
		<g>
			<path d="M497.1,75.8H80.9c-25.4,0-46,20.6-46,46v91.1l46-46v-45.1h416.2v332.4H80.9v-45.1l-46-46v91c0,25.4,20.6,46,46,46h416.2
		c25.4,0,46-20.6,46-46V121.8C543.1,96.5,522.5,75.8,497.1,75.8z" />
			<path d="M201.5,259.9H119l35.6-35.6c6.2-6.2,6.2-16.2,0-22.4l-14.9-15c-6.2-6.2-16.2-6.2-22.4,0l-89.7,89.7
		c-6.3,6.2-6.3,16.2-0.1,22.4l89.7,89.7c6.2,6.2,16.2,6.2,22.4,0l14.9-14.9c6.2-6.2,6.2-16.2,0-22.4L118.9,316h82.6
		c6.6,0,12-5.4,12-12v-32C213.5,265.4,208.1,259.9,201.5,259.9z" />
			<path d="M292.5,316h-32c-6.6,0-12-5.4-12-12v-32c0-6.6,5.4-12,12-12h32c6.6,0,12,5.4,12,12v32C304.5,310.5,299.1,316,292.5,316z" />
			<path d="M379.3,316h-32c-6.6,0-12-5.4-12-12v-32c0-6.6,5.4-12,12-12h32c6.6,0,12,5.4,12,12v32C391.3,310.5,385.9,316,379.3,316z" />
		</g>
	</svg>
);

registerBlockType("vk-blocks/animation", {
	title: __("Animation", "vk-blocks"),
	icon: BlockIcon,
	category: "vk-blocks-cat",
	attributes: schema,
	supports: {
		className: true,
	},

	edit(props) {
		const { className, attributes, setAttributes, clientId } = props;
		const {effect, speed, range} = attributes;
		const customClientId = clientId.replace(/-/g, '');
		setAttributes({clientId:customClientId})

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __("Animation Settings", "vk-blocks") }>
						<label>{__("Effect Setting", "vk-blocks")}</label>
						<SelectControl
							value={ effect }
							onChange={ value => setAttributes({ effect: value }) }
							options={ [
								{ label: __("Fade In", "vk-blocks"), value: "fade-in" },
								{ label: __("Slide Up", "vk-blocks"), value: "slide-up" },
								{ label: __("Slide Left", "vk-blocks"), value: "slide-left" },
								{ label: __("Slide Right", "vk-blocks"), value: "slide-right" },
							] }
						/>

						<label>{__("Effect Speed", "vk-blocks")}</label>
						<SelectControl
							value={ speed }
							onChange={ value => setAttributes({ effect: value }) }
							options={ [
								{ label: __("Very Slow", "vk-blocks"), value: "very-slow" },
								{ label: __("Slow", "vk-blocks"), value: "Slow" },
								{ label: __("Normal", "vk-blocks"), value: "normal" },
								{ label: __("Fast", "vk-blocks"), value: "fast" },
								{ label: __("Very Fast", "vk-blocks"), value: "very-fast" },
							] }
						/>
						<label>{__("Effect Range", "vk-blocks")}</label>
						<SelectControl
							value={ range }
							onChange={ value => setAttributes({ effect: value }) }
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
		return (
			<div className={ classNames(`vk_animation vk_animation-${props.attributes.effect} vk_animation-${props.attributes.clientId}`) }>
				<InnerBlocks.Content />
			</div>
		);
	},
});
