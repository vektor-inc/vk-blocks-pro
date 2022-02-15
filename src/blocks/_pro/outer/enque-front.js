window.addEventListener('load', function () {
	const outerList = document.querySelectorAll('.vk_outer.has-text-color');

	outerList.forEach((el) => {
		const borderStyleBackup = el.style.borderStyle;
		el.style.borderStyle = 'solid';
		el.style.borderColor = window.getComputedStyle(el, '').color;
		el.style.borderStyle = borderStyleBackup;
	});

	const outerList2 = document.querySelectorAll(
		'.vk_outer.has-background-color'
	);
	outerList2.forEach((el) => {
		const cssStyleDeclaration = window.getComputedStyle(el);
		const opacity = cssStyleDeclaration.getPropertyValue('opacity');
		let color = cssStyleDeclaration.getPropertyValue('background-color');
		const url = cssStyleDeclaration
			.getPropertyValue('background-image')
			.replace(/^url|[\(\)]/g, '');
		color = color.replace(/rgb|\(|\)/g, '');
		color =
			'linear-gradient(rgba(' +
			color +
			', ' +
			opacity +
			'),rgba(' +
			color +
			', ' +
			opacity +
			'))';
		color += ', url(' + url + ')';
		el.style.opacity = 'initial';
		el.style.background = color;
	});
});
