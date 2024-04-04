window.addEventListener('scroll', function() {
	// vk_fixed-display-mode-show-on-scrollクラスを持つすべての要素を取得
	const items = document.querySelectorAll('.vk_fixed-display.vk_fixed-display-mode-show-on-scroll');
  
	// itemsはNodeListオブジェクトなので、forEachを使用して各要素を処理
	items.forEach((item) => {
		// itemのdata-scroll-timing属性とdata-scroll-timing-unit属性を取得
		const timing = parseInt(item.getAttribute('data-scroll-timing'), 10);
		const unit = item.getAttribute('data-scroll-timing-unit') || 'px'; // デフォルトはpx
		const timingInPixels = convertUnitToPixels(timing, unit, item); // 単位をピクセルに変換
		
		// itemのページ上での位置（offsetTop）を取得し、スクロール位置を考慮して判定
		const itemTop = item.offsetTop;

		// スクロール位置 + timingInPixelsがitemの位置を超えた場合、is-visibleクラスを追加
		if (window.scrollY + timingInPixels > itemTop) {
			item.classList.add('is-visible');
		} else {
			item.classList.remove('is-visible');
		}
	});
});
  
  // 単位をピクセルに変換する関数
  function convertUnitToPixels(value, unit, element) {
	const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
	switch (unit) {
		case 'px':
			return value;
		case 'em':
			return value * parseFloat(getComputedStyle(element).fontSize);
		case 'rem':
			return value * rootFontSize;
		case 'vh':
			return value * window.innerHeight / 100;
		case 'vw':
			return value * window.innerWidth / 100;
		default:
			return value;// 未知の単位の場合は値をそのまま返す
	}
}
 
