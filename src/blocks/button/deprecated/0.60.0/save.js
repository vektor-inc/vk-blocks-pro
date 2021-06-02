/**
 * Button block type
 *
 */

import { VKBButton } from './component';
import { RichText } from '@wordpress/block-editor';

export default function save({ attributes, className }) {
	const {
		content,
		subCaption,
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
	if (buttonColorCustom && 'undefined' !== buttonColorCustom) {
		containerClass = `vk_button vk_button-color-custom vk_button-align-${buttonAlign}`;
	} else {
		containerClass = `vk_button vk_button-align-${buttonAlign}`;
	}

	if (className) {
		containerClass = className + ' ' + containerClass;
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
