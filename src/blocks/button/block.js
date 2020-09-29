/**
 * Button block type
 *
 */
import { VKBButton } from "./component";
import { deprecated } from "./deprecated/deprecated";
import { vkbBlockEditor } from "./../_helper/depModules";
import { FontAwesome } from "../_helper/font-awesome-new"

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RadioControl, PanelBody, BaseControl, CheckboxControl, TextControl, Dashicon, ButtonGroup, Button } = wp.components;
const { Fragment } = wp.element;
const { RichText, InspectorControls, ColorPalette, URLInput, } = vkbBlockEditor;
const BlockIcon = (
	<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M5 8h14a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-6.941l-.004.003-1.421 1.497H19a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v4.778h.269l.244-.688a1.61 1.61 0 01.987-.991V8.5A.5.5 0 015 8z" fill="#000" />
		<path d="M8.502 12.5A1.608 1.608 0 008 11.821V11.5h8v1H8.502zM10.89 14.778l-3.267.008a.11.11 0 00-.102.075l-.25.722c-.022.076.03.152.103.152h1.27c.095 0 .146.122.08.19L6.7 18.105h.007l1.042 3.397c.022.076-.03.145-.103.145h-1.02a.104.104 0 01-.102-.076L6 19.83c-.029-.107-.168-.107-.205-.008l-.426 1.223a.109.109 0 000 .069l.39 1.481c.014.046.058.084.102.084H9.15c.073 0 .125-.076.103-.145l-1.329-4.277c-.014-.038 0-.084.03-.114l3.016-3.176c.066-.069.015-.19-.08-.19z" fill="#000" />
		<path d="M7.022 13l-1.99.008a.11.11 0 00-.102.076l-.257.721c-.03.076.03.152.103.152h.836c.074 0 .125.076.103.152l-2.37 6.717a.108.108 0 01-.206 0l-1.703-4.848a.112.112 0 01.103-.152h.859a.11.11 0 01.103.076l.616 1.748a.108.108 0 00.206 0l.954-2.72a.112.112 0 00-.103-.152H.108c-.073 0-.125.076-.103.152l3.127 8.996a.108.108 0 00.205 0l3.787-10.774c.022-.076-.029-.152-.102-.152z" fill="#D8141C" />
	</svg>
);

