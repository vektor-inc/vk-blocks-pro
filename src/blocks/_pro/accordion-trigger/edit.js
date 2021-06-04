import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function AccordionTriggerEdit() {
	const blockProps = useBlockProps({
		className: `vk_accordion-trigger`,
	});
	const OnClickToggle = (e) => {
		const vkAccordion = e.target.closest('.vk_accordion-container');
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
		} else {
			vkAccordionToggle.classList.remove('vk_accordion-toggle-open');
			vkAccordionToggle.classList.add('vk_accordion-toggle-close');
			vkAccordionTarget.classList.remove('vk_accordion-target-open');
			vkAccordionTarget.classList.add('vk_accordion-target-close');
		}
	};

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
					onClick={(e) => {
						OnClickToggle(e);
					}}
				></span>
			</div>
		</>
	);
}
