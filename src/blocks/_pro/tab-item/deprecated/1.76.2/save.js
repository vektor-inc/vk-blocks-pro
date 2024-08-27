import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save(props) {
	const { attributes } = props;
	const { tabBodyActive, tabColor, tabBodyBorderTop, blockId } = attributes;

	let activeBodyClass = '';
	if (tabBodyActive) {
		activeBodyClass = ' vk_tab_bodys_body-state-active';
	}

	let tabBodyClass = '';
	let tabBodyStyle = {};
	if (tabBodyBorderTop) {
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
		role: 'tabpanel',
		'aria-labelledby': `vk_tab_labels_label-${blockId}`,
		hidden: !tabBodyActive ? 'until-found' : undefined,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
