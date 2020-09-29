/**
 * staff block type
 *
 */
import { NewComponent } from "./component";
import { schema, example } from './schema';
import { vkbBlockEditor } from "./../_helper/depModules";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { TextControl, PanelBody, BaseControl, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { InspectorControls, ColorPalette } = vkbBlockEditor;
const BlockIcon = (
	<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4.5H2a.5.5 0 00-.5.5v8.278H.108A1.91 1.91 0 000 13.28V5a2 2 0 012-2h20a2 2 0 012 2v13a2 2 0 01-2 2H10.036l-.438-1.41.086-.09H22a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5zM8.093 11.9H12v1.2H8.624a1.697 1.697 0 00-.53-1.2zm-4.112 0c-.208.18-.372.415-.468.69l-.181.51H3v-1.2h.981zM12 10.6H3V9.4h9v1.2zM3 8h2V6H3v2zm6 0H7V6h2v2zm2 0h2V6h-2v2zm6.5 4a2 2 0 10-1.998-2.002c0 1.101.897 2.002 1.998 2.002zm3.5 3.4c0 .332-.315.6-.7.6h-5.6c-.385 0-.7-.272-.7-.6v-.601c0-.99.94-1.798 2.099-1.798.14 0 .258.039.4.086a2.8 2.8 0 001.001.164c.499 0 .785-.093 1.01-.165.143-.047.26-.085.391-.085C20.06 13 21 13.805 21 14.799v.6z" fill="#000" />
		<path d="M10.89 14.778l-3.267.008a.11.11 0 00-.102.075l-.25.722c-.022.076.03.152.103.152h1.27c.095 0 .146.122.08.19L6.7 18.105h.007l1.042 3.397c.022.076-.03.145-.103.145h-1.02a.104.104 0 01-.102-.076L6 19.83c-.029-.107-.168-.107-.205-.008l-.426 1.223a.109.109 0 000 .069l.39 1.481c.014.046.058.084.102.084H9.15c.073 0 .125-.076.103-.145l-1.329-4.277c-.014-.038 0-.084.03-.114l3.016-3.176c.066-.069.015-.19-.08-.19z" fill="#000" />
		<path d="M7.022 13l-1.99.008a.11.11 0 00-.102.076l-.257.721c-.03.076.03.152.103.152h.836c.074 0 .125.076.103.152l-2.37 6.717a.108.108 0 01-.206 0l-1.703-4.848a.112.112 0 01.103-.152h.859a.11.11 0 01.103.076l.616 1.748a.108.108 0 00.206 0l.954-2.72a.112.112 0 00-.103-.152H.108c-.073 0-.125.076-.103.152l3.127 8.996a.108.108 0 00.205 0l3.787-10.774c.022-.076-.029-.152-.102-.152z" fill="#D8141C" />
	</svg>
);

registerBlockType('vk-blocks/staff', {
	title: __('Staff', 'vk-blocks'),
	icon: BlockIcon,
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
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('Layout', 'vk-blocks')}>
						<SelectControl
							value={vk_staff_layout}
							onChange={(value) => setAttributes({ vk_staff_layout: value })}
							options={[
								{
									value: 'default',
									label: __('Default', 'vk-blocks'),
								},
								{
									value: 'imageLeft',
									label: __('Image left', 'vk-blocks'),
								},
							]}
						/>
					</PanelBody>
					<PanelBody title={__('Image border', 'vk-blocks')}>
						<SelectControl
							value={vk_staff_photoBorder}
							onChange={(value) => setAttributes({ vk_staff_photoBorder: value })}
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
					</PanelBody>
					<PanelBody title={__('Alt text', 'vk-blocks')}>
						<BaseControl
							help={__('Set the alt text for profile image', 'vk-blocks')}
						>
							<TextControl
								value={vk_staff_photo_image_alt}
								onChange={(value) => setAttributes({ vk_staff_photo_image_alt: value })}
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody title={__('Color', 'vk-blocks')}>
						<BaseControl
							label={__('Staff name', 'vk-blocks')}
						>
							<ColorPalette
								value={vk_staff_nameColor}
								onChange={(value) => setAttributes({ vk_staff_nameColor: value })}
							/>
						</BaseControl>
						<BaseControl
							label={__('Name caption', 'vk-blocks')}
						>
							<ColorPalette
								value={vk_staff_captionColor}
								onChange={(value) => setAttributes({ vk_staff_captionColor: value })}
							/>
						</BaseControl>
						<BaseControl
							label={__('Role position', 'vk-blocks')}
						>
							<ColorPalette
								value={vk_staff_positionColor}
								onChange={(value) => setAttributes({ vk_staff_positionColor: value })}
							/>
						</BaseControl>
						<BaseControl
							label={__('Profile title', 'vk-blocks')}
						>
							<ColorPalette
								value={vk_staff_profileTitleColor}
								onChange={(value) => setAttributes({ vk_staff_profileTitleColor: value })}
							/>
						</BaseControl>
						<BaseControl
							label={__('Profile text', 'vk-blocks')}
						>
							<ColorPalette
								value={vk_staff_profileTextColor}
								onChange={(value) => setAttributes({ vk_staff_profileTextColor: value })}
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<NewComponent
					attributes={attributes}
					setAttributes={setAttributes}
					className={className}
					for_={'edit'}
				/>
			</Fragment>
		);
	},

	save({ attributes }) {
		return (
			<NewComponent
				attributes={attributes}
				setAttributes={''}
				className={''}
				for_={'save'}
			/>
		);
	}
});
