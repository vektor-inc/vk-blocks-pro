import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function AccordionTriggerEdit() {
	const blockProps = useBlockProps({
		className: `vk_accordion-trigger`,
	});
	const OnClickToggle = (e) => {
		
	}
	return (
		<>
			<div {...blockProps}>
				<InnerBlocks
					templateLock={false}
					template={[['core/paragraph']]}
				/>
				<button
					className={`vk_accordion-toggle vk_accordion-toggle-close`}
					onClick={(e) => {
						OnClickToggle(e);
					}}
				></button>
			</div>
		</>
	);
}
