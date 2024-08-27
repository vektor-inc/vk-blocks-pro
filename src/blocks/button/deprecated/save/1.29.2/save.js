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
		buttonColor,
		buttonTextColorCustom,
		buttonColorCustom,
		buttonAlign,
		fontAwesomeIconBefore,
		fontAwesomeIconAfter,
		blockId,
	} = attributes;

	let containerClass = '';
	// カスタムカラーの場合
	if (
		(buttonTextColorCustom !== undefined &&
			isHexColor(buttonTextColorCustom)) ||
		(buttonColorCustom !== undefined && isHexColor(buttonColorCustom))
	) {
		containerClass = `vk_button vk_button-color-custom vk_button-align-${buttonAlign} vk_button-${blockId}`;
	} else {
		containerClass = `vk_button vk_button-color-custom vk_button-align-${buttonAlign}`;
	}

	const blockProps = useBlockProps.save({
		className: containerClass,
	});

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
				lbsubCaption={subCaption}
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
