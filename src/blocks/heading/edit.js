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
	ColorPalette,
	BlockControls,
	AlignmentToolbar,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

import ReactHtmlParser from 'react-html-parser';

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

	const setTitleFontSize = (newLevel) => {
		setAttributes({ level: newLevel });

		switch (newLevel) {
			case 1:
				setAttributes({ titleSize: 3.6 });
				break;
			case 2:
				setAttributes({ titleSize: 2.8 });
				break;
			case 3:
				setAttributes({ titleSize: 2.2 });
				break;
			case 4:
				setAttributes({ titleSize: 2.0 });
				break;
			case 5:
				setAttributes({ titleSize: 1.8 });
				break;
			case 6:
				setAttributes({ titleSize: 1.6 });
				break;
		}
	};

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
			{ReactHtmlParser(iconBefore)}
			<RichText
				tagName={'span'}
				value={title}
				onChange={(value) => {
					setAttributes({ title: value });
				}}
				placeholder={__('Input title…', 'vk-blocks')}
			/>
			{ReactHtmlParser(iconAfter)}
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
				placeholder={__('Input sub text…', 'vk-blocks')}
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
				<PanelBody title={__('Style Settings', 'vk-blocks')}>
					<SelectControl
						label={__('Heading style', 'vk-blocks')}
						value={titleStyle}
						onChange={(value) =>
							setAttributes({ titleStyle: value })
						}
						options={[
							{
								label: __('Default', 'vk-blocks'),
								value: 'default',
							},
							{
								label: __('Plain', 'vk-blocks'),
								value: 'plain',
							},
						]}
					/>
				</PanelBody>
				<PanelBody title={__('Margin Setting', 'vk-blocks')}>
					<p>
						{__(
							'Margin between Heading and sub text (rem)',
							'vk-blocks'
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
							'vk-blocks'
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
				<PanelBody title={__('Heading Settings', 'vk-blocks')}>
					<RangeControl
						label={__('Text size (rem)', 'vk-blocks')}
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
						label={__('Text Color', 'vk-blocks')}
						id={`vk_heading_textColor`}
					>
						<ColorPalette
							value={titleColor}
							onChange={(value) =>
								setAttributes({ titleColor: value })
							}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody
					title={__('Font Awesome Icon Settings', 'vk-blocks')}
				>
					<BaseControl
						label={__('Before text', 'vk-blocks')}
						id={`vk_heading_beforeText`}
					>
						<FontAwesome
							attributeName={'fontAwesomeIconBefore'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('After text', 'vk-blocks')}
						id={`vk_heading_afterText`}
					>
						<FontAwesome
							attributeName={'fontAwesomeIconAfter'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Icon Color', 'vk-blocks')}
						id={`vk_heading_iconColor`}
					>
						<ColorPalette
							value={fontAwesomeIconColor}
							onChange={(value) =>
								setAttributes({
									fontAwesomeIconColor: value,
								})
							}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Sub Text Settings', 'vk-blocks')}>
					<RadioControl
						label={__('Position', 'vk-blocks')}
						selected={subTextFlag}
						options={[
							{
								label: __('Display', 'vk-blocks'),
								value: 'on',
							},
							{
								label: __('Hide', 'vk-blocks'),
								value: 'off',
							},
						]}
						onChange={(value) =>
							setAttributes({ subTextFlag: value })
						}
					/>
					<p>{__('Text size (rem)', 'vk-blocks')}</p>
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
					<ColorPalette
						value={subTextColor}
						onChange={(value) =>
							setAttributes({ subTextColor: value })
						}
					/>
				</PanelBody>
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
