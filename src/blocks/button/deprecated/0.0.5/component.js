import { Component } from '@wordpress/element';

export class VKBButton extends Component {
	render() {
		const buttonColorCustom = this.props.lbColorCustom;
		const buttonColor = this.props.lbColor;
		const buttonType = this.props.lbType;
		const buttonAlign = this.props.lbAlign;
		const buttonSize = this.props.lbSize;
		const buttonUrl = this.props.lbUrl;
		const buttonTarget = this.props.lbTarget;
		const fontAwesomeIconBefore = this.props.lbFontAwesomeIconBefore;
		const fontAwesomeIconAfter = this.props.lbFontAwesomeIconAfter;
		const richText = this.props.lbRichtext;
		const subCaption = this.props.lbsubCaption;
		let aClass = '';
		let aStyle = {};
		let iconBefore = '';
		let iconAfter = '';

		aStyle = null;
		aClass = `vk_button_link`;

		if (buttonType === '0' || buttonType === null || buttonType === '1') {
			aClass = `${aClass} btn`;
		} else {
			aClass = `${aClass} vk_button_link-type-text`;
		}

		// 塗り
		if (buttonType === '0' || buttonType === null) {
			// 規定カラーの場合
			if (
				buttonColorCustom === 'undefined' ||
				buttonColorCustom === undefined ||
				buttonColorCustom === null
			) {
				aClass = `${aClass} btn-${buttonColor}`;
				aStyle = null;

				// カスタムカラーの場合
			} else {
				aStyle = {
					backgroundColor: buttonColorCustom,
					border: `1px solid ${buttonColorCustom}`,
					color: `#fff`,
				};
			}
			// 塗りなし
		} else if (buttonType === '1') {
			// 規定カラーの場合
			if (
				buttonColorCustom === 'undefined' ||
				buttonColorCustom === undefined ||
				buttonColorCustom === null
			) {
				aClass = `${aClass} btn-outline-${buttonColor}`;
				aStyle = null;
				// カスタムカラーの場合
			} else {
				aStyle = {
					backgroundColor: 'transparent',
					border: '1px solid ' + buttonColorCustom,
					color: buttonColorCustom,
				};
			}
			// テキストのみ
		} else if (buttonType === '2') {
			// 規定カラーの場合
			if (
				buttonColorCustom === 'undefined' ||
				buttonColorCustom === undefined ||
				buttonColorCustom === null
			) {
				aClass = `${aClass} btn-outline-${buttonColor}`;
				aStyle = null;
				// カスタムカラーの場合
			} else {
				aStyle = {
					color: buttonColorCustom,
				};
			}
		}

		aClass = `${aClass} btn-${buttonSize}`;

		if (buttonAlign === 'block') {
			aClass = `${aClass} btn-block`;
		}
		if (fontAwesomeIconBefore) {
			iconBefore = (
				<i
					className={`${fontAwesomeIconBefore} vk_button_link_before`}
				></i>
			);
		}
		if (fontAwesomeIconAfter) {
			iconAfter = (
				<i
					className={`${fontAwesomeIconAfter} vk_button_link_after`}
				></i>
			);
		}

		return (
			<a
				href={buttonUrl}
				id={'vk_button_link'}
				style={aStyle}
				className={aClass}
				role={'button'}
				aria-pressed={true}
				target={buttonTarget ? '_blank' : null}
				rel={'noopener noreferrer'}
			>
				{iconBefore}
				{richText}
				{iconAfter}
				{/*サブキャプションが入力された時のみ表示*/}
				{subCaption && (
					<p className={'vk_button_link_subCaption'}>{subCaption}</p>
				)}
			</a>
		);
	}
}
