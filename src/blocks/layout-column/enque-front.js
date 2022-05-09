class vkbLayoutColumnManager {
	mediaQueries = {
		pc: {
			mediaQueryStr: '(min-width: 992px)',
			func: (e) => {
				if (e.matches) {
					this.layoutColumnsItemIterator((layoutColumnItem) => {
						layoutColumnItem.style.padding =
							layoutColumnItem.dataset.vkbmarginpc;
					});
				}
			},
		},
		tablet: {
			mediaQueryStr: '(min-width: 576px) and (max-width: 991.98px)',
			func: (e) => {
				if (e.matches) {
					this.layoutColumnsItemIterator((layoutColumnItem) => {
						layoutColumnItem.style.padding =
							layoutColumnItem.dataset.vkbmargintb;
					});
				}
			},
		},
		sp: {
			mediaQueryStr: '(max-width: 575.98px)',
			func: (e) => {
				if (e.matches) {
					this.layoutColumnsItemIterator((layoutColumnItem) => {
						layoutColumnItem.style.padding =
							layoutColumnItem.dataset.vkbmarginsp;
					});
				}
			},
		},
	};

	/**
	 * コンストラクタ
	 *
	 * @param {layoutColumn} layoutColumn
	 */
	constructor(layoutColumn) {
		this.layoutColumn = layoutColumn;
		this.breakPoint = this.layoutColumn.dataset.breakpoint;
		this.layoutColumnItems = this.layoutColumn.getElementsByClassName(
			'vk_layoutColumnItem'
		);

		// 設定されたブレイクポイントに対するメディアクエリを作成する。
		this.mediaQueries.breakpoint = {
			mediaQueryStr: '(min-width: ' + this.breakPoint + 'px)',
			func: (e) => {
				if (e.matches) {
					this.layoutColumn.style.display = 'flex';
					this.layoutColumn.style.flexWrap = 'wrap';

					this.layoutColumnsItemIterator((layoutColumnItem) => {
						layoutColumnItem.style.width =
							layoutColumnItem.dataset.width;
					});
				} else {
					this.layoutColumn.style.display = 'block';
					this.layoutColumn.style.flexWrap = 'nowrap';
					this.layoutColumnsItemIterator((layoutColumnItem) => {
						layoutColumnItem.dataset.width =
							layoutColumnItem.style.width;
						layoutColumnItem.style.width = '100%';
					});
				}
			},
		};
		this.initializeMediaQuery();
	}

	/**
	 * メディアクエリを初期化
	 */
	initializeMediaQuery() {
		Object.keys(this.mediaQueries).forEach((key) => {
			this.makeMediaQueries(key);
			this.execMediaQueries(key);
		});
	}

	/**
	 * すべてのLayoutColumnItemに対する処理
	 *
	 * @param {Function} func
	 */
	layoutColumnsItemIterator(func) {
		Array.prototype.forEach.call(this.layoutColumnItems, func);
	}

	/**
	 * メディアクエリを作成
	 *
	 * @param {string} handle
	 */
	makeMediaQueries(handle) {
		const mediaQuery = window.matchMedia(
			this.mediaQueries[handle].mediaQueryStr
		);
		mediaQuery.addEventListener(
			'change',
			this.mediaQueries[handle].func.bind(this)
		);
		this.mediaQueries[handle].mediaQuery = mediaQuery;
	}

	/**
	 * メディアクエリを実行
	 *
	 * @param {string} handle
	 */
	execMediaQueries(handle) {
		this.mediaQueries[handle].func(this.mediaQueries[handle].mediaQuery);
	}
}

/**
 * メインルーチン
 */
(function () {
	const layoutColumns = document.querySelectorAll('.vk_layoutColumn');

	layoutColumns.forEach((layoutColumn) => {
		//new vkbLayoutColumnManager(layoutColumn);
	});
})();
