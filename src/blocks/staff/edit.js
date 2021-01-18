/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	PanelBody,
	BaseControl,
	SelectControl,
} from '@wordpress/components';
import {
	InspectorControls,
	ColorPalette,
	useBlockProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { StaffCardEdit } from './staffCard';

export default function StaffEdit({
	attributes,
	setAttributes,
	className,
	clientId,
}) {
	// id生成
	const vkStaffNameColorId = `vk_staff_name-color-${clientId}`;
	const vkStaffCaptionColorId = `vk_staff_caption-color-${clientId}`;
	const vkStaffPositionColorId = `vk_staff_position-color-${clientId}`;
	const vkStaffProfileTitleColorId = `vk_staff_profileTitle-color-${clientId}`;
	const vkStaffProfileTextColorId = `vk_staff_profileText-color-${clientId}`;
	const {
		vk_staff_layout, // eslint-disable-line camelcase
		vk_staff_nameColor, // eslint-disable-line camelcase
		vk_staff_captionColor, // eslint-disable-line camelcase
		vk_staff_positionColor, // eslint-disable-line camelcase
		vk_staff_profileTitleColor, // eslint-disable-line camelcase
		vk_staff_profileTextColor, // eslint-disable-line camelcase
		vk_staff_photo_image_alt, // eslint-disable-line camelcase
		vk_staff_photoBorder, // eslint-disable-line camelcase
	} = attributes;

	const classes = classnames('vk_staff', {
		[className]: !!className,
		[`vk_staff-layout-${vk_staff_layout}`]: !!vk_staff_layout, // eslint-disable-line camelcase
	});

	const blockProps = useBlockProps({
		className: classes,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout', 'vk-blocks')}>
					<SelectControl
						value={vk_staff_layout} // eslint-disable-line camelcase
						onChange={
							(value) => setAttributes({ vk_staff_layout: value }) // eslint-disable-line camelcase
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
						value={vk_staff_photoBorder} // eslint-disable-line camelcase
						onChange={
							(value) =>
								setAttributes({ vk_staff_photoBorder: value }) // eslint-disable-line camelcase
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
							value={vk_staff_photo_image_alt} // eslint-disable-line camelcase
							onChange={(value) =>
								setAttributes({
									vk_staff_photo_image_alt: value, // eslint-disable-line camelcase
								})
							}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Color', 'vk-blocks')}>
					<BaseControl
						id={vkStaffNameColorId}
						label={__('Staff name', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffNameColorId}
							value={vk_staff_nameColor} // eslint-disable-line camelcase
							onChange={
								(value) =>
									setAttributes({ vk_staff_nameColor: value }) // eslint-disable-line camelcase
							}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffCaptionColorId}
						label={__('Name caption', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffCaptionColorId}
							value={vk_staff_captionColor} // eslint-disable-line camelcase
							onChange={(value) =>
								setAttributes({
									vk_staff_captionColor: value, // eslint-disable-line camelcase
								})
							}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffPositionColorId}
						label={__('Role position', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffPositionColorId}
							value={vk_staff_positionColor} // eslint-disable-line camelcase
							onChange={(value) =>
								setAttributes({
									vk_staff_positionColor: value, // eslint-disable-line camelcase
								})
							}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffProfileTitleColorId}
						label={__('Profile title', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffProfileTitleColorId}
							value={vk_staff_profileTitleColor} // eslint-disable-line camelcase
							onChange={(value) =>
								setAttributes({
									vk_staff_profileTitleColor: value, // eslint-disable-line camelcase
								})
							}
						/>
					</BaseControl>
					<BaseControl
						id={vkStaffProfileTextColorId}
						label={__('Profile text', 'vk-blocks')}
					>
						<ColorPalette
							id={vkStaffProfileTextColorId}
							value={vk_staff_profileTextColor} // eslint-disable-line camelcase
							onChange={(value) =>
								setAttributes({
									vk_staff_profileTextColor: value, // eslint-disable-line camelcase
								})
							}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<StaffCardEdit
					attributes={attributes}
					setAttributes={setAttributes}
					className={className}
				/>
			</div>
		</>
	);
}