registerBlockType('vk-blocks/button', {
	title: __('Button', 'vk-blocks'),
	icon: BlockIcon,
	category: 'vk-blocks-cat',
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'span',
		},
		subCaption: {
			type: 'string',
			default: "",
		},
		buttonUrl: {
			type: 'string',
			default: "",
		},
		buttonTarget: {
			type: 'Boolean',
			default: false,
		},
		buttonSize: {
			type: 'string',
			default: 'md',
		},
		buttonType: {
			type: 'string',
			default: '0',
		},
		buttonColor: {
			type: 'string',
			default: 'primary',
		},
		buttonColorCustom: {
			type: 'string',
			default: 'undefined',
		},
		buttonAlign: {
			type: 'string',
			default: 'left',
		},
		fontAwesomeIconBefore: {
			type: 'string',
			default: '',
		},
		fontAwesomeIconAfter: {
			type: 'string',
			default: '',
		}
	},
	supports: {
		anchor: true,
	},

	edit(props) {
		const { attributes, className, setAttributes, isSelected } = props
		const {
			content,
			subCaption,
			buttonUrl,
			buttonTarget,
			buttonSize,
			buttonType,
			buttonColor,
			buttonColorCustom,
			buttonAlign,
			fontAwesomeIconBefore,
			fontAwesomeIconAfter,
		} = attributes;

		let containerClass;
		if (buttonColorCustom) {
			containerClass = `vk_button vk_button-align-${buttonAlign} vk_button-color-custom`;
		} else {
			containerClass = `vk_button vk_button-align-${buttonAlign}`;
		}

		if (className) {
			containerClass = `${className} vk_button vk_button-align-${buttonAlign}`;
		} else {
			containerClass = `vk_button vk_button-align-${buttonAlign}`;
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('Button setting', 'vk-blocks')}>
						<TextControl
							label={__('Sub Caption', 'vk-blocks')}
							value={subCaption}
							onChange={(value) => setAttributes({ subCaption: value })}
							placeholder={'Sub Caption'}
						/>

						<TextControl
							label={__('Button URL', 'vk-blocks')}
							value={buttonUrl}
							onChange={(value) => setAttributes({ buttonUrl: value })}
							placeholder={'Button URL'}
						/>

						<CheckboxControl
							label={__('Open link new tab.', 'vk-blocks')}
							checked={buttonTarget}
							onChange={(checked) => setAttributes({ buttonTarget: checked })}
						/>

						<h4 className="mt-0 mb-2">{__('Button Size:', 'vk-blocks')}</h4>
						<ButtonGroup className="mb-3">
							<Button
								isSmall
								isPrimary={buttonSize === 'lg'}
								isSecondary={buttonSize !== 'lg'}
								onClick={() => setAttributes({ buttonSize: 'lg' })}
							>
								{__('Large', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={buttonSize === 'md'}
								isSecondary={buttonSize !== 'md'}
								onClick={() => setAttributes({ buttonSize: 'md' })}
							>
								{__('Normal', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={buttonSize === 'sm'}
								isSecondary={buttonSize !== 'sm'}
								onClick={() => setAttributes({ buttonSize: 'sm' })}
							>
								{__('Small', 'vk-blocks')}
							</Button>
						</ButtonGroup>

						<h4 className="mt-0 mb-2">{__('Button Position:', 'vk-blocks')}</h4>
						<ButtonGroup className="mb-3">
							<Button
								isSmall
								isPrimary={buttonAlign === 'left'}
								isSecondary={buttonAlign !== 'left'}
								onClick={() => setAttributes({ buttonAlign: 'left' })}
							>
								{__('Left', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={buttonAlign === 'center'}
								isSecondary={buttonAlign !== 'center'}
								onClick={() => setAttributes({ buttonAlign: 'center' })}
							>
								{__('Center', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={buttonAlign === 'right'}
								isSecondary={buttonAlign !== 'right'}
								onClick={() => setAttributes({ buttonAlign: 'right' })}
							>
								{__('Right', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={buttonAlign === 'wide'}
								isSecondary={buttonAlign !== 'wide'}
								onClick={() => setAttributes({ buttonAlign: 'wide' })}
							>
								{__('Wide', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={buttonAlign === 'block'}
								isSecondary={buttonAlign !== 'block'}
								onClick={() => setAttributes({ buttonAlign: 'block' })}
							>
								{__('Block', 'vk-blocks')}
							</Button>
						</ButtonGroup>

						<h4 className="mt-0 mb-2">{__('Button Style:', 'vk-blocks')}</h4>
						<ButtonGroup className="mb-2">
							<Button
								isSmall
								isPrimary={buttonType === '0'}
								isSecondary={buttonType !== '0'}
								onClick={() => setAttributes({ buttonType: '0' })}
							>
								{__('Solid color', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={buttonType === '1'}
								isSecondary={buttonType !== '1'}
								onClick={() => setAttributes({ buttonType: '1' })}
							>
								{__('No background', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={buttonType === '2'}
								isSecondary={buttonType !== '2'}
								onClick={() => setAttributes({ buttonType: '2' })}
							>
								{__('Text only', 'vk-blocks')}
							</Button>
						</ButtonGroup>
						<p className="mb-3">{__('If you select "No background", that you need to select a Custom Color.', 'vk-blocks')}</p>

						<RadioControl
							label={__('Default Color:', 'vk-blocks')}
							selected={buttonColor}
							options={[
								{ label: __('Primary', 'vk-blocks'), value: 'primary' },
								{ label: __('Secondary', 'vk-blocks'), value: 'secondary' },
								{ label: __('Success', 'vk-blocks'), value: 'success' },
								{ label: __('Info', 'vk-blocks'), value: 'info' },
								{ label: __('Warning', 'vk-blocks'), value: 'warning' },
								{ label: __('Danger', 'vk-blocks'), value: 'danger' },
								{ label: __('Light', 'vk-blocks'), value: 'light' },
								{ label: __('Dark', 'vk-blocks'), value: 'dark' },
							]}
							onChange={(value) => setAttributes({ buttonColor: value })}
						/>
						<BaseControl
							label={__('Custom Color', 'vk-blocks')}
							help={__('This custom color overrides the default color. If you want to use the default color, click the clear button.', 'vk-blocks')}
						>
							<ColorPalette
								value={buttonColorCustom}
								onChange={(value) => setAttributes({ buttonColorCustom: value })}
							/>
						</BaseControl>

						<BaseControl>
							<h4 className="mt-0 mb-2">{__('Icon ( Font Awesome )', 'vk-blocks')}</h4>
							<BaseControl
								label={__("Before text", "vk-blocks")}
							>
								<FontAwesome
									attributeName={"fontAwesomeIconBefore"}
									{...props}
								/>
							</BaseControl>
							<BaseControl
								label={__("After text", "vk-blocks")}
							>
								<FontAwesome
									attributeName={"fontAwesomeIconAfter"}
									{...props}
								/>
							</BaseControl>
						</BaseControl>

					</PanelBody>
				</InspectorControls>
				<div className={containerClass}>
					<VKBButton lbColorCustom={buttonColorCustom} lbColor={buttonColor} lbType={buttonType}
						lbAlign={buttonAlign}
						lbSize={buttonSize}
						lbFontAwesomeIconBefore={fontAwesomeIconBefore}
						lbFontAwesomeIconAfter={fontAwesomeIconAfter}
						lbsubCaption={subCaption}
						lbRichtext={
							<RichText
								tagName="span"
								className={'vk_button_link_txt'}
								onChange={(value) => setAttributes({ content: value })}
								value={content}
								placeholder={__('Input text', 'vk-blocks')}
								allowedFormats={['bold', 'italic', 'strikethrough']}
								isSelected={true}
							/>
						}
					/>
				</div>
			</Fragment>
		);
	},

	save({ attributes, className }) {
		const {
			content,
			subCaption,
			buttonUrl,
			buttonTarget,
			buttonSize,
			buttonType,
			buttonColor,
			buttonColorCustom,
			buttonAlign,
			fontAwesomeIconBefore,
			fontAwesomeIconAfter,
		} = attributes;

		let containerClass = '';
		if (buttonColorCustom && "undefined" !== buttonColorCustom) {

			containerClass = `vk_button vk_button-color-custom vk_button-align-${buttonAlign}`;

		} else {

			containerClass = `vk_button vk_button-align-${buttonAlign}`;

		}

		if (className) {
			containerClass = className + ' ' + containerClass;
		}

		return (
			<div className={containerClass}>

				<VKBButton lbColorCustom={buttonColorCustom} lbColor={buttonColor} lbType={buttonType}
					lbAlign={buttonAlign}
					lbSize={buttonSize}
					lbUrl={buttonUrl}
					lbTarget={buttonTarget}
					lbFontAwesomeIconBefore={fontAwesomeIconBefore}
					lbFontAwesomeIconAfter={fontAwesomeIconAfter}
					lbsubCaption={subCaption}
					lbRichtext={
						<RichText.Content
							tagName="span"
							className={'vk_button_link_txt'}
							value={content}
						/>
					} />
			</div>
		);
	},

	deprecated
});
