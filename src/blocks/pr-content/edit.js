import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	TextControl,
	CheckboxControl,
	RadioControl,
} from '@wordpress/components';
import {
	InspectorControls,
	RichText,
	ColorPalette,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	getContainerClass,
	getButtonClass,
	getLinkClass,
	getLinkStyle,
	getFontawesomeIcon,
} from './utils';
import { PrContentMediaUploadEdit } from './mediaUpload';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import parse from 'html-react-parser';

export default function PrcontentEdit({ attributes, setAttributes, clientId }) {
	const {
		title,
		titleColor,
		content,
		contentColor,
		url,
		buttonType,
		buttonColor,
		buttonColorCustom,
		buttonText,
		buttonTarget,
		Image,
		ImageBorderColor,
		layout,
		fontAwesomeIconBefore,
		fontAwesomeIconAfter,
	} = attributes;
	// eslint-disable-next-line no-undef
	const iconFamily = vkFontAwesome.iconFamily;
	const containerClass = getContainerClass(layout);
	const btnClass = getButtonClass(buttonColorCustom);
	const linkClass = getLinkClass(buttonColor, buttonColorCustom, buttonType);
	const linkStyle = getLinkStyle(buttonColorCustom, buttonType);
	const iconBefore = getFontawesomeIcon(
		fontAwesomeIconBefore,
		'vk_button_link_before'
	);
	const iconAfter = getFontawesomeIcon(
		fontAwesomeIconAfter,
		'vk_button_link_after'
	);

	const blockProps = useBlockProps({
		className: containerClass,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Color Setting', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						id={`vk_prContent_titleColor-${clientId}`}
						label={__('Title Color', 'vk-blocks-pro')}
					>
						<ColorPalette
							value={titleColor}
							onChange={(value) =>
								setAttributes({ titleColor: value })
							}
						/>
					</BaseControl>
					<BaseControl
						id={`vk_prContent_contentColor-${clientId}`}
						label={__('Content Color', 'vk-blocks-pro')}
					>
						<ColorPalette
							value={contentColor}
							onChange={(value) =>
								setAttributes({ contentColor: value })
							}
						/>
					</BaseControl>
					<BaseControl
						id={`vk_prContent_image-borderColor-${clientId}`}
						label={__('Image Border Color', 'vk-blocks-pro')}
					>
						<ColorPalette
							value={ImageBorderColor}
							onChange={(value) =>
								setAttributes({ ImageBorderColor: value })
							}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Button Setting', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						id={`vk_prContent_buttonText-${clientId}`}
						label={__('Button Text', 'vk-blocks-pro')}
					>
						<TextControl
							value={buttonText}
							onChange={(value) =>
								setAttributes({ buttonText: value })
							}
							placeholder={'Input button text.'}
						/>
					</BaseControl>
					<BaseControl
						id={`vk_prContent_linkUrl-${clientId}`}
						label={__('Link URL', 'vk-blocks-pro')}
					>
						<TextControl
							value={url}
							onChange={(value) => setAttributes({ url: value })}
							placeholder={'https://vektor-inc.co.jp/'}
						/>
					</BaseControl>
					<CheckboxControl
						label={__('Open link new tab.', 'vk-blocks-pro')}
						checked={buttonTarget}
						onChange={(checked) =>
							setAttributes({ buttonTarget: checked })
						}
					/>
					<BaseControl
						id={`vk_prContent_buttonType-${clientId}`}
						label={__('Button Type', 'vk-blocks-pro')}
					>
						<RadioControl
							selected={buttonType}
							options={[
								{
									label: __('Solid', 'vk-blocks-pro'),
									value: '0',
								},
								{
									label: __('Ghost', 'vk-blocks-pro'),
									value: '1',
								},
							]}
							onChange={(value) =>
								setAttributes({ buttonType: value })
							}
						/>
					</BaseControl>
					<RadioControl
						label={__('Default Color:', 'vk-blocks-pro')}
						selected={buttonColor}
						options={[
							{
								label: __('Primary', 'vk-blocks-pro'),
								value: 'primary',
							},
							{
								label: __('Secondary', 'vk-blocks-pro'),
								value: 'secondary',
							},
							{
								label: __('Success', 'vk-blocks-pro'),
								value: 'success',
							},
							{
								label: __('Info', 'vk-blocks-pro'),
								value: 'info',
							},
							{
								label: __('Warning', 'vk-blocks-pro'),
								value: 'warning',
							},
							{
								label: __('Danger', 'vk-blocks-pro'),
								value: 'danger',
							},
							{
								label: __('Light', 'vk-blocks-pro'),
								value: 'light',
							},
							{
								label: __('Dark', 'vk-blocks-pro'),
								value: 'dark',
							},
						]}
						onChange={(value) =>
							setAttributes({ buttonColor: value })
						}
					/>
					<BaseControl
						id={`vk_prContent_buttonColor-${clientId}`}
						label={__('Button Color', 'vk-blocks-pro')}
					>
						<ColorPalette
							value={buttonColorCustom}
							onChange={(value) =>
								setAttributes({ buttonColorCustom: value })
							}
						/>
					</BaseControl>
					<BaseControl id={`vk_prContent_icon-${clientId}`}>
						<h4 className="mt-0 mb-2">
							{__('Icon', 'vk-blocks-pro') +
								' ( ' +
								iconFamily +
								' )'}
						</h4>
						<BaseControl
							id={`vk_prContent_icon_beforeText${clientId}`}
							label={__('Before text', 'vk-blocks-pro')}
						>
							<FontAwesome
								attributeName={'fontAwesomeIconBefore'}
								{...{
									attributes,
									setAttributes,
								}}
							/>
						</BaseControl>
						<BaseControl
							id={`vk_prContent_icon_afterText-${clientId}`}
							label={__('After text', 'vk-blocks-pro')}
						>
							<FontAwesome
								attributeName={'fontAwesomeIconAfter'}
								{...{
									attributes,
									setAttributes,
								}}
							/>
						</BaseControl>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Layout Setting', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<RadioControl
						label={__('Layout Type', 'vk-blocks-pro')}
						selected={layout}
						options={[
							{
								label: __('Right', 'vk-blocks-pro'),
								value: 'right',
							},
							{
								label: __('Left', 'vk-blocks-pro'),
								value: 'left',
							},
						]}
						onChange={(value) => setAttributes({ layout: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="col-sm-6 vk_prContent_colImg">
					<PrContentMediaUploadEdit
						ImageBorderColor={ImageBorderColor}
						setAttributes={setAttributes}
						Image={Image}
					/>
				</div>
				<div className="col-sm-6 vk_prContent_colTxt">
					<RichText
						tagName="h3"
						className={'vk_prContent_colTxt_title'}
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder={__('Input title.', 'vk-blocks-pro')}
						style={{ color: titleColor }}
					/>
					<RichText
						tagName="p"
						className={'vk_prContent_colTxt_text'}
						onChange={(value) => setAttributes({ content: value })}
						value={content}
						placeholder={__('Input content.', 'vk-blocks-pro')}
						style={{ color: contentColor }}
					/>
					{buttonText && (
						/* eslint react/jsx-no-target-blank: 0 */
						<div className={btnClass}>
							<a
								href={url}
								className={linkClass}
								target={buttonTarget ? '_blank' : undefined}
								style={linkStyle}
								rel={
									buttonTarget
										? 'noopener noreferrer'
										: undefined
								}
							>
								{parse(iconBefore)}
								<span className="vk_button_link_txt">
									{buttonText}
								</span>
								{parse(iconAfter)}
							</a>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
