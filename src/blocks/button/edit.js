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
	ToolbarGroup,
	ToolbarButton,
	Dropdown,
	__experimentalUnitControl as UnitControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';
import {
	RichText,
	InspectorControls,
	useBlockProps,
	BlockControls,
	URLInput,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { dispatch, select } from '@wordpress/data';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { link, linkOff, keyboardReturn } from '@wordpress/icons';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';
export default function ButtonEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		content,
		subCaption,
		buttonUrl,
		buttonTarget,
		buttonSize,
		buttonType,
		buttonEffect,
		buttonColor,
		buttonTextColorCustom,
		buttonColorCustom,
		buttonBorderColorCustom,
		buttonAlign,
		buttonWidthMobile,
		buttonWidthTablet,
		buttonWidth,
		outerGap,
		fontAwesomeIconBefore,
		fontAwesomeIconAfter,
		iconSizeBefore,
		iconSizeAfter,
		blockId,
		old_1_31_0,
	} = attributes;

	// eslint-disable-next-line no-undef
	const iconFamily = vkFontAwesome.iconFamily;
	// 親ブロックが vk-blocks/button-outer かどうか判定
	const parents = select('core/block-editor').getBlockParentsByBlockName(
		clientId,
		['vk-blocks/button-outer']
	);
	const isInnerButton = parents.length ? true : false;

	// 以前の値を切り替え
	useEffect(() => {
		if (attributes.clientId !== undefined) {
			setAttributes({ clientId: undefined });
		}
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
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
		if (buttonColorCustom === undefined) {
			setAttributes({ buttonTextColorCustom: undefined });
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
		if (old_1_31_0 === undefined) {
			if (buttonWidthMobile === undefined) {
				setAttributes({ buttonWidthMobile: buttonWidth });
			}
			if (buttonWidthTablet === undefined) {
				setAttributes({ buttonWidthTablet: buttonWidth });
			}
			setAttributes({ old_1_31_0: true });
		}
		if (!isInnerButton) {
			setAttributes({ buttonWidth: 0 });
		}
	}, [clientId]);

	const { updateBlockAttributes } = dispatch('core/block-editor');

	// buttonColor が有効なら buttonColorCustom と buttonTextColorCustom を無効化
	// プルダウンから直接カスタムを選ぶとその瞬間色が適用されなくなるので primary に戻す
	// buttonColorCustom が有効でないと buttonTextColorCustom は意味を成さないので無効化
	useEffect(() => {
		if (buttonColor !== 'custom') {
			updateBlockAttributes(clientId, {
				buttonTextColorCustom: undefined,
			});
			updateBlockAttributes(clientId, { buttonColorCustom: undefined });
			updateBlockAttributes(clientId, { buttonBorderColorCustom: undefined });
		} else if (
			buttonColorCustom === undefined &&
			buttonColor === 'custom'
		) {
			updateBlockAttributes(clientId, { buttonColor: 'primary' });
			updateBlockAttributes(clientId, {
				buttonTextColorCustom: undefined,
				buttonBorderColorCustom: undefined,
			});
		}
	}, [buttonColor]);

	// buttonColorCustom が有効なら buttonColor を custom に
	// buttonColorCustom が空白かつ buttonColor が custom なら buttonColor を primary に
	useEffect(() => {
		if (buttonColorCustom !== undefined) {
			updateBlockAttributes(clientId, { buttonColor: 'custom' });
		} else if (buttonColor === 'custom') {
			// 背景色クリアされたらデフォルトに戻す
			updateBlockAttributes(clientId, { buttonColor: 'primary' });
		}
	}, [buttonColorCustom]);

	let containerClass;
	// カスタムカラーの場合 またはアウターにギャップが指定されれいる場合
	if (
		(buttonColorCustom !== undefined && isHexColor(buttonColorCustom)) ||
		(buttonTextColorCustom !== undefined &&
			isHexColor(buttonTextColorCustom)) ||
		outerGap
	) {
		containerClass = `vk_button vk_button-color-custom vk_button-${blockId}`;
	} else {
		containerClass = `vk_button vk_button-color-custom`;
	}

	if (isInnerButton) {
		if (buttonWidthMobile) {
			// 横並びボタンで幅が指定されている
			containerClass += ` vk_button-width-mobile-${buttonWidthMobile}`;
		}
		if (buttonWidthTablet) {
			containerClass += ` vk_button-width-tablet-${buttonWidthTablet}`;
		}
		if (buttonWidth) {
			containerClass += ` vk_button-width-${buttonWidth}`;
		}
	} else {
		containerClass += ` vk_button-align-${buttonAlign}`;
	}

	// エフェクト
	if (buttonEffect !== '') {
		containerClass += ` is-style-${buttonEffect}`;
	}

	// アイコン単位
	const units = [
		{ value: 'px', label: 'px', default: 16 },
		{ value: 'em', label: 'em', default: 1 },
		{ value: 'rem', label: 'rem', default: 1 },
	];

	const blockProps = useBlockProps({
		className: containerClass,
	});

	let inlineStyle = {};
	if (
		buttonTextColorCustom !== undefined &&
		isHexColor(buttonTextColorCustom)
	) {
		inlineStyle = {
			// 編集画面対策
			color: `${buttonTextColorCustom}`,
		};
	}

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<Dropdown
						renderToggle={({ isOpen, onToggle }) => {
							const setLink = () => {
								if (isOpen && buttonUrl !== '') {
									// linkOff
									setAttributes({ buttonUrl: '' });
								}
								onToggle();
							};
							return (
								<ToolbarButton
									aria-expanded={isOpen}
									icon={
										buttonUrl !== '' && isOpen
											? linkOff
											: link
									}
									isActive={
										buttonUrl !== '' && isOpen
											? true
											: false
									}
									label={
										buttonUrl !== '' && isOpen
											? __('Unlink')
											: __(
													'Input Link URL',
													'vk-blocks-pro'
												)
									}
									onClick={setLink}
								/>
							);
						}}
						renderContent={(params) => {
							return (
								<form
									onSubmit={() => {
										params.onClose();
									}}
								>
									<div className="vk-block-editor-url-input-wrapper">
										<URLInput
											__nextHasNoMarginBottom
											value={buttonUrl}
											onChange={(value) => {
												setAttributes({
													buttonUrl: value,
												});
											}}
										/>
										<Button
											icon={keyboardReturn}
											label={__('Submit')}
											type="submit"
										/>
									</div>
									<CheckboxControl
										label={__(
											'Open link new tab.',
											'vk-blocks-pro'
										)}
										checked={buttonTarget}
										onChange={(checked) =>
											setAttributes({
												buttonTarget: checked,
											})
										}
									/>
								</form>
							);
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Button setting', 'vk-blocks-pro')}>
					<TextControl
						label={__('Sub Caption', 'vk-blocks-pro')}
						value={subCaption}
						className={`mt-0 mb-3`}
						onChange={(value) =>
							setAttributes({ subCaption: value })
						}
						placeholder={'Sub Caption'}
					/>

					<h4 className={`mt-0 mb-2`}>
						{__('Button Size:', 'vk-blocks-pro')}
					</h4>
					<ButtonGroup className={`mb-3`}>
						<Button
							isSmall
							isPrimary={buttonSize === 'lg'}
							isSecondary={buttonSize !== 'lg'}
							onClick={() => setAttributes({ buttonSize: 'lg' })}
						>
							{__('Large', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall
							isPrimary={buttonSize === 'md'}
							isSecondary={buttonSize !== 'md'}
							onClick={() => setAttributes({ buttonSize: 'md' })}
						>
							{__('Normal', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall
							isPrimary={buttonSize === 'sm'}
							isSecondary={buttonSize !== 'sm'}
							onClick={() => setAttributes({ buttonSize: 'sm' })}
						>
							{__('Small', 'vk-blocks-pro')}
						</Button>
					</ButtonGroup>
					{!isInnerButton && (
						<>
							<h4 className={`mt-0 mb-2`}>
								{__('Button Position:', 'vk-blocks-pro')}
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
									{__('Left', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonAlign === 'center'}
									isSecondary={buttonAlign !== 'center'}
									onClick={() =>
										setAttributes({ buttonAlign: 'center' })
									}
								>
									{__('Center', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonAlign === 'right'}
									isSecondary={buttonAlign !== 'right'}
									onClick={() =>
										setAttributes({ buttonAlign: 'right' })
									}
								>
									{__('Right', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonAlign === 'wide'}
									isSecondary={buttonAlign !== 'wide'}
									onClick={() =>
										setAttributes({ buttonAlign: 'wide' })
									}
								>
									{__('Wide', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonAlign === 'block'}
									isSecondary={buttonAlign !== 'block'}
									onClick={() =>
										setAttributes({ buttonAlign: 'block' })
									}
								>
									{__('Block', 'vk-blocks-pro')}
								</Button>
							</ButtonGroup>
						</>
					)}

					{isInnerButton && (
						<>
							<h4 className={`mt-0 mb-2`}>
								{__('Button Width:', 'vk-blocks-pro')}
							</h4>
							<p className={`mt-0 mb-2`}>
								{__('Mobile', 'vk-blocks-pro')}
							</p>
							<ButtonGroup className={`mb-3`}>
								<Button
									isSmall
									isPrimary={buttonWidthMobile === 25}
									isSecondary={buttonWidthMobile !== 25}
									onClick={() =>
										setAttributes({
											buttonWidthMobile:
												buttonWidthMobile === 25
													? 0
													: 25,
										})
									}
								>
									{__('25%', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonWidthMobile === 50}
									isSecondary={buttonWidthMobile !== 50}
									onClick={() =>
										setAttributes({
											buttonWidthMobile:
												buttonWidthMobile === 50
													? 0
													: 50,
										})
									}
								>
									{__('50%', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonWidthMobile === 75}
									isSecondary={buttonWidthMobile !== 75}
									onClick={() =>
										setAttributes({
											buttonWidthMobile:
												buttonWidthMobile === 75
													? 0
													: 75,
										})
									}
								>
									{__('75%', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonWidthMobile === 100}
									isSecondary={buttonWidthMobile !== 100}
									onClick={() =>
										setAttributes({
											buttonWidthMobile:
												buttonWidthMobile === 100
													? 0
													: 100,
										})
									}
								>
									{__('100%', 'vk-blocks-pro')}
								</Button>
							</ButtonGroup>
							<p className={`mt-0 mb-2`}>
								{__('Tablet', 'vk-blocks-pro')}
							</p>
							<ButtonGroup className={`mb-3`}>
								<Button
									isSmall
									isPrimary={buttonWidthTablet === 25}
									isSecondary={buttonWidthTablet !== 25}
									onClick={() =>
										setAttributes({
											buttonWidthTablet:
												buttonWidthTablet === 25
													? 0
													: 25,
										})
									}
								>
									{__('25%', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonWidthTablet === 50}
									isSecondary={buttonWidthTablet !== 50}
									onClick={() =>
										setAttributes({
											buttonWidthTablet:
												buttonWidthTablet === 50
													? 0
													: 50,
										})
									}
								>
									{__('50%', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonWidthTablet === 75}
									isSecondary={buttonWidthTablet !== 75}
									onClick={() =>
										setAttributes({
											buttonWidthTablet:
												buttonWidthTablet === 75
													? 0
													: 75,
										})
									}
								>
									{__('75%', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonWidthTablet === 100}
									isSecondary={buttonWidthTablet !== 100}
									onClick={() =>
										setAttributes({
											buttonWidthTablet:
												buttonWidthTablet === 100
													? 0
													: 100,
										})
									}
								>
									{__('100%', 'vk-blocks-pro')}
								</Button>
							</ButtonGroup>
							<p className={`mt-0 mb-2`}>
								{__('PC', 'vk-blocks-pro')}
							</p>
							<ButtonGroup className={`mb-3`}>
								<Button
									isSmall
									isPrimary={buttonWidth === 25}
									isSecondary={buttonWidth !== 25}
									onClick={() =>
										setAttributes({
											buttonWidth:
												buttonWidth === 25 ? 0 : 25,
										})
									}
								>
									{__('25%', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonWidth === 50}
									isSecondary={buttonWidth !== 50}
									onClick={() =>
										setAttributes({
											buttonWidth:
												buttonWidth === 50 ? 0 : 50,
										})
									}
								>
									{__('50%', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonWidth === 75}
									isSecondary={buttonWidth !== 75}
									onClick={() =>
										setAttributes({
											buttonWidth:
												buttonWidth === 75 ? 0 : 75,
										})
									}
								>
									{__('75%', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonWidth === 100}
									isSecondary={buttonWidth !== 100}
									onClick={() =>
										setAttributes({
											buttonWidth:
												buttonWidth === 100 ? 0 : 100,
										})
									}
								>
									{__('100%', 'vk-blocks-pro')}
								</Button>
							</ButtonGroup>
						</>
					)}

					<h4 className={`mt-0 mb-2`}>
						{__('Button Style:', 'vk-blocks-pro')}
					</h4>
					<ButtonGroup className={`mb-2`}>
						<Button
							isSmall
							isPrimary={buttonType === '0'}
							isSecondary={buttonType !== '0'}
							onClick={() => setAttributes({ buttonType: '0' })}
						>
							{__('Solid color', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall
							isPrimary={buttonType === '1'}
							isSecondary={buttonType !== '1'}
							onClick={() => {
								setAttributes({ buttonType: '1' });
								setAttributes({
									buttonTextColorCustom: undefined,
								});
								setAttributes({ buttonEffect: '' });
							}}
						>
							{__('No background', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall
							isPrimary={buttonType === '2'}
							isSecondary={buttonType !== '2'}
							onClick={() => {
								setAttributes({ buttonType: '2' });
								setAttributes({
									buttonTextColorCustom: undefined,
								});
								setAttributes({ buttonEffect: '' });
							}}
						>
							{__('Text only', 'vk-blocks-pro')}
						</Button>
					</ButtonGroup>
					<p className={`mb-3`}>
						{__(
							'If you select "No background", that you need to select a Custom Color.',
							'vk-blocks-pro'
						)}
					</p>

					{'0' === buttonType && (
						<>
							<h4 className={`mt-0 mb-2`}>
								{__('Button Effect:', 'vk-blocks-pro')}
							</h4>
							<ButtonGroup className={`mb-3`}>
								<Button
									isSmall
									isPrimary={buttonEffect === ''}
									isSecondary={buttonEffect !== ''}
									onClick={() =>
										setAttributes({ buttonEffect: '' })
									}
								>
									{__('None', 'vk-blocks-pro')}
								</Button>
								<Button
									isSmall
									isPrimary={buttonEffect === 'shine'}
									isSecondary={buttonEffect !== 'shine'}
									onClick={() => {
										setAttributes({
											buttonEffect: 'shine',
										});
									}}
								>
									{__('Shine', 'vk-blocks-pro')}
								</Button>
							</ButtonGroup>
						</>
					)}

					<h4 className={`mt-0 mb-2`}>
						{__('Color', 'vk-blocks-pro')}
					</h4>
					<SelectControl
						label={__('Default Color (Bootstrap)', 'vk-blocks-pro')}
						value={buttonColor}
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
							{
								label: __('Custom Color', 'vk-blocks-pro'),
								value: 'custom',
							},
						]}
						onChange={(value) =>
							setAttributes({ buttonColor: value })
						}
					/>
					<BaseControl
						label={__('Custom Color', 'vk-blocks-pro')}
						id={`vk_block_button_custom_color`}
					>
						<BaseControl
							id={`vk_block_button_custom_background_color`}
							label={
								buttonType === '0' || buttonType === null
									? __('Background Color', 'vk-blocks-pro')
									: __('Button Color', 'vk-blocks-pro')
							}
							help={__(
								'This color palette overrides the default color. If you want to use the default color, click the clear button.',
								'vk-blocks-pro'
							)}
						>
							<AdvancedColorPalette
								schema={'buttonColorCustom'}
								{...props}
							/>
						</BaseControl>
						{(buttonType === '0' || buttonType === null) &&
							buttonColorCustom !== undefined && (
								<BaseControl
									id={`vk_block_button_custom_text_color`}
									label={__('Text Color', 'vk-blocks-pro')}
								>
									<AdvancedColorPalette
										schema={'buttonTextColorCustom'}
										{...props}
									/>
								</BaseControl>
							)}
					</BaseControl>
					<BaseControl
						id={`vk_block_button_custom_border_color`}
						label={__('Border Color', 'vk-blocks-pro')}
					>
						<AdvancedColorPalette
							schema={'buttonBorderColorCustom'}
							{...props}
						/>
					</BaseControl>
					<BaseControl>
						<h4 className={`mt-0 mb-2`}>
							{__('Icon', 'vk-blocks-pro') +
								' ( ' +
								iconFamily +
								' )'}
						</h4>
						<BaseControl
							id={`vk_block_button_fa_before_text`}
							label={__('Before text', 'vk-blocks-pro')}
						>
							<FontAwesome
								attributeName={'fontAwesomeIconBefore'}
								{...props}
							/>
							<UnitControl
								label={__('Size', 'vk-blocks-pro')}
								value={iconSizeBefore}
								units={units}
								onChange={(value) => {
									setAttributes({
										iconSizeBefore: parseFloat(value)
											? value
											: null,
									});
								}}
							/>
						</BaseControl>
						<hr />
						<BaseControl
							id={`vk_block_button_fa_after_text`}
							label={__('After text', 'vk-blocks-pro')}
						>
							<FontAwesome
								attributeName={'fontAwesomeIconAfter'}
								{...props}
							/>
							<UnitControl
								label={__('Size', 'vk-blocks-pro')}
								value={iconSizeAfter}
								units={units}
								onChange={(value) => {
									setAttributes({
										iconSizeAfter: parseFloat(value)
											? value
											: null,
									});
								}}
							/>
						</BaseControl>
					</BaseControl>
					<h4 className={`mt-0 mb-2`}>
						{__('Button border radius', 'vk-blocks-pro')}
					</h4>
					<UnitControl
						value={attributes.borderRadius}
						onChange={(value) => {
							setAttributes({ borderRadius: value || null });
						}}
						units={[
							{ value: 'px', label: 'px', default: 5 },
							{ value: '%', label: '%', default: 5 },
							{ value: 'em', label: 'em', default: 1 },
							{ value: 'rem', label: 'rem', default: 1 },
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<VKBButton
					lbTextColorCustom={buttonTextColorCustom}
					lbColorCustom={buttonColorCustom}
					lbBorderColorCustom={buttonBorderColorCustom}
					lbColor={buttonColor}
					lbType={buttonType}
					lbAlign={buttonAlign}
					lbSize={buttonSize}
					lbFontAwesomeIconBefore={fontAwesomeIconBefore}
					lbFontAwesomeIconAfter={fontAwesomeIconAfter}
					lbIconSizeBefore={iconSizeBefore}
					lbIconSizeAfter={iconSizeAfter}
					lbsubCaption={subCaption}
					inlineStyle={{
						...inlineStyle,
						borderRadius: attributes.borderRadius,
					}}
					lbRichtext={
						<RichText
							tagName={'span'}
							className={'vk_button_link_txt'}
							onChange={(value) =>
								setAttributes({ content: value })
							}
							value={content}
							placeholder={__('Input text', 'vk-blocks-pro')}
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
								'vk-blocks/inline-font-size',
							]}
						/>
					}
				/>
			</div>
		</>
	);
}
