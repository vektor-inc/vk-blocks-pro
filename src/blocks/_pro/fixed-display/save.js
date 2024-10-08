import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		mode,
		position,
		scrollTiming,
		scrollTimingUnit,
		scrollPersistVisible,
		fixedPositionType,
		fixedPositionValue,
		fixedPositionUnit,
		displayAfterSeconds,
		hideAfterSeconds,
		dontShowAgain,
		blockId,
	} = attributes;

	const dataAttributes = {
		...(mode === 'show-on-scroll' && {
			'data-scroll-timing': scrollTiming.toString(),
			'data-scroll-timing-unit': scrollTimingUnit,
			'data-persist-visible': scrollPersistVisible ? 'true' : 'false',
		}),
		...(displayAfterSeconds > 0 && {
			'data-display-after-seconds': displayAfterSeconds.toString(),
		}),
		...(hideAfterSeconds > 0 && {
			'data-hide-after-seconds': hideAfterSeconds.toString(),
		}),
		...(dontShowAgain && {
			'data-dont-show-again': 'true',
		}),
	};

	if (mode !== 'show-on-scroll') {
		delete dataAttributes['data-scroll-timing'];
		delete dataAttributes['data-scroll-timing-unit'];
		delete dataAttributes['data-persist-visible'];
	}

	const blockProps = useBlockProps.save({
		className: `vk_fixed-display vk_fixed-display-mode-${mode} vk_fixed-display-position-${position} vk_fixed-display-position-from-${fixedPositionType} vk_fixed-display-${blockId}`,
		style: {
			[fixedPositionType]: ['right', 'left'].includes(position)
				? `${fixedPositionValue}${fixedPositionUnit}`
				: undefined,
		},
		...dataAttributes,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
