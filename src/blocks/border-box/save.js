import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save(props) {
	const { attributes } = props;
	const { heading, color, faIcon, bgColor } = attributes;

	const inner = <InnerBlocks.Content />;
	const title = (
		<RichText.Content
			tagName="h4"
			className={'vk_borderBox_title'}
			value={heading}
		/>
	);

	// legacy class
	let legacyClass = `vk_borderBox`;
	const colors = ['red', 'orange', 'blue', 'green', 'black'];

	// title background
	let titleClass = `vk_borderBox_title_container`;
	let titleStyle = {};

	if (color !== undefined) {
		if (isHexColor(color)) {
			// custom color
			titleClass += ` has-background`;
			titleStyle = {
				color: `${color}`,
			};
		} else if (colors.includes(color)) {
			// legacy  style
			legacyClass += ` vk_borderBox-color-${color} vk_borderBox-background-${bgColor}`;
		} else {
			// has style
			titleClass += ` has-background has-${color}-background-color`;
		}
	}

	// body border
	let bodyClass = `vk_borderBox_body`;
	let bodyStyle = {};

	if (color !== undefined) {
		if (isHexColor(color)) {
			// custom color
			bodyClass += ` has-text-color`;
			bodyStyle = {
				color: `${color}`,
			};
		} else if (colors.includes(color)) {
			// legacy  style
			legacyClass += ` vk_borderBox-color-${color} vk_borderBox-background-${bgColor}`;
		} else {
			// has style
			bodyClass += ` has-text-color has-${color}-color`;
		}
	}

	const blockProps = useBlockProps.save({
		className: legacyClass,
	});

	//Defaultクラスを設定
	if (-1 === blockProps.className.indexOf('is-style-')) {
		blockProps.className +=
			' is-style-vk_borderBox-style-solid-kado-tit-tab';
	}

	//iタグでdeprecatedが効かなかったので追加。
	let icon;
	if (faIcon.indexOf('<i class="') === -1) {
		icon = `<i class="${faIcon}"></i>`;
	} else {
		icon = faIcon;
	}

	return (
		<div {...blockProps}>
			<div className={titleClass} style={titleStyle}>
				{ReactHtmlParser(icon)}
				{title}
			</div>
			<div className={bodyClass} style={bodyStyle}>
				{inner}
			</div>
		</div>
	);
}
