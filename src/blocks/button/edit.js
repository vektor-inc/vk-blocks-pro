import { __ } from '@wordpress/i18n';
import { VKBButton } from './component';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import {
	SelectControl,
	PanelBody,
	BaseControl,
	CheckboxControl,
	TextControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';
import {
	RichText,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function ButtonEdit(props) {
	const { attributes, setAttributes, clientId } = props;
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
		blockId,
	} = attributes;

	// 以前の値を切り替え
	useEffect(() => {
		if (attributes.clientId !== undefined) {
			setAttributes({ clientId: undefined });
		}
		if (blockId === undefined) {
			setAttributes({ blockId: clientId });
		}
		if (
			buttonUrl === null ||
			buttonUrl === 'null' ||
			buttonUrl === 'undefined' ||
			buttonUrl === ''
		) {
			setAttributes({ buttonUrl: undefined });
		}
		if (
			buttonColorCustom === null ||
			buttonColorCustom === 'null' ||
			buttonColorCustom === 'undefined' ||
			buttonColorCustom === ''
		) {
			setAttributes({ buttonColorCustom: undefined });
		}
		if (
			fontAwesomeIconBefore === null ||
			fontAwesomeIconBefore === 'null' ||
			fontAwesomeIconBefore === 'undefined' ||
			fontAwesomeIconBefore === ''
		) {
			setAttributes({ fontAwesomeIconBefore: undefined });
		}
		if (
			fontAwesomeIconAfter === null ||
			fontAwesomeIconAfter === 'null' ||
			fontAwesomeIconAfter === 'undefined' ||
			fontAwesomeIconAfter === ''
		) {
			setAttributes({ fontAwesomeIconAfter: undefined });
		}
		if (
			subCaption === null ||
			subCaption === 'null' ||
			subCaption === 'undefined' ||
			subCaption === ''
		) {
			setAttributes({ subCaption: undefined });
		}
	}, [clientId]);

	const { updateBlockAttributes } = dispatch('core/block-editor');

	// buttonColor が有効なら buttonColorCustom を無効化
	// プルダウンから直接カスタムを選ぶとその瞬間色が適用されなくなるので primary に戻す
	useEffect(() => {
		if (buttonColor !== 'custom') {
			updateBlockAttributes(clientId, { buttonColorCustom: undefined });
		} else if (
			buttonColorCustom === undefined &&
			buttonColor === 'custom'
		) {
			updateBlockAttributes(clientId, { buttonColor: 'primary' });
		}
	}, [buttonColor]);

	// buttonColorCustom が有効なら buttonColor を custom に
	// buttonColorCustom が空白かつ buttonColor が custom なら buttonColor を primary に
	useEffect(() => {
		if (buttonColorCustom !== undefined) {
			updateBlockAttributes(clientId, { buttonColor: 'custom' });
		} else if (
			buttonColorCustom === undefined &&
			buttonColor === 'custom'
		) {
			updateBlockAttributes(clientId, { buttonColor: 'primary' });
		}
	}, [buttonColorCustom]);

	let containerClass;
	// カスタムカラーの場合
	if (buttonColorCustom !== undefined && isHexColor(buttonColorCustom)) {
		containerClass = `vk_button vk_button-align-${buttonAlign} vk_button-color-custom vk_button-${blockId}`;
	} else {
		containerClass = `vk_button vk_button-align-${buttonAlign} vk_button-color-custom`;
	}

	const blockProps = useBlockProps({
		className: containerClass,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody 
				title={__('Button Block ID', 'vk-blocks')}
				initialOpen={false}
				>
				<TextControl
						className={`mb-0`}
						label={__('Block ID', 'vk-blocks')}
						value={blockId}
						onChange={(value) => setAttributes({ blockId: value })}
					/>
					<ul className={`mt-0 mb-3`}>
						<li>
							{__(
								'This is the identification ID for this block style.',
								'vk-blocks'
							)}
						</li>
						<li>
							{__(
								"If you don't use custom colors, you don't have to worry about it.",
								'vk-blocks'
							)}
						</li>
						<li>
							{__(
								'If you duplicate this block, please change the ID.',
								'vk-blocks'
							)}
						</li>
						<li>
							{__(
								"This ID is'not id of HTML attribute.",
								'vk-blocks'
							)}
						</li>
					</ul>
				</PanelBody>
				<PanelBody title={__('Button setting', 'vk-blocks')}>
					<TextControl
						label={__('Sub Caption', 'vk-blocks')}
						value={subCaption}
						className={`mt-0 mb-3`}
						onChange={(value) =>
							setAttributes({ subCaption: value })
						}
						placeholder={'Sub Caption'}
					/>

					<TextControl
						label={__('Button URL', 'vk-blocks')}
						value={buttonUrl}
						className={`mt-0 mb-3`}
						onChange={(value) =>
							setAttributes({ buttonUrl: value })
						}
						placeholder={'Button URL'}
					/>

					<CheckboxControl
						label={__('Open link new tab.', 'vk-blocks')}
						checked={buttonTarget}
						onChange={(checked) =>
							setAttributes({ buttonTarget: checked })
						}
					/>

					<h4 className={`mt-0 mb-2`}>
						{__('Button Size:', 'vk-blocks')}
					</h4>
					<ButtonGroup className={`mb-3`}>
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

					<h4 className={`mt-0 mb-2`}>
						{__('Button Position:', 'vk-blocks')}
					</h4>
					<ButtonGroup className={`mb-3`}>
						<Button
							isSmall
							isPrimary={buttonAlign === 'left'}
							isSecondary={buttonAlign !== 'left'}
							onClick={() =>
								setAttributes({ buttonAlign: 'left' })
							}
						>
							{__('Left', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={buttonAlign === 'center'}
							isSecondary={buttonAlign !== 'center'}
							onClick={() =>
								setAttributes({ buttonAlign: 'center' })
							}
						>
							{__('Center', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={buttonAlign === 'right'}
							isSecondary={buttonAlign !== 'right'}
							onClick={() =>
								setAttributes({ buttonAlign: 'right' })
							}
						>
							{__('Right', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={buttonAlign === 'wide'}
							isSecondary={buttonAlign !== 'wide'}
							onClick={() =>
								setAttributes({ buttonAlign: 'wide' })
							}
						>
							{__('Wide', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={buttonAlign === 'block'}
							isSecondary={buttonAlign !== 'block'}
							onClick={() =>
								setAttributes({ buttonAlign: 'block' })
							}
						>
							{__('Block', 'vk-blocks')}
						</Button>
					</ButtonGroup>

					<h4 className={`mt-0 mb-2`}>
						{__('Button Style:', 'vk-blocks')}
					</h4>
					<ButtonGroup className={`mb-2`}>
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
					<p className={`mb-3`}>
						{__(
							'If you select "No background", that you need to select a Custom Color.',
							'vk-blocks'
						)}
					</p>

					<SelectControl
						label={__('Default Color:', 'vk-blocks')}
						value={buttonColor}
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
							{
								label: __('Info', 'vk-blocks'),
								value: 'info',
							},
							{
								label: __('Warning', 'vk-blocks'),
								value: 'warning',
							},
							{
								label: __('Danger', 'vk-blocks'),
								value: 'danger',
							},
							{
								label: __('Light', 'vk-blocks'),
								value: 'light',
							},
							{
								label: __('Dark', 'vk-blocks'),
								value: 'dark',
							},
							{
								label: __('Custom Color', 'vk-blocks'),
								value: 'custom',
							},
						]}
						onChange={(value) =>
							setAttributes({ buttonColor: value })
						}
					/>
					<BaseControl
						id={`vk_block_baloon_custom_color`}
						label={__('Custom Color', 'vk-blocks')}
						help={__(
							'This custom color overrides the default color. If you want to use the default color, click the clear button.',
							'vk-blocks'
						)}
					>
						<AdvancedColorPalette
							schema={'buttonColorCustom'}
							disableSchema={'buttonColor'}
							disableValue={'custom'}
							{...props}
						/>
					</BaseControl>

					<BaseControl>
						<h4 className={`mt-0 mb-2`}>
							{__('Icon ( Font Awesome )', 'vk-blocks')}
						</h4>
						<BaseControl
							id={`vk_block_baloon_fa_before_text`}
							label={__('Before text', 'vk-blocks')}
						>
							<FontAwesome
								attributeName={'fontAwesomeIconBefore'}
								{...props}
							/>
						</BaseControl>
						<BaseControl
							id={`vk_block_baloon_fa_after_text`}
							label={__('After text', 'vk-blocks')}
						>
							<FontAwesome
								attributeName={'fontAwesomeIconAfter'}
								{...props}
							/>
						</BaseControl>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<VKBButton
					lbColorCustom={buttonColorCustom}
					lbColor={buttonColor}
					lbType={buttonType}
					lbAlign={buttonAlign}
					lbSize={buttonSize}
					lbFontAwesomeIconBefore={fontAwesomeIconBefore}
					lbFontAwesomeIconAfter={fontAwesomeIconAfter}
					lbsubCaption={subCaption}
					lbRichtext={
						<RichText
							tagName={'span'}
							className={'vk_button_link_txt'}
							onChange={(value) =>
								setAttributes({ content: value })
							}
							value={content}
							placeholder={__('Input text', 'vk-blocks')}
							allowedFormats={[
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
								'vk-blocks/nowrap',
							]}
							isSelected={true}
						/>
					}
				/>
			</div>
		</>
	);
}
