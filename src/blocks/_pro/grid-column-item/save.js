import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';

export default function save({ attributes }) {
	// eslint-disable-next-line camelcase
	const { col_xs, col_sm, col_md, col_lg, col_xl, col_xxl, margin_bottom, unit } = attributes;
	// eslint-disable-next-line camelcase
	const columnClass = `col-${convertToGrid(col_xs)} col-sm-${convertToGrid(
		col_sm
	)} col-md-${convertToGrid(col_md)} col-lg-${convertToGrid(
		col_lg
	)} col-xl-${convertToGrid(col_xl)} col-xxl-${convertToGrid(col_xxl)}`;
	// margin bottom
	const blockStyle = {
		'margin-bottom': `${margin_bottom}${unit}`,
	};
	
	const blockProps = useBlockProps.save({
		className: columnClass,
		style: blockStyle,
	});

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
