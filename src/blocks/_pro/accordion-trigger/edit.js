import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useEffect, useRef } from 'react';

export default function AccordionTriggerEdit() {
	const blockProps = useBlockProps({
		className: `vk_accordion-trigger`,
	});

	const accordionToggleRef = useRef(null);

	useEffect(() => {
		// 初期状態の設定を取得
		const vkAccordion = accordionToggleRef.current.closest(
			'.vk_accordion-container, .vk_accordion'
		);
		const initialState = vkAccordion.getAttribute('data-initial-state');

		const vkAccordionToggle = accordionToggleRef.current;
		const vkAccordionTarget = vkAccordion.querySelector(
			'.vk_accordion-target'
		);

		// 初期状態に基づいてクラスとaria属性を設定
		if (initialState !== 'close') {
			// 'close'でない場合、'open'にする
			vkAccordionToggle.classList.add('vk_accordion-toggle-open');
			vkAccordionTarget.classList.add('vk_accordion-target-open');
			vkAccordionToggle.setAttribute('aria-expanded', 'true');
		} else {
			vkAccordionToggle.classList.add('vk_accordion-toggle-close');
			vkAccordionTarget.classList.add('vk_accordion-target-close');
			vkAccordionToggle.setAttribute('aria-expanded', 'false');
		}
	}, []);

	const OnClickToggle = (e) => {
		// vk_accordion-container または vk_accordion を持つ最も近い要素を探す
		const vkAccordion = e.target.closest(
			'.vk_accordion-container, .vk_accordion'
		);
		const vkAccordionToggle = vkAccordion.querySelector(
			'.vk_accordion-toggle'
		);
		const vkAccordionTarget = vkAccordion.querySelector(
			'.vk_accordion-target'
		);

		if (vkAccordionToggle.classList.contains('vk_accordion-toggle-close')) {
			vkAccordionToggle.classList.remove('vk_accordion-toggle-close');
			vkAccordionToggle.classList.add('vk_accordion-toggle-open');
			vkAccordionTarget.classList.remove('vk_accordion-target-close');
			vkAccordionTarget.classList.add('vk_accordion-target-open');
			vkAccordionToggle.setAttribute('aria-expanded', 'true');
		} else {
			vkAccordionToggle.classList.remove('vk_accordion-toggle-open');
			vkAccordionToggle.classList.add('vk_accordion-toggle-close');
			vkAccordionTarget.classList.remove('vk_accordion-target-open');
			vkAccordionTarget.classList.add('vk_accordion-target-close');
			vkAccordionToggle.setAttribute('aria-expanded', 'false');
		}
	};

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks
					templateLock={false}
					template={[['core/paragraph']]}
				/>
				<span
					ref={accordionToggleRef}
					className="vk_accordion-toggle" // 初期状態のクラスはJSで設定
					onClick={(e) => {
						OnClickToggle(e);
					}}
					role="button"
					tabIndex={0}
					onKeyPress={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							OnClickToggle(e);
						}
					}}
					aria-controls="accordion-content"
					aria-label="Toggle"
				></span>
			</div>
		</>
	);
}
