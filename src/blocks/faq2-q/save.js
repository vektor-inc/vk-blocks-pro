import { InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return (
		<dt className={ `vk_faq_title` }>
			<InnerBlocks.Content />
		</dt>
	 );
}
