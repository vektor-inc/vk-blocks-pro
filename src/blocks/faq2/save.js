import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: 'vk_faq',
	});
	return (
		<div {...blockProps}>
			<div className="vk_faq-content-before"></div>
			<dl className="vk_faq-content">
				<InnerBlocks.Content />
			</dl>
			<div className="vk_faq-content-after"></div>
		</div>
	);
}
