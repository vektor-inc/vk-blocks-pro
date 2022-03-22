import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const {
		containerSpace,
		headerImageAspectRatio,
		headerImageFit,
		headerDisplay,
	} = attributes;

	const style = {
		aspectRatio: headerImageAspectRatio,
	};
	if (headerImageFit) {
		if (containerSpace.top) {
			style.top = `-` + containerSpace.top;
		}
		if (containerSpace.left) {
			style.marginLeft = `-` + containerSpace.left;
		}
		if (containerSpace.right) {
			style.marginRight = `-` + containerSpace.right;
		}
	}

	let containerClass;
	if (headerDisplay === 'hide') {
		containerClass =
			'vk_gridcolcard_item_header vk_gridcolcard_item_header-hidden';
	} else {
		containerClass = 'vk_gridcolcard_item_header';
	}

	const blockProps = useBlockProps.save({
		className: `${containerClass}`,
		style,
	});
	return (
		<>
			{(() => {
				if (headerDisplay === 'display' || headerDisplay === 'hide') {
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
