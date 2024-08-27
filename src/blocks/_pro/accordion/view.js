const accordion = document.querySelectorAll(
	//  vk_accordion-containerはvk_accordionになったが互換性のために残しておく
	'.vk_accordion, .vk_accordion-container'
);
let accordionTarget;
let accordionToggle;

document.addEventListener('DOMContentLoaded', () => {
	const accordions = document.querySelectorAll(
		'.vk_accordion, .vk_accordion-container'
	);
	accordions.forEach((accordion) => {
		const toggleElement = accordion.querySelector('.vk_accordion-toggle');
		const targetElement = accordion.querySelector('.vk_accordion-target');

		function updateAccordion() {
			const width = window.innerWidth;
			let initialState = accordion.getAttribute('data-initial-state');
			const isDeviceSpecific =
				accordion.getAttribute('data-device-specific') === 'true';

			if (isDeviceSpecific) {
				if (width < 576) {
					initialState =
						accordion.getAttribute('data-initial-state-mobile') ||
						initialState;
				} else if (width >= 992) {
					initialState =
						accordion.getAttribute('data-initial-state-desktop') ||
						initialState;
				} else {
					initialState =
						accordion.getAttribute('data-initial-state-tablet') ||
						initialState;
				}
			}

			if (initialState === 'open') {
				toggleElement.classList.add('vk_accordion-toggle-open');
				toggleElement.classList.remove('vk_accordion-toggle-close');
				targetElement.classList.add('vk_accordion-target-open');
				targetElement.classList.remove('vk_accordion-target-close');
			} else {
				toggleElement.classList.add('vk_accordion-toggle-close');
				toggleElement.classList.remove('vk_accordion-toggle-open');
				targetElement.classList.add('vk_accordion-target-close');
				targetElement.classList.remove('vk_accordion-target-open');
			}
		}

		// 初期ロード時に実行
		updateAccordion();
	});
});

const accordionToggleLoop = (i) => {
	if (
		accordion[i]
			.querySelector('.vk_accordion-toggle')
			.classList.contains('vk_accordion-toggle-open')
	) {
		accordion[i]
			.querySelector('.vk_accordion-target')
			.classList.add('vk_accordion-target-open');
	}

	if (
		accordion[i]
			.querySelector('.vk_accordion-toggle')
			.classList.contains('vk_accordion-toggle-close')
	) {
		accordion[i]
			.querySelector('.vk_accordion-target')
			.classList.add('vk_accordion-target-close');
	}

	accordion[i].querySelector('.vk_accordion-toggle').addEventListener(
		'click',
		() => {
			accordionToggle = accordion[i].querySelector(
				'.vk_accordion-toggle'
			);
			accordionTarget = accordion[i].querySelector(
				'.vk_accordion-target'
			);
			if (
				accordionToggle.classList.contains('vk_accordion-toggle-close')
			) {
				accordionToggle.classList.remove('vk_accordion-toggle-close');
				accordionToggle.classList.add('vk_accordion-toggle-open');
				accordionTarget.classList.remove('vk_accordion-target-close');
				accordionTarget.classList.add('vk_accordion-target-open');
			} else {
				accordionToggle.classList.remove('vk_accordion-toggle-open');
				accordionToggle.classList.add('vk_accordion-toggle-close');
				accordionTarget.classList.remove('vk_accordion-target-open');
				accordionTarget.classList.add('vk_accordion-target-close');
			}
		},
		false
	);
};

for (let i = 0; i < accordion.length; i++) {
	accordionToggleLoop(i);
}
