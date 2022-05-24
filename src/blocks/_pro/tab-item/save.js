import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
export default function save(props) {
	const { attributes } = props;
	const {
		tabBodyActive,
		tabBodyPadding,
		tabColor,
		tabBodyBorderTop,
		blockId,
	} = attributes;

	let activeBodyClass = '';
	if (tabBodyActive === true) {
		activeBodyClass = ' vk_tab_bodys_body-state-active';
	}

	let tabBodyClass = '';
	let tabBodyStyle = {};
	if (tabBodyBorderTop) {
		tabBodyClass = ' has-border-top';
		if (!isHexColor(tabColor)) {
			tabBodyClass += ` has-${tabColor}-border-top-color`;
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
			padding: `${tabBodyPadding.top} ${tabBodyPadding.right} ${tabBodyPadding.bottom} ${tabBodyPadding.left}`,
		},
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
