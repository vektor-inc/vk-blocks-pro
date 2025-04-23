import { __ } from '@wordpress/i18n';
import {
	SelectControl,
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	BaseControl,
	__experimentalUnitControl as UnitControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import { Component } from '@wordpress/element';
import parse from 'html-react-parser';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import './style';

/**
 * ButtonSettings コンポーネント
 *
 * @param {Object} props コンポーネントのプロパティ
 * @return {JSX.Element} ボタン設定UI
 */
export const ButtonSettings = (props) => {
	const {
		attributes = {},
		setAttributes,
		isInnerButton = false,
		iconFamily = 'Font Awesome',
		units = [
			{ value: 'px', label: 'px', default: 5 },
			{ value: '%', label: '%', default: 5 },
			{ value: 'em', label: 'em', default: 1 },
			{ value: 'rem', label: 'rem', default: 1 },
		],
		// dynamic-textなどbuttonAttrsで直接渡される場合のプロパティ
		isButtonStyle,
		buttonColor: propsButtonColor,
		buttonType: propsButtonType,
		buttonSize: propsButtonSize,
		buttonEffect: propsButtonEffect,
		fontAwesomeIconBefore: propsFontAwesomeIconBefore,
		fontAwesomeIconAfter: propsFontAwesomeIconAfter,
		iconSizeBefore: propsIconSizeBefore,
		iconSizeAfter: propsIconSizeAfter,
		buttonTextColorCustom: propsButtonTextColorCustom,
		buttonColorCustom: propsButtonColorCustom,
		borderRadius: propsBorderRadius,
	} = props;

	// dynamic-textブロックの場合はtrue
	const isDynamicText = props.isButtonStyle || false;

	// vk-blocks/buttonブロックの場合は必ず表示する（buttonColorとbuttonSizeが常に存在する）
	// dynamic-textなど、他のブロックではbuttonColorとbuttonSizeの有無またはisButtonStyleでボタン設定かどうかを判断
	const blockName = props.name || '';
	const isButtonBlock =
		blockName === 'vk-blocks/button' || blockName.includes('/button');

	// attributesとプロパティを両方対応できるようにする
	const effectiveButtonColor = propsButtonColor || attributes.buttonColor;
	const effectiveButtonType = propsButtonType || attributes.buttonType;
	const effectiveButtonSize = propsButtonSize || attributes.buttonSize;
	const effectiveButtonEffect = propsButtonEffect || attributes.buttonEffect;
	const effectiveButtonTextColorCustom =
		propsButtonTextColorCustom || attributes.buttonTextColorCustom;
	const effectiveButtonColorCustom =
		propsButtonColorCustom || attributes.buttonColorCustom;

	// 直接渡されたプロパティの場合はtrue（dynamic-textなど）
	const hasDirectButtonProps =
		isButtonStyle ||
		!!propsButtonColor ||
		!!propsButtonType ||
		!!propsButtonSize ||
		!!propsButtonEffect;

	// このブロックがボタン設定をサポートしていない場合は表示しない
	if (
		!isButtonBlock &&
		!hasDirectButtonProps &&
		attributes.buttonSize === undefined &&
		attributes.buttonColor === undefined
	) {
		return (
			<div className="vk-button-settings-not-available">
				<p>
					{__(
						'This component is not available for this block.',
						'vk-blocks-pro'
					)}
				</p>
			</div>
		);
	}

	// 属性にデフォルト値を設定（存在しない場合はundefinedのままにする）
	const {
		buttonSize = effectiveButtonSize || 'md',
		buttonAlign = 'center',
		buttonEffect = effectiveButtonEffect || 'none',
		buttonType = effectiveButtonType || '0',
		buttonColor = effectiveButtonColor || 'primary',
		fontAwesomeIconBefore = propsFontAwesomeIconBefore,
		fontAwesomeIconAfter = propsFontAwesomeIconAfter,
		iconSizeBefore = propsIconSizeBefore,
		iconSizeAfter = propsIconSizeAfter,
		buttonWidth = 0,
		buttonWidthTablet = 0,
		buttonWidthMobile = 0,
	} = attributes;

	// subCaptionとカスタムカラー関連は別途処理
	const buttonColorCustom = effectiveButtonColorCustom;
	const buttonTextColorCustom = effectiveButtonTextColorCustom;

	// setAttributesが存在しない場合、渡されたpropsを使う（dynamic-text用）
	const handleSetAttribute = (attrObj) => {
		if (setAttributes) {
			setAttributes(attrObj);
		}
	};

	// dynamic-textブロックの場合はbuttonEffect,buttonWidthなどの不要項目を削除
	const isDynamicTextButtonSettings = isDynamicText || isButtonStyle;

	return (
		<>
			<TextControl
				label={__('Sub Caption', 'vk-blocks-pro')}
				onChange={(value) => handleSetAttribute({ subCaption: value })}
				value={attributes.subCaption}
			/>

			<h4 className="mt-0 mb-2">{__('Button Size:', 'vk-blocks-pro')}</h4>
			<ToggleGroupControl
				value={buttonSize}
				onChange={(value) => handleSetAttribute({ buttonSize: value })}
				isBlock
			>
				<ToggleGroupControlOption
					value="lg"
					label={__('Large', 'vk-blocks-pro')}
				/>
				<ToggleGroupControlOption
					value="md"
					label={__('Normal', 'vk-blocks-pro')}
				/>
				<ToggleGroupControlOption
					value="sm"
					label={__('Small', 'vk-blocks-pro')}
				/>
			</ToggleGroupControl>

			{!isInnerButton &&
				!isDynamicText &&
				attributes.buttonAlign !== undefined && (
					<>
						<h4 className="mt-0 mb-2">
							{__('Button Position:', 'vk-blocks-pro')}
						</h4>
						<ToggleGroupControl
							value={buttonAlign}
							onChange={(value) =>
								handleSetAttribute({ buttonAlign: value })
							}
							className="vk-button-align-control"
							isBlock
						>
							<ToggleGroupControlOption
								value="left"
								label={__('Left', 'vk-blocks-pro')}
							/>
							<ToggleGroupControlOption
								value="center"
								label={__('Center', 'vk-blocks-pro')}
							/>
							<ToggleGroupControlOption
								value="right"
								label={__('Right', 'vk-blocks-pro')}
							/>
							<ToggleGroupControlOption
								value="wide"
								label={__('Wide', 'vk-blocks-pro')}
							/>
							<ToggleGroupControlOption
								value="block"
								label={__('Block', 'vk-blocks-pro')}
							/>
						</ToggleGroupControl>
						<style>{`
						.vk-button-align-control .components-toggle-group-control-option-base {
							padding: 0;
						}
					`}</style>
					</>
				)}

			{isDynamicText && (
				<>
					<h4 className="mt-0 mb-2">
						{__('Button Position:', 'vk-blocks-pro')}
					</h4>
					<ToggleGroupControl
						value={buttonAlign}
						onChange={(value) =>
							handleSetAttribute({ buttonAlign: value })
						}
						className="vk-button-align-control"
						isBlock
					>
						<ToggleGroupControlOption
							value="left"
							label={__('Left', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="center"
							label={__('Center', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="right"
							label={__('Right', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="wide"
							label={__('Wide', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="block"
							label={__('Block', 'vk-blocks-pro')}
						/>
					</ToggleGroupControl>
					<style>{`
						.vk-button-align-control .components-toggle-group-control-option-base {
							padding: 0;
						}
					`}</style>
				</>
			)}

			{isInnerButton && attributes.buttonWidth !== undefined && (
				<>
					<h4 className="mt-0 mb-2">
						{__('Button Width:', 'vk-blocks-pro')}
					</h4>
					<p className="mt-0 mb-2">{__('Mobile', 'vk-blocks-pro')}</p>
					<ToggleGroupControl
						value={String(buttonWidthMobile)}
						onChange={(value) => {
							handleSetAttribute({
								buttonWidthMobile: Number(value),
							});
						}}
						isBlock
					>
						<ToggleGroupControlOption value="0" label="Auto" />
						<ToggleGroupControlOption value="25" label="25%" />
						<ToggleGroupControlOption value="50" label="50%" />
						<ToggleGroupControlOption value="75" label="75%" />
						<ToggleGroupControlOption value="100" label="100%" />
					</ToggleGroupControl>

					<p className="mt-0 mb-2">{__('Tablet', 'vk-blocks-pro')}</p>
					<ToggleGroupControl
						value={String(buttonWidthTablet)}
						onChange={(value) => {
							handleSetAttribute({
								buttonWidthTablet: Number(value),
							});
						}}
						isBlock
					>
						<ToggleGroupControlOption value="0" label="Auto" />
						<ToggleGroupControlOption value="25" label="25%" />
						<ToggleGroupControlOption value="50" label="50%" />
						<ToggleGroupControlOption value="75" label="75%" />
						<ToggleGroupControlOption value="100" label="100%" />
					</ToggleGroupControl>

					<p className="mt-0 mb-2">{__('PC', 'vk-blocks-pro')}</p>
					<ToggleGroupControl
						value={String(buttonWidth)}
						onChange={(value) => {
							handleSetAttribute({
								buttonWidth: Number(value),
							});
						}}
						isBlock
					>
						<ToggleGroupControlOption value="0" label="Auto" />
						<ToggleGroupControlOption value="25" label="25%" />
						<ToggleGroupControlOption value="50" label="50%" />
						<ToggleGroupControlOption value="75" label="75%" />
						<ToggleGroupControlOption value="100" label="100%" />
					</ToggleGroupControl>
				</>
			)}

			<h4 className="mt-0 mb-2">
				{__('Button Style:', 'vk-blocks-pro')}
			</h4>
			<ToggleGroupControl
				value={buttonType}
				onChange={(value) => {
					handleSetAttribute({ buttonType: value });

					if (value === '1' || value === '2') {
						handleSetAttribute({
							buttonTextColorCustom: undefined,
							buttonEffect: 'none',
						});
					}
				}}
				isBlock
			>
				<ToggleGroupControlOption
					value="0"
					label={__('Solid color', 'vk-blocks-pro')}
				/>
				<ToggleGroupControlOption
					value="1"
					label={__('No background', 'vk-blocks-pro')}
				/>
				<ToggleGroupControlOption
					value="2"
					label={__('Text only', 'vk-blocks-pro')}
				/>
			</ToggleGroupControl>
			<p className="mb-3">
				{__(
					'If you select "No background", that you need to select a Custom Color.',
					'vk-blocks-pro'
				)}
			</p>

			{('0' === buttonType || buttonType === null) &&
				(isDynamicText || attributes.buttonEffect !== undefined) && (
					<>
						<h4 className="mt-0 mb-2">
							{__('Button Effect:', 'vk-blocks-pro')}
						</h4>
						<ToggleGroupControl
							value={buttonEffect}
							onChange={(value) =>
								handleSetAttribute({ buttonEffect: value })
							}
							isBlock
						>
							<ToggleGroupControlOption
								value="none"
								label={__('None', 'vk-blocks-pro')}
							/>
							<ToggleGroupControlOption
								value="shine"
								label={__('Shine', 'vk-blocks-pro')}
							/>
						</ToggleGroupControl>
					</>
				)}

			<h4 className="mt-0 mb-2">{__('Color', 'vk-blocks-pro')}</h4>
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
				onChange={(value) => handleSetAttribute({ buttonColor: value })}
			/>

			{/* dynamic-text用のアイコン選択UI */}
			{isDynamicTextButtonSettings && (
				<>
					{/* dynamic-text用のカスタムカラー設定 */}
					<BaseControl
						label={__('Custom Color', 'vk-blocks-pro')}
						id="vk-block-button-custom-color-dynamic"
					>
						<BaseControl
							id="vk-block-button-custom-background-color-dynamic"
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
							buttonTextColorCustom !== undefined && (
							<BaseControl
								id="vk-block-button-custom-text-color-dynamic"
								label={__('Text Color', 'vk-blocks-pro')}
							>
								<AdvancedColorPalette
									schema={'buttonTextColorCustom'}
									{...props}
								/>
							</BaseControl>
						)}
					</BaseControl>

					{/* dynamic-text用のボーダーラジウス設定 */}
					<h4 className="mt-0 mb-2">
						{__('Button border radius', 'vk-blocks-pro')}
					</h4>
					<UnitControl
						value={propsBorderRadius}
						onChange={(value) => {
							handleSetAttribute({ borderRadius: value || null });
						}}
						units={[
							{ value: 'px', label: 'px', default: 5 },
							{ value: '%', label: '%', default: 5 },
							{ value: 'em', label: 'em', default: 1 },
							{ value: 'rem', label: 'rem', default: 1 },
						]}
					/>

					<h4 className="mt-0 mb-2">{__('Icon', 'vk-blocks-pro')}</h4>
					<BaseControl
						id="vk-block-button-fa-before-text-dynamic"
						label={__('Before text', 'vk-blocks-pro')}
					>
						<FontAwesome
							attributeName={'fontAwesomeIconBefore'}
							attributes={{
								fontAwesomeIconBefore,
							}}
							setAttributes={handleSetAttribute}
						/>
						<UnitControl
							label={__('Size', 'vk-blocks-pro')}
							value={iconSizeBefore}
							units={units}
							onChange={(value) => {
								handleSetAttribute({
									iconSizeBefore: parseFloat(value)
										? value
										: null,
								});
							}}
						/>
					</BaseControl>
					<hr />
					<BaseControl
						id="vk-block-button-fa-after-text-dynamic"
						label={__('After text', 'vk-blocks-pro')}
					>
						<FontAwesome
							attributeName={'fontAwesomeIconAfter'}
							attributes={{
								fontAwesomeIconAfter,
							}}
							setAttributes={handleSetAttribute}
						/>
						<UnitControl
							label={__('Size', 'vk-blocks-pro')}
							value={iconSizeAfter}
							units={units}
							onChange={(value) => {
								handleSetAttribute({
									iconSizeAfter: parseFloat(value)
										? value
										: null,
								});
							}}
						/>
					</BaseControl>
				</>
			)}

			{/* 通常のボタン設定（buttonブロック用） */}
			{
				<>
					<BaseControl
						label={__('Custom Color', 'vk-blocks-pro')}
						id="vk-block-button-custom-color"
					>
						<BaseControl
							id="vk-block-button-custom-background-color"
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
									id="vk-block-button-custom-text-color"
									label={__('Text Color', 'vk-blocks-pro')}
								>
									<AdvancedColorPalette
										schema={'buttonTextColorCustom'}
										{...props}
									/>
								</BaseControl>
							)}
					</BaseControl>

					<BaseControl>
						<h4 className="mt-0 mb-2">
							{__('Icon', 'vk-blocks-pro') +
								' ( ' +
								iconFamily +
								' )'}
						</h4>
						<BaseControl
							id="vk-block-button-fa-before-text"
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
									handleSetAttribute({
										iconSizeBefore: parseFloat(value)
											? value
											: null,
									});
								}}
							/>
						</BaseControl>
						<hr />
						<BaseControl
							id="vk-block-button-fa-after-text"
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
									handleSetAttribute({
										iconSizeAfter: parseFloat(value)
											? value
											: null,
									});
								}}
							/>
						</BaseControl>
					</BaseControl>

					<h4 className="mt-0 mb-2">
						{__('Button border radius', 'vk-blocks-pro')}
					</h4>
					<UnitControl
						value={attributes.borderRadius}
						onChange={(value) => {
							handleSetAttribute({ borderRadius: value || null });
						}}
						units={[
							{ value: 'px', label: 'px', default: 5 },
							{ value: '%', label: '%', default: 5 },
							{ value: 'em', label: 'em', default: 1 },
							{ value: 'rem', label: 'rem', default: 1 },
						]}
					/>
				</>
			}
		</>
	);
};

export default ButtonSettings;

export class VKBButton extends Component {
	render() {
		const buttonTextColorCustom = this.props.lbTextColorCustom;
		const buttonColorCustom = this.props.lbColorCustom;
		const buttonColor = this.props.lbColor;
		const buttonType = this.props.lbType;
		const buttonAlign = this.props.lbAlign;
		const buttonSize = this.props.lbSize;
		const buttonUrl = this.props.lbUrl;
		const buttonTarget = this.props.lbTarget;
		let fontAwesomeIconBefore = this.props.lbFontAwesomeIconBefore;
		let fontAwesomeIconAfter = this.props.lbFontAwesomeIconAfter;
		const iconSizeBefore = this.props.lbIconSizeBefore;
		const iconSizeAfter = this.props.lbIconSizeAfter;
		const richText = this.props.lbRichtext;
		const subCaption = this.props.subCaption;
		const inlineStyle = this.props.inlineStyle;
		const borderRadius = this.props.borderRadius;
		let aClass = '';
		let iconBefore = '';
		let iconAfter = '';

		aClass = `vk_button_link`;

		// 塗り
		if (buttonType === '0' || buttonType === null) {
			// 規定カラーの場合
			if (buttonColor !== 'custom' && buttonColorCustom === undefined) {
				aClass += ` btn has-background has-vk-color-${buttonColor}-background-color`;
			} else {
				aClass += ` btn has-background`;
				// カスタムパレットカラーの場合
				if (!isHexColor(buttonColorCustom)) {
					aClass += ` has-${buttonColorCustom}-background-color`;
				}
			}

			// 文字色
			if (
				buttonColor === 'custom' &&
				buttonTextColorCustom !== undefined
			) {
				aClass += ` btn has-text-color`;
				// カスタムパレットカラーの場合
				if (!isHexColor(buttonTextColorCustom)) {
					aClass += ` has-${buttonTextColorCustom}-color`;
				}
			}
			// 塗りなし
		} else if (buttonType === '1') {
			// 規定カラーの場合
			if (buttonColor !== 'custom' && buttonColorCustom === undefined) {
				aClass += ` btn has-text-color is-style-outline has-vk-color-${buttonColor}-color`;
			} else {
				aClass += ` btn has-text-color is-style-outline`;
				// カスタムパレットカラーの場合
				if (!isHexColor(buttonColorCustom)) {
					aClass += ` has-${buttonColorCustom}-color`;
				}
			}
			// テキストのみ
		} else if (buttonType === '2') {
			// 規定カラーの場合
			if (buttonColor !== 'custom' && buttonColorCustom === undefined) {
				aClass += ` has-text-color vk_button_link-type-text has-vk-color-${buttonColor}-color`;
			} else {
				aClass += ` has-text-color vk_button_link-type-text`;
				// カスタムパレットカラーの場合
				if (!isHexColor(buttonColorCustom)) {
					aClass += ` has-${buttonColorCustom}-color`;
				}
			}
		}

		aClass = `${aClass} btn-${buttonSize}`;

		if (buttonAlign === 'block') {
			aClass = `${aClass} btn-block`;
		}

		//過去バージョンをリカバリーした時にiconを正常に表示する
		if (fontAwesomeIconBefore && !fontAwesomeIconBefore.match(/<i/)) {
			fontAwesomeIconBefore = `<i class="${fontAwesomeIconBefore}"></i>`;
		}
		if (fontAwesomeIconAfter && !fontAwesomeIconAfter.match(/<i/)) {
			fontAwesomeIconAfter = `<i class="${fontAwesomeIconAfter}"></i>`;
		}

		if (fontAwesomeIconBefore) {
			let fontAwesomeIconBeforeClassName =
				fontAwesomeIconBefore.match(/class="(.*?)"/)[1];
			fontAwesomeIconBeforeClassName += ` vk_button_link_before`;
			const styleBefore = iconSizeBefore
				? ` style='font-size: ${iconSizeBefore}'`
				: '';
			iconBefore = `<i class="${fontAwesomeIconBeforeClassName}"${styleBefore}></i>`;
		}
		if (fontAwesomeIconAfter) {
			let fontAwesomeIconAfterClassName =
				fontAwesomeIconAfter.match(/class="(.*?)"/)[1];
			fontAwesomeIconAfterClassName += ` vk_button_link_after`;
			const styleAfter = iconSizeAfter
				? ` style='font-size: ${iconSizeAfter}'`
				: '';
			iconAfter = `<i class="${fontAwesomeIconAfterClassName}"${styleAfter}></i>`;
		}

		// inlineStyleからborderRadiusを含む新しいスタイルオブジェクトを構築
		const btnInlineStyle = { ...inlineStyle };
		if (borderRadius) {
			btnInlineStyle.borderRadius = borderRadius;
		}

		return (
			/* eslint react/jsx-no-target-blank: 0 */
			<a
				href={buttonUrl}
				style={btnInlineStyle}
				className={aClass}
				role={'button'}
				aria-pressed={true}
				target={buttonTarget ? '_blank' : null}
				rel={'noopener'}
			>
				<div className={'vk_button_link_caption'}>
					{parse(iconBefore)}
					{richText}
					{parse(iconAfter)}
				</div>
				{/*サブキャプションが入力された時のみ表示*/}
				{subCaption !== '' && (
					<p className={'vk_button_link_subCaption'}>{subCaption}</p>
				)}
			</a>
		);
	}
}
