import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		containerSpace,
		headerImageAspectRatio,
		headerImageFit,
		headerDisplay,
		old_1_39_0,
	} = attributes;
	const MY_TEMPLATE = [['core/image']];
	const ALLOWED_BLOCKS = ['core/image'];

	useEffect(() => {
		if (old_1_39_0 === undefined) {
			setAttributes({ headerImageAspectRatio: '1.618/1' });
			setAttributes({ old_1_39_0: true });
		}
	}, [clientId]);

	const style = {
		aspectRatio:
			!!headerImageAspectRatio && headerImageAspectRatio !== ''
				? headerImageAspectRatio
				: 'auto',
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

	const blockProps = useBlockProps({
		className: `${containerClass}`,
		style,
	});

	return (
		<>
			{(() => {
				if (headerDisplay === 'display' || headerDisplay === 'hide') {
					return (
						<div {...blockProps}>
							<InnerBlocks
								template={MY_TEMPLATE}
								allowedBlocks={ALLOWED_BLOCKS}
								templateLock="all"
							/>
						</div>
					);
				}
			})()}
		</>
	);
}
