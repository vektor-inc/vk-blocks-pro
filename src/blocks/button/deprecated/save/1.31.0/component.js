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
		const richText = this.props.lbRichtext;
		const subCaption = this.props.lbsubCaption;
		let aClass = '';
		let aStyle = {};
		let iconBefore = '';
		let iconAfter = '';

		aStyle = null;
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
			fontAwesomeIconBefore = fontAwesomeIconBefore.replace(
				/ fas/g,
				'fas'
			);

			//add class and inline css
			const faIconFragmentBefore = fontAwesomeIconBefore.split(' ');
			faIconFragmentBefore[1] =
				' ' + faIconFragmentBefore[1] + ` vk_button_link_before `;
			iconBefore = faIconFragmentBefore.join('');
		}
		if (fontAwesomeIconAfter) {
			fontAwesomeIconAfter = fontAwesomeIconAfter.replace(/ fas/g, 'fas');

			//add class and inline css
			const faIconFragmentAfter = fontAwesomeIconAfter.split(' ');
			faIconFragmentAfter[1] =
				' ' + faIconFragmentAfter[1] + ` vk_button_link_after `;
			iconAfter = faIconFragmentAfter.join('');
		}

		return (
			/* eslint react/jsx-no-target-blank: 0 */
			<a
				href={buttonUrl}
				style={aStyle}
				className={aClass}
				role={'button'}
				aria-pressed={true}
				target={buttonTarget ? '_blank' : null}
				rel={'noopener'}
			>
				{parse(iconBefore)}
				{richText}
				{parse(iconAfter)}
				{/*サブキャプションが入力された時のみ表示*/}
				{subCaption && (
					<p className={'vk_button_link_subCaption'}>{subCaption}</p>
				)}
			</a>
		);
	}
}
