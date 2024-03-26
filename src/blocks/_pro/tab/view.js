const vkTabs = document.querySelectorAll('.vk_tab');

Array.prototype.forEach.call(vkTabs, (vkTab) => {
	const vkTabLabels = vkTab.querySelector('.vk_tab_labels');
	const vkTabLabel = vkTab.querySelectorAll('.vk_tab_labels_label');
	const vkTabBodies = vkTab.querySelector('.vk_tab_bodys');

	Array.prototype.forEach.call(vkTabLabel, (TabLabel) => {
		TabLabel.addEventListener('click', (e) => {
			// ブロック ID を抽出
			const TabLabelId = e.target.closest('.vk_tab_labels_label').id;
			const TabId = TabLabelId.replace('vk_tab_labels_label-', '');

			// カレントを探して全て外す
			const activeLabels = vkTabLabels.querySelectorAll(
				'.vk_tab_labels_label-state-active'
			);
			Array.prototype.forEach.call(activeLabels, (activeLabel) => {
				activeLabel.classList.remove(
					'vk_tab_labels_label-state-active'
				);
			});
			const activeBodies = vkTabBodies.querySelectorAll(
				'.vk_tab_bodys_body-state-active'
			);
			Array.prototype.forEach.call(activeBodies, (activeBody) => {
				activeBody.classList.remove('vk_tab_bodys_body-state-active');
			});

			// クリックされた要素にアクティブを追加
			vkTabLabels
				.querySelector(`#vk_tab_labels_label-${TabId}`)
				.classList.add('vk_tab_labels_label-state-active');
			vkTabBodies
				.querySelector(`#vk_tab_bodys_body-${TabId}`)
				.classList.add('vk_tab_bodys_body-state-active');
		});
	});
});
