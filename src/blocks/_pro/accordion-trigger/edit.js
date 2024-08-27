import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

export default function AccordionTriggerEdit() {
	const blockProps = useBlockProps({
		className: `vk_accordion-trigger`,
	});

	// アコーディオン開閉のための状態管理とイベントハンドラ
	const OnClickToggle = (e) => {
		const vkAccordion = e.target.closest('.vk_accordion');
		const vkAccordionToggle = vkAccordion.querySelector('.vk_accordion-toggle');
		const vkAccordionTarget = vkAccordion.querySelector('.vk_accordion-target');

		if (vkAccordionToggle.classList.contains('vk_accordion-toggle-close')) {
			vkAccordionToggle.classList.remove('vk_accordion-toggle-close');
			vkAccordionToggle.classList.add('vk_accordion-toggle-open');
			vkAccordionTarget.classList.remove('vk_accordion-target-close');
			vkAccordionTarget.classList.add('vk_accordion-target-open');
		} else {
			vkAccordionToggle.classList.remove('vk_accordion-toggle-open');
			vkAccordionToggle.classList.add('vk_accordion-toggle-close');
			vkAccordionTarget.classList.remove('vk_accordion-target-open');
			vkAccordionTarget.classList.add('vk_accordion-target-close');
		}
	};

	useEffect(() => {
		// 初期化: アコーディオン要素とトグルを設定
		const vkAccordion = document.querySelector('.vk_accordion');
		if (vkAccordion) {
			const vkAccordionToggle = vkAccordion.querySelector('.vk_accordion-toggle');
			if (vkAccordionToggle) {
				vkAccordionToggle.addEventListener('click', OnClickToggle);
			}
		}

		// クリーンアップ関数: イベントリスナーの削除
		return () => {
			if (vkAccordion) {
				const vkAccordionToggle = vkAccordion.querySelector('.vk_accordion-toggle');
				if (vkAccordionToggle) {
					vkAccordionToggle.removeEventListener('click', OnClickToggle);
				}
			}
		};
	}, []); // 初期ロード時のみ実行

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks
					templateLock={false}
					template={[['core/paragraph']]}
				/>
				{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
				<span
					className={`vk_accordion-toggle vk_accordion-toggle-open`}
					role="button"
					tabIndex={0}
					aria-expanded="true"
					aria-controls="accordion-content"
				></span>
			</div>
		</>
	);
}
