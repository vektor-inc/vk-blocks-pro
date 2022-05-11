import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const { tabBodyActive, blockId } = attributes;

	let activeBodyClass = '';
	if (tabBodyActive === true) {
		activeBodyClass = 'vk_tab_bodys_body-state-active';
	}

	const blockProps = useBlockProps.save({
		className: `vk_tab_bodys_body ${activeBodyClass}`,
		id: `vk_tab_bodys_body-${blockId}`,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
