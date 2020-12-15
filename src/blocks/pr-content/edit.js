import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	getContainerClass,
	getButtonClass,
	getLinkClass,
	getLinkStyle,
	getFontawesomeIcon,
} from './utils';
import { PrContentMediaUpload } from './mediaUpload';

export default function PrcontentEdit({
	attributes,
	setAttributes,
}) {
	const {
		titleColor,
		contentColor,
		url,
		buttonType,
		buttonColor,
		buttonColorCustom,
		buttonText,
		buttonTarget,
		ImageBorderColor,
		layout,
		fontAwesomeIconBefore,
		fontAwesomeIconAfter,
	} = attributes;

	const blockProps = useBlockProps({
		className: containerClass,
	});

	const containerClass = getContainerClass(layout);
	const btnClass = getButtonClass(buttonColorCustom);
	const linkClass = getLinkClass(buttonColorCustom, buttonType);
	const linkStyle = getLinkStyle(buttonColorCustom, buttonType);
	const { iconBefore, iconAfter } = getFontawesomeIcon(
		fontAwesomeIconBefore,
		fontAwesomeIconAfter
	);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__('Color Setting', 'vk-blocks')}
					initialOpen={false}
				>
					<BaseControl label={__('Title Color', 'vk-blocks')}>
						<ColorPalette
							value={titleColor}
							onChange={(value) =>
								setAttributes({ titleColor: value })
							}
						/>
					</BaseControl>
					<BaseControl label={__('Content Color', 'vk-blocks')}>
						<ColorPalette
							value={contentColor}
							onChange={(value) =>
								setAttributes({ contentColor: value })
							}
						/>
					</BaseControl>
					<BaseControl label={__('Image Border Color', 'vk-blocks')}>
						<ColorPalette
							value={ImageBorderColor}
							onChange={(value) =>
								setAttributes({ ImageBorderColor: value })
							}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Button Setting', 'vk-blocks')}
					initialOpen={false}
				>
					<BaseControl label={__('Button Text', 'vk-blocks')}>
						<TextControl
							value={buttonText}
							onChange={(value) =>
								setAttributes({ buttonText: value })
							}
							placeholder={'Input button text.'}
						/>
					</BaseControl>
					<BaseControl label={__('Link URL', 'vk-blocks')}>
						<TextControl
							value={url}
							onChange={(value) => setAttributes({ url: value })}
							placeholder={'https://vektor-inc.co.jp/'}
						/>
					</BaseControl>
					<CheckboxControl
						label={__('Open link new tab.', 'vk-blocks')}
						checked={buttonTarget}
						onChange={(checked) =>
							setAttributes({ buttonTarget: checked })
						}
					/>
					<BaseControl label={__('Button Type', 'vk-blocks')}>
						<RadioControl
							selected={buttonType}
							options={[
								{ label: __('Solid', 'vk-blocks'), value: '0' },
								{ label: __('Ghost', 'vk-blocks'), value: '1' },
							]}
							onChange={(value) =>
								setAttributes({ buttonType: value })
							}
						/>
					</BaseControl>
					<RadioControl
						label={__('Default Color:', 'vk-blocks')}
						selected={buttonColor}
						options={[
							{
								label: __('Primary', 'vk-blocks'),
								value: 'primary',
							},
							{
								label: __('Secondary', 'vk-blocks'),
								value: 'secondary',
							},
							{
								label: __('Success', 'vk-blocks'),
								value: 'success',
							},
							{ label: __('Info', 'vk-blocks'), value: 'info' },
							{
								label: __('Warning', 'vk-blocks'),
								value: 'warning',
							},
							{
								label: __('Danger', 'vk-blocks'),
								value: 'danger',
							},
							{ label: __('Light', 'vk-blocks'), value: 'light' },
							{ label: __('Dark', 'vk-blocks'), value: 'dark' },
						]}
						onChange={(value) =>
							setAttributes({ buttonColor: value })
						}
					/>
					<BaseControl label={__('Button Color', 'vk-blocks')}>
						<ColorPalette
							value={buttonColorCustom}
							onChange={(value) =>
								setAttributes({ buttonColorCustom: value })
							}
						/>
					</BaseControl>
					<BaseControl>
						<h4 className="mt-0 mb-2">
							{__('Icon ( Font Awesome )', 'vk-blocks')}
						</h4>
						<BaseControl label={__('Before text', 'vk-blocks')}>
							<FontAwesome
								attributeName={'fontAwesomeIconBefore'}
								{...props}
							/>
						</BaseControl>
						<BaseControl label={__('After text', 'vk-blocks')}>
							<FontAwesome
								attributeName={'fontAwesomeIconAfter'}
								{...props}
							/>
						</BaseControl>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Layout Setting', 'vk-blocks')}
					initialOpen={false}
				>
					<RadioControl
						label={__('Layout Type', 'vk-blocks')}
						selected={layout}
						options={[
							{ label: __('Right', 'vk-blocks'), value: 'right' },
							{ label: __('Left', 'vk-blocks'), value: 'left' },
						]}
						onChange={(value) => setAttributes({ layout: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="col-sm-6 vk_prContent_colImg">
					<PrContentMediaUpload />
				</div>
				<div className="col-sm-6 vk_prContent_colTxt">
					<RichText
						tagName="h3"
						className={'vk_prContent_colTxt_title'}
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder={__('Input title.', 'vk-blocks')}
						style={{ color: titleColor }}
					/>
					<RichText
						tagName="p"
						className={'vk_prContent_colTxt_text'}
						onChange={(value) => setAttributes({ content: value })}
						value={content}
						placeholder={__('Input content.', 'vk-blocks')}
						style={{ color: contentColor }}
					/>
					{buttonText && (
						<div className={btnClass}>
							<a
								href={url}
								className={linkClass}
								target={buttonTarget ? '_blank' : null}
								style={linkStyle}
							>
								{ReactHtmlParser(iconBefore)}
								<span className="vk_button_link_txt">
									{buttonText}
								</span>
								{ReactHtmlParser(iconAfter)}
							</a>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
}
