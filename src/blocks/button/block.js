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
	<svg xmlns="http://www.w3.org/2000/svg" width="576" height="512" viewBox="0 0 576 512">
		<g>
			<path d="M506,185v142H70V185H506 M526.4,137H49.6C34.4,137,22,149.4,22,164.6v182.8c0,15.2,12.4,27.6,27.6,27.6h476.8
				c15.2,0,27.6-12.4,27.6-27.6V164.6C554,149.4,541.6,137,526.4,137L526.4,137z" />
		</g>
		<g>
			<path d="M83.8,206.9h55.9c9.3,0,16.5,2.3,21.5,6.9c5,4.6,7.5,10.3,7.5,17.1c0,5.7-1.8,10.6-5.3,14.7c-2.4,2.7-5.8,4.9-10.4,6.5
				c6.9,1.7,12.1,4.5,15.3,8.6c3.3,4.1,4.9,9.2,4.9,15.3c0,5-1.2,9.5-3.5,13.5c-2.3,4-5.5,7.2-9.6,9.5c-2.5,1.5-6.3,2.5-11.3,3.2
				c-6.7,0.9-11.2,1.3-13.4,1.3H83.8V206.9z M113.9,244.8h13c4.7,0,7.9-0.8,9.7-2.4c1.8-1.6,2.7-3.9,2.7-7c0-2.8-0.9-5-2.7-6.6
				c-1.8-1.6-5-2.4-9.5-2.4h-13.2V244.8z M113.9,282.8h15.2c5.1,0,8.8-0.9,10.9-2.7s3.2-4.3,3.2-7.4c0-2.9-1-5.2-3.1-6.9
				c-2.1-1.7-5.7-2.6-11-2.6h-15.2V282.8z" />
			<path d="M245.9,303.5h-25.1v-11.3c-3.7,4.7-7.5,8-11.3,10c-3.8,2-8.5,3-14,3c-7.4,0-13.2-2.2-17.4-6.6c-4.2-4.4-6.3-11.2-6.3-20.4
				v-44.6h27V272c0,4.4,0.8,7.5,2.4,9.4c1.6,1.8,3.9,2.8,6.9,2.8c3.2,0,5.8-1.2,7.9-3.7s3.1-6.9,3.1-13.3v-33.7h26.8V303.5z" />
			<path d="M282.4,206.9v26.6h14.8v19.7h-14.8V278c0,3,0.3,5,0.9,5.9c0.9,1.5,2.4,2.2,4.6,2.2c2,0,4.7-0.6,8.3-1.7l2,18.5
				c-6.6,1.5-12.8,2.2-18.6,2.2c-6.7,0-11.6-0.9-14.8-2.6c-3.2-1.7-5.5-4.3-7-7.8c-1.5-3.5-2.3-9.1-2.3-17v-24.6h-9.9v-19.7h9.9v-12.9
				L282.4,206.9z" />
			<path d="M330.2,206.9v26.6H345v19.7h-14.8V278c0,3,0.3,5,0.9,5.9c0.9,1.5,2.4,2.2,4.6,2.2c2,0,4.7-0.6,8.3-1.7l2,18.5
				c-6.6,1.5-12.8,2.2-18.6,2.2c-6.7,0-11.6-0.9-14.8-2.6c-3.2-1.7-5.5-4.3-7-7.8c-1.5-3.5-2.3-9.1-2.3-17v-24.6h-9.9v-19.7h9.9v-12.9
				L330.2,206.9z" />
			<path d="M339.6,268.7c0-10.7,3.6-19.5,10.8-26.4s16.9-10.4,29.2-10.4c14,0,24.6,4.1,31.8,12.2c5.8,6.6,8.6,14.6,8.6,24.2
				c0,10.8-3.6,19.6-10.7,26.5c-7.1,6.9-17,10.3-29.6,10.3c-11.3,0-20.4-2.9-27.3-8.6C343.9,289.5,339.6,280.2,339.6,268.7z
				 M366.5,268.7c0,6.2,1.3,10.9,3.8,13.8c2.5,3,5.7,4.5,9.5,4.5c3.9,0,7-1.5,9.5-4.4c2.5-2.9,3.7-7.7,3.7-14.2
				c0-6.1-1.3-10.6-3.8-13.6s-5.6-4.5-9.3-4.5c-3.9,0-7.1,1.5-9.7,4.5C367.8,257.9,366.5,262.5,366.5,268.7z" />
			<path d="M418.2,233.5h25v11.4c3.7-4.7,7.5-8,11.3-10c3.8-2,8.5-3,14-3c7.4,0,13.2,2.2,17.4,6.6c4.2,4.4,6.3,11.2,6.3,20.5v44.5h-27
				V265c0-4.4-0.8-7.5-2.4-9.3c-1.6-1.8-3.9-2.7-6.9-2.7c-3.3,0-5.9,1.2-7.9,3.7c-2,2.5-3,6.9-3,13.3v33.6h-26.8V233.5z" />
		</g>
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
			default:  '',
		}
	},
	example: {
		attributes: {
			content:  __("Title", "vk-blocks"),
			subCaption:  __("Title", "vk-blocks"),
			buttonUrl: "https://example.com",
			buttonTarget:false,
			buttonSize: 'md',
			buttonType: '0',
			buttonColor: 'primary',
			buttonColorCustom: 'undefined',
			buttonAlign: 'left',
			fontAwesomeIconBefore:'',
			fontAwesomeIconAfter: ''
		}
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
			containerClass = `${className} vk_button vk_button-align-${buttonAlign} vk_button-color-custom`;
		} else {
			containerClass = `${className} vk_button vk_button-align-${buttonAlign}`;
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __('Button setting', 'vk-blocks') }>
						<TextControl
							label={ __('Sub Caption', 'vk-blocks') }
							value={ subCaption }
							onChange={ (value) => setAttributes({ subCaption: value }) }
							placeholder={ 'Sub Caption' }
						/>
						<CheckboxControl
							label={ __('Open link new tab.', 'vk-blocks') }
							checked={ buttonTarget }
							onChange={ (checked) => setAttributes({ buttonTarget: checked }) }
						/>

						<h4 className="mt-0 mb-2">{ __('Button Size:', 'vk-blocks') }</h4>
						<ButtonGroup className="mb-3">
							<Button
								isSmall
								isPrimary={ buttonSize === 'lg' }
								isSecondary={ buttonSize !== 'lg' }
								onClick={ () => setAttributes({ buttonSize: 'lg' }) }
							>
								{ __('Large', 'vk-blocks') }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonSize === 'md' }
								isSecondary={ buttonSize !== 'md' }
								onClick={ () => setAttributes({ buttonSize: 'md' }) }
							>
								{ __('Normal', 'vk-blocks') }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonSize === 'sm' }
								isSecondary={ buttonSize !== 'sm' }
								onClick={ () => setAttributes({ buttonSize: 'sm' }) }
							>
								{ __('Small', 'vk-blocks') }
							</Button>
						</ButtonGroup>

						<h4 className="mt-0 mb-2">{ __('Button Position:', 'vk-blocks') }</h4>
						<ButtonGroup className="mb-3">
							<Button
								isSmall
								isPrimary={ buttonAlign === 'left' }
								isSecondary={ buttonAlign !== 'left' }
								onClick={ () => setAttributes({ buttonAlign: 'left' }) }
							>
								{ __('Left', 'vk-blocks') }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonAlign === 'center' }
								isSecondary={ buttonAlign !== 'center' }
								onClick={ () => setAttributes({ buttonAlign: 'center' }) }
							>
								{ __('Center', 'vk-blocks') }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonAlign === 'right' }
								isSecondary={ buttonAlign !== 'right' }
								onClick={ () => setAttributes({ buttonAlign: 'right' }) }
							>
								{ __('Right', 'vk-blocks') }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonAlign === 'wide' }
								isSecondary={ buttonAlign !== 'wide' }
								onClick={ () => setAttributes({ buttonAlign: 'wide' }) }
							>
								{ __('Wide', 'vk-blocks') }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonAlign === 'block' }
								isSecondary={ buttonAlign !== 'block' }
								onClick={ () => setAttributes({ buttonAlign: 'block' }) }
							>
								{ __('Block', 'vk-blocks') }
							</Button>
						</ButtonGroup>

						<h4 className="mt-0 mb-2">{ __('Button Style:', 'vk-blocks') }</h4>
						<ButtonGroup className="mb-2">
							<Button
								isSmall
								isPrimary={ buttonType === '0' }
								isSecondary={ buttonType !== '0' }
								onClick={ () => setAttributes({ buttonType: '0' }) }
							>
								{ __('Solid color', 'vk-blocks') }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonType === '1' }
								isSecondary={ buttonType !== '1' }
								onClick={ () => setAttributes({ buttonType: '1' }) }
							>
								{ __('No background', 'vk-blocks') }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonType === '2' }
								isSecondary={ buttonType !== '2' }
								onClick={ () => setAttributes({ buttonType: '2' }) }
							>
								{ __('Text only', 'vk-blocks') }
							</Button>
						</ButtonGroup>
						<p className="mb-3">{ __('If you select "No background", that you need to select a Custom Color.', 'vk-blocks') }</p>

						<RadioControl
							label={ __('Default Color:', 'vk-blocks') }
							selected={ buttonColor }
							options={ [
								{ label: __('Primary', 'vk-blocks'), value: 'primary' },
								{ label: __('Secondary', 'vk-blocks'), value: 'secondary' },
								{ label: __('Success', 'vk-blocks'), value: 'success' },
								{ label: __('Info', 'vk-blocks'), value: 'info' },
								{ label: __('Warning', 'vk-blocks'), value: 'warning' },
								{ label: __('Danger', 'vk-blocks'), value: 'danger' },
								{ label: __('Light', 'vk-blocks'), value: 'light' },
								{ label: __('Dark', 'vk-blocks'), value: 'dark' },
							] }
							onChange={ (value) => setAttributes({ buttonColor: value }) }
						/>
						<BaseControl
							label={ __('Custom Color', 'vk-blocks') }
							help={ __('This custom color overrides the default color. If you want to use the default color, click the clear button.', 'vk-blocks') }
						>
							<ColorPalette
								value={ buttonColorCustom }
								onChange={ (value) => setAttributes({ buttonColorCustom: value }) }
							/>
						</BaseControl>

						<BaseControl>
							<h4 className="mt-0 mb-2">{ __('Icon ( Font Awesome )', 'vk-blocks') }</h4>
							<BaseControl
								label={ __("Before text", "vk-blocks") }
							>
								<FontAwesome
									attributeName={ "fontAwesomeIconBefore" }
									{ ...props }
								/>
							</BaseControl>
							<BaseControl
								label={ __("After text", "vk-blocks") }
							>
								<FontAwesome
									attributeName={ "fontAwesomeIconAfter" }
									{ ...props }
								/>
							</BaseControl>
						</BaseControl>

					</PanelBody>
				</InspectorControls>
				<div className={ containerClass }>
					<VKBButton lbColorCustom={ buttonColorCustom } lbColor={ buttonColor } lbType={ buttonType }
						lbAlign={ buttonAlign }
						lbSize={ buttonSize }
						lbFontAwesomeIconBefore={ fontAwesomeIconBefore }
						lbFontAwesomeIconAfter={ fontAwesomeIconAfter }
						lbsubCaption={ subCaption }
						lbRichtext={
							<RichText
								tagName="span"
								className={ 'vk_button_link_txt' }
								onChange={ (value) => setAttributes({ content: value }) }
								value={ content }
								placeholder={ __('Input text', 'vk-blocks') }
								allowedFormats={ ['bold', 'italic', 'strikethrough'] }
								isSelected={ true }
							/>
						} />
					{ isSelected && (
						<form
							className="block-library-button__inline-link"
							onSubmit={ (event) => event.preventDefault() }>
							<Dashicon icon="admin-links" />
							<URLInput
								value={ buttonUrl }
								onChange={ (value) => setAttributes({ buttonUrl: value }) }
							/>
							<Button icon="editor-break" label={ __('Apply', 'vk-blocks') } type="submit" />
						</form>
					) }
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
		if (buttonColorCustom) {

			containerClass = `vk_button vk_button-color-custom vk_button-align-${buttonAlign}`;

		} else if (!buttonColorCustom) {

			containerClass = `vk_button vk_button-align-${buttonAlign}`;

		}

		if (className) {
			containerClass = className + ' ' + containerClass;
		}

		return (
			<div className={ containerClass }>

				<VKBButton lbColorCustom={ buttonColorCustom } lbColor={ buttonColor } lbType={ buttonType }
					lbAlign={ buttonAlign }
					lbSize={ buttonSize }
					lbUrl={ buttonUrl }
					lbTarget={ buttonTarget }
					lbFontAwesomeIconBefore={ fontAwesomeIconBefore }
					lbFontAwesomeIconAfter={ fontAwesomeIconAfter }
					lbsubCaption={ subCaption }
					lbRichtext={
						<RichText.Content
							tagName="span"
							className={ 'vk_button_link_txt' }
							value={ content }
						/>
					} />
			</div>
		);
	},

	deprecated
});
