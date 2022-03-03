import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save( {
		className: `vk_gridColumn`,
	} );
	return (
		<div { ...blockProps }>
			<div className={ 'row' }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
