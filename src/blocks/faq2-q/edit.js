import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function FAQ2QEit() {
	const blockProps = useBlockProps( {
		className: 'vk_faq_title',
	} );
	return (
		<dt { ...blockProps }>
			<InnerBlocks
				templateLock={ false }
				template={ [ [ 'core/paragraph' ] ] }
			/>
		</dt>
	);
}
