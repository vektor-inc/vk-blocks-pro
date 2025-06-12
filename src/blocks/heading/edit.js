import { FontAwesome } from '@vkblocks/utils/font-awesome-new';

import HeadingLevelDropdown from './heading-level-dropdown';
import { __ } from '@wordpress/i18n';
import {
	RangeControl,
	PanelBody,
	RadioControl,
	SelectControl,
	BaseControl,
	ToolbarGroup,
} from '@wordpress/components';
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import parse from 'html-react-parser';
import classnames from 'classnames';
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';
import { ExcludeFromTocToggle } from '@vkblocks/components/exclude-from-toc-toggle';

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

export default function HeaddingEdit(props) {
	const { attributes, setAttributes } = props;
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

	// eslint-disable-next-line no-undef
	const iconFamily = vkFontAwesome.iconFamily;

	const setTitleFontSize = (newLevel) => {
		setAttributes({ level: newLevel });
	};

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
			<RichText
				tagName={'span'}
				value={title}
				onChange={(value) => {
					setAttributes({ title: value });
				}}
				placeholder={__('Input title…', 'vk-blocks-pro')}
			/>
			{parse(iconAfter)}
		</>
	);

	let subtextContent;
	if (subTextFlag === 'on') {
		subtextContent = (
			<RichText
				tagName={'p'}
				value={subText}
				onChange={(value) => setAttributes({ subText: value })}
				style={subTextStyle}
				className={subTextClass}
				placeholder={__('Input sub text…', 'vk-blocks-pro')}
			/>
		);
	}

	const blockProps = useBlockProps({
		className: ``,
	});

	return (
		<>
			<BlockControls group="block">
				<ToolbarGroup>
					<HeadingLevelDropdown
						selectedLevel={level}
						onChange={setTitleFontSize}
					/>
				</ToolbarGroup>
				<AlignmentToolbar
					value={align}
					onChange={(value) => {
						setAttributes({ align: value });
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Style Settings', 'vk-blocks-pro')}>
					<SelectControl
						label={__('Heading style', 'vk-blocks-pro')}
						value={titleStyle}
						onChange={(value) =>
							setAttributes({ titleStyle: value })
						}
						options={[
							{
								label: __('Default', 'vk-blocks-pro'),
								value: 'default',
							},
							{
								label: __('Plain', 'vk-blocks-pro'),
								value: 'plain',
							},
						]}
					/>
				</PanelBody>
				<PanelBody title={__('Margin Setting', 'vk-blocks-pro')}>
					<p>
						{__(
							'Margin between Heading and sub text (rem)',
							'vk-blocks-pro'
						)}
					</p>
					<RangeControl
						value={titleMarginBottom}
						onChange={(value) => {
							setAttributes({ titleMarginBottom: value });
						}}
						min={-1}
						max={3}
						step={0.1}
						allowReset={true}
						resetFallbackValue={null}
					/>
					<p>
						{__(
							'Margin bottom size of after this block (rem)',
							'vk-blocks-pro'
						)}
					</p>
					<RangeControl
						value={outerMarginBottom}
						onChange={(value) => {
							setAttributes({ outerMarginBottom: value });
						}}
						min={-1}
						max={8}
						step={0.1}
						allowReset={true}
						resetFallbackValue={null}
					/>
				</PanelBody>
				<PanelBody title={__('Heading Settings', 'vk-blocks-pro')}>
					<RangeControl
						label={__('Text size (rem)', 'vk-blocks-pro')}
						value={titleSize}
						onChange={(value) => {
							setAttributes({ titleSize: value });
						}}
						min={0.5}
						max={4}
						step={0.1}
						allowReset={true}
						resetFallbackValue={null}
					/>
					<BaseControl
						label={__('Text Color', 'vk-blocks-pro')}
						id={`vk_heading_textColor`}
					>
						<AdvancedColorPalette
							schema={'titleColor'}
							{...props}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={
						__('Icon', 'vk-blocks-pro') + ' ( ' + iconFamily + ' )'
					}
				>
					<BaseControl
						label={__('Before text', 'vk-blocks-pro')}
						id={`vk_heading_beforeText`}
					>
						<FontAwesome
							attributeName={'fontAwesomeIconBefore'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('After text', 'vk-blocks-pro')}
						id={`vk_heading_afterText`}
					>
						<FontAwesome
							attributeName={'fontAwesomeIconAfter'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Icon Color', 'vk-blocks-pro')}
						id={`vk_heading_iconColor`}
					>
						<AdvancedColorPalette
							schema={'fontAwesomeIconColor'}
							{...props}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Sub Text Settings', 'vk-blocks-pro')}>
					<RadioControl
						label={__('Position', 'vk-blocks-pro')}
						selected={subTextFlag}
						options={[
							{
								label: __('Display', 'vk-blocks-pro'),
								value: 'on',
							},
							{
								label: __('Hide', 'vk-blocks-pro'),
								value: 'off',
							},
						]}
						onChange={(value) =>
							setAttributes({ subTextFlag: value })
						}
					/>
					<p>{__('Text size (rem)', 'vk-blocks-pro')}</p>
					<RangeControl
						value={subTextSize}
						onChange={(value) => {
							setAttributes({ subTextSize: value });
						}}
						min={0.5}
						max={3}
						step={0.1}
						allowReset={true}
						resetFallbackValue={null}
					/>
					<AdvancedColorPalette schema={'subTextColor'} {...props} />
				</PanelBody>
				<ExcludeFromTocToggle
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</InspectorControls>
			<div {...blockProps}>
				<div className={containerClass} style={cStyle}>
					{renderTitle(level, titleContent, tStyle, headingStyle)}
					{subtextContent}
				</div>
			</div>
		</>
	);
}
