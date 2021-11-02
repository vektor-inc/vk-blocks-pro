import { isHexColor } from '@vkblocks/utils/is-hex-color';

const generateInlineCss = (attributes) => {
	const { clientId, buttonType, buttonColorCustom } = attributes;
	let inlineCss = '';

	// カスタムカラーの場合
	if (buttonColorCustom !== undefined && isHexColor(buttonColorCustom)) {
		if (buttonType === '0' || buttonType === null) {
			inlineCss = `
			.vk_button-${clientId} .has-background {
				background-color: ${buttonColorCustom};
				border: 1px solid ${buttonColorCustom};
				color: #fff;
			}
			`;
		}

		if (buttonType === '1') {
			inlineCss = `
			.vk_button-${clientId} .has-text-color {
				background-color: transparent;
				border: 1px solid ${buttonColorCustom};
				color: ${buttonColorCustom};
			}
			.vk_button-${clientId} .has-text-color:hover {
				background-color: ${buttonColorCustom};
				border: 1px solid ${buttonColorCustom};
				color: #fff;
			}
			`;
		}

		if (buttonType === '2') {
			inlineCss = `
			.vk_button-${clientId} .vk_button_link-type-text {
				color: ${buttonColorCustom};
			}
			`;
		}
	}

	return inlineCss;
};

export default function ButtonHook({el,attributes}) {
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
