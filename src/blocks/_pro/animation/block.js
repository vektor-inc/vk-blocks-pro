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
		<path d="M147.9,189.1v193.2c0,24.8,20.6,44.7,44.7,44.7h189.9c24.8,0,44.7-20.6,44.7-44.7V189.1c0-24.8-20.6-44.7-44.7-44.7H192.7
	C168.2,144.4,147.9,165,147.9,189.1z" />
	</svg>
);

registerBlockType("vk-blocks/animation", {
	title: __("Animation Block", "vk-blocks"),
	icon: BlockIcon,
	category: "vk-blocks-cat",
	attributes: schema,
	supports: {
		className: true,
	},

	edit(props) {
		const { className, attributes, setAttributes, clientId } = props;
		const {effect} = attributes;
		const customClientId = clientId.replace(/-/g, '');
		setAttributes({clientId:customClientId})

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __("Animation Settings", "vk-blocks") }>
						<SelectControl
							value={ effect }
							onChange={ value => setAttributes({ effect: value }) }
							options={ [
								{ label: __("Fade In", "vk-blocks"), value: "fade-in" },
								{ label: __("Fade Up", "vk-blocks"), value: "fade-up" },
								{ label: __("Slide Left", "vk-blocks"), value: "slide-left" },
								{ label: __("Slide Right", "vk-blocks"), value: "slide-right" },
							] }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classNames(className, `vk_animation vk_animation-${effect} vk_animation-${customClientId}`)}>
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
