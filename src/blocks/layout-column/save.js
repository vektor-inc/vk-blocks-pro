import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { breakPoint } = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_layoutColumn`,
	});

	const css = `@media (min-width:${breakPoint}px){
		.vk_layoutColumn { display: flex; flex-wrap: wrap; }
	}`;
	return (
		<>
			<div {...blockProps} data-vkbLayoutBreakpoint={breakPoint}>
				<InnerBlocks.Content />
			</div>
			<style type="text/css">{css}</style>
		</>
	);
}
