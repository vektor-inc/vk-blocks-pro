import { RichText, useBlockProps } from '@wordpress/block-editor';

import parse from 'html-react-parser';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import classnames from 'classnames';
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';

const renderTitle = (level, contents, tStyle, headingStyle, headingProps) => {
	switch (level) {
		case 1:
			return (
				<h1 {...headingProps} style={tStyle} className={headingStyle}>
					{contents}
				</h1>
			);
		case 2:
			return (
				<h2 {...headingProps} style={tStyle} className={headingStyle}>
					{contents}
				</h2>
			);
		case 3:
			return (
				<h3 {...headingProps} style={tStyle} className={headingStyle}>
					{contents}
				</h3>
			);
		case 4:
			return (
				<h4 {...headingProps} style={tStyle} className={headingStyle}>
					{contents}
				</h4>
			);
		case 5:
			return (
				<h5 {...headingProps} style={tStyle} className={headingStyle}>
					{contents}
				</h5>
			);
		case 6:
			return (
				<h6 {...headingProps} style={tStyle} className={headingStyle}>
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
		excludeFromToc,
		anchor,
	} = attributes;
	const containerClass = `vk_heading vk_heading-style-${titleStyle}`;

	const cStyle = {
		marginBottom:
			outerMarginBottom !== null && outerMarginBottom !== undefined
				? outerMarginBottom + `rem`
				: undefined,
	};

	let headingColorClassName = '';
	if (titleColor !== undefined) {
		headingColorClassName += `has-text-color`;
		if (!isHexColor(titleColor)) {
			headingColorClassName += ` has-${sanitizeSlug(titleColor)}-color`;
		}
	}

	const headingStyle = classnames('vk_heading_title', {
		[`vk_heading_title-style-${titleStyle}`]: !!titleStyle,
		[`${headingColorClassName}`]: !!headingColorClassName,
	});

	const tStyle = {
		color:
			titleColor !== null &&
			titleColor !== undefined &&
			isHexColor(titleColor)
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

	let subTextColorClassName = '';
	if (subTextColor !== undefined) {
		subTextColorClassName += `has-text-color`;
		if (!isHexColor(subTextColor)) {
			subTextColorClassName += ` has-${sanitizeSlug(subTextColor)}-color`;
		}
	}

	const subTextClass = classnames('vk_heading_subtext', {
		[`vk_heading_subtext-style-${titleStyle}`]: !!titleStyle,
		[`${subTextColorClassName}`]: !!subTextColorClassName,
	});

	const subTextStyle = {
		color:
			subTextColor !== null &&
			subTextColor !== undefined &&
			isHexColor(subTextColor)
				? subTextColor
				: undefined,
		fontSize:
			subTextSize !== null && subTextSize !== undefined
				? subTextSize + 'rem'
				: undefined,
		textAlign: align !== null && align !== undefined ? align : undefined,
	};

	let iconColorClassName = '';
	if (fontAwesomeIconColor !== undefined) {
		iconColorClassName += `has-text-color`;
		if (!isHexColor(fontAwesomeIconColor)) {
			iconColorClassName += ` has-${sanitizeSlug(fontAwesomeIconColor)}-color`;
		}
	}

	const fontAwesomeIconStyle =
		fontAwesomeIconColor && isHexColor(fontAwesomeIconColor)
			? `style="color:${fontAwesomeIconColor};"`
			: '';

	let iconBefore = fontAwesomeIconBefore;
	let iconAfter = fontAwesomeIconAfter;
	//add class
	if (iconBefore && iconColorClassName) {
		const faIconFragmentBefore = iconBefore.split('<i class="');
		faIconFragmentBefore[0] =
			faIconFragmentBefore[0] + `<i class="${iconColorClassName} `;
		iconBefore = faIconFragmentBefore.join('');
	}

	if (iconAfter && iconColorClassName) {
		const faIconFragmentAfter = iconAfter.split('<i class="');
		faIconFragmentAfter[0] =
			faIconFragmentAfter[0] + `<i class="${iconColorClassName} `;
		iconAfter = faIconFragmentAfter.join('');
	}

	//add inline css
	if (iconBefore && fontAwesomeIconStyle) {
		const faIconFragmentBefore = iconBefore.split('<i');
		faIconFragmentBefore[0] =
			faIconFragmentBefore[0] + `<i ${fontAwesomeIconStyle} `;
		iconBefore = faIconFragmentBefore.join('');
	}

	if (iconAfter && fontAwesomeIconStyle) {
		const faIconFragmentAfter = iconAfter.split('<i');
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

	const headingProps = {
		id: anchor,
		...(excludeFromToc ? { 'data-vk-toc-exclude': 'true' } : {}),
		style: tStyle,
		className: headingStyle,
	};

	return (
		<div {...blockProps}>
			<div className={containerClass} style={cStyle}>
				{renderTitle(level, titleContent, tStyle, headingStyle, headingProps)}
				{subtextContent}
			</div>
		</div>
	);
}
