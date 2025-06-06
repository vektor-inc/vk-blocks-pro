import { isNotJSON } from '@vkblocks/utils/is-not-json';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { __ } from '@wordpress/i18n';
import {
	RadioControl,
	PanelBody,
	Button,
	BaseControl,
	CheckboxControl,
	TextControl,
} from '@wordpress/components';
import { Component } from '@wordpress/element';
import {
	InspectorControls,
	MediaUpload,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

import parse from 'html-react-parser';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';

export default function PrBlocksEdit(props) {
	const { attributes, setAttributes } = props;
	const {
		url1,
		url2,
		url3,
		urlOpenType1,
		urlOpenType2,
		urlOpenType3,
		bgType1,
		bgType2,
		bgType3,
		insertImage1,
		insertImage2,
		insertImage3,
	} = attributes;

	// eslint-disable-next-line no-undef
	const iconFamily = vkFontAwesome.iconFamily;

	const containerClass = `vk_prBlocks row`;

	const blockProps = useBlockProps({
		className: containerClass,
	});

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
				__('Select image', 'vk-blocks-pro')
			) : (
				<img
					className={'icon-image'}
					src={insertImage}
					alt={__('Upload image', 'vk-blocks-pro')}
				/>
			);
		}
		const IconImageParse = JSON.parse(fixBrokenUnicode(insertImage));
		return !insertImage ? (
			__('Select image', 'vk-blocks-pro')
		) : (
			<img
				className={'icon-image'}
				src={IconImageParse.sizes.full.url}
				alt={IconImageParse.alt}
			/>
		);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('PR Block1 Setting', 'vk-blocks-pro')}>
					<BaseControl
						label={__('Link URL:', 'vk-blocks-pro')}
						id={`vk_prBlocks_linkUrl1`}
					>
						<TextControl
							value={url1}
							onChange={(value) => setAttributes({ url1: value })}
						/>
						<CheckboxControl
							label={__('Open link new tab.', 'vk-blocks-pro')}
							checked={urlOpenType1}
							onChange={(checked) =>
								setAttributes({ urlOpenType1: checked })
							}
						/>
					</BaseControl>
					<BaseControl
						label={
							__('Icon 1', 'vk-blocks-pro') +
							' ( ' +
							iconFamily +
							' )'
						}
						id={`vk_prBlocks_Icon1`}
					>
						<FontAwesome attributeName={'icon1'} {...props} />
						<AdvancedColorPalette schema={'color1'} {...props} />
						<RadioControl
							label={__('Icon Background:', 'vk-blocks-pro')}
							selected={bgType1}
							options={[
								{
									label: __('Solid color', 'vk-blocks-pro'),
									value: '0',
								},
								{
									label: __('No background', 'vk-blocks-pro'),
									value: '1',
								},
							]}
							onChange={(value) =>
								setAttributes({ bgType1: value })
							}
						/>
					</BaseControl>
					<BaseControl
						// label={ __('PR Image 1', 'vk-blocks-pro') }
						help={__(
							'When you have an image. Image is displayed with priority',
							'vk-blocks-pro'
						)}
					>
						<h4 className="components-base-control__title">
							{__('PR Image 1', 'vk-blocks-pro')}
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
				<PanelBody title={__('PR Block2 Setting', 'vk-blocks-pro')}>
					<BaseControl
						label={__('Link URL:', 'vk-blocks-pro')}
						id={`vk_prBlocks_linkUrl2`}
					>
						<TextControl
							value={url2}
							onChange={(value) => setAttributes({ url2: value })}
						/>
						<CheckboxControl
							label={__('Open link new tab.', 'vk-blocks-pro')}
							checked={urlOpenType2}
							onChange={(checked) =>
								setAttributes({ urlOpenType2: checked })
							}
						/>
					</BaseControl>
					<BaseControl
						label={
							__('Icon 2', 'vk-blocks-pro') +
							' ( ' +
							iconFamily +
							' )'
						}
						id={`vk_prBlocks_Icon2`}
					>
						<FontAwesome attributeName={'icon2'} {...props} />
						<AdvancedColorPalette schema={'color2'} {...props} />
						<RadioControl
							label={__('Icon Background:', 'vk-blocks-pro')}
							selected={bgType2}
							options={[
								{
									label: __('Solid color', 'vk-blocks-pro'),
									value: '0',
								},
								{
									label: __('No background', 'vk-blocks-pro'),
									value: '1',
								},
							]}
							onChange={(value) =>
								setAttributes({ bgType2: value })
							}
						/>
					</BaseControl>
					<BaseControl
						// label={ __('PR Image 2', 'vk-blocks-pro') }
						help={__(
							'When you have an image. Image is displayed with priority.',
							'vk-blocks-pro'
						)}
					>
						<h4 className="components-base-control__title">
							{__('PR Image 2', 'vk-blocks-pro')}
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
				<PanelBody title={__('PR Block3 Setting', 'vk-blocks-pro')}>
					<BaseControl
						label={__('Link URL:', 'vk-blocks-pro')}
						id={`vk_prBlocks_linkUrl3`}
					>
						<TextControl
							value={url3}
							onChange={(value) => setAttributes({ url3: value })}
						/>
						<CheckboxControl
							label={__('Open link new tab.', 'vk-blocks-pro')}
							checked={urlOpenType3}
							onChange={(checked) =>
								setAttributes({ urlOpenType3: checked })
							}
						/>
					</BaseControl>
					<BaseControl
						label={
							__('Icon 3', 'vk-blocks-pro') +
							' ( ' +
							iconFamily +
							' )'
						}
						id={`vk_prBlocks_Icon3`}
					>
						<FontAwesome attributeName={'icon3'} {...props} />
						<AdvancedColorPalette schema={'color3'} {...props} />
						<RadioControl
							label={__('Icon Background:', 'vk-blocks-pro')}
							selected={bgType3}
							options={[
								{
									label: __('Solid color', 'vk-blocks-pro'),
									value: '0',
								},
								{
									label: __('No background', 'vk-blocks-pro'),
									value: '1',
								},
							]}
							onChange={(value) =>
								setAttributes({ bgType3: value })
							}
						/>
					</BaseControl>
					<BaseControl
						// label={ __('PR Image 3', 'vk-blocks-pro') }
						help={__(
							'When you have an image. Image is displayed with priority.',
							'vk-blocks-pro'
						)}
					>
						<h4 className="components-base-control__title">
							{__('PR Image 3', 'vk-blocks-pro')}
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
			<div {...blockProps}>
				<ComponentBlockEdit
					attributes={attributes}
					setAttributes={setAttributes}
					blockNum={1}
				/>
				<ComponentBlockEdit
					attributes={attributes}
					setAttributes={setAttributes}
					blockNum={2}
				/>
				<ComponentBlockEdit
					attributes={attributes}
					setAttributes={setAttributes}
					blockNum={3}
				/>
			</div>
		</>
	);
}

