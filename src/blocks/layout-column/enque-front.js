class vkbLayoutColumnManager {
	mediaQueries = {
		pc: {
			mediaQueryStr: '(min-width: 992px)',
			func: (e) => {
				if (e.matches) {
					this.layoutColumnsItemIteator((layoutColumnItem) => {
						layoutColumnItem.style.margin =
							layoutColumnItem.dataset.vkbmarginpc;
					});
				}
			},
		},
		tablet: {
			mediaQueryStr: '(min-width: 576px) and (max-width: 991.98px)',
			func: (e) => {
				if (e.matches) {
					this.layoutColumnsItemIteator((layoutColumnItem) => {
						layoutColumnItem.style.margin =
							layoutColumnItem.dataset.vkbmargintb;
					});
				}
			},
		},
		sp: {
			mediaQueryStr: '(max-width: 575.98px)',
			func: (e) => {
				if (e.matches) {
					this.layoutColumnsItemIteator((layoutColumnItem) => {
						layoutColumnItem.style.margin =
							layoutColumnItem.dataset.vkbmarginsp;
					});
				}
			},
		},
	};

	constructor(layoutColumn) {
		this.layoutColumn = layoutColumn;
		this.breakPoint = this.layoutColumn.dataset.vkblayoutbreakpoint;
		this.layoutColumnItems = this.layoutColumn.getElementsByClassName(
			'vk_layoutColumnItem'
		);

		this.registerMediaQuery();

		this.addMediaQueries(
			'breakpoint',
			'(min-width: ' + this.breakPoint + 'px)',
			(e) => {
				if (e.matches) {
					this.layoutColumnsItemIteator((layoutColumnItem) => {
						layoutColumnItem.style.width = 'block';
					});
				} else {
					this.layoutColumnsItemIteator((layoutColumnItem) => {
						layoutColumnItem.style.width = '100%';
					});
				}
			}
		);

		/*
		console.log(this.breakPoint);
		this.mediaQuery = window.matchMedia('(min-width: ' + this.breakPoint + 'px)');
		console.log(this.mediaQuery);
		this.mediaQuery.addEventListener("change", e => {
			console.log('vsllrf');
			if (e.matches) {
				console.log('media mach!');
			}
		});
		Array.prototype.forEach.call(this.layoutColumnItems, (layoutColumnItem) => {
			layoutColumnItem.style.margin = layoutColumnItem.dataset.vkbmarginpc;
			console.log("DAS:" + layoutColumnItem.dataset.vkbmarginpc);
		});	
		*/
	}

	registerMediaQuery() {
		Object.keys(this.mediaQueries).forEach((key) => {
			this.addMediaQueries(
				key,
				this.mediaQueries[key].mediaQueryStr,
				this.mediaQueries[key].func.bind(this)
			);
			this.mediaQueries[key].func(this.mediaQueries[key].mediaQuery);
		});
	}

	layoutColumnsItemIteator(func) {
		Array.prototype.forEach.call(this.layoutColumnItems, func);
	}

	addMediaQueries(handle, mediaQueryStr, func) {
		const mediaQuery = window.matchMedia(mediaQueryStr);
		mediaQuery.addEventListener('change', func.bind(this));
		this.mediaQueries[handle].mediaQuery = mediaQuery;
	}
}

(function () {
	const layoutColumns = document.querySelectorAll('.vk_layoutColumn');

	layoutColumns.forEach((layoutColumn) => {
		new vkbLayoutColumnManager(layoutColumn);
	});
})();
