import { VKBButton } from './component';
import { RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		content,
		buttonUrl,
		buttonTarget,
		buttonSize,
		buttonType,
		buttonColor,
		buttonColorCustom,
		buttonAlign,
		fontAwesomeIconBefore,
		fontAwesomeIconAfter,
	} = attributes;

	let containerClass = '';

	if (buttonColorCustom) {
		containerClass = `vk_button vk_button-color-custom vk_button-align-${buttonAlign}`;
	} else if (!buttonColorCustom) {
		containerClass = `vk_button vk_button-align-${buttonAlign}`;
	}

	return (
		<div className={containerClass}>
			<VKBButton
				lbColorCustom={buttonColorCustom}
				lbColor={buttonColor}
				lbType={buttonType}
				lbAlign={buttonAlign}
				lbSize={buttonSize}
				lbUrl={buttonUrl}
				lbTarget={buttonTarget}
				lbFontAwesomeIconBefore={fontAwesomeIconBefore}
				lbFontAwesomeIconAfter={fontAwesomeIconAfter}
				lbRichtext={
					<RichText.Content
						tagName="span"
						className={'vk_button_link_txt'}
						value={content}
					/>
				}
			/>
		</div>
	);
}
