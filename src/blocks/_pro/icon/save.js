import { useBlockProps } from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';

export default function save({ attributes }) {
	const {
		color,
		icon,
		faIcon,
		url,
		target,
		bgType,
		iconSize,
		iconAlign,
	} = attributes;

	let style;
	let iconColor;

	if (bgType === '0') {
		style = {
			backgroundColor: `${color}`,
			border: `1px solid ${color}`,
		};
		iconColor = `#ffffff`;
	} else {
		style = {
			backgroundColor: `transparent`,
			border: `1px solid ${color}`,
		};
		iconColor = `${color}`;
	}

	let containerClass = '';
	if (iconColor && 'undefined' !== iconColor) {
		containerClass = `vk_icon vk_icon-color-custom vk_icon-align-${iconAlign}`;
	} else {
		containerClass = `vk_icon vk_icon-align-${iconAlign}`;
	}

	//過去バージョンをリカバリーした時にiconを正常に表示する
	if (faIcon && !faIcon.match(/<i/)) {
		faIcon = `<i class="${faIcon}"></i>`;

		//過去のicon attribuet用 deprecated処理
	} else if (!faIcon && icon && !icon.match(/<i/)) {
		faIcon = `<i class="${icon}"></i>`;
	}

	//add class and inline css
	const faIconFragment = faIcon.split(' ');
	faIconFragment[0] = faIconFragment[0] + ` style="color:${iconColor}" `;
	faIconFragment[1] = faIconFragment[1] + ` vk_icon_font `;
	const faIconTag = faIconFragment.join('');

	const blockProps = useBlockProps.save({
		className: containerClass,
	});

	return (
		<div {...blockProps}>
			<div className="vk_icon_outer" style={style}>
				{ReactHtmlParser(faIconTag)}
			</div>
		</div>
	);
}
