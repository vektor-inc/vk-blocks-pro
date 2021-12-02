import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';

export default function save({ attributes }) {
	// eslint-disable-next-line camelcase
	const { col_xs, col_sm, col_md, col_lg, col_xl, col_xxl } = attributes;
	// eslint-disable-next-line camelcase
	const columnClass = `col-${convertToGrid(col_xs)} col-sm-${convertToGrid(
		col_sm
	)} col-md-${convertToGrid(col_md)} col-lg-${convertToGrid(
		col_lg
	)} col-xl-${convertToGrid(col_xl)} col-xxl-${convertToGrid(col_xxl)}`;

	const blockProps = useBlockProps.save({
		className: columnClass,
	});

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
