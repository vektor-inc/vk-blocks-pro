import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save({ attributes }) {
	const { marginType, customMargin } = attributes;

	const classes = classnames(`vk_layoutColumn`);

	const inlineStyle = {};
	if ('custom' === marginType && !!customMargin) {
		inlineStyle.gap = customMargin;
	}

	const blockProps = useBlockProps.save({
		className: classes,
		style: inlineStyle,
	});

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
