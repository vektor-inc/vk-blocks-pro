import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	let { containerClass } = props.attributes;
	const blockProps = useBlockProps.save({
		className: `${containerClass}`,
	});

	return (
		<div {...blockProps}>
			<div className="vk_accordion-header"></div>
			<div className="vk_accordion-body">
				<InnerBlocks.Content />
			</div>
			<div className="vk_accordion-footer"></div>
		</div>
	);
}
