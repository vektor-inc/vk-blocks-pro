/* eslint-env browser */

// LocalStorage に表示済みフラグを保存する関数
function saveDisplayedFlag(blockId) {
	try {
		localStorage.setItem(`displayed_${blockId}`, 'true');
	} catch (e) {
		// エラーログの削除
	}
}

// LocalStorage から表示済みフラグを取得する関数
function hasDisplayedBefore(blockId) {
	try {
		return localStorage.getItem(`displayed_${blockId}`) !== null;
	} catch (e) {
		// エラーログの削除
		return false;
	}
}

// スクロールタイミング設定
window.addEventListener('scroll', function () {
	const items = document.querySelectorAll('.vk_fixed-display-mode-show-on-scroll');

	items.forEach((item) => {
		const blockId = item.getAttribute('data-block-id'); // ユニークなblockIdを取得
		const dontShowAgain = item.getAttribute('data-dont-show-again') === 'true'; // dontShowAgainの取得

		// dontShowAgainが有効で、一度表示済みなら何もしない
		if (dontShowAgain && hasDisplayedBefore(blockId)) {
			return;
		}

		// data属性からスクロールタイミングと単位、及びscrollPersistVisibleを取得
		const timing = parseInt(item.getAttribute('data-scroll-timing'), 10);
		const unit = item.getAttribute('data-scroll-timing-unit');
		const scrollPersistVisible = item.getAttribute('data-persist-visible') === 'true';

		// 単位に応じたピクセル値への変換
		const timingInPixels = convertUnitToPixels(timing, unit);

		// スクロール位置が指定したタイミングを超えた場合にタイマーを開始
		if (window.scrollY > timingInPixels && !item.classList.contains('is-scrolled-visible')) {
			item.classList.add('is-scrolled-visible');

			// タイマーで表示
			const displayAfterSeconds = parseFloat(item.getAttribute('data-display-after-seconds')) || 0;
			const hideAfterSeconds = parseFloat(item.getAttribute('data-hide-after-seconds')) || 0;

			// X秒後に表示 (is-timed-visible)
			if (displayAfterSeconds > 0) {
				setTimeout(() => {
					item.classList.add('is-timed-visible');
					// dontShowAgainが有効なら表示済みフラグを保存
					if (dontShowAgain) {
						saveDisplayedFlag(blockId);
					}
				}, displayAfterSeconds * 1000);
			} else {
				item.classList.add('is-timed-visible');
				// dontShowAgainが有効なら表示済みフラグを保存
				if (dontShowAgain) {
					saveDisplayedFlag(blockId);
				}
			}

			// X秒後に非表示 (is-timed-hide)
			if (hideAfterSeconds > 0) {
				setTimeout(() => {
					item.classList.remove('is-timed-visible');
				}, (displayAfterSeconds + hideAfterSeconds) * 1000);
			}
		} else if (window.scrollY < timingInPixels && !scrollPersistVisible) {
			item.classList.remove('is-scrolled-visible');
			item.classList.remove('is-timed-visible'); // 非表示に戻す
		}
	});
});

// 表示・非表示タイマー設定
window.addEventListener('DOMContentLoaded', function () {
	const items = document.querySelectorAll('.vk_fixed-display-mode-always-visible');

	items.forEach((item) => {
		const displayAfterSeconds = parseFloat(item.getAttribute('data-display-after-seconds')) || 0;
		const hideAfterSeconds = parseFloat(item.getAttribute('data-hide-after-seconds')) || 0;
		const blockId = item.getAttribute('data-block-id'); // ユニークなblockIdを取得
		const dontShowAgain = item.getAttribute('data-dont-show-again') === 'true'; // dontShowAgainの取得

		// dontShowAgainが有効で、一度表示済みなら何もしない
		if (dontShowAgain && hasDisplayedBefore(blockId)) {
			return;
		}

		// X秒後に表示 (is-timed-display)
		if (displayAfterSeconds > 0) {
			setTimeout(() => {
				item.classList.add('is-timed-visible');
				// dontShowAgainが有効なら表示済みフラグを保存
				if (dontShowAgain) {
					saveDisplayedFlag(blockId);
				}
			}, displayAfterSeconds * 1000);
		} else {
			item.classList.add('is-timed-visible');
			// dontShowAgainが有効なら表示済みフラグを保存
			if (dontShowAgain) {
				saveDisplayedFlag(blockId);
			}
		}

		// X秒後に非表示 (is-timed-hide) - 表示後のタイミング
		if (hideAfterSeconds > 0) {
			setTimeout(() => {
				item.classList.remove('is-timed-visible');
			}, (displayAfterSeconds + hideAfterSeconds) * 1000);
		}
	});
});

// 単位をピクセル値に変換する関数
function convertUnitToPixels(value, unit) {
	switch (unit) {
		case 'px':
			return value;
		case 'em':
			return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
		case 'rem':
			return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
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
