document.addEventListener('DOMContentLoaded', function () {
	const vkTabs = document.querySelectorAll('.vk_tab');

	// 各タブのiframeを管理する関数
	const adjustIframeHeight = (tabBody) => {
		const iframes = tabBody.querySelectorAll('iframe');
		iframes.forEach((iframe) => {
			// iframeのheight属性を取得
			const iframeHeight = iframe.getAttribute('height');

			// heightが数値だけの場合はpxを付け、単位付きの場合はそのまま使用
			if (iframeHeight && /^\d+$/.test(iframeHeight)) {
				iframe.style.height = iframeHeight + 'px';
			} else {
				iframe.style.height = iframeHeight;
			}
		});
	};

	Array.prototype.forEach.call(vkTabs, (vkTab) => {
		const vkTabLabels = vkTab.querySelector('.vk_tab_labels');
		const vkTabLabel = vkTab.querySelectorAll('.vk_tab_labels_label');
		const vkTabBodies = vkTab.querySelector('.vk_tab_bodys');

		// 初期状態でinactiveタブの背景色を設定
		Array.prototype.forEach.call(vkTabLabel, (TabLabel) => {
			if (
				!TabLabel.classList.contains(
					'vk_tab_labels_label-state-active'
				) &&
				!TabLabel.closest('.vk_tab').classList.contains(
					'is-style-vk_tab_labels-line'
				)
			) {
				TabLabel.style.setProperty(
					'background-color',
					'var(--vk-color-bg-inactive)',
					'important'
				);
			}
		});

		// 初期読み込み時にアクティブタブを設定
		const activeLabel = vkTab.querySelector(
			'.vk_tab_labels_label-state-active'
		);
		if (activeLabel) {
			activeLabel.classList.add('vk_tab_labels_label-state-active');
			activeLabel.classList.remove('vk_tab_labels_label-state-inactive');

			if (
				activeLabel
					.closest('.vk_tab')
					.classList.contains('is-style-vk_tab_labels-line')
			) {
				const div = activeLabel.querySelector('div');
				const borderTopColor = div.style.borderTopColor;
				const borderColorClass = Array.from(div.classList).find(
					(cls) =>
						cls.startsWith('has-') && cls.endsWith('-border-color')
				);
				if (borderColorClass) {
					const colorClass = borderColorClass.replace(
						'-border-color',
						'-color'
					);
					div.classList.add(colorClass);
				} else {
					activeLabel.style.color = borderTopColor;
				}
			}
		}

		const inactiveLabels = vkTab.querySelectorAll(
			'.vk_tab_labels_label:not(.vk_tab_labels_label-state-active)'
		);
		inactiveLabels.forEach((label) => {
			label.classList.add('vk_tab_labels_label-state-inactive');
			if (
				!label
					.closest('.vk_tab')
					.classList.contains('is-style-vk_tab_labels-line')
			) {
				label.style.setProperty(
					'background-color',
					'var(--vk-color-bg-inactive)',
					'important'
				);
			} else {
				label.style.removeProperty('color');
			}
		});

		// 初期状態でアクティブでないタブボディにhidden="until-found"を追加
		const vkTabBodiesAll =
			vkTabBodies.querySelectorAll('.vk_tab_bodys_body');
		vkTabBodiesAll.forEach((tabBody) => {
			if (!tabBody.classList.contains('vk_tab_bodys_body-state-active')) {
				tabBody.setAttribute('hidden', 'until-found');
			}
		});

		Array.prototype.forEach.call(vkTabLabel, (TabLabel) => {
			// タブ内のiframeごとの高さを保持するオブジェクトを定義
			const iframeHeights = {};

			// iframeの高さを初期化時に取得して保存
			const allIframes = document.querySelectorAll(
				'.vk_tab_bodys_body iframe'
			);
			allIframes.forEach((iframe) => {
				const tabId = iframe.closest('.vk_tab_bodys_body').id;
				iframeHeights[tabId] =
					iframe.style.height || iframe.clientHeight + 'px';
			});

			// タブがクリックされたときの処理
			TabLabel.addEventListener('click', (e) => {
				// ブロック ID を抽出
				const TabLabelId = e.target.closest('.vk_tab_labels_label').id;
				const TabId = TabLabelId.replace('vk_tab_labels_label-', '');

				// 現在のアクティブなラベルとボディを取得
				const activeLabels = vkTabLabels.querySelectorAll(
					'.vk_tab_labels_label-state-active'
				);
				Array.prototype.forEach.call(activeLabels, (activeLabel) => {
					activeLabel.classList.remove(
						'vk_tab_labels_label-state-active'
					);
					activeLabel.classList.add(
						'vk_tab_labels_label-state-inactive'
					);
					activeLabel.setAttribute('aria-selected', 'false');
					if (
						!activeLabel
							.closest('.vk_tab')
							.classList.contains('is-style-vk_tab_labels-line')
					) {
						activeLabel.style.setProperty(
							'background-color',
							'var(--vk-color-bg-inactive)',
							'important'
						);
					} else {
						const div = activeLabel.querySelector('div');
						const borderColorClass = Array.from(div.classList).find(
							(cls) =>
								cls.startsWith('has-') &&
								cls.endsWith('-border-color')
						);
						if (borderColorClass) {
							const colorClass = borderColorClass.replace(
								'-border-color',
								'-color'
							);
							div.classList.remove(colorClass);
						}
						activeLabel.style.removeProperty('color');
					}
				});

				const activeBodies = vkTabBodies.querySelectorAll(
					'.vk_tab_bodys_body-state-active'
				);
				Array.prototype.forEach.call(activeBodies, (activeBody) => {
					activeBody.classList.remove(
						'vk_tab_bodys_body-state-active'
					);
					activeBody.setAttribute('hidden', 'until-found');
				});

				// 新しいアクティブなラベルとボディを設定
				const newActiveLabel = vkTabLabels.querySelector(
					`#vk_tab_labels_label-${TabId}`
				);
				newActiveLabel.classList.add(
					'vk_tab_labels_label-state-active'
				);
				newActiveLabel.classList.remove(
					'vk_tab_labels_label-state-inactive'
				);
				newActiveLabel.style.removeProperty('background-color');
				newActiveLabel.setAttribute('aria-selected', 'true');
				if (
					newActiveLabel
						.closest('.vk_tab')
						.classList.contains('is-style-vk_tab_labels-line')
				) {
					const div = newActiveLabel.querySelector('div');
					const borderTopColor = div.style.borderTopColor;
					const borderColorClass = Array.from(div.classList).find(
						(cls) =>
							cls.startsWith('has-') &&
							cls.endsWith('-border-color')
					);
					if (borderColorClass) {
						const colorClass = borderColorClass.replace(
							'-border-color',
							'-color'
						);
						div.classList.add(colorClass);
					} else {
						newActiveLabel.style.color = borderTopColor;
					}
				} else {
					const activeTabBody = vkTabBodies.querySelector(
						`#vk_tab_bodys_body-${TabId}`
					);
					const activeTabBodyStyle =
						window.getComputedStyle(activeTabBody);
					newActiveLabel.style.backgroundColor =
						activeTabBodyStyle.borderTopColor || '';
				}

				const newActiveBody = vkTabBodies.querySelector(
					`#vk_tab_bodys_body-${TabId}`
				);
				newActiveBody.classList.add('vk_tab_bodys_body-state-active');
				newActiveBody.removeAttribute('hidden');
				newActiveBody.setAttribute(
					'aria-labelledby',
					`vk_tab_labels_label-${TabId}`
				);

				// iframeの再読み込み処理
				const iframes = newActiveBody.querySelectorAll('iframe');
				iframes.forEach((iframe) => {
					const src = iframe.getAttribute('src');
					iframe.setAttribute('src', src); // そのまま再設定のみを行う

					// iframeの高さを保存していた値に再設定
					iframe.style.height = iframeHeights[newActiveBody.id];
				});

				// タブがアクティブになった瞬間にiframeの高さを計算して調整
				adjustIframeHeight(newActiveBody);

				e.target.setAttribute('tabindex', '0');
				e.target.focus();
			});

			TabLabel.addEventListener('keydown', (e) => {
				const currentTab = e.target;
				let newTab;

				if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
					newTab = currentTab.previousElementSibling;
				} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
					newTab = currentTab.nextElementSibling;
				} else if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					currentTab.click();
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
			TabLabel.addEventListener('mouseover', function () {
				if (
					!this.classList.contains(
						'vk_tab_labels_label-state-active'
					) &&
					!this.closest('.vk_tab').classList.contains(
						'is-style-vk_tab_labels-line'
					)
				) {
					const activeTabBody = vkTabBodies.querySelector(
						`#vk_tab_bodys_body-${this.id.replace(
							'vk_tab_labels_label-',
							''
						)}`
					);
					const activeTabBodyStyle =
						window.getComputedStyle(activeTabBody);
					this.style.setProperty(
						'background-color',
						activeTabBodyStyle.borderTopColor || '',
						'important'
					);
					this.classList.add('hovered-temp-active');
				}
			});

			// ホバーが外れた時のクラスを戻す
			TabLabel.addEventListener('mouseout', function () {
				if (
					!this.classList.contains(
						'vk_tab_labels_label-state-active'
					) &&
					!this.closest('.vk_tab').classList.contains(
						'is-style-vk_tab_labels-line'
					)
				) {
					this.style.setProperty(
						'background-color',
						'var(--vk-color-bg-inactive)',
						'important'
					);
					this.classList.remove('hovered-temp-active');
				}
			});
		});
	});
});
