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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 498 498">
    <path
      className="st0"
      d="M456.1,1320.7H118.4v36.6H533V945.2h-35.5v334C497.6,1302.1,479,1320.7,456.1,1320.7z"
    />
    <path
      d="M456.1,496.1c22.9,0,41.5-18.6,41.5-41.5l-0.1-412.1C497.5,19.6,478.9,1,456,1H41.5C18.6,1.1,0,19.6,0,42.5v412.1
    c0,22.9,18.6,41.5,41.5,41.5L456.1,496.1z M41.5,42.5h414.7v412.1H41.5V42.5z"
    />
    <g>
      <path d="M188.6,130.8c16.6,0,30.1-13.5,30.1-30.1s-13.5-30.1-30.1-30.1s-30.1,13.5-30.1,30.1S171.9,130.8,188.6,130.8z" />
      <path
        d="M114.5,247.1h70.7h46.3h151.6c13.4,0,20.7-17.3,12-28.5l-82-105.6c-6.3-8.1-17.6-8.1-23.9,0l-65.8,84.8
      c-6.6,8.5-18.8,8-24.8-1.2l-28.2-43.3c-6.3-9.6-19.3-9.6-25.6,0l-43.2,66.4C94.3,231.2,101.7,247.1,114.5,247.1z"
      />
    </g>
    <path
      d="M381,422.4H116.6c-9.8,0-17.8-8-17.8-17.8v-30.4c0-9.8,8-17.8,17.8-17.8H381c9.8,0,17.8,8,17.8,17.8v30.4
    C398.8,414.4,390.9,422.4,381,422.4z"
    />
    <rect x="98.8" y="273.1" width="300.3" height="20" />
    <rect x="98.8" y="309.7" width="160.4" height="20" />
  </svg>
);

registerBlockType("vk-blocks/pr-card-item", {
  title: __("Icon Card Item", "vk-blocks"),
  icon: BlockIcon,
  category: "vk-blocks-cat",
  attributes: schema,
  parent: ["vk-blocks/pr-card"],
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
