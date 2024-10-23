import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const { footerDisplay } = attributes;

	let containerClass;
	if (footerDisplay === 'hide') {
		containerClass =
			'vk_gridcolcard_item_footer vk_gridcolcard_item_footer-hidden';
	} else {
		containerClass = 'vk_gridcolcard_item_footer';
	}

	const blockProps = useBlockProps.save({
		className: `${containerClass}`,
	});
	return (
		<>
			{(() => {
				if (footerDisplay === 'display' || footerDisplay === 'hide') {
					return (
						<div {...blockProps}>
							<InnerBlocks.Content />
						</div>
					);
				}
			})()}
		</>
	);
}
