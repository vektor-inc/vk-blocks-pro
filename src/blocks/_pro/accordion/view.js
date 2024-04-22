document.addEventListener('DOMContentLoaded', () => {
	const accordions = document.querySelectorAll(
		//  vk_accordion-containerはvk_accordionになったが互換性のために残しておく
		'.vk_accordion, .vk_accordion-container'
	);

	accordions.forEach(accordion => {
		applyInitialState(accordion);  // 初期状態の適用
		accordion.querySelector('.vk_accordion-toggle').addEventListener('click', () => toggleAccordion(accordion));
	});

	window.addEventListener('resize', () => {
		accordions.forEach(accordion => {
			applyInitialState(accordion);
		});
	});
});

function toggleAccordion(accordion) {
	const toggle = accordion.querySelector('.vk_accordion-toggle');
	const target = accordion.querySelector('.vk_accordion-target');
	const isOpen = toggle.classList.contains('vk_accordion-toggle-open');

	if (isOpen) {
		toggle.classList.remove('vk_accordion-toggle-open');
		toggle.classList.add('vk_accordion-toggle-close');
		target.classList.remove('vk_accordion-target-open');
		target.classList.add('vk_accordion-target-close');
	} else {
		toggle.classList.add('vk_accordion-toggle-open');
		toggle.classList.remove('vk_accordion-toggle-close');
		target.classList.add('vk_accordion-target-open');
		target.classList.remove('vk_accordion-target-close');
	}
}

function applyInitialState(accordion) {
	const initialState = accordion.getAttribute('data-initial-state');
	const initialStateMobile = accordion.getAttribute('data-initial-state-mobile');
	const initialStateTablet = accordion.getAttribute('data-initial-state-tablet');
	const initialStateDesktop = accordion.getAttribute('data-initial-state-desktop');

	const screenWidth = window.innerWidth;
	let stateToApply = initialState;

	const mobileBreakpoint = 576;
	const tabletBreakpoint = 992;

	if (screenWidth < mobileBreakpoint && initialStateMobile) {
		stateToApply = initialStateMobile;
	} else if (screenWidth >= mobileBreakpoint && screenWidth < tabletBreakpoint && initialStateTablet) {
		stateToApply = initialStateTablet;
	} else if (screenWidth >= tabletBreakpoint && initialStateDesktop) {
		stateToApply = initialStateDesktop;
	}

	const toggle = accordion.querySelector('.vk_accordion-toggle');
	const target = accordion.querySelector('.vk_accordion-target');

	// クラスを追加・削除して開閉状態を反映
	if (stateToApply === 'open') {
		toggle.classList.add('vk_accordion-toggle-open');
		toggle.classList.remove('vk_accordion-toggle-close');
		target.classList.add('vk_accordion-target-open');
		target.classList.remove('vk_accordion-target-close');
	} else {
		toggle.classList.remove('vk_accordion-toggle-open');
		toggle.classList.add('vk_accordion-toggle-close');
		target.classList.remove('vk_accordion-target-open');
		target.classList.add('vk_accordion-target-close');
	}
}

export { toggleAccordion, applyInitialState };
