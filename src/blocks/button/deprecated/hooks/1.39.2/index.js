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

const generateInlineGapCss = (attributes, isSave) => {
	const {
		buttonWidthMobile,
		buttonWidthTablet,
		buttonWidth,
		outerGap,
		blockId,
	} = attributes;
	let inlineCss = '';
	const propaty = isSave
		? '.vk_button'
		: '.vk_buttons .vk_buttons_col .block-editor-block-list__layout .vk_button';

	// 親ブロックのギャップを反映
	if (outerGap) {
		if (buttonWidthMobile) {
			inlineCss += `@media (max-width: 575.98px) {
				${propaty}.vk_button-${blockId} {
					width: calc(${buttonWidthMobile}% - calc(${outerGap} - calc(${outerGap} / (100 / ${buttonWidthMobile}))) - 1px);
				}
			}`;
		}
		if (buttonWidthTablet) {
			inlineCss += `@media(min-width: 576px) and (max-width: 991.98px) {
				${propaty}.vk_button-${blockId} {
					width: calc(${buttonWidthTablet}% - calc(${outerGap} - calc(${outerGap} / (100 / ${buttonWidthTablet}))) - 1px);
				}
			}`;
		}
		if (buttonWidth) {
			inlineCss += `@media (min-width: 992px) {
					${propaty}.vk_button-${blockId} {
					width: calc(${buttonWidth}% - calc(${outerGap} - calc(${outerGap} / (100 / ${buttonWidth}))) - 1px );
				}
			}`;
		}
	}

	return inlineCss;
};

export default function ButtonHook({ el, attributes }) {
	const cssTag = generateInlineCss(attributes);
	const cssEditor = generateInlineGapCss(attributes, true);
	if (cssTag !== '' || cssEditor !== '') {
		return (
			<>
				{el}
				<style type="text/css">
					{cssTag} {cssEditor}
				</style>
			</>
		);
	}
	return <>{el}</>;
}