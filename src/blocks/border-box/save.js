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

	const blockProps = useBlockProps.save({
		className: `vk_borderBox`,
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

	const colors = ['red', 'orange', 'blue', 'green', 'black'];
	if (colors.includes(color)) {
		// 旧仕様
		blockProps.className += ` vk_borderBox-color-${color} vk_borderBox-background-${bgColor}`;
	} else if (color !== undefined) {
		// カスタムカラーパレットに対応
		if (isBoxBorder) {
			// 全体に枠線
			boxClass += ` has-text-color`;

			if (isHexColor(color)) {
				// custom color
				boxClass += ` has-text-color`;
				boxStyle = {
					color: `${color}`,
				};
			} else {
				// has style
				boxClass += ` has-${color}-color`;
			}
		} else {
			// 本文に枠線
			titleClass += ` has-background`;
			bodyClass += ` has-text-color`;

			if (isHexColor(color)) {
				// custom color
				titleStyle = {
					background: `${color}`,
				};

				bodyStyle = {
					color: `${color}`,
				};
			} else {
				// has style
				titleClass += ` has-${color}-background-color`;
				bodyClass += ` has-${color}-color`;
			}
		}
	}

	blockProps.className += boxClass;
	blockProps.style = boxStyle;

	if (color !== undefined) {
		if (isHexColor(color)) {
			// custom color
			titleClass += ` has-background`;
			titleStyle = {
				color: `${color}`,
			};
		} else {
			// has style
			titleClass += ` has-background has-${color}-background-color`;
		}
	}

	if (color !== undefined) {
		if (isHexColor(color)) {
			// custom color
			bodyClass += ` has-text-color`;
			bodyStyle = {
				color: `${color}`,
			};
		} else {
			// has style
			bodyClass += ` has-text-color has-${color}-color`;
		}
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
