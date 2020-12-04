/**
 * Button block type
 *
 */
import { VKBButton } from './component';
import { deprecated } from './deprecated/deprecated';
import { vkbBlockEditor } from './../_helper/depModules';
import { title, iconName, url, iconUser } from './../_helper/example-data';
import { FontAwesome } from '../_helper/font-awesome-new';
import BlockIcon from './icon.svg';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	RadioControl,
	PanelBody,
	BaseControl,
	CheckboxControl,
	TextControl,
	ButtonGroup,
	Button,
} = wp.components;
const { Fragment } = wp.element;
const { RichText, InspectorControls, ColorPalette } = vkbBlockEditor;

registerBlockType( 'vk-blocks/button', {
	title: __( 'Button', 'vk-blocks' ),
	icon: <BlockIcon />,
	category: 'vk-blocks-cat',
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'span',
		},
		subCaption: {
			type: 'string',
			default: '',
		},
		buttonUrl: {
			type: 'string',
			default: '',
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
		},
	},
	supports: {
		anchor: true,
	},
	example: {
		attributes: {
			content: iconName,
			subCaption: title,
			buttonUrl: url,
			buttonTarget: false,
			buttonSize: 'md',
			buttonType: '0',
			buttonColor: 'primary',
			buttonColorCustom: 'undefined',
			buttonAlign: 'left',
			fontAwesomeIconBefore: iconUser,
			fontAwesomeIconAfter: iconUser,
		},
	},
	edit( props ) {
		const { attributes, className, setAttributes } = props;
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
		if ( buttonColorCustom ) {
			containerClass = `vk_button vk_button-align-${ buttonAlign } vk_button-color-custom`;
		} else {
			containerClass = `vk_button vk_button-align-${ buttonAlign }`;
		}

		if ( className ) {
			containerClass = `${ className } vk_button vk_button-align-${ buttonAlign }`;
		} else {
			containerClass = `vk_button vk_button-align-${ buttonAlign }`;
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Button setting', 'vk-blocks' ) }>
						<TextControl
							label={ __( 'Sub Caption', 'vk-blocks' ) }
							value={ subCaption }
							onChange={ ( value ) => setAttributes( { subCaption: value } ) }
							placeholder={ 'Sub Caption' }
						/>

						<TextControl
							label={ __( 'Button URL', 'vk-blocks' ) }
							value={ buttonUrl }
							onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
							placeholder={ 'Button URL' }
						/>

						<CheckboxControl
							label={ __( 'Open link new tab.', 'vk-blocks' ) }
							checked={ buttonTarget }
							onChange={ ( checked ) => setAttributes( { buttonTarget: checked } ) }
						/>

						<h4 className={ `mt-0 mb-2` }>{ __( 'Button Size:', 'vk-blocks' ) }</h4>
						<ButtonGroup className={ `mb-3` }>
							<Button
								isSmall
								isPrimary={ buttonSize === 'lg' }
								isSecondary={ buttonSize !== 'lg' }
								onClick={ () => setAttributes( { buttonSize: 'lg' } ) }
							>
								{ __( 'Large', 'vk-blocks' ) }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonSize === 'md' }
								isSecondary={ buttonSize !== 'md' }
								onClick={ () =>setAttributes( { buttonSize: 'md' } ) }
							>
								{ __( 'Normal', 'vk-blocks' ) }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonSize === 'sm' }
								isSecondary={ buttonSize !== 'sm' }
								onClick={ () => setAttributes( { buttonSize: 'sm' } ) }
							>
								{ __( 'Small', 'vk-blocks' ) }
							</Button>
						</ButtonGroup>

						<h4 className={ `mt-0 mb-2` }>{ __( 'Button Position:', 'vk-blocks' ) }</h4>
						<ButtonGroup className={ `mb-3` }>
							<Button
								isSmall
								isPrimary={ buttonAlign === 'left' }
								isSecondary={ buttonAlign !== 'left' }
								onClick={ () => setAttributes( { buttonAlign: 'left' } ) }
							>
								{ __( 'Left', 'vk-blocks' ) }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonAlign === 'center' }
								isSecondary={ buttonAlign !== 'center' }
								onClick={ () => setAttributes( { buttonAlign: 'center' } ) }
							>
								{ __( 'Center', 'vk-blocks' ) }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonAlign === 'right' }
								isSecondary={ buttonAlign !== 'right' }
								onClick={ () => setAttributes( { buttonAlign: 'right' } ) }
							>
								{ __( 'Right', 'vk-blocks' ) }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonAlign === 'wide' }
								isSecondary={ buttonAlign !== 'wide' }
								onClick={ () => setAttributes( { buttonAlign: 'wide' } ) }
							>
								{ __( 'Wide', 'vk-blocks' ) }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonAlign === 'block' }
								isSecondary={ buttonAlign !== 'block' }
								onClick={ () => setAttributes( { buttonAlign: 'block' } ) }
							>
								{ __( 'Block', 'vk-blocks' ) }
							</Button>
						</ButtonGroup>

						<h4 className={ `mt-0 mb-2` }>
							{ __( 'Button Style:', 'vk-blocks' ) }
						</h4>
						<ButtonGroup className={ `mb-2` }>
							<Button
								isSmall
								isPrimary={ buttonType === '0' }
								isSecondary={ buttonType !== '0' }
								onClick={ () => setAttributes( { buttonType: '0' } ) }
							>
								{ __( 'Solid color', 'vk-blocks' ) }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonType === '1' }
								isSecondary={ buttonType !== '1' }
								onClick={ () => setAttributes( { buttonType: '1' } ) }
							>
								{ __( 'No background', 'vk-blocks' ) }
							</Button>
							<Button
								isSmall
								isPrimary={ buttonType === '2' }
								isSecondary={ buttonType !== '2' }
								onClick={ () => setAttributes( { buttonType: '2' } ) }
							>
								{ __( 'Text only', 'vk-blocks' ) }
							</Button>
						</ButtonGroup>
						<p className={ `mb-3` }>
							{ __( 'If you select "No background", that you need to select a Custom Color.', 'vk-blocks' ) }
						</p>

						<RadioControl
							label={ __( 'Default Color:', 'vk-blocks' ) }
							selected={ buttonColor }
							options={ [
								{
									label: __( 'Primary', 'vk-blocks' ),
									value: 'primary',
								},
								{
									label: __( 'Secondary', 'vk-blocks' ),
									value: 'secondary',
								},
								{
									label: __( 'Success', 'vk-blocks' ),
									value: 'success',
								},
								{
									label: __( 'Info', 'vk-blocks' ),
									value: 'info',
								},
								{
									label: __( 'Warning', 'vk-blocks' ),
									value: 'warning',
								},
								{
									label: __( 'Danger', 'vk-blocks' ),
									value: 'danger',
								},
								{
									label: __( 'Light', 'vk-blocks' ),
									value: 'light',
								},
								{
									label: __( 'Dark', 'vk-blocks' ),
									value: 'dark',
								},
							] }
							onChange={ ( value ) => setAttributes( { buttonColor: value } )	}
						/>
						<BaseControl
							id={ `vk_block_baloon_custom_color` }
							label={ __( 'Custom Color', 'vk-blocks' ) }
							help={ __( 'This custom color overrides the default color. If you want to use the default color, click the clear button.', 'vk-blocks' ) }
						>
							<ColorPalette
								value={ buttonColorCustom }
								onChange={ ( value ) => setAttributes( { buttonColorCustom: value } ) }
							/>
						</BaseControl>

						<BaseControl>
							<h4 className={ `mt-0 mb-2` }>
								{ __( 'Icon ( Font Awesome )', 'vk-blocks' ) }
							</h4>
							<BaseControl
								id={ `vk_block_baloon_fa_before_text` }
								label={ __( 'Before text', 'vk-blocks' ) }
							>
								<FontAwesome
									attributeName={ 'fontAwesomeIconBefore' }
									{ ...props }
								/>
							</BaseControl>
							<BaseControl
								id={ `vk_block_baloon_fa_after_text` }
								label={ __( 'After text', 'vk-blocks' ) }
							>
								<FontAwesome
									attributeName={ 'fontAwesomeIconAfter' }
									{ ...props }
								/>
							</BaseControl>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<div className={ containerClass }>
					<VKBButton
						lbColorCustom={ buttonColorCustom }
						lbColor={ buttonColor }
						lbType={ buttonType }
						lbAlign={ buttonAlign }
						lbSize={ buttonSize }
						lbFontAwesomeIconBefore={ fontAwesomeIconBefore }
						lbFontAwesomeIconAfter={ fontAwesomeIconAfter }
						lbsubCaption={ subCaption }
						lbRichtext={
							<RichText
								tagName={ 'span' }
								className={ 'vk_button_link_txt' }
								onChange={ ( value ) =>
									setAttributes( { content: value } )
								}
								value={ content }
								placeholder={ __( 'Input text', 'vk-blocks' ) }
								allowedFormats={ [
									'core/bold',
									// 'core/code',
									// 'core/image',
									'core/italic',
									// 'core/link',
									'core/strikethrough',
									// 'core/underline',
									// 'core/text-color',
									'core/superscript',
									'core/subscript',
									// 'vk-blocks/highlighter',
									'vk-blocks/responsive-br',
								] }
								isSelected={ true }
							/>
						}
					/>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
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
		if ( buttonColorCustom && 'undefined' !== buttonColorCustom ) {
			containerClass = `vk_button vk_button-color-custom vk_button-align-${ buttonAlign }`;
		} else {
			containerClass = `vk_button vk_button-align-${ buttonAlign }`;
		}

		if ( className ) {
			containerClass = className + ' ' + containerClass;
		}

		return (
			<div className={ containerClass }>
				<VKBButton
					lbColorCustom={ buttonColorCustom }
					lbColor={ buttonColor }
					lbType={ buttonType }
					lbAlign={ buttonAlign }
					lbSize={ buttonSize }
					lbUrl={ buttonUrl }
					lbTarget={ buttonTarget }
					lbFontAwesomeIconBefore={ fontAwesomeIconBefore }
					lbFontAwesomeIconAfter={ fontAwesomeIconAfter }
					lbsubCaption={ subCaption }
					lbRichtext={
						<RichText.Content
							tagName={ 'span' }
							className={ 'vk_button_link_txt' }
							value={ content }
						/>
					}
				/>
			</div>
		);
	},
	deprecated,
} );
