document.addEventListener('DOMContentLoaded', () => {
	const accordion = document.querySelectorAll(
		//  vk_accordion-containerはvk_accordionになったが互換性のために残しておく
		'.vk_accordion, .vk_accordion-container'
	);

	accordion.forEach((el) => {
		const initialState = el.getAttribute('data-initial-state');
		const toggle = el.querySelector('.vk_accordion-toggle');
		const target = el.querySelector('.vk_accordion-target');

		// 初期状態を適用
		if (initialState === 'open') {
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

		// イベントリスナーを追加
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
						accordionToggle.classList.contains(
							'vk_accordion-toggle-close'
						)
					) {
						accordionToggle.classList.remove(
							'vk_accordion-toggle-close'
						);
						accordionToggle.classList.add(
							'vk_accordion-toggle-open'
						);
						accordionTarget.classList.remove(
							'vk_accordion-target-close'
						);
						accordionTarget.classList.add(
							'vk_accordion-target-open'
						);
					} else {
						accordionToggle.classList.remove(
							'vk_accordion-toggle-open'
						);
						accordionToggle.classList.add(
							'vk_accordion-toggle-close'
						);
						accordionTarget.classList.remove(
							'vk_accordion-target-open'
						);
						accordionTarget.classList.add(
							'vk_accordion-target-close'
						);
					}
				},
				false
			);
		};

		for (let i = 0; i < accordion.length; i++) {
			accordionToggleLoop(i);
		}
	});
});
