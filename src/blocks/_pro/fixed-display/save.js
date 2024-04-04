// スクロールイベントリスナーを追加
window.addEventListener('scroll', function() {
    const items = document.querySelectorAll('.vk_fixed-display-mode-show-on-scroll');

    items.forEach(item => {
        // data属性からスクロールタイミングと単位を取得
        const timing = parseInt(item.getAttribute('data-scroll-timing'), 10);
        const unit = item.getAttribute('data-scroll-timing-unit');

        // 単位に応じたピクセル値への変換
        const timingInPixels = convertUnitToPixels(timing, unit);

        // スクロール位置が指定したタイミングを超えた場合に.is-visibleクラスを付与
        if (window.scrollY > timingInPixels) {
            item.classList.add('is-visible');
        } else {
            item.classList.remove('is-visible');
        }
    });
});

// 単位をピクセル値に変換する関数
function convertUnitToPixels(value, unit) {
    switch(unit) {
        case 'px':
            return value;
        case 'em':
            return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
        case 'rem':
            return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
        case 'vh':
            return value * window.innerHeight / 100;
        case 'vw':
            return value * window.innerWidth / 100;
        default:
            return value; // 単位が不明な場合はピクセル値として扱う
    }
}
