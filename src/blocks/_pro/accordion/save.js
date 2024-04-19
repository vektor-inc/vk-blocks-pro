import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { containerClass, initialState } = props.attributes;
	const blockProps = useBlockProps.save({
		className: `${containerClass} ${
			initialState === 'open'
				? 'vk_accordion-open'
				: 'vk_accordion-closed'
		}`,
	});

	return (
		<div {...blockProps} data-initial-state={initialState}>
			<InnerBlocks.Content />
		</div>
	);
}
