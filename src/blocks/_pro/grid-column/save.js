import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: `vk_grid-column`,
	});
	return (
		<>
			<div {...blockProps}>
				<div className={'row'}>
					<InnerBlocks.Content />
				</div>
			</div>
		</>
	);
}
