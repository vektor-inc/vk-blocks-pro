import { isHexColor } from '@vkblocks/utils/is-hex-color';

const generateInlineCss = (attributes) => {
	const { buttonTextColorCustom, buttonColorCustom, buttonType, blockId } =
		attributes;
	let inlineCss = '';

	// カスタムカラーの場合
	if (buttonColorCustom !== undefined && isHexColor(buttonColorCustom)) {
		// 塗り
		if (buttonType === '0' || buttonType === null) {
			inlineCss += `.vk_button-${blockId} .has-background {
				background-color: ${buttonColorCustom};
				border: 1px solid ${buttonColorCustom};
			}`;
		}
		// アウトライン
		if (buttonType === '1') {
			inlineCss += `.vk_button-${blockId} .has-text-color.is-style-outline {
				background-color: transparent;
				border: 1px solid ${buttonColorCustom};
				color: ${buttonColorCustom};
			}
			.vk_button-${blockId} .has-text-color.is-style-outline:hover {
				background-color: ${buttonColorCustom};
				border: 1px solid ${buttonColorCustom};
				color: #fff;
			}`;
		}
		// テキストのみ
		if (buttonType === '2') {
			inlineCss = `.vk_button-${blockId} .has-text-color.vk_button_link-type-text {
				color: ${buttonColorCustom};
			}`;
		}
	}

	// 文字色がカスタムカラーの場合
	if (
		buttonTextColorCustom !== undefined &&
		isHexColor(buttonTextColorCustom)
	) {
		if (buttonType === '0' || buttonType === null) {
			inlineCss += ` .vk_button-${blockId} .has-text-color {
				color: ${buttonTextColorCustom};
			}`;
		}
	}

	return inlineCss;
};

export default function ButtonHook({ el, attributes }) {
	const cssTag = generateInlineCss(attributes);
	if (cssTag !== '') {
		return (
			<>
				{el}
				<style type="text/css">{cssTag}</style>
			</>
		);
	}
	return <>{el}</>;
}
