import { Component } from '@wordpress/element';
import ReactHtmlParser from 'react-html-parser';

export class VKBIcon extends Component {
	render() {
		const iconUrl = this.props.lbUrl;
		const iconTarget = this.props.lbTarget;
		const iconSize = this.props.lbSize;
		const iconMargin = this.props.lpMargin;
		const iconRadius = this.props.lpRadius;
		const iconUnit = this.props.lpUnit;
		const iconAlign = this.props.lbAlign;
		const iconType = this.props.lbType;
		const iconColor = this.props.lbColor;
		let fontAwesomeIcon = this.props.lbFontAwesomeIcon;

		// outer & align
		let outerClass = 'vk_icon_outer';
		if (iconAlign === 'center') {
			outerClass += ' vk_icon_outer_align_center';
		} else if (iconAlign === 'right') {
			outerClass += ' vk_icon_outer_align_right';
		}

		// border
		const borderClass = 'vk_icon_border';

		// icon type & color
		let borderStyle = {};
		let faIconTag = '';

		borderStyle = null;
		let color;

		if (iconType === '0') {
			// Solid color
			borderStyle = {
				backgroundColor: `${iconColor}`,
				border: `1px solid ${iconColor}`,
			};
			color = `#ffffff`;
		} else if (iconType === '1') {
			// No background
			borderStyle = {
				border: `1px solid ${iconColor}`,
			};
			color = `${iconColor}`;
		} else {
			// Icon only
			color = `${iconColor}`;
		}

		// icon font
		if (fontAwesomeIcon) {
			fontAwesomeIcon = fontAwesomeIcon.replace(/ fas/g, 'fas');

			//add class and inline css
			const faIconFragment = fontAwesomeIcon.split(' ');
			faIconFragment[0] = faIconFragment[0] + ` style="color:${color}" `;
			faIconFragment[1] = ' ' + faIconFragment[1] + ` vk_icon_font `;
			faIconTag = faIconFragment.join('');
		}

		const blockContent = (
			<>
				<div className={borderClass} style={borderStyle}>
					{ReactHtmlParser(faIconTag)}
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
