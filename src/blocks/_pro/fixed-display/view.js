/* eslint-env browser */

// SessionStorage設定
function setSessionStorageFlag(key, value) {
	sessionStorage.setItem(key, value);
}

function getSessionStorageFlag(key) {
	return sessionStorage.getItem(key) !== null;
}

// 状態管理用のマップを初期化
const blockStates = new Map();

// スクロールタイミング設定
window.addEventListener('scroll', function () {
	const items = document.querySelectorAll(
		'.vk_fixed-display-mode-show-on-scroll'
	);

	items.forEach((item) => {
		const blockId = item.getAttribute('data-block-id');

		const timing = parseInt(item.getAttribute('data-scroll-timing'), 10);
		const unit = item.getAttribute('data-scroll-timing-unit');
		const scrollPersistVisible =
			item.getAttribute('data-persist-visible') === 'true';
		const timingInPixels = convertUnitToPixels(timing, unit);

		const hideAfterSecondsAttr = item.getAttribute(
			'data-hide-after-seconds'
		);
		const hideAfterSeconds = parseFloat(hideAfterSecondsAttr) || 0;

		// 初期状態をマップに設定
		if (!blockStates.has(blockId)) {
			blockStates.set(blockId, { wasHidden: false });
		}

		// ブロックの状態を取得
		const blockState = blockStates.get(blockId);

		// 一度非表示にされたら再表示しない
		if (window.scrollY > timingInPixels && !blockState.wasHidden) {
			if (!item.classList.contains('is-visible')) {
				item.classList.add('is-visible');

				// 非表示タイマーの処理
				if (hideAfterSeconds > 0 && !scrollPersistVisible) {
					setTimeout(() => {
						if (item.classList.contains('is-visible')) {
							item.classList.remove('is-visible');
							blockStates.set(blockId, { wasHidden: true });
						}
					}, hideAfterSeconds * 1000);
				}
			}
		} else {
			// 非表示ロジック
			if (!scrollPersistVisible && blockState.wasHidden) {
				// 一度非表示になったものは再表示しない
				return;
			}
			if (!scrollPersistVisible) {
				if (item.classList.contains('is-visible')) {
					item.classList.remove('is-visible');
				}
			}
		}
	});
});

// 表示・非表示タイマー設定
function handleVisibility(
	item,
	displayAfterSeconds,
	hideAfterSeconds,
	blockId,
	dontShowAgain
) {
	const mode = item.classList.contains(
		'vk_fixed-display-mode-display-hide-after-time'
	)
		? 'display-hide-after-time'
		: item.classList.contains('vk_fixed-display-mode-show-on-scroll')
			? 'show-on-scroll'
			: 'always-visible';

	// displayAfterSeconds が設定されている場合
	if (
		mode === 'display-hide-after-time' &&
		displayAfterSeconds !== null &&
		displayAfterSeconds >= 0
	) {
		setTimeout(() => {
			if (!item.classList.contains('is-timed-visible')) {
				item.classList.add('is-timed-visible')
				if (dontShowAgain) {
					setSessionStorageFlag(`displayed_${blockId}`, 'true');
				}
			}

			// hideAfterSeconds が設定されている場合に非表示処理を追加
			if (hideAfterSeconds > 0) {
				setTimeout(() => {
					if (item.classList.contains('is-timed-visible')) {
						item.classList.remove('is-timed-visible');
						item.classList.add('is-timed-hide');
					}
				}, hideAfterSeconds * 1000);
			}
		}, displayAfterSeconds * 1000);
	}

	// displayAfterSeconds が null の場合
	if (
		mode === 'display-hide-after-time' &&
		(displayAfterSeconds === null || displayAfterSeconds < 0)
	) {

		// hideAfterSeconds の時間後に非表示クラスを付与
		if (hideAfterSeconds > 0) {
			setTimeout(() => {
				item.classList.add('is-timed-hide');
			}, hideAfterSeconds * 1000);
		}
	}
}

// DOM読み込み後に初期化関数を実行
function initializeDisplayHide() {
	const items = document.querySelectorAll(
		'.vk_fixed-display-mode-display-hide-after-time, .vk_fixed-display-mode-show-on-scroll, .vk_fixed-display-mode-always-visible'
	);

	items.forEach((item) => {
		const displayAfterSecondsAttr = item.getAttribute(
			'data-display-after-seconds'
		);
		const hideAfterSeconds =
			parseFloat(item.getAttribute('data-hide-after-seconds')) || 0;
		const displayAfterSeconds = displayAfterSecondsAttr
			? parseFloat(displayAfterSecondsAttr)
			: null;
		const blockId = item.getAttribute('data-block-id');
		const dontShowAgain =
			item.getAttribute('data-dont-show-again') === 'true';

		// dontShowAgain が有効で、セッションストレージに記録がある場合はスキップ
		if (dontShowAgain && getSessionStorageFlag(`displayed_${blockId}`)) {
			return;
		}

		// モードに応じて適切な処理を実行
		const mode = item.getAttribute('data-mode');

		if (mode === 'show-on-scroll') {
			// スクロール時の動作は scroll イベントで制御するため、何もしない
			return;
		}

		// "スクロールしたら表示"以外のモードでのみ handleVisibility を適用
		handleVisibility(
			item,
			displayAfterSeconds,
			hideAfterSeconds,
			blockId,
			dontShowAgain
		);
	});
}

window.initializeDisplayHide = initializeDisplayHide;
window.addEventListener('DOMContentLoaded', initializeDisplayHide);
window.addEventListener('load', initializeDisplayHide);

// 単位をピクセル値に変換する関数
function convertUnitToPixels(value, unit) {
	switch (unit) {
		case 'px':
			return value;
		case 'em':
			return (
				value *
				parseFloat(getComputedStyle(document.documentElement).fontSize)
			);
		case 'rem':
			return (
				value *
				parseFloat(getComputedStyle(document.documentElement).fontSize)
			);
		case '%':
			return (value * window.innerHeight) / 100;
		case 'vh':
			return (value * window.innerHeight) / 100;
		case 'svh':
			return (value * window.innerHeight) / 100;
		default:
			return value;
	}
}
