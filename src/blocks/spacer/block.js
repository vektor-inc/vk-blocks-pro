/**
 * spacer block type
 */
import React from "react";
import { schema,example } from './schema';
import { SpacerComponent } from "./component";
import { deprecated } from "./deprecated/deprecated";
import AdvancedSpacerControl from "../../components/advanced-spacer-control"
import AdvancedViewportControl from "../../components/advanced-viewport-control"
import AdvancedUnitControl from "../../components/advanced-unit-control"

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="576" height="512" viewBox="0 0 576 512">
		<g>
			<rect x="108.8" y="18.7" width="358.5" height="40" />
			<rect x="108.8" y="453.3" width="358.5" height="40" />
			<polygon points="171.4,253.2 131.4,253.2 131.4,412.6 290.8,412.6 290.8,372.6 199.7,372.6 404.6,167.7 404.6,258.8 444.6,258.8
			444.6,99.4 285.2,99.4 285.2,139.4 376.3,139.4 171.4,344.3 	" />
		</g>
	</svg>
);

registerBlockType('vk-blocks/spacer', {
	title: __('Responsive Spacer', 'vk-blocks'),
	icon: BlockIcon,
	category: 'vk-blocks-cat-layout',
	attributes: schema,
	supports: {
		className: false,
		anchor: true,
	},
	example,

	edit(props) {
		const { attributes, className } = props;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<AdvancedSpacerControl { ...props } />
						<AdvancedUnitControl { ...props } />
						<BaseControl label={ __('Height for each device.', 'vk-blocks') }>
							<AdvancedViewportControl { ...props } initial={ { iPc:40, iTablet:30, iMobile:20 } } />
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<SpacerComponent
					attributes={ attributes }
					className={ className }
				/>
			</Fragment>
		);
	},

	save({ attributes }) {
		return (
			<SpacerComponent attributes={ attributes } />
		);
	},
	deprecated
});
