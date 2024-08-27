/* eslint-env browser */

// スクロールイベントリスナーを追加
window.addEventListener('scroll', function () {
	const items = document.querySelectorAll(
		'.vk_fixed-display-mode-show-on-scroll'
	);

	items.forEach((item) => {
		// data属性からスクロールタイミングと単位、及びscrollPersistVisibleを取得
		const timing = parseInt(item.getAttribute('data-scroll-timing'), 10);
		const unit = item.getAttribute('data-scroll-timing-unit');
		const scrollPersistVisible =
			item.getAttribute('data-persist-visible') === 'true';

		// 単位に応じたピクセル値への変換
		const timingInPixels = convertUnitToPixels(timing, unit);

		// スクロール位置が指定したタイミングを超えた場合に.is-visibleクラスを付与
		if (window.scrollY > timingInPixels) {
			item.classList.add('is-visible');
		} else if (!scrollPersistVisible) {
			item.classList.remove('is-visible');
		}
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
			return value; // 単位が不明な場合はピクセル値として扱う
	}
}
