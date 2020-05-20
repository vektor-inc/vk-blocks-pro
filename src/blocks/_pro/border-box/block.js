/**
 * Title group block type
 *
 */
import Body from "./Body";
import { schema } from './schema';
import { FontAwesome } from "../../_helper/font-awesome";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl } = wp.components;
const { Fragment } = wp.element;
import { vkbBlockEditor } from "../../_helper/depModules";
const { InspectorControls, ColorPalette } = vkbBlockEditor;

registerBlockType('vk-blocks/border-box', {
	title: __('Border Box', 'vk-blocks'),
	icon: 'arrow-down',
	category: 'vk-blocks-cat',
	attributes: schema,

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
						<ColorPalette
							value={color}
							onChange={(value) => setAttributes({ color: value })}
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
