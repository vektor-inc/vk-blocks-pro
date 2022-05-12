import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const { tabBodyActive, tabBodyPadding, blockId } = attributes;

	let activeBodyClass = '';
	if (tabBodyActive === true) {
		activeBodyClass = 'vk_tab_bodys_body-state-active';
	}

	const blockProps = useBlockProps.save({
		className: `vk_tab_bodys_body ${activeBodyClass}`,
		id: `vk_tab_bodys_body-${blockId}`,
		style: {
			padding: `${tabBodyPadding.top} ${tabBodyPadding.right} ${tabBodyPadding.bottom} ${tabBodyPadding.left}`,
		},
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
