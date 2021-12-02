import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { containerClass } = props.attributes;
	const blockProps = useBlockProps.save({
		className: `${containerClass}`,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
