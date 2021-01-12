import { InnerBlocks } from '@wordpress/block-editor';

export default function save({ className }) {
	return (
		<div className={`vk_posts ${className}`}>
			<InnerBlocks.Content />
		</div>
	);
}
