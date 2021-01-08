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
		let aClass = '';
		let aStyle = {};
		let iconBefore = '';
		let iconAfter = '';

		aClass = `btn vk_button_link`;

		if (buttonColorCustom) {
			aClass = `${aClass} btn-primary btn-${buttonSize}`;

			// 塗り
			if (buttonType === '0') {
				aStyle = {
					backgroundColor: buttonColorCustom,
					border: `1px solid ${buttonColorCustom}`,
				};
				// 塗りなし
			} else if (buttonType === '1') {
				aStyle = {
					backgroundColor: 'transparent',
					border: '1px solid ' + buttonColorCustom,
					color: buttonColorCustom,
				};
			}

			// カスタムカラーじゃない場合
		} else if (!buttonColorCustom) {
			// 塗り
			if (buttonType === '0') {
				aClass = `${aClass} btn-${buttonSize} btn-${buttonColor}`;
				aStyle = null;
				// 塗りなし
			} else if (buttonType === '1') {
				aClass = `${aClass} btn-${buttonSize} btn-outline-${buttonColor}`;
				aStyle = null;
			}
		}

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
				className={aClass}
				role={'button'}
				aria-pressed={true}
				style={aStyle}
				target={buttonTarget ? '_blank' : null}
			>
				{iconBefore}
				{richText}
				{iconAfter}
			</a>
		);
	}
}
