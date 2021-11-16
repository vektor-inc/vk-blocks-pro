import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { breakPoint } = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_layoutColumn`,
	});
	return (
		<>
			<div {...blockProps} data-breakpoint={breakPoint}>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
