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

	// データ属性を定義し、条件に基づいて設定する
	const dataAttributes = {};

	if (mode === 'show-on-scroll') {
		dataAttributes['data-scroll-timing'] = scrollTiming.toString();
		dataAttributes['data-scroll-timing-unit'] = scrollTimingUnit;
		if (scrollPersistVisible) {
			dataAttributes['data-persist-visible'] = 'true';
		}
	}

	if (mode === 'display-hide-after-time' && displayAfterSeconds > 0) {
		dataAttributes['data-display-after-seconds'] =
			displayAfterSeconds.toString();
	}

	if (mode === 'display-hide-after-time' && hideAfterSeconds > 0) {
		dataAttributes['data-hide-after-seconds'] = hideAfterSeconds.toString();
	}

	if (dontShowAgain) {
		dataAttributes['data-dont-show-again'] = 'true';
	}

	// ブロックのプロパティを定義
	const blockProps = useBlockProps.save({
		className: `vk_fixed-display vk_fixed-display-mode-${mode} vk_fixed-display-position-${position} ${
			['right', 'left'].includes(position) && fixedPositionType
				? `vk_fixed-display-position-from-${fixedPositionType}`
				: ''
		} vk_fixed-display-${blockId} ${
			displayAfterSeconds > 0 ? 'is-timed-display' : ''
		}`,
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
