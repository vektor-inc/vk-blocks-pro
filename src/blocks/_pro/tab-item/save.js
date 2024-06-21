import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save(props) {
	const { attributes } = props;
	const { tabBodyActive, tabColor, tabBodyBorderTop, blockId } = attributes;

	let activeBodyClass = '';
	if (tabBodyActive === true) {
		activeBodyClass = ' vk_tab_bodys_body-state-active';
	}

	let tabBodyClass = '';
	let tabBodyStyle = {};
	if (tabBodyBorderTop === true) {
		tabBodyClass = ' has-border-top';
		if (!isHexColor(tabColor)) {
			tabBodyClass += ` has-${tabColor}-border-color`;
		} else {
			tabBodyStyle = {
				borderTopColor: tabColor,
			};
		}
	}

	const blockProps = useBlockProps.save({
		className: `vk_tab_bodys_body${activeBodyClass}${tabBodyClass}`,
		id: `vk_tab_bodys_body-${blockId}`,
		style: {
			...tabBodyStyle,
		},
	});

	// Add vk_block-margin-0 class to existing tab group blocks
	let newClassName = blockProps.className || '';
	if (!/vk_block-margin-.*--margin-top/.test(newClassName)) {
		newClassName += ' vk_block-margin-0--margin-top';
	}
	if (!/vk_block-margin-.*--margin-bottom/.test(newClassName)) {
		newClassName += ' vk_block-margin-0--margin-bottom';
	}
	blockProps.className = newClassName.trim();

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
