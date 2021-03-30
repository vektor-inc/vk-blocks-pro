import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const { clientId } = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_tab_bodys_body`,
		id: `vk_tab_bodys_body-${clientId}`,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
