import { InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return (
		<dl className={`vk_faq [accordion_trigger_switch]`}>
			<InnerBlocks.Content />
		</dl>
	);
}
