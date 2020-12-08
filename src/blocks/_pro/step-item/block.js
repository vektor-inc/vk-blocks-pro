/**
 * step-item block type
 *
 */
import { StepItem } from "./component";
import { schema } from './schema';
import { FontAwesome } from "../../../utils/font-awesome-new";
import { ReactComponent as Icon } from './icon.svg';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl, SelectControl, TextControl } = wp.components;
const { Fragment } = wp.element;
const { InspectorControls, ColorPalette } = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
import { deprecated } from './deprecated';


registerBlockType('vk-blocks/step-item', {
	title: __('Step Item', 'vk-blocks'),
	icon: BlockIcon,
	category: 'vk-blocks-cat',
	attributes: schema,
	parent: ['vk-blocks/step'],

	edit(props) {
		const { attributes, setAttributes, className, clientId } = props
		let {
			color,
			style,
			styleLine,
			dotCaption,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __('Step Mark', 'vk-blocks') }>
						<BaseControl
							id="dot-fa"
							label={ __('Icon ( Font Awesome )', 'vk-blocks') }
							help={ __('If Font Awesome tags entered, it will overrides the number.', 'vk-blocks') }
						>
							<FontAwesome
								attributeName={ "faIcon" }
								{ ...props }
							/>
						</BaseControl>

						<BaseControl
							id="dot-caption"
							label="Caption"
						>
							<TextControl
								value={ dotCaption }
								onChange={ (value) => setAttributes({ dotCaption: value }) }
								placeholder={ __('Ex,6:00AM', 'vk-blocks') }
							/>
						</BaseControl>

					</PanelBody>
					<PanelBody title={ __('Color', 'vk-blocks') }>
						<ColorPalette
							value={ color }
							onChange={ (value) => setAttributes({ color: value }) }
						/>
					</PanelBody>
					<PanelBody title={ __('Style', 'vk-blocks') }>
						<BaseControl
							id="style-dot"
							label="Dot Style"
						>
							<SelectControl
								value={ style }
								onChange={ (value) => setAttributes({ style: value }) }
								options={ [
									{
										value: 'solid',
										label: __('Solid', 'vk-blocks'),
									},
									{
										value: 'outlined',
										label: __('Outlined', 'vk-blocks'),
									},
								] }
							/>
						</BaseControl>
						<BaseControl
							id="style-line"
							label="Line Style"
						>
							<SelectControl
								value={ styleLine }
								onChange={ (value) => setAttributes({ styleLine: value }) }
								options={ [
									{
										value: 'default',
										label: __('Default', 'vk-blocks'),
									},
									{
										value: 'none',
										label: __('None', 'vk-blocks'),
									},
								] }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<StepItem
					attributes={ attributes }
					className={ className }
					for_={ "edit" }
				/>
			</Fragment>
		);
	},

	save(props) {
		const { attributes, className } = props
		return <StepItem attributes={ attributes } className={ className } for_={ "save" } />;
	},

	deprecated,
});
