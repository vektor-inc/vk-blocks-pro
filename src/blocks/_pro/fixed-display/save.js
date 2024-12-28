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

	// dataAttributesとクラスを初期化
	const dataAttributes = { 'data-block-id': blockId || '' };
	let extraClasses = '';

	// "show-on-scroll"モードのときにのみスクロール関連の属性を設定
	if (mode === 'show-on-scroll') {
		dataAttributes['data-scroll-timing'] = scrollTiming
			? scrollTiming.toString()
			: '0';
		dataAttributes['data-scroll-timing-unit'] = scrollTimingUnit;
		if (scrollPersistVisible) {
			dataAttributes['data-persist-visible'] = 'true';
		} else if (hideAfterSeconds > 0) {
			dataAttributes['data-hide-after-seconds'] =
				hideAfterSeconds.toString();
		}
		extraClasses += ' vk_fixed-display-mode-show-on-scroll';
	} else if (mode === 'display-hide-after-time') {
		// "display-hide-after-time"モードのときにのみタイミング属性を設定
		if (displayAfterSeconds !== null && displayAfterSeconds >= 0) {
			dataAttributes['data-display-after-seconds'] =
				displayAfterSeconds.toString();
			extraClasses += ' is-timed-display';
		}
		if (hideAfterSeconds > 0) {
			dataAttributes['data-hide-after-seconds'] =
				hideAfterSeconds.toString();
		}
		extraClasses += ' vk_fixed-display-mode-display-hide-after-time';
	} else if (mode === 'always-visible') {
		// "always-visible"モード専用のクラス
		extraClasses += ' vk_fixed-display-mode-always-visible';
	}

	// dontShowAgain が true のときにデータ属性を追加
	if (dontShowAgain) {
		dataAttributes['data-dont-show-again'] = 'true';
	}

	// ブロックのプロパティを設定し、不要なクラスが残らないようにする
	const blockProps = useBlockProps.save({
		className: `vk_fixed-display vk_fixed-display-position-${position} ${
			['right', 'left'].includes(position) && fixedPositionType
				? `vk_fixed-display-position-from-${fixedPositionType}`
				: ''
		} vk_fixed-display-${blockId} ${extraClasses}`,
		style: {
			// モードに応じて必要な場合のみポジションスタイルを適用
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
