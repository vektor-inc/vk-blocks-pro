import { InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return (
		<dd className={ `vk_faq_content` }>
			<InnerBlocks.Content />
		</dd>
	 );
}
