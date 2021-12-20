import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save(props) {
	const { attributes } = props;
	const { heading, faIcon, bgColor, borderColor } = attributes;

	const inner = <InnerBlocks.Content />;
	const title = (
		<RichText.Content
			tagName="h4"
			className={'vk_borderBox_title'}
			value={heading}
		/>
	);

	const blockProps = useBlockProps.save({
		className: `vk_borderBox vk_borderBox-background-${bgColor}`,
	});

	//Defaultクラスを設定
	if (-1 === blockProps.className.indexOf('is-style-')) {
		blockProps.className +=
			' is-style-vk_borderBox-style-solid-kado-tit-tab';
	}

	//枠パターン
	let isBoxBorder = false;
	if (
		-1 <
			blockProps.className.indexOf(
				'vk_borderBox-style-solid-kado-tit-onborder'
			) ||
		-1 <
			blockProps.className.indexOf(
				'vk_borderBox-style-solid-kado-tit-inner'
			) ||
		-1 <
			blockProps.className.indexOf(
				'vk_borderBox-style-solid-kado-iconFeature'
			)
	) {
		// 全体に枠線
		isBoxBorder = true;
	}

	// box
	let boxClass = '';
	let boxStyle = {};

	// title
	let titleClass = `vk_borderBox_title_container`;
	let titleStyle = {};

	// content
	let bodyClass = `vk_borderBox_body`;
	let bodyStyle = {};

	// 直線 ピン角 アイコン
	let iconClass = ``;
	let iconStyle = ``;

	// カラーパレットに対応
	if (isBoxBorder && borderColor !== undefined) {
		// 全体に枠線があるパターン
		boxClass += ` has-text-color`;

		if (isHexColor(borderColor)) {
			// custom color
			boxStyle = {
				color: `${borderColor}`,
			};
			blockProps.style = boxStyle;
		} else {
			// has style
			boxClass += ` has-${borderColor}-color`;
		}

		blockProps.className += boxClass;
	} else if (borderColor !== undefined) {
		// 本文に枠線があるパターン
		titleClass += ` has-background`;
		bodyClass += ` has-text-color`;

		if (isHexColor(borderColor)) {
			// custom color
			titleStyle = {
				backgroundColor: `${borderColor}`,
			};

			bodyStyle = {
				color: `${borderColor}`,
			};
		} else {
			// has style
			titleClass += ` has-${borderColor}-background-color`;
			bodyClass += ` has-${borderColor}-color`;
		}
	}

	// 直線 ピン角 アイコン
	if (
		-1 <
		blockProps.className.indexOf(
			'vk_borderBox-style-solid-kado-iconFeature'
		)
	) {
		iconClass = `vk_borderBox_icon_border`;

		if (borderColor !== undefined) {
			iconClass += ` has-background`;
			if (isHexColor(borderColor)) {
				// custom color
				iconStyle = `background-color: ${borderColor};`;
			} else {
				// has style
				iconClass += ` has-${borderColor}-background-color`;
			}
		}
	}

	//iタグでdeprecatedが効かなかったので追加。
	let icon;
	if (faIcon.indexOf('<i class="') === -1) {
		icon = `<i class="${faIcon}"></i>`;
	} else if (iconClass) {
		// カラーパレット
		icon =
			`<div class="${iconClass}" style="${iconStyle}">` +
			faIcon +
			`</div>`;
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
