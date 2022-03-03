import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save( {
		className: `vk_accordion-trigger`,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
			<span
				className={ `vk_accordion-toggle vk_accordion-toggle-close` }
			></span>
		</div>
	);
}
