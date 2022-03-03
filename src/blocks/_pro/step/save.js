import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const containerClass = ' vk_step';
	const blockProps = useBlockProps.save( {
		className: `${ containerClass }`,
	} );
	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
