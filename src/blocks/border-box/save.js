import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';

export default function save(props) {
	const { attributes, className } = props;
	const { heading, color, faIcon, bgColor } = attributes;

	const inner = <InnerBlocks.Content />;
	const title = (
		<RichText.Content
			tagName="h4"
			className={'vk_borderBox_title'}
			value={heading}
		/>
	);

	let customClass = className;
	//Defaultクラスを設定
	if (-1 === className.indexOf('is-style-')) {
		customClass = 'is-style-vk_borderBox-style-solid-kado-tit-tab';
	}

	//iタグでdeprecatedが効かなかったので追加。
	let icon;
	if (faIcon.indexOf('<i class="') === -1) {
		icon = `<i class="${faIcon}"></i>`;
	} else {
		icon = faIcon;
	}

	return (
		<div
			{...useBlockProps.save({
				className: `vk_borderBox vk_borderBox-color-${color} vk_borderBox-background-${bgColor} ${customClass}`,
			})}
		>
			<div className="vk_borderBox_title_container">
				{ReactHtmlParser(icon)}
				{title}
			</div>
			<div className={`vk_borderBox_body`}>{inner}</div>
		</div>
	);
}
