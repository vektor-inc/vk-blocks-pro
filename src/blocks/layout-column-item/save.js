import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function LayoutColumnItemSave(props) {
	const { attributes } = props;
	const { layoutType, customMinWidth } = attributes;

	const classes = classnames(`vk_layoutColumnItem`, {
		[`vk_layoutColumnItem-layout-${layoutType}`]:
			'custom' !== layoutType && undefined !== layoutType,
	});

	const cStyle =
		layoutType === 'custom' && customMinWidth
			? { flexBasis: customMinWidth }
			: {};

	const blockProps = useBlockProps.save({
		className: classes,
		style: cStyle,
	});

	const style = ``;
	return (
		<>
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
			<style>{style}</style>
		</>
	);
}
