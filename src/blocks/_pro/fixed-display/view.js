/* eslint-env browser */

// LocalStorage にフラグを保存する関数
function setLocalStorageFlag(key, value) {
	localStorage.setItem(key, value);
}

// LocalStorage からフラグを取得する関数
function getLocalStorageFlag(key) {
	return localStorage.getItem(key) !== null;
}

// 要素の表示・非表示を制御する共通関数
function handleVisibility(
	item,
	displayAfterSeconds,
	hideAfterSeconds,
	blockId,
	dontShowAgain
) {
	if (displayAfterSeconds > 0) {
		setTimeout(() => {
			item.classList.add('is-timed-visible');
			if (dontShowAgain) {
				setLocalStorageFlag(`displayed_${blockId}`, 'true');
			}
		}, displayAfterSeconds * 1000);
	} else {
		item.classList.add('is-timed-visible');
		if (dontShowAgain) {
			setLocalStorageFlag(`displayed_${blockId}`, 'true');
		}
	}

	if (hideAfterSeconds > 0) {
		setTimeout(
			() => {
				item.classList.remove('is-timed-visible');
			},
			(displayAfterSeconds + hideAfterSeconds) * 1000
		);
	}
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

		// dontShowAgainが有効で、一度表示済みなら何もしない
		if (dontShowAgain && getLocalStorageFlag(`displayed_${blockId}`)) {
			return;
		}

		const timing = parseInt(item.getAttribute('data-scroll-timing'), 10);
		const unit = item.getAttribute('data-scroll-timing-unit');
		const scrollPersistVisible =
			item.getAttribute('data-persist-visible') === 'true';

		const timingInPixels = convertUnitToPixels(timing, unit);

		// スクロール位置が指定したタイミングを超えた場合にタイマーを開始
		if (
			window.scrollY > timingInPixels &&
			!item.classList.contains('is-scrolled-visible')
		) {
			item.classList.add('is-scrolled-visible');

			const displayAfterSeconds =
				parseFloat(item.getAttribute('data-display-after-seconds')) ||
				0;
			const hideAfterSeconds =
				parseFloat(item.getAttribute('data-hide-after-seconds')) || 0;

			// handleVisibility関数を使用して表示・非表示を制御
			handleVisibility(
				item,
				displayAfterSeconds,
				hideAfterSeconds,
				blockId,
				dontShowAgain
			);
		} else if (window.scrollY < timingInPixels && !scrollPersistVisible) {
			item.classList.remove('is-scrolled-visible');
			item.classList.remove('is-timed-visible');
		}
	});
});

// 表示・非表示タイマー設定
window.addEventListener('DOMContentLoaded', function () {
	const items = document.querySelectorAll(
		'.vk_fixed-display-mode-always-visible'
	);

	items.forEach((item) => {
		const displayAfterSeconds =
			parseFloat(item.getAttribute('data-display-after-seconds')) || 0;
		const hideAfterSeconds =
			parseFloat(item.getAttribute('data-hide-after-seconds')) || 0;
		const blockId = item.getAttribute('data-block-id');
		const dontShowAgain =
			item.getAttribute('data-dont-show-again') === 'true';

		// dontShowAgainが有効で、一度表示済みなら何もしない
		if (dontShowAgain && getLocalStorageFlag(`displayed_${blockId}`)) {
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
});

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
