/**
 * Title group block type
 *
 */
import Body from "./Body";
import { schema, example } from './schema';
import { FontAwesome } from "./font-awesome-new";
import { deprecated }  from "./deprecated"
import BlockIcon from "./icon.svg";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl,SelectControl } = wp.components;
const { Fragment } = wp.element;
import { vkbBlockEditor } from "./../../utils/depModules";
const { InspectorControls } = vkbBlockEditor;


registerBlockType('vk-blocks/border-box', {
	title: __('Border Box', 'vk-blocks'),
    icon: <BlockIcon />,
	category: 'vk-blocks-cat',
	attributes: schema,
	supports:{
		className:true
	},
	example,

	styles: [
		{
			name: 'vk_borderBox-style-solid-kado-tit-tab',
			label: __( 'Solid Angle Tab', 'vk-blocks' ),
			isDefault:true
		},
		{
			name: 'vk_borderBox-style-solid-round-tit-tab',
			label: __( 'Solid Round Tab', 'vk-blocks' )
		},
		{
			name: 'vk_borderBox-style-solid-kado-tit-banner',
			label: __( 'Solid Angle Banner', 'vk-blocks' ),
		},
		{
			name: 'vk_borderBox-style-solid-kado-tit-onborder',
			label: __( 'Solid Angle Onborder', 'vk-blocks' ),
		},
		{
			name: 'vk_borderBox-style-solid-kado-tit-inner',
			label: __( 'Solid Angle Inner', 'vk-blocks' ),
		},
		{
			name: 'vk_borderBox-style-solid-kado-iconFeature',
			label: __( 'Solid Angle iconFeature', 'vk-blocks' ),
		},
	],

	edit(props) {
		const { attributes, setAttributes } = props;
		const { color, bgColor } = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __('Color', 'vk-blocks') }>
						<BaseControl
							id="border-color"
							label={ __('Border Color', 'vk-blocks') }
						>
							<SelectControl
								value={ color }
								onChange={ value => setAttributes({ color: value }) }
								options={ [
									{
										value: "red",
										label: __("Red", "vk-blocks")
									},
									{
										value: "orange",
										label: __("Orange", "vk-blocks")
									},
									{
										value: "blue",
										label: __("Blue", "vk-blocks")
									},
									{
										value: "green",
										label: __("Green", "vk-blocks")
									},
									{
										value: "black",
										label: __("Black", "vk-blocks")
									}
								] }
							/>
						</BaseControl>
						<BaseControl
							id="background-color"
							label={ __('Background Color', 'vk-blocks') }
						>
							<SelectControl
								value={ bgColor }
								onChange={ value => setAttributes({ bgColor: value }) }
								options={ [
									{
										value: "transparent",
										label: __("Transparent", "vk-blocks")
									},
									{
										value: "white",
										label: __("White", "vk-blocks")
									},
								] }
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody title={ __('Icon', 'vk-blocks') }>
						<BaseControl
							id="dot-fa"
							label={ __('Icon ( Font Awesome )', 'vk-blocks') }
						>
							<FontAwesome
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<Body for_={ 'edit' } { ...props } />
			</Fragment>
		);
	},

	save(props) {
		return <Body for_={ 'save' }{ ...props } />;
	},
	deprecated
});
