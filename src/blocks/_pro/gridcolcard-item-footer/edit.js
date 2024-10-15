import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Edit(props) {
	const { attributes } = props;
	const { footerDisplay } = attributes;
	const TEMPLATE = [['core/buttons']];
	const ALLOWED_BLOCKS = [
		'vk-blocks/button',
		'vk-blocks/button-outer',
		'core/paragraph',
		'core/buttons',
		'core/spacer',
		'vk-blocks/spacer',
	];

	let containerClass;
	if (footerDisplay === 'hide') {
		containerClass =
			'vk_gridcolcard_item_footer vk_gridcolcard_item_footer-hidden';
	} else {
		containerClass = 'vk_gridcolcard_item_footer';
	}

	const blockProps = useBlockProps({
		className: `${containerClass}`,
	});

	return (
		<>
			{(() => {
				if (footerDisplay === 'display' || footerDisplay === 'hide') {
					return (
						<div {...blockProps}>
							<InnerBlocks
								allowedBlocks={ALLOWED_BLOCKS}
								template={TEMPLATE}
								templateLock={false}
							/>
						</div>
					);
				}
			})()}
		</>
	);
}
