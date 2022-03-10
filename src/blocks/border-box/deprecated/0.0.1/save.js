import classNames from 'classnames';
import parse from 'html-react-parser';
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function save(props) {
	return <DepBody for_={'save'} {...props} />;
}

export const DepBody = (props) => {
	const { setAttributes, attributes, for_, className } = props;
	const { heading, color, faIcon, bgColor } = attributes;

	let inner;
	let title;
	//編集画面とサイト上の切り替え
	if (for_ === 'edit') {
		inner = <InnerBlocks />;
		title = (
			<RichText
				tagName="h4"
				className={'vk_borderBox_title'}
				onChange={(value) => setAttributes({ heading: value })}
				value={heading}
				placeholder={__('Please enter a title.', 'vk-blocks')}
			/>
		);
	} else if ('save') {
		inner = <InnerBlocks.Content />;
		title = (
			<RichText.Content
				tagName="h4"
				className={'vk_borderBox_title'}
				value={heading}
			/>
		);
	}

	let customClass = className;
	//Defaultクラスを設定
	if (-1 === className.indexOf('is-style-')) {
		customClass = classNames(
			className,
			'is-style-vk_borderBox-style-solid-kado-tit-tab'
		);
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
			className={`vk_borderBox vk_borderBox-color-${color} vk_borderBox-background-${bgColor} ${customClass}`}
		>
			<div className="vk_borderBox_title_container">
				{parse(icon)}
				{title}
			</div>
			<div className={`vk_borderBox_body`}>{inner}</div>
		</div>
	);
};
