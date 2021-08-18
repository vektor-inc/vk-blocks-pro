import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	let { containerClass } = props.attributes;
	const blockProps = useBlockProps.save({
		className: `${containerClass}`,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
