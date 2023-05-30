import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element'

export class VKBHeadingV0_24_1 extends Component {
	render() {
		const {
			level,
			align,
			title,
			titleColor,
			titleSize,
			subText,
			subTextFlag,
			subTextColor,
			subTextSize,
			titleStyle,
			titleMarginBottom,
			outerMarginBottom,
		} = this.props.attributes;
		const setAttributes = this.props.setAttributes;
		const for_ = this.props.for_;

		const containerClass = `vk_heading vk_heading-style-${titleStyle}`;
		const tagName = 'h' + level;
		let cStyle;
		let tStyle;

		//containerのマージンを切り替え
		if (outerMarginBottom !== null) {
			cStyle = { marginBottom: outerMarginBottom + `rem` };
		}

		//titleのマージンを切り替え
		if (titleMarginBottom !== null) {
			tStyle = {
				color: titleColor,
				fontSize: titleSize + 'rem',
				marginBottom: titleMarginBottom + 'rem',
				textAlign: align,
			};
		} else {
			tStyle = {
				color: titleColor,
				fontSize: titleSize + 'rem',
				textAlign: align,
			};
		}

		if (for_ === 'edit') {
			return (
				<div className={containerClass} style={cStyle}>
					<RichText
						tagName={tagName}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						style={tStyle}
						className={`vk_heading_title vk_heading_title-style-${titleStyle}`}
						placeholder={__('Input title…', 'vk-blocks-pro')}
					/>
					{
						// サブテキスト
						(() => {
							if (subTextFlag === 'on') {
								return (
									<RichText
										tagName={'p'}
										value={subText}
										onChange={(value) =>
											setAttributes({ subText: value })
										}
										style={{
											color: subTextColor,
											fontSize: subTextSize + 'rem',
											textAlign: align,
										}}
										className={`vk_heading_subtext vk_heading_subtext-style-${titleStyle}`}
										placeholder={__(
											'Input sub text…',
											'vk-blocks-pro'
										)}
									/>
								);
							}
						})()
					}
				</div>
			);
		} else if (for_ === 'save') {
			return (
				<div className={containerClass} style={cStyle}>
					<RichText.Content
						tagName={tagName}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						style={tStyle}
						className={`vk_heading_title vk_heading_title-style-${titleStyle}`}
						placeholder={__('Input title…', 'vk-blocks-pro')}
					/>
					{
						// サブテキスト
						(() => {
							if (subTextFlag === 'on') {
								return (
									<RichText.Content
										tagName={'p'}
										value={subText}
										onChange={(value) =>
											setAttributes({ subText: value })
										}
										style={{
											color: subTextColor,
											fontSize: subTextSize + 'rem',
											textAlign: align,
										}}
										className={`vk_heading_subtext vk_heading_subtext-style-${titleStyle}`}
										placeholder={__(
											'Input sub text…',
											'vk-blocks-pro'
										)}
									/>
								);
							}
						})()
					}
				</div>
			);
		}
	}
}
