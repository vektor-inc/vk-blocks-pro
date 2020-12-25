import { ComponentBlock } from './component';
import { isNotJSON } from '@vkblocks/utils/is-not-json';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';

import { fixBrokenUnicode } from '@vkblocks/utils/depModules';

import { __ } from '@wordpress/i18n'; // Import __() from wp.i18n

import {
	RadioControl,
	PanelBody,
	Button,
	BaseControl,
	CheckboxControl,
	TextControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import {
	InspectorControls,
	MediaUpload,
	ColorPalette,
} from '@wordpress/block-editor';

export default function prBlocksEdit(props) {
	const { attributes, setAttributes, className } = props;
	const {
		url1,
		url2,
		url3,
		urlOpenType1,
		urlOpenType2,
		urlOpenType3,
		color1,
		color2,
		color3,
		bgType1,
		bgType2,
		bgType3,
		insertImage1,
		insertImage2,
		insertImage3,
	} = attributes;

	let containerClass;
	if (className) {
		containerClass = `${className} vk_prBlocks row`;
	} else {
		containerClass = `vk_prBlocks row`;
	}

	const uploadNonAltImage1 = (insertImage) => {
		if (isNotJSON(insertImage)) {
			setAttributes({ insertImage1: insertImage.url });
		} else {
			setAttributes({ insertImage1: JSON.stringify(insertImage) });
		}
	};

	const uploadNonAltImage2 = (insertImage) => {
		if (isNotJSON(insertImage)) {
			setAttributes({ insertImage2: insertImage.url });
		} else {
			setAttributes({ insertImage2: JSON.stringify(insertImage) });
		}
	};

	const uploadNonAltImage3 = (insertImage) => {
		if (isNotJSON(insertImage)) {
			setAttributes({ insertImage3: insertImage.url });
		} else {
			setAttributes({ insertImage3: JSON.stringify(insertImage) });
		}
	};

	const renderEditAltImage = (insertImage) => {
		if (isNotJSON(insertImage)) {
			return !insertImage ? (
				__('Select image', 'vk-blocks')
			) : (
				<img
					className={'icon-image'}
					src={insertImage}
					alt={__('Upload image', 'vk-blocks')}
				/>
			);
		}
		const IconImageParse = JSON.parse(fixBrokenUnicode(insertImage));
		return !insertImage ? (
			__('Select image', 'vk-blocks')
		) : (
			<img
				className={'icon-image'}
				src={IconImageParse.sizes.full.url}
				alt={IconImageParse.alt}
			/>
		);
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('PR Block1 Setting', 'vk-blocks')}>
					<BaseControl
						label={__('Link URL:', 'vk-blocks')}
						id={`vk_prBlocks_linkUrl1`}
					>
						<TextControl
							value={url1}
							onChange={(value) => setAttributes({ url1: value })}
						/>
						<CheckboxControl
							label={__('Open link new tab.', 'vk-blocks')}
							checked={urlOpenType1}
							onChange={(checked) =>
								setAttributes({ urlOpenType1: checked })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Icon 1', 'vk-blocks')}
						id={`vk_prBlocks_Icon1`}
					>
						<FontAwesome attributeName={'icon1'} {...props} />
						<ColorPalette
							value={color1}
							onChange={(value) => {
								if (value) {
									setAttributes({ color1: value });
								} else {
									setAttributes({ color1: '#0693e3' });
									setAttributes({ bgType1: '0' });
								}
							}}
						/>
						<RadioControl
							label={__('Icon Background:', 'vk-blocks')}
							selected={bgType1}
							options={[
								{
									label: __('Solid color', 'vk-blocks'),
									value: '0',
								},
								{
									label: __('No background', 'vk-blocks'),
									value: '1',
								},
							]}
							onChange={(value) =>
								setAttributes({ bgType1: value })
							}
						/>
					</BaseControl>
					<BaseControl
						// label={ __('PR Image 1', 'vk-blocks') }
						help={__(
							'When you have an image. Image is displayed with priority',
							'vk-blocks'
						)}
					>
						<h4 className="components-base-control__title">
							{__('PR Image 1', 'vk-blocks')}
						</h4>
						<MediaUpload
							onSelect={uploadNonAltImage1}
							type="image"
							value={insertImage1}
							render={({ open }) => (
								<Button
									onClick={open}
									className={
										insertImage1
											? 'image-button'
											: 'button button-large'
									}
								>
									{renderEditAltImage(insertImage1)}
								</Button>
							)}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('PR Block2 Setting', 'vk-blocks')}>
					<BaseControl
						label={__('Link URL:', 'vk-blocks')}
						id={`vk_prBlocks_linkUrl2`}
					>
						<TextControl
							value={url2}
							onChange={(value) => setAttributes({ url2: value })}
						/>
						<CheckboxControl
							label={__('Open link new tab.', 'vk-blocks')}
							checked={urlOpenType2}
							onChange={(checked) =>
								setAttributes({ urlOpenType2: checked })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Icon 2', 'vk-blocks')}
						id={`vk_prBlocks_Icon2`}
					>
						<FontAwesome attributeName={'icon2'} {...props} />
						<ColorPalette
							value={color2}
							onChange={(value) => {
								if (value) {
									setAttributes({ color2: value });
								} else {
									setAttributes({ color2: '#0693e3' });
									setAttributes({ bgType2: '0' });
								}
							}}
						/>
						<RadioControl
							label={__('Icon Background:', 'vk-blocks')}
							selected={bgType2}
							options={[
								{
									label: __('Solid color', 'vk-blocks'),
									value: '0',
								},
								{
									label: __('No background', 'vk-blocks'),
									value: '1',
								},
							]}
							onChange={(value) =>
								setAttributes({ bgType2: value })
							}
						/>
					</BaseControl>
					<BaseControl
						// label={ __('PR Image 2', 'vk-blocks') }
						help={__(
							'When you have an image. Image is displayed with priority.',
							'vk-blocks'
						)}
					>
						<h4 className="components-base-control__title">
							{__('PR Image 2', 'vk-blocks')}
						</h4>
						<MediaUpload
							onSelect={uploadNonAltImage2}
							type="image"
							value={insertImage2}
							render={({ open }) => (
								<Button
									onClick={open}
									className={
										insertImage2
											? 'image-button'
											: 'button button-large'
									}
								>
									{renderEditAltImage(insertImage2)}
								</Button>
							)}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('PR Block3 Setting', 'vk-blocks')}>
					<BaseControl
						label={__('Link URL:', 'vk-blocks')}
						id={`vk_prBlocks_linkUrl3`}
					>
						<TextControl
							value={url3}
							onChange={(value) => setAttributes({ url3: value })}
						/>
						<CheckboxControl
							label={__('Open link new tab.', 'vk-blocks')}
							checked={urlOpenType3}
							onChange={(checked) =>
								setAttributes({ urlOpenType3: checked })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Icon 3', 'vk-blocks')}
						id={`vk_prBlocks_Icon3`}
					>
						<FontAwesome attributeName={'icon3'} {...props} />
						<ColorPalette
							value={color3}
							onChange={(value) => {
								if (value) {
									setAttributes({ color3: value });
								} else {
									setAttributes({ color3: '#0693e3' });
									setAttributes({ bgType3: '0' });
								}
							}}
						/>
						<RadioControl
							label={__('Icon Background:', 'vk-blocks')}
							selected={bgType3}
							options={[
								{
									label: __('Solid color', 'vk-blocks'),
									value: '0',
								},
								{
									label: __('No background', 'vk-blocks'),
									value: '1',
								},
							]}
							onChange={(value) =>
								setAttributes({ bgType3: value })
							}
						/>
					</BaseControl>
					<BaseControl
						// label={ __('PR Image 3', 'vk-blocks') }
						help={__(
							'When you have an image. Image is displayed with priority.',
							'vk-blocks'
						)}
					>
						<h4 className="components-base-control__title">
							{__('PR Image 3', 'vk-blocks')}
						</h4>
						<MediaUpload
							onSelect={uploadNonAltImage3}
							type="image"
							value={insertImage3}
							render={({ open }) => (
								<Button
									onClick={open}
									className={
										insertImage3
											? 'image-button'
											: 'button button-large'
									}
								>
									{renderEditAltImage(insertImage3)}
								</Button>
							)}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div className={containerClass}>
				<ComponentBlock
					attributes={attributes}
					setAttributes={setAttributes}
					blockNum={1}
					for_={'edit'}
				/>
				<ComponentBlock
					attributes={attributes}
					setAttributes={setAttributes}
					blockNum={2}
					for_={'edit'}
				/>
				<ComponentBlock
					attributes={attributes}
					setAttributes={setAttributes}
					blockNum={3}
					for_={'edit'}
				/>
			</div>
		</Fragment>
	);
}
