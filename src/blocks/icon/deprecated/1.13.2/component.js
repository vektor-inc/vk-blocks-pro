import { Component } from '@wordpress/element';
import parse from 'html-react-parser';

export class VKBIcon extends Component {
	render() {
		let fontAwesomeIcon = this.props.lbFontAwesomeIcon;
		const iconSize = this.props.lbSize;
		const iconSizeUnit = this.props.lbSizeUnit;
		const iconMargin = this.props.lbMargin;
		const iconMarginUnit = this.props.lbMarginUnit;
		const iconRadius = this.props.lbRadius;
		const iconAlign = this.props.lbAlign;
		const iconType = this.props.lbType;
		const iconColor = this.props.lbColor;
		const iconUrl = this.props.lbUrl;
		const iconTarget = this.props.lbTarget;

		// outer & align
		let outerClass = 'vk_icon_outer';
		if (iconAlign === 'center') {
			outerClass += ' vk_icon_align_center';
		} else if (iconAlign === 'right') {
			outerClass += ' vk_icon_align_right';
		}

		// color style
		let borderClass = 'vk_icon_border';
		let borderStyle = {};

		if (iconType === '0') {
			// Solid color
			if (iconColor !== 'undefined') {
				borderStyle = {
					backgroundColor: `${iconColor}`,
					borderColor: `${iconColor}`,
				};
			}
		} else if (iconType === '1') {
			// Icon & Frame
			borderClass += ' vk_icon_border_frame';
			if (iconColor !== 'undefined') {
				borderStyle = {
					borderColor: `${iconColor}`,
				};
			}
		} else {
			// icon only
			borderClass += ' vk_icon_border_none';
			if (iconColor !== 'undefined') {
			}
		}

		// margin
		if (
			!(
				iconSize === 36 &&
				iconSizeUnit === 'px' &&
				iconMargin === 22 &&
				iconMarginUnit === 'px'
			)
		) {
			borderStyle.width =
				'calc(' +
				(iconSize + iconSizeUnit) +
				' + ' +
				(iconMargin * 2 + iconMarginUnit) +
				')';
			borderStyle.height = borderStyle.width;
		}

		// border radius
		if (iconRadius !== 50) {
			borderStyle.borderRadius = iconRadius + `%`;
		}

		// icon font
		let faIconTag = '';
		if (fontAwesomeIcon) {
			fontAwesomeIcon = fontAwesomeIcon.replace(/ fas/g, 'fas');

			// font color
			let color = null;
			if (iconType !== '0' && iconColor !== 'undefined') {
				color = `color:${iconColor}`;
			}

			// font size
			let size = null;
			if (!(iconSize === 36 && iconSizeUnit === 'px')) {
				size = ` font-size:${iconSize}${iconSizeUnit}`;
			}

			// add class and inline css
			const faIconFragment = fontAwesomeIcon.split(' ');
			faIconFragment[0] =
				faIconFragment[0] + ` style="${color}; ${size};"`;
			faIconFragment[1] = ' ' + faIconFragment[1] + ` vk_icon_font `;
			faIconTag = faIconFragment.join('');
		}

		const blockContent = (
			<>
				<div className={borderClass} style={borderStyle}>
					{parse(faIconTag)}
				</div>
			</>
		);

		let blockContentWrapper = '';
		if (iconUrl !== null && iconUrl !== undefined && iconUrl !== '') {
			blockContentWrapper = (
				/*
				 target=_blankで指定すると、WordPressが自動でnoopener noreferrerを付与する。
				 ブロックでもrelを付与しないとブロックが壊れる。
				 */
				<a
					href={iconUrl}
					className="vk_icon_link"
					target={iconTarget && '_blank'}
					rel={iconTarget && 'noopener noreferrer'}
				>
					{blockContent}
				</a>
			);
		} else {
			blockContentWrapper = blockContent;
		}

		return (
			<>
				<div className={outerClass}>{blockContentWrapper}</div>
			</>
		);
	}
}
