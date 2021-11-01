import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useMediaQuery } from '@wordpress/compose';

export default function LayoutColumnItemSave(props) {
	const { attributes, setAttributes } = props;
	const { width, margin_pc, margin_tb, margin_sp } = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_layoutColumnItem`,
	});

	const isMobile = useMediaQuery('(max-width: 689px)');
	const isTablet = useMediaQuery('(min-width: 690px) and (max-width: 1079px)');
	const isPC = useMediaQuery('(min-width: 1080px)');

	let paddingObject = margin_pc;
	if ( isMobile ) {
		paddingObject = margin_sp;
	} else if ( isTablet ) {
		paddingObject = margin_tb;
	}

	const cStyle = {
		width,
		marginTop: paddingObject.top,
		marginRight: paddingObject.right,
		marginBottom: paddingObject.bottom,
		marginLeft: paddingObject.left
	}

	return (
		<div {...blockProps} style={cStyle}>
			<InnerBlocks.Content />
		</div>
	);
}
