import { VKBButton } from './component';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save(props) {
	const { attributes } = props;
	const {
		content,
		subCaption,
		buttonUrl,
		buttonTarget,
		buttonSize,
		buttonType,
		buttonEffect,
		buttonColor,
		buttonTextColorCustom,
		buttonColorCustom,
		buttonBorderColorCustom,
		buttonAlign,
		buttonWidthMobile,
		buttonWidthTablet,
		buttonWidth,
		outerGap,
		fontAwesomeIconBefore,
		fontAwesomeIconAfter,
		iconSizeBefore,
		iconSizeAfter,
		inlineStyle,
		borderRadius,
		blockId,
	} = attributes;

	let containerClass = '';
	// カスタムカラーの場合 またはアウターにギャップが指定されれいる場合
	if (
		(buttonColorCustom !== undefined && isHexColor(buttonColorCustom)) ||
		(buttonTextColorCustom !== undefined &&
			isHexColor(buttonTextColorCustom)) ||
		outerGap
	) {
		containerClass = `vk_button vk_button-color-custom vk_button-${blockId}`;
	} else {
		containerClass = `vk_button vk_button-color-custom`;
	}

	if (buttonWidthMobile || buttonWidthTablet || buttonWidth) {
		// 横並びボタンで幅が指定されている
		if (buttonWidthMobile) {
			containerClass += ` vk_button-width-mobile-${buttonWidthMobile}`;
		}
		if (buttonWidthTablet) {
			containerClass += ` vk_button-width-tablet-${buttonWidthTablet}`;
		}
		if (buttonWidth) {
			containerClass += ` vk_button-width-${buttonWidth}`;
		}
	} else {
		containerClass += ` vk_button-align-${buttonAlign}`;
	}

	// エフェクト
	if (buttonEffect !== '') {
		containerClass += ` is-style-${buttonEffect}`;
	}

	const blockProps = useBlockProps.save({
		className: containerClass,
	});

	// inlineStyleからborderRadiusを含む新しいスタイルオブジェクトを構築
	const btnInlineStyle = { ...inlineStyle };
	if (borderRadius) {
		btnInlineStyle.borderRadius = borderRadius;
	}

	return (
		<div {...blockProps}>
			<VKBButton
				lbTextColorCustom={buttonTextColorCustom}
				lbColorCustom={buttonColorCustom}
				lbColor={buttonColor}
				lbType={buttonType}
				lbAlign={buttonAlign}
				lbSize={buttonSize}
				lbUrl={buttonUrl}
				lbTarget={buttonTarget}
				lbFontAwesomeIconBefore={fontAwesomeIconBefore}
				lbFontAwesomeIconAfter={fontAwesomeIconAfter}
				lbIconSizeBefore={iconSizeBefore}
				lbIconSizeAfter={iconSizeAfter}
				lbsubCaption={subCaption}
				inlineStyle={btnInlineStyle}
				lbBorderColorCustom={buttonBorderColorCustom}
				lbRichtext={
					<RichText.Content
						tagName={'span'}
						className={'vk_button_link_txt'}
						value={content}
					/>
				}
			/>
		</div>
	);
}
