/**
 * Slider Item block
 *
 */
import { schema } from "./schema";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { PanelBody, BaseControl } = wp.components;
const { InspectorControls, InnerBlocks, BlockControls, BlockVerticalAlignmentToolbar} = wp.blockEditor;

const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 576">
		<path d="M456.1,1320.7H118.4v36.6H533V945.2h-35.5v334C497.6,1302.1,479,1320.7,456.1,1320.7z" />
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

registerBlockType("vk-blocks/slider-item", {
	title: __("Slider Item", "vk-blocks"),
	icon: BlockIcon,
	category: "vk-blocks-cat",
	attributes: schema,
	parent: ["vk-blocks/slider"],
	supports: {
		className: true,
	},

	edit(props) {
		const { className, attributes, setAttributes } = props;
		const { verticalAlignment } = attributes;
		return (
			<Fragment>
				<BlockControls>
					<BlockVerticalAlignmentToolbar
						onChange={  ( alignment ) => setAttributes( { verticalAlignment: alignment } ) }
						value={ verticalAlignment }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __('Align', 'vk-blocks') }>
						<BaseControl label={ __('Vertical', 'vk-blocks') }>
							<BlockVerticalAlignmentToolbar
								onChange={  ( alignment ) => setAttributes( { verticalAlignment: alignment } ) }
								value={ verticalAlignment }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<div className={ `${className} vk_align-${verticalAlignment}` }>
					<InnerBlocks />
				</div>
			</Fragment>
		);
	},

	save(props) {
		return (
			<div className={ `vk_slider_item swiper-slide vk_align-${props.attributes.verticalAlignment}` }>
				<InnerBlocks.Content />
			</div>
		);
	},
});
