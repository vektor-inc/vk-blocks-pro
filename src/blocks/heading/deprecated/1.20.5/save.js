import { RichText, useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';

const renderTitle = (level, contents, tStyle, headingStyle) => {
	switch (level) {
		case 1:
			return (
				<h1 style={tStyle} className={headingStyle}>
					{contents}
				</h1>
			);
		case 2:
			return (
				<h2 style={tStyle} className={headingStyle}>
					{contents}
				</h2>
			);
		case 3:
			return (
				<h3 style={tStyle} className={headingStyle}>
					{contents}
				</h3>
			);
		case 4:
			return (
				<h4 style={tStyle} className={headingStyle}>
					{contents}
				</h4>
			);
		case 5:
			return (
				<h5 style={tStyle} className={headingStyle}>
					{contents}
				</h5>
			);
		case 6:
			return (
				<h6 style={tStyle} className={headingStyle}>
					{contents}
				</h6>
			);
	}
};

export default function save(props) {
	const { attributes } = props;
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
		fontAwesomeIconBefore,
		fontAwesomeIconAfter,
		fontAwesomeIconColor,
	} = attributes;
	const containerClass = `vk_heading vk_heading-style-${titleStyle}`;

	const cStyle = {
		marginBottom:
			outerMarginBottom !== null && outerMarginBottom !== undefined
				? outerMarginBottom + `rem`
				: undefined,
	};

	const tStyle = {
		color:
			titleColor !== null && titleColor !== undefined
				? titleColor
				: undefined,
		fontSize:
			titleSize !== null && titleSize !== undefined
				? titleSize + 'rem'
				: undefined,
		marginBottom:
			titleMarginBottom !== null && titleMarginBottom !== undefined
				? titleMarginBottom + 'rem'
				: undefined,
		textAlign: align !== null && align !== undefined ? align : undefined,
	};

	const headingStyle = `vk_heading_title vk_heading_title-style-${titleStyle}`;
	const subTextStyle = {
		color:
			subTextColor !== null && subTextColor !== undefined
				? subTextColor
				: undefined,
		fontSize:
			subTextSize !== null && subTextSize !== undefined
				? subTextSize + 'rem'
				: undefined,
		textAlign: align !== null && align !== undefined ? align : undefined,
	};
	const subTextClass = `vk_heading_subtext vk_heading_subtext-style-${titleStyle}`;

	let iconBefore = '';
	let iconAfter = '';
	const fontAwesomeIconStyle = fontAwesomeIconColor
		? `style="color:${fontAwesomeIconColor};"`
		: '';
	if (fontAwesomeIconBefore) {
		//add inline css
		const faIconFragmentBefore = fontAwesomeIconBefore.split('<i');
		faIconFragmentBefore[0] =
			faIconFragmentBefore[0] + `<i ${fontAwesomeIconStyle} `;
		iconBefore = faIconFragmentBefore.join('');
	}
	if (fontAwesomeIconAfter) {
		//add class and inline css
		const faIconFragmentAfter = fontAwesomeIconAfter.split('<i');
		faIconFragmentAfter[0] =
			faIconFragmentAfter[0] + `<i ${fontAwesomeIconStyle} `;
		iconAfter = faIconFragmentAfter.join('');
	}
	const titleContent = (
		<>
			{parse(iconBefore)}
			<RichText.Content tagName={'span'} value={title} />
			{parse(iconAfter)}
		</>
	);

	let subtextContent;
	if (subTextFlag === 'on') {
		subtextContent = (
			<RichText.Content
				tagName={'p'}
				value={subText}
				style={subTextStyle}
				className={subTextClass}
			/>
		);
	}

	const blockProps = useBlockProps.save({
		className: ``,
	});

	return (
		<div {...blockProps}>
			<div className={containerClass} style={cStyle}>
				{renderTitle(level, titleContent, tStyle, headingStyle)}
				{subtextContent}
			</div>
		</div>
	);
}
