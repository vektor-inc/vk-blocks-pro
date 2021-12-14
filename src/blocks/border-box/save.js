import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save(props) {
	const { attributes } = props;
	const { heading, color, faIcon, bgColor, borderColor } = attributes;

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

	// color: 旧仕様(5色) / borderColor: 新仕様(カラーパレット対応)を判別
	const pre_color_class = blockProps.className.match(
		/vk_borderBox-color-\w*/
	);

	if (pre_color_class) {
		if (borderColor !== undefined) {
			// className から vk_borderBox-color- を削除
			blockProps.className = blockProps.className.replace(
				pre_color_class,
				''
			);
		}
	}

	if (borderColor !== undefined) {
		// カスタムカラーパレットに対応
		if (isBoxBorder) {
			// 全体に枠線
			boxClass += ` has-text-color`;

			if (isHexColor(borderColor)) {
				// custom color
				boxClass += ` has-text-color`;
				boxStyle = {
					color: `${borderColor}`,
				};
			} else {
				// has style
				boxClass += ` has-${borderColor}-color`;
			}

			blockProps.className += boxClass;
			blockProps.style = boxStyle;
		} else {
			// 本文に枠線
			titleClass += ` has-background`;
			bodyClass += ` has-text-color`;

			if (isHexColor(borderColor)) {
				// custom color
				titleStyle = {
					background: `${borderColor}`,
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

		if (
			-1 <
			blockProps.className.indexOf(
				'vk_borderBox-style-solid-kado-iconFeature'
			)
		) {
			iconClass = `vk_borderBox_icon_border`;

			if (color !== undefined) {
				iconClass += ` has-background`;
				if (isHexColor(borderColor)) {
					// custom color
					iconStyle = `background-color: ${borderColor}`;
				} else {
					// has style
					iconClass += ` has-${borderColor}-background-color`;
				}
			}
		}
	}

	//iタグでdeprecatedが効かなかったので追加。
	let icon;
	if (faIcon.indexOf('<i class="') === -1) {
		icon = `<i class="${faIcon}"></i>`;
	} else if (iconClass) {
		// カスタムカラーパレット
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
