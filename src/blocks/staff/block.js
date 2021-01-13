/**
 * staff block type
 *
 */
import { NewComponent } from "./component";
import { schema, example } from './schema';
import { vkbBlockEditor } from "./../../utils/depModules";
import { ReactComponent as Icon } from './icon.svg';


const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { TextControl, PanelBody, BaseControl, SelectControl } = wp.components;
const { InspectorControls, ColorPalette } = vkbBlockEditor;

registerBlockType('vk-blocks/staff', {
    title: __('Staff', 'vk-blocks'),
    icon: <Icon/>,
    category: 'vk-blocks-cat',
	attributes: schema,
	example,

    edit({ attributes, setAttributes, className }) {
        const {
            vk_staff_photo_image_alt,
            vk_staff_layout,
            vk_staff_nameColor,
            vk_staff_captionColor,
            vk_staff_positionColor,
            vk_staff_profileTitleColor,
            vk_staff_profileTextColor,
            vk_staff_photoBorder
		} = attributes;

        return (
	<>
		<InspectorControls>
			<PanelBody title={ __('Layout', 'vk-blocks') }>
				<SelectControl
					value={ vk_staff_layout }
					onChange={ (value) => setAttributes({ vk_staff_layout: value }) }
					options={ [
                                {
                                    value: 'default',
                                    label: __('Default', 'vk-blocks'),
                                },
                                {
                                    value: 'imageLeft',
                                    label: __('Image left', 'vk-blocks'),
                                },
                            ] }
                        />
			</PanelBody>
			<PanelBody title={ __('Image border', 'vk-blocks') }>
				<SelectControl
					value={ vk_staff_photoBorder }
					onChange={ (value) => setAttributes({ vk_staff_photoBorder: value }) }
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
			</PanelBody>
			<PanelBody title={ __('Alt text', 'vk-blocks') }>
				<BaseControl
					help={ __('Set the alt text for profile image', 'vk-blocks') }
                        >
					<TextControl
						value={ vk_staff_photo_image_alt }
						onChange={ (value) => setAttributes({ vk_staff_photo_image_alt: value }) }
                            />
				</BaseControl>
			</PanelBody>
			<PanelBody title={ __('Color', 'vk-blocks') }>
				<BaseControl
					label={ __('Staff name', 'vk-blocks') }
                        >
					<ColorPalette
						value={ vk_staff_nameColor }
						onChange={ (value) => setAttributes({ vk_staff_nameColor: value }) }
                            />
				</BaseControl>
				<BaseControl
					label={ __('Name caption', 'vk-blocks') }
                        >
					<ColorPalette
						value={ vk_staff_captionColor }
						onChange={ (value) => setAttributes({ vk_staff_captionColor: value }) }
                            />
				</BaseControl>
				<BaseControl
					label={ __('Role position', 'vk-blocks') }
                        >
					<ColorPalette
						value={ vk_staff_positionColor }
						onChange={ (value) => setAttributes({ vk_staff_positionColor: value }) }
                            />
				</BaseControl>
				<BaseControl
					label={ __('Profile title', 'vk-blocks') }
                        >
					<ColorPalette
						value={ vk_staff_profileTitleColor }
						onChange={ (value) => setAttributes({ vk_staff_profileTitleColor: value }) }
                            />
				</BaseControl>
				<BaseControl
					label={ __('Profile text', 'vk-blocks') }
                        >
					<ColorPalette
						value={ vk_staff_profileTextColor }
						onChange={ (value) => setAttributes({ vk_staff_profileTextColor: value }) }
                            />
				</BaseControl>
			</PanelBody>
		</InspectorControls>
		<NewComponent
			attributes={ attributes }
			setAttributes={ setAttributes }
			className={ className }
			for_={ 'edit' }
                />
	</>
        );
    },

    save({ attributes }) {
        return (
	<NewComponent
		attributes={ attributes }
		setAttributes={ '' }
		className={ '' }
		for_={ 'save' }
            />
        );
    }
});
