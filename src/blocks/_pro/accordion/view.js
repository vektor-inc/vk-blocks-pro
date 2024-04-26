const accordion = document.querySelectorAll(
	//  vk_accordion-containerはvk_accordionになったが互換性のために残しておく
	'.vk_accordion, .vk_accordion-container'
);
let accordionTarget;
let accordionToggle;

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

document.addEventListener('DOMContentLoaded', function () {
	const accordions = document.querySelectorAll('.vk_accordion, .vk_accordion-container');

	accordions.forEach(accordion => {
		const isDeviceSpecific = accordion.dataset.isDeviceSpecific === 'true';
		let initialState = accordion.dataset.initialState;  // デフォルトの初期状態

		if (isDeviceSpecific) {
			const width = window.innerWidth;
			if (width < 768) {  // モバイルデバイス
				initialState = accordion.dataset.initialStateMobile;
			} else if (width >= 768 && width < 1024) {  // タブレット
				initialState = accordion.dataset.initialStateTablet;
			} else {  // デスクトップ
				initialState = accordion.dataset.initialStateDesktop;
			}
		}

		accordion.querySelectorAll('.vk_accordion-toggle').forEach(toggle => {
			const target = accordion.querySelector('.vk_accordion-target');

			if (initialState === 'open') {
				toggle.classList.add('vk_accordion-toggle-open');
				toggle.classList.remove('vk_accordion-toggle-close');
				target.classList.add('vk_accordion-target-open');
				target.classList.remove('vk_accordion-target-close');
			} else {
				toggle.classList.add('vk_accordion-toggle-close');
				toggle.classList.remove('vk_accordion-toggle-open');
				target.classList.add('vk_accordion-target-close');
				target.classList.remove('vk_accordion-target-open');
			}

			toggle.addEventListener('click', () => {
				if (toggle.classList.contains('vk_accordion-toggle-close')) {
					toggle.classList.remove('vk_accordion-toggle-close');
					toggle.classList.add('vk_accordion-toggle-open');
					target.classList.remove('vk_accordion-target-close');
					target.classList.add('vk_accordion-target-open');
				} else {
					toggle.classList.remove('vk_accordion-toggle-open');
					toggle.classList.add('vk_accordion-toggle-close');
					target.classList.remove('vk_accordion-target-open');
					target.classList.add('vk_accordion-target-close');
				}
			});
		});
	});
});
