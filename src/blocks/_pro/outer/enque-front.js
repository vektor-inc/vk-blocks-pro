window.addEventListener('load', function () {
	const outerList = document.querySelectorAll('.vk_outer.has-text-color');

	outerList.forEach((el) => {
		const borderStyleBackup = el.style.borderStyle;
		el.style.borderStyle = 'solid';
		el.style.borderColor = window.getComputedStyle(el, '').color;
		el.style.borderStyle = borderStyleBackup;
	});
});
