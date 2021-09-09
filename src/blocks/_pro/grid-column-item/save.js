import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';

export default function save({ attributes }) {
	// eslint-disable-next-line camelcase
	const {
		col_xs,
		col_sm,
		col_md,
		col_lg,
		col_xl,
		col_xxl,
		marginBottom,
		unit,
		textColor,
		backgroundColor,
		paddingTop,
		paddingX,
		paddingBottom,
		paddingUnit,
	} = attributes;
	// eslint-disable-next-line camelcase
	const columnClass = `col-${convertToGrid(col_xs)} col-sm-${convertToGrid(
		col_sm
	)} col-md-${convertToGrid(col_md)} col-lg-${convertToGrid(
		col_lg
	)} col-xl-${convertToGrid(col_xl)} col-xxl-${convertToGrid(col_xxl)}`;
	// margin bottom
	let style;
	if (marginBottom) {
		style = { marginBottom: marginBottom + unit };
	}

	const columStyle = {
		color:
			textColor !== null && textColor !== undefined
				? textColor
				: undefined,
		background:
			backgroundColor !== null && backgroundColor !== undefined
				? backgroundColor
				: undefined,
		paddingTop:
			paddingTop !== null && paddingTop !== undefined
				? paddingTop + paddingUnit
				: undefined,
		paddingRight:
			paddingX !== null && paddingX !== undefined
				? paddingX + paddingUnit
				: undefined,
		paddingBottom:
			paddingBottom !== null && paddingBottom !== undefined
				? paddingBottom + paddingUnit
				: undefined,
		paddingLeft:
			paddingX !== null && paddingX !== undefined
				? paddingX + paddingUnit
				: undefined,
	};

	const blockProps = useBlockProps.save({
		className: `vk_gridColumn_item ${columnClass}`,
		style,
	});

	return (
		<>
			<div {...blockProps}>
				{(() => {
					if (
						columStyle.color !== undefined ||
						columStyle.background !== undefined ||
						columStyle.paddingTop !== undefined ||
						columStyle.paddingRight !== undefined ||
						columStyle.paddingBottom !== undefined ||
						columStyle.paddingLeft !== undefined
					) {
						return (
							<div
								className="vk_gridColumn_item_inner"
								style={columStyle}
							>
								<InnerBlocks.Content />
							</div>
						);
					}
					return <InnerBlocks.Content />;
				})()}
			</div>
		</>
	);
}
