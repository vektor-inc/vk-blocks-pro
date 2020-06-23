/**
 * step-item block type
 *
 */
import { StepItem } from "./component";
import { schema } from './schema';
import { FontAwesome } from "../../_helper/font-awesome-new";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { PanelBody, BaseControl, SelectControl, TextControl, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { InspectorControls, ColorPalette } = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
import { deprecated } from './deprecated';

const BlockIcon = 'arrow-down';

registerBlockType('vk-blocks/step-item', {
	title: __('Step Item', 'vk-blocks'), // Block title.
	icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'vk-blocks-cat', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: schema,
	parent: ['vk-blocks/step'],

	edit({ attributes, setAttributes, className }) {
		const {
			color,
			style,
			styleLine,
			dotCaption
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('Step Mark', 'vk-blocks')}>
						<BaseControl
							id="dot-fa"
							help={__('If FontAwesome class entered, it will overrides the number.', 'vk-blocks')}
						>
							<FontAwesome
								attributes={attributes}
								setAttributes={setAttributes}
							/>
						</BaseControl>
						<BaseControl
							id="dot-caption"
							label="Caption"
						>
							<TextControl
								value={dotCaption}
								onChange={(value) => setAttributes({ dotCaption: value })}
								placeholder={__('Ex,6:00AM', 'vk-blocks')}
							/>
						</BaseControl>

					</PanelBody>
					<PanelBody title={__('Color', 'vk-blocks')}>
						<ColorPalette
							value={color}
							onChange={(value) => setAttributes({ color: value })}
						/>
					</PanelBody>
					<PanelBody title={__('Style', 'vk-blocks')}>
						<BaseControl
							id="style-dot"
							label="Dot Style"
						>
							<SelectControl
								value={style}
								onChange={(value) => setAttributes({ style: value })}
								options={[
									{
										value: 'solid',
										label: __('Solid', 'vk-blocks'),
									},
									{
										value: 'outlined',
										label: __('Outlined', 'vk-blocks'),
									},
								]}
							/>
						</BaseControl>
						<BaseControl
							id="style-line"
							label="Line Style"
						>
							<SelectControl
								value={styleLine}
								onChange={(value) => setAttributes({ styleLine: value })}
								options={[
									{
										value: 'default',
										label: __('Default', 'vk-blocks'),
									},
									{
										value: 'none',
										label: __('None', 'vk-blocks'),
									},
								]}
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<StepItem
					attributes={attributes}
					className={className}
					setAttributes={setAttributes}
					for_={"edit"}
				/>
			</Fragment>
		);
	},

	save({ attributes, className }) {
		return <StepItem attributes={attributes} className={className} for_={"save"} />;
	},

	deprecated: deprecated,
});
