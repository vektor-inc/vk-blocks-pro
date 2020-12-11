// WordPress  dependencies
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	PanelBody,
	BaseControl,
	SelectControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { InspectorControls, ColorPalette } from '@wordpress/block-editor';

// Internal  dependencies
import { NewComponent } from './component';

export default function StaffEdit({ attributes, setAttributes, className }) {
	const instanceId = useInstanceId(StaffEdit);
	const id = `vkblocks-staff-${instanceId}`;
	const {
		vkStaffPhotoImageAlt,
		vkStaffLayout,
		vkStaffNameColor,
		vkStaffCaptionColor,
		vkStaffPositionColor,
		vkStaffProfileTitleColor,
		vkStaffProfileTextColor,
		vkStaffPhotoBorder,
	} = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Layout', 'vk-blocks')}>
					<SelectControl
						value={vkStaffLayout}
						onChange={(value) =>
							setAttributes({ vkStaffLayout: value })
						}
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
						value={vkStaffPhotoBorder}
						onChange={(value) =>
							setAttributes({ vkStaffPhotoBorder: value })
						}
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
						help={__(
							'Set the alt text for profile image',
							'vk-blocks'
						)}
					>
						<TextControl
							value={vkStaffPhotoImageAlt}
							onChange={(value) =>
								setAttributes({
									vkStaffPhotoImageAlt: value,
								})
							}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Color', 'vk-blocks')}>
					<BaseControl id={id} label={__('Staff name', 'vk-blocks')}>
						<ColorPalette
							id={id}
							value={vkStaffNameColor}
							onChange={(value) =>
								setAttributes({ vkStaffNameColor: value })
							}
						/>
					</BaseControl>
					<BaseControl
						id={id}
						label={__('Name caption', 'vk-blocks')}
					>
						<ColorPalette
							id={id}
							value={vkStaffCaptionColor}
							onChange={(value) =>
								setAttributes({ vkStaffCaptionColor: value })
							}
						/>
					</BaseControl>
					<BaseControl
						id={id}
						label={__('Role position', 'vk-blocks')}
					>
						<ColorPalette
							id={id}
							value={vkStaffPositionColor}
							onChange={(value) =>
								setAttributes({ vkStaffPositionColor: value })
							}
						/>
					</BaseControl>
					<BaseControl
						id={id}
						label={__('Profile title', 'vk-blocks')}
					>
						<ColorPalette
							id={id}
							value={vkStaffProfileTitleColor}
							onChange={(value) =>
								setAttributes({
									vkStaffProfileTitleColor: value,
								})
							}
						/>
					</BaseControl>
					<BaseControl
						id={id}
						label={__('Profile text', 'vk-blocks')}
					>
						<ColorPalette
							id={id}
							value={vkStaffProfileTextColor}
							onChange={(value) =>
								setAttributes({
									vkStaffProfileTextColor: value,
								})
							}
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
}
