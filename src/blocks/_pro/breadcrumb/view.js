/* global vkBreadcrumbSeparator, requestAnimationFrame */

function addSeparatorClass() {
	const breadcrumbItems = document.querySelectorAll(
		'.vk_breadcrumb_list_item'
	);
	breadcrumbItems.forEach(function (item) {
		item.classList.add('has-separator');
	});
}

// vkBreadcrumbSeparator.separator が存在する場合のみ実行
if (
	typeof vkBreadcrumbSeparator !== 'undefined' &&
	vkBreadcrumbSeparator.separator
) {
	// requestAnimationFrameでブラウザの再描画前に実行
	requestAnimationFrame(addSeparatorClass);
}

document.addEventListener('DOMContentLoaded', function () {
	if (typeof vkBreadcrumbSeparator !== 'undefined') {
		const separator = vkBreadcrumbSeparator.separator;
		const breadcrumbItems = document.querySelectorAll(
			'.vk_breadcrumb_list_item'
		);

		if (separator && breadcrumbItems.length > 0) {
			// 最初に `has-separator` クラスを追加
			breadcrumbItems.forEach(function (item) {
				item.classList.add('has-separator');
			});

			// 完全に読み込まれたら `loaded` クラスを追加
			window.addEventListener('load', function () {
				breadcrumbItems.forEach(function (item) {
					item.classList.add('loaded');
				});
			});

			// 動的にスタイルを作成して適用
			const styleElement = document.createElement('style');
			styleElement.innerHTML = `
				.vk_breadcrumb_list_item:not(:last-child).has-separator.loaded:after { 
					content: "${separator}";
				}
			`;
			document.head.appendChild(styleElement);
		}
	}
});
