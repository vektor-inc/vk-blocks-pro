/**
 * staffのコンポーネント.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { StaffMediaUploadEdit, StaffMediaUploadSave } from './staffMediaUpload';

// テキスト部分の表示
export const StaffCardTexts = ({ attributes, setAttributes, className }) => {
	const {
		vk_staff_text_name, // eslint-disable-line camelcase
		vk_staff_text_caption, // eslint-disable-line camelcase
		vk_staff_text_role, // eslint-disable-line camelcase
		vk_staff_text_profileTitle, // eslint-disable-line camelcase
		vk_staff_text_profileText, // eslint-disable-line camelcase
		vk_staff_nameColor, // eslint-disable-line camelcase
		vk_staff_captionColor, // eslint-disable-line camelcase
		vk_staff_positionColor, // eslint-disable-line camelcase
		vk_staff_profileTitleColor, // eslint-disable-line camelcase
		vk_staff_profileTextColor, // eslint-disable-line camelcase
	} = attributes;
	return (
		<>
			<div className={(className, `vk_staff_text`)}>
				<RichText
					tagName="h3"
					className={'vk_staff_text_name'}
					style={{ color: vk_staff_nameColor }} // eslint-disable-line camelcase
					onChange={(value) =>
						setAttributes({ vk_staff_text_name: value })
					}
					value={vk_staff_text_name} // eslint-disable-line camelcase
					placeholder={__('Your Name', 'vk-blocks')}
				/>
				{/* <RichText
					tagName="p"
					className={'vk_staff_text_caption'}
					style={{ color: vk_staff_captionColor }} // eslint-disable-line camelcase
					onChange={(value) =>
						setAttributes({ vk_staff_text_caption: value })
					}
					value={vk_staff_text_caption} // eslint-disable-line camelcase
					placeholder={__('Caption', 'vk-blocks')}
				/>
				<RichText
					tagName="p"
					className={'vk_staff_text_role'}
					style={{ color: vk_staff_positionColor }} // eslint-disable-line camelcase
					onChange={(value) =>
						setAttributes({ vk_staff_text_role: value })
					}
					value={vk_staff_text_role} // eslint-disable-line camelcase
					placeholder={__('Role position', 'vk-blocks')}
				/>
				<RichText
					tagName="h4"
					className={'vk_staff_text_profileTitle'}
					style={{ color: vk_staff_profileTitleColor }} // eslint-disable-line camelcase
					onChange={(value) =>
						setAttributes({ vk_staff_text_profileTitle: value })
					}
					value={vk_staff_text_profileTitle} // eslint-disable-line camelcase
					placeholder={__('Profile title', 'vk-blocks')}
				/>
				<RichText
					tagName="p"
					className={'vk_staff_text_profileText'}
					style={{ color: vk_staff_profileTextColor }} // eslint-disable-line camelcase
					onChange={
						(value) =>
							setAttributes({ vk_staff_text_profileText: value }) // eslint-disable-line camelcase
					}
					value={vk_staff_text_profileText} // eslint-disable-line camelcase
					placeholder={__('Profile text', 'vk-blocks')}
				/> */}
			</div>
		</>
	);
};

//save
export const StaffCard = ({ attributes, setAttributes, className }) => {
	return (
		<>
			<StaffCardTexts
				attributes={attributes}
				setAttributes={setAttributes}
				className={className}
			/>
			{/* <StaffMediaUploadSave
				attributes={attributes}
				setAttributes={setAttributes}
			/> */}
		</>
	);
};

//edit
export const StaffCardEdit = ({ attributes, setAttributes, className }) => {
	return (
		<>
			<StaffCardTexts
				attributes={attributes}
				setAttributes={setAttributes}
				className={className}
			/>
			{/* <StaffMediaUploadEdit
				attributes={attributes}
				setAttributes={setAttributes}
			/> */}
		</>
	);
};
