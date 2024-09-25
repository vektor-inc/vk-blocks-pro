import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		mode,
		position,
		scrollTiming,
		scrollTimingUnit,
		blockId,
		scrollPersistVisible,
		fixedPositionType,
		fixedPositionValue,
		fixedPositionUnit,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_fixed-display vk_fixed-display-mode-${mode} vk_fixed-display-position-${position} vk_fixed-display-${blockId} vk_fixed-display-position-from-${fixedPositionType}`,
		style: {
			// positionが「right」または「left」の場合に「top」や「bottom」を適用
			[fixedPositionType]: ['right', 'left'].includes(position)
				? `${fixedPositionValue}${fixedPositionUnit}`
				: undefined,
		},
		...(mode === 'show-on-scroll' && {
			'data-scroll-timing': scrollTiming.toString(),
			'data-scroll-timing-unit': scrollTimingUnit,
			'data-persist-visible': scrollPersistVisible ? 'true' : 'false',
		}),
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
