import { RichText, useBlockProps } from '@wordpress/block-editor';
import {
	getButtonClass,
	getLinkClass,
	getLinkStyle,
	getFontawesomeIcon,
	getContainerClass,
} from './utils';
import { PrContentMediaUpload } from './mediaUpload';
import parse from 'html-react-parser';

export default function save({ attributes }) {
	const {
		title,
		titleColor,
		content,
		contentColor,
		url,
		buttonType,
		buttonColor,
		buttonColorCustom,
		buttonText,
		buttonTarget,
		Image,
		ImageBorderColor,
		layout,
		fontAwesomeIconBefore,
		fontAwesomeIconAfter,
	} = attributes;

	const containerClass = getContainerClass(layout);
	const btnClass = getButtonClass(buttonColorCustom);
	const linkClass = getLinkClass(buttonColor, buttonColorCustom, buttonType);
	const linkStyle = getLinkStyle(buttonColorCustom, buttonType);
	const iconBefore = getFontawesomeIcon(fontAwesomeIconBefore);
	const iconAfter = getFontawesomeIcon(fontAwesomeIconAfter);

	return (
		<div {...useBlockProps.save({ className: containerClass })}>
			<div className="col-sm-6 vk_prContent_colImg">
				<PrContentMediaUpload
					Image={Image}
					ImageBorderColor={ImageBorderColor}
				/>
			</div>
			<div className="col-sm-6 vk_prContent_colTxt">
				<RichText.Content
					tagName="h3"
					value={title}
					className={'vk_prContent_colTxt_title'}
					style={{ color: titleColor }}
				/>
				<RichText.Content
					tagName="p"
					className={'vk_prContent_colTxt_text'}
					value={content}
					style={{ color: contentColor }}
				/>
				{buttonText && (
					/* eslint react/jsx-no-target-blank: 0 */
					<div className={btnClass}>
						{/* eslint-disable-next-line react/jsx-no-target-blank*/}
						<a
							href={url}
							className={linkClass}
							rel={
								buttonTarget ? 'noopener noreferrer' : undefined
							}
							style={linkStyle}
							target={buttonTarget ? '_blank' : undefined}
						>
							{parse(iconBefore)}
							<span className="vk_button_link_txt">
								{buttonText}
							</span>
							{parse(iconAfter)}
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
