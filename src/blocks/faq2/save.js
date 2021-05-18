import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: 'vk_faq  [accordion_trigger_switch]',
	});
	return (
		<div {...blockProps}>
			<div className="vk_faq-header"></div>
			<dl className="vk_faq-body">
				<InnerBlocks.Content />
			</dl>
			<div className="vk_faq-footer"></div>
		</div>
	);
}
