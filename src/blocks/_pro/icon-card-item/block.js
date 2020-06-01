/**
 * pr-card-item block type
 *
 */
import { PRcarditem } from "./component";
import { schema } from "./schema";
import { AdvancedMediaUpload } from "../../../components/advanced-media-upload";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl, TextControl, CheckboxControl, RadioControl, Button} = wp.components;
const { InspectorControls, MediaUpload, ColorPalette  } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { Fragment } = wp.element;
const BlockIcon = (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
	<circle cx="287.6" cy="158.9" r="83.8"/>
	<rect x="183.5" y="288.2" width="208.2" height="149.5"/>
</svg>
);

registerBlockType("vk-blocks/icon-card-item", {
  title: __("Icon Card Item", "vk-blocks"),
  icon: BlockIcon,
  category: "vk-blocks-cat",
  attributes: schema,
  parent: ["vk-blocks/icon-card"],
  supports: {
    className: true,
  },

  edit(props) {
    const { setAttributes, attributes } = props;
		const { url , urlOpenType, color, icon, bgType} = attributes;

    return (
      <Fragment>
        <InspectorControls>
				<PanelBody title={__('PR Block Setting', 'vk-blocks')}>
						<BaseControl
							label={__('Link URL:', 'vk-blocks')}
						>
							<TextControl
								value={url}
								onChange={(value) => setAttributes({ url: value })}
							/>
							<CheckboxControl
								label={__('Open link new tab.', 'vk-blocks')}
								checked={urlOpenType}
								onChange={(checked) => setAttributes({ urlOpenType: checked })}
							/>
						</BaseControl>
						<BaseControl
							label={__('Icon', 'vk-blocks')}
						>
							<TextControl
								label={__('Class name of the Font Awesome icon font you want to use:', 'vk-blocks')}
								value={icon}
								onChange={(value) => setAttributes({ icon: value })}
								placeholder={'fas fa-file'}
								help={<a href={`https://fontawesome.com/icons?d=gallery&m=free`}
									target={`_blank`}>{__('Font Awesome icon list', 'vk-blocks')}</a>}
							/>
							<ColorPalette
								value={color}
								onChange={(value) => {
									if (value) {
										setAttributes({ color: value })
									} else {
										setAttributes({ color: '#0693e3' })
										setAttributes({ bgType: '0' })
									}
								}}
							/>
							<RadioControl
								label={__('Icon Background:', 'vk-blocks')}
								selected={bgType}
								options={[
									{ label: __('Solid color', 'vk-blocks'), value: '0' },
									{ label: __('No background', 'vk-blocks'), value: '1' },
								]}
								onChange={(value) => setAttributes({ bgType: value })}
							/>
						</BaseControl>
					</PanelBody>
        </InspectorControls>
        <PRcarditem {...props} for_={"edit"} />
      </Fragment>
    );
  },

  save(props) {
    return <PRcarditem {...props} for_={"save"} />;
  },
});
