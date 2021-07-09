import { Component } from '@wordpress/element';
import ReactHtmlParser from 'react-html-parser';

export class VKBIcon extends Component {
	render() {
		const iconColorCustom = this.props.lbColorCustom;
		const iconColor = this.props.lbColor;
		const iconType = this.props.lbType;
		const iconAlign = this.props.lbAlign;
		const iconSize = this.props.lbSize;
		const iconUrl = this.props.lbUrl;
		const iconTarget = this.props.lbTarget;
		let fontAwesomeIconBefore = this.props.lbFontAwesomeIconBefore;
		let fontAwesomeIconAfter = this.props.lbFontAwesomeIconAfter;
		const richText = this.props.lbRichtext;
		const subCaption = this.props.lbsubCaption;
		let aClass = '';
		let aStyle = {};
		let iconBefore = '';
		let iconAfter = '';

		aStyle = null;
		aClass = `vk_icon_link`;

		if (iconType === '0' || iconType === null || iconType === '1') {
			aClass = `${aClass} btn`;
		} else {
			aClass = `${aClass} vk_icon_link-type-text`;
		}

		// 塗り
		if (iconType === '0' || iconType === null) {
			// 規定カラーの場合
			if (
				iconColorCustom === 'undefined' ||
				iconColorCustom === undefined ||
				iconColorCustom === null
			) {
				aClass = `${aClass} btn-${iconColor}`;
				aStyle = null;

				// カスタムカラーの場合
			} else {
				aStyle = {
					backgroundColor: `${iconColorCustom}`,
					border: `1px solid ${iconColorCustom}`,
					color: `#fff`,
				};
			}
			// 塗りなし
		} else if (iconType === '1') {
			// 規定カラーの場合
			if (
				iconColorCustom === 'undefined' ||
				iconColorCustom === undefined ||
				iconColorCustom === null
			) {
				aClass = `${aClass} btn-outline-${iconColor}`;
				aStyle = null;
				// カスタムカラーの場合
			} else {
				aStyle = {
					backgroundColor: 'transparent',
					border: `1px solid ${iconColorCustom}`,
					color: `${iconColorCustom}`,
				};
			}
			// テキストのみ
		} else if (iconType === '2') {
			// 規定カラーの場合
			if (
				iconColorCustom === 'undefined' ||
				iconColorCustom === undefined ||
				iconColorCustom === null
			) {
				aClass = `${aClass} btn-outline-${iconColor}`;
				aStyle = null;
				// カスタムカラーの場合
			} else {
				aStyle = {
					color: `${iconColorCustom}`,
				};
			}
		}

		aClass = `${aClass} btn-${iconSize}`;

		if (iconAlign === 'block') {
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
				' ' + faIconFragmentBefore[1] + ` vk_icon_link_before `;
			iconBefore = faIconFragmentBefore.join('');
		}
		if (fontAwesomeIconAfter) {
			fontAwesomeIconAfter = fontAwesomeIconAfter.replace(/ fas/g, 'fas');

			//add class and inline css
			const faIconFragmentAfter = fontAwesomeIconAfter.split(' ');
			faIconFragmentAfter[1] =
				' ' + faIconFragmentAfter[1] + ` vk_icon_link_after `;
			iconAfter = faIconFragmentAfter.join('');
		}

		return (
			/* eslint react/jsx-no-target-blank: 0 */
			<a
				href={iconUrl}
				style={aStyle}
				className={aClass}
				role={'icon'}
				aria-pressed={true}
				target={iconTarget ? '_blank' : null}
				rel={'noopener'}
			>
				{ReactHtmlParser(iconBefore)}
				{richText}
				{ReactHtmlParser(iconAfter)}
				{/*サブキャプションが入力された時のみ表示*/}
				{subCaption && (
					<p className={'vk_icon_link_subCaption'}>{subCaption}</p>
				)}
			</a>
		);
	}
}
