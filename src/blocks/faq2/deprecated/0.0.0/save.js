import { InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return (
		<dl className={`vk_faq`}>
			<InnerBlocks.Content />
		</dl>
	);
}