export class ComponentBlockEdit extends Component {
	render() {
		const setAttributes = this.props.setAttributes;
		const {
			heading1,
			heading2,
			heading3,
			content1,
			content2,
			content3,
			icon1,
			icon2,
			icon3,
			color1,
			color2,
			color3,
			bgType1,
			bgType2,
			bgType3,
			insertImage1,
			insertImage2,
			insertImage3,
		} = this.props.attributes;
		const blockNum = this.props.blockNum;
		const blockNumArrIndex = this.props.blockNum - 1;

		const icon = [icon1, icon2, icon3];
		const color = [color1, color2, color3];
		const bgType = [bgType1, bgType2, bgType3];
		const insertImage = [insertImage1, insertImage2, insertImage3];

		let richTextH1Save = '';
		let richTextPSave = '';

		const renderSaveAltImage = (Image) => {
			if (isNotJSON(Image)) {
				return <img src={Image} alt="" />;
			}
			const IconImageParse = JSON.parse(fixBrokenUnicode(Image));
			return (
				<img
					src={IconImageParse.sizes.full.url}
					alt={IconImageParse.alt}
				/>
			);
		};

		const renderItemImage = (Image) => {
			const bgImage = Image[blockNumArrIndex];
			if (isNotJSON(bgImage)) {
				return {
					backgroundImage: `url(${bgImage})`,
					backgroundRepeat: 'no-repeat 50% center',
					backgroundSize: 'cover',
				};
			}
			const bgImageParse = JSON.parse(fixBrokenUnicode(bgImage));
			return {
				backgroundImage: `url(${bgImageParse.sizes.full.url})`,
				backgroundRepeat: 'no-repeat 50% center',
				backgroundSize: 'cover',
			};
		};

		const drawElement = (() => {
			if (insertImage[blockNumArrIndex]) {
				return (
					<div
						className="vk_prBlocks_item_image"
						style={renderItemImage(insertImage)}
					>
						{renderSaveAltImage(insertImage[blockNumArrIndex])}
					</div>
				);
			}

			let iconOuterClass = '';
			let iconOuterInlineStyle = {};
			let iconColor = '';
			if (color[blockNumArrIndex] !== undefined) {
				// アイコン背景:ベタ塗り
				if (bgType[blockNumArrIndex] === '0') {
					//カスタムカラーの時
					if (isHexColor(color[blockNumArrIndex])) {
						iconOuterClass = `has-background `;
						iconOuterInlineStyle = {
							backgroundColor: `${color[blockNumArrIndex]}`,
						};
						//カラーパレットの時
					} else {
						iconOuterClass = `has-background has-${sanitizeSlug(color[blockNumArrIndex])}-background-color`;
					}
					// アイコン背景:背景なし
				} else if (bgType[blockNumArrIndex] === '1') {
					//カスタムカラーの時
					if (isHexColor(color[blockNumArrIndex])) {
						iconOuterClass = `has-text-color`;
						iconOuterInlineStyle = {
							border: `1px solid ${color[blockNumArrIndex]}`,
						};
						iconColor = color[blockNumArrIndex];
						//カラーパレットの時
					} else {
						iconOuterClass = `has-text-color has-${sanitizeSlug(color[blockNumArrIndex])}-color`;
					}
				}
			}

			let faIcon = icon[blockNumArrIndex];
			//過去バージョンをリカバリーした時にiconを正常に表示する
			if (faIcon && !faIcon.match(/<i/)) {
				faIcon = `<i class="${faIcon}"></i>`;
			}
			//add class and inline css
			const faIconFragment = faIcon.split(' ');
			if (iconColor !== '') {
				faIconFragment[0] =
					faIconFragment[0] + ` style="color:${iconColor}" `;
			} else {
				faIconFragment[0] = faIconFragment[0] + ` `;
			}
			faIconFragment[1] = faIconFragment[1] + ` vk_prBlocks_item_icon `;
			const faIconTag = faIconFragment.join('');

			return (
				<div
					className={`vk_prBlocks_item_icon_outer ${iconOuterClass}`}
					style={iconOuterInlineStyle}
				>
					{parse(faIconTag)}
				</div>
			);
		})();

		// アイコン背景:背景なし
		let iconOutlineClass = '';
		if (bgType[blockNumArrIndex] === '1') {
			iconOutlineClass = 'is-style-outline';
		}

		if (blockNum === 1) {
			richTextH1Save = (
				<RichText
					className="vk_prBlocks_item_title vk_prBlocks_item_title-1"
					tagName={'h3'}
					onChange={(value) => setAttributes({ heading1: value })}
					value={heading1}
					placeholder={__('Input Title', 'vk-blocks-pro')}
				/>
			);
			richTextPSave = (
				<RichText
					className="vk_prBlocks_item_summary vk_prBlocks_item_summary-1"
					tagName={'p'}
					onChange={(value) => setAttributes({ content1: value })}
					value={content1}
					placeholder={__('Input Content', 'vk-blocks-pro')}
				/>
			);
		} else if (blockNum === 2) {
			richTextH1Save = (
				<RichText
					className="vk_prBlocks_item_title vk_prBlocks_item_title-2"
					tagName={'h3'}
					onChange={(value) => setAttributes({ heading2: value })}
					value={heading2}
					placeholder={__('Input Title', 'vk-blocks-pro')}
				/>
			);
			richTextPSave = (
				<RichText
					className="vk_prBlocks_item_summary vk_prBlocks_item_summary-2"
					tagName={'p'}
					onChange={(value) => setAttributes({ content2: value })}
					value={content2}
					placeholder={__('Input Content', 'vk-blocks-pro')}
				/>
			);
		} else if (blockNum === 3) {
			richTextH1Save = (
				<RichText
					className="vk_prBlocks_item_title vk_prBlocks_item_title-3"
					tagName={'h3'}
					onChange={(value) => setAttributes({ heading3: value })}
					value={heading3}
					placeholder={__('Input Title', 'vk-blocks-pro')}
				/>
			);
			richTextPSave = (
				<RichText
					className="vk_prBlocks_item_summary vk_prBlocks_item_summary-3"
					tagName={'p'}
					onChange={(value) => setAttributes({ content3: value })}
					value={content3}
					placeholder={__('Input Content', 'vk-blocks-pro')}
				/>
			);
		}

		return (
			<div className={`vk_prBlocks_item col-sm-4 ${iconOutlineClass}`}>
				{drawElement}
				{richTextH1Save}
				{richTextPSave}
			</div>
		);
	}
}
