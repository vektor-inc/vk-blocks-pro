/* eslint-env browser */

// SessionStorage設定
function setSessionStorageFlag(key, value) {
	sessionStorage.setItem(key, value);
}

function getSessionStorageFlag(key) {
	return sessionStorage.getItem(key) !== null;
}

// スクロールタイミング設定
window.addEventListener('scroll', function () {
	const items = document.querySelectorAll(
		'.vk_fixed-display-mode-show-on-scroll'
	);

	items.forEach((item) => {
		const blockId = item.getAttribute('data-block-id');
		const dontShowAgain =
			item.getAttribute('data-dont-show-again') === 'true';

		if (dontShowAgain && getSessionStorageFlag(`displayed_${blockId}`)) {
			return;
		}

		const timing = parseInt(item.getAttribute('data-scroll-timing'), 10);
		const unit = item.getAttribute('data-scroll-timing-unit');
		const scrollPersistVisible =
			item.getAttribute('data-persist-visible') === 'true';
		const timingInPixels = convertUnitToPixels(timing, unit);

		// 一度非表示にされたら再表示しない
		const wasHidden = item.getAttribute('data-hide-maintained') === 'true';

		// スクロール位置が指定したタイミングを超えた場合に要素を表示
		if (window.scrollY > timingInPixels && !wasHidden) {
			if (!item.classList.contains('is-visible')) {
				item.classList.add('is-visible');

				// 非表示タイマーの処理
				const hideAfterSecondsAttr = item.getAttribute(
					'data-hide-after-seconds'
				);
				const hideAfterSeconds = parseFloat(hideAfterSecondsAttr) || 0;

				// `scrollPersistVisible` が無効な場合のみ非表示タイマーをセット
				if (hideAfterSeconds > 0 && !scrollPersistVisible) {
					setTimeout(() => {
						if (item.classList.contains('is-visible')) {
							item.classList.remove('is-visible');
							item.classList.add('is-hidden');
							item.setAttribute('data-hide-maintained', 'true'); // 非表示状態を維持
						}
					}, hideAfterSeconds * 1000);
				}
			}
		} else if (!scrollPersistVisible && !wasHidden) {
			// タイミングを超えなかった場合、Persistが無効な時に非表示
			item.classList.remove('is-visible');
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
	// displayAfterSeconds が 0 以上の場合に表示
	if (displayAfterSeconds >= 0) {
		setTimeout(() => {
			if (!item.classList.contains('is-timed-visible')) {
				item.classList.add('is-timed-visible');

				if (dontShowAgain) {
					setSessionStorageFlag(`displayed_${blockId}`, 'true');
				}
			}
		}, displayAfterSeconds * 1000);
	}

	// hideAfterSeconds が 0 より大きい場合に非表示
	if (hideAfterSeconds > 0) {
		setTimeout(
			() => {
				if (item.classList.contains('is-timed-visible')) {
					item.classList.remove('is-timed-visible');
					item.classList.add('is-hidden');
				}
			},
			(displayAfterSeconds || 0) * 1000 + hideAfterSeconds * 1000
		);
	}
}

// DOM読み込み後に初期化関数を実行
function initializeDisplayHide() {
	const items = document.querySelectorAll(
		'.vk_fixed-display-mode-display-hide-after-time'
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

		if (dontShowAgain && getSessionStorageFlag(`displayed_${blockId}`)) {
			return;
		}

		// handleVisibility関数を使用して表示・非表示を制御
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
