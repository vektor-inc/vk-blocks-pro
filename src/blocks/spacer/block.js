/**
 * spacer block type
 */
import React from "react";
import { schema,example } from './schema';
import { SpacerComponent } from "./component";
import { deprecated } from "./deprecated/deprecated";
import AdvancedSpacerControl from "./advanced-spacer-control"
import AdvancedViewportControl from "../../components/advanced-viewport-control"
import AdvancedUnitControl from "../../components/advanced-unit-control"
import { ReactComponent as Icon } from './icon.svg';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;

registerBlockType('vk-blocks/spacer', {
	title: __('Responsive Spacer', 'vk-blocks'),
	icon: <Icon />,
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
