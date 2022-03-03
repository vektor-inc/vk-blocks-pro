// import WordPress Scripts
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes } = props;
	const { layout } = attributes;

	const blockProps = useBlockProps.save( {
		className: `vk_posts vk_posts-postType-post vk_posts-layout-${ layout } vk_postList`,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
