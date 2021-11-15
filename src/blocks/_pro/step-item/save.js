import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save(props) {
	const { attributes } = props;
	let { color, style, styleLine, dotCaption, dotNum, faIcon } = attributes;

	const containerClass = ' vk_step_item';
	let styleClass = '';
	let inlineStyle = {};
	let styleLineClass = '';

	if (style === 'solid') {
		styleClass = ' vk_step_item_style-default';
		if (color !== undefined) {
			styleClass += ` has-background`;
			if (isHexColor(color)) {
				inlineStyle = { backgroundColor: `${color}` };
			} else {
				styleClass += ` has-${color}-background-color`;
			}
		}
	} else if (style === 'outlined') {
		styleClass = ' vk_step_item_style-outlined';
		if (color !== undefined) {
			styleClass += ` has-text-color`;
			if (isHexColor(color)) {
				inlineStyle = { color: `${color}` };
			}
			else {
				styleClass += ` has-${color}-color`;
			}
		}
	}

	if (styleLine === 'default') {
		styleLineClass = ' vk_step_item_lineStyle-default';
	} else if (styleLine === 'none') {
		styleLineClass = ' vk_step_item_lineStyle-none';
	}

	//過去バージョンをリカバリーした時にiconを正常に表示する
	if (faIcon && !faIcon.match(/<i/)) {
		faIcon = `<i class="${faIcon}"></i>`;
	}

	const blockProps = useBlockProps.save({
		className: `${containerClass} ${styleLineClass}`,
	});
	return (
		<div {...blockProps}>
			<div className={'vk_step_item_content'}>
				<InnerBlocks.Content />
			</div>
			<div
				className={'vk_step_item_dot' + styleClass}
				style={inlineStyle}
			>
				<div className={'vk_step_item_dot_caption'}>{dotCaption}</div>
				{(() => {
					if (faIcon) {
						return ReactHtmlParser(faIcon);
					} else if (dotNum) {
						return (
							<div className={'vk_step_item_dot_num'}>
								{dotNum}
							</div>
						);
					}
				})()}
			</div>
		</div>
	);
}
