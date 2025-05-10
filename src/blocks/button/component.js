import { Component } from '@wordpress/element';
import parse from 'html-react-parser';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

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
		const subCaption = this.props.lbsubCaption;
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

		// 文字色がカスタムカラーの場合
		/*
		if (
			buttonTextColorCustom !== undefined &&
			isHexColor(buttonTextColorCustom) &&
			isSelected
		) {
			aStyle = {
				// 編集画面対策
				color: `${buttonTextColorCustom}`,
			};
		}
		*/

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
