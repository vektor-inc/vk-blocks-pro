/**
 * Title group block type
 *
 */
import Body from "./Body";
import { schema } from './schema';
import { FontAwesome } from "./../_helper/font-awesome";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl,SelectControl } = wp.components;
const { Fragment } = wp.element;
import { vkbBlockEditor } from "./../_helper/depModules";
const { InspectorControls } = vkbBlockEditor;

registerBlockType('vk-blocks/border-box', {
	title: __('Border Box', 'vk-blocks'),
	icon: 'arrow-down',
	category: 'vk-blocks-cat',
	attributes: schema,
	styles: [		{
			name: 'vk_borderBox-style-solid-kado-tit-tab',
			label: __( 'solid-kado-tit-tab' ),
			isDefault: true
		},
		{
			name: 'vk_borderBox-style-solid-round-tit-tab',
			label: __( 'solid-round-tit-tab' )
		},
		{
			name: 'vk_borderBox-style-solid-kado-tit-inner',
			label: __( 'solid-kado-tit-inner' )
		},
		{
			name: 'vk_borderBox-style-solid-kado-tit-onborder',
			label: __( 'vk_borderBox-style-solid-kado-tit-onborder' )
		},
		{
			name: 'vk_borderBox-style-iconFeature',
			label: __( 'vk_borderBox-style-iconFeature' )
		},
		{
			name: 'vk_borderBox-style-solid-kado-tit-banner',
			label: __( 'vk_borderBox-style-solid-kado-tit-banner' )
		},
	],

	edit(props) {
		const { attributes, setAttributes } = props;
		const { color } = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('Icon', 'vk-blocks')}>
						<BaseControl
							id="dot-fa"
							help={__('If FontAwesome class entered, it will overrides the number.', 'vk-blocks')}
						>
							<FontAwesome
								attributes={attributes}
								setAttributes={setAttributes}
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody title={__('Color', 'vk-blocks')}>
						<SelectControl
							value={color}
							onChange={value => setAttributes({ color: value })}
							options={[
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
							]}
						/>
					</PanelBody>
				</InspectorControls>
				<Body for_={'edit'} {...props} />
			</Fragment>
		);
	},

	save(props) {
		return <Body for_={'save'}{...props} />;
	},
});
