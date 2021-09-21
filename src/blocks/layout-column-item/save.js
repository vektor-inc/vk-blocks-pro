import { useBlockProps } from '@wordpress/block-editor';

export default function LayoutColumnItemSave({ attributes }) {
	let {} = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_layoutColumnItem`,
	});

	return (
		<div {...blockProps}>
			<p>test</p>
		</div>
	);
}
