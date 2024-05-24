const vkTabs = document.querySelectorAll('.vk_tab');

Array.prototype.forEach.call(vkTabs, (vkTab) => {
	const vkTabLabels = vkTab.querySelector('.vk_tab_labels');
	const vkTabLabel = vkTab.querySelectorAll('.vk_tab_labels_label');
	const vkTabBodies = vkTab.querySelector('.vk_tab_bodys');
	let clickedActiveLabel = null;

	Array.prototype.forEach.call(vkTabLabel, (TabLabel) => {
		TabLabel.addEventListener('click', (e) => {
			const TabLabelId = e.target.closest('.vk_tab_labels_label').id;
			const TabId = TabLabelId.replace('vk_tab_labels_label-', '');

			// 現在のアクティブなラベルとボディを取得
			const activeLabels = vkTabLabels.querySelectorAll('.vk_tab_labels_label-state-active');
			Array.prototype.forEach.call(activeLabels, (activeLabel) => {
				activeLabel.classList.remove('vk_tab_labels_label-state-active');
				activeLabel.classList.add('vk_tab_labels_label-state-inactive');
			});

			const activeBodies = vkTabBodies.querySelectorAll('.vk_tab_bodys_body-state-active');
			Array.prototype.forEach.call(activeBodies, (activeBody) => {
				activeBody.classList.remove('vk_tab_bodys_body-state-active');
			});

			// 新しいアクティブなラベルとボディを設定
			const newActiveLabel = vkTabLabels.querySelector(`#vk_tab_labels_label-${TabId}`);
			newActiveLabel.classList.add('vk_tab_labels_label-state-active');
			newActiveLabel.classList.remove('vk_tab_labels_label-state-inactive');
			clickedActiveLabel = newActiveLabel; // クリックでアクティブになったタブを追跡

			const newActiveBody = vkTabBodies.querySelector(`#vk_tab_bodys_body-${TabId}`);
			newActiveBody.classList.add('vk_tab_bodys_body-state-active');

			e.target.setAttribute('tabindex', '0');
			e.target.setAttribute('aria-selected', 'true');

			e.target.focus();
		});

		TabLabel.addEventListener('keydown', (e) => {
			const currentTab = e.target;
			let newTab;

			if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
				newTab = currentTab.previousElementSibling;
			} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
				newTab = currentTab.nextElementSibling;
			}

			if (newTab) {
				currentTab.setAttribute('tabindex', '-1');
				currentTab.setAttribute('aria-selected', 'false');

				newTab.setAttribute('tabindex', '0');
				newTab.setAttribute('aria-selected', 'true');

				newTab.focus();
			}
		});

		// ホバー時のクラスを変更
		TabLabel.addEventListener('mouseover', function() {
			if (this !== clickedActiveLabel) {
				this.classList.remove('vk_tab_labels_label-state-inactive');
				this.classList.add('vk_tab_labels_label-state-active');
			}
		});

		// ホバーが外れた時のクラスを戻す
		TabLabel.addEventListener('mouseout', function() {
			if (this !== clickedActiveLabel && !this.classList.contains('hovered-temp-active')) {
				this.classList.remove('vk_tab_labels_label-state-active');
				this.classList.add('vk_tab_labels_label-state-inactive');
			}
		});
	});
});
