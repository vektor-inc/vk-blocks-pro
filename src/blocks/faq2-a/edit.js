import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function FAQ2AEdit() {
	const blockProps = useBlockProps( {
		className: 'vk_faq_content',
	} );
	return (
		<dd { ...blockProps }>
			<InnerBlocks
				templateLock={ false }
				template={ [ [ 'core/paragraph' ] ] }
			/>
		</dd>
	);
}
