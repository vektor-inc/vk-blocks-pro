import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	BlockVerticalAlignmentToolbar,
} from '@wordpress/block-editor';

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const MY_TEMPLATE = [
		[
			'core/heading',
			{
				placeholder: 'Heading',
			},
		],
		[
			'core/paragraph',
			{
				placeholder: __(
					'You can create a variety of layouts with grid column card blocks.',
					'vk-blocks-pro'
				),
			},
		],
	];
	const { verticalAlignment } = attributes;
	const updateAlignment = (value) => {
		setAttributes({ verticalAlignment: value });
	};
	let containerClass;
	if (verticalAlignment === 'top') {
		containerClass =
			'vk_gridcolcard_item_body vk_gridcolcard_item_body-valign-top';
	} else if (verticalAlignment === 'center') {
		containerClass =
			'vk_gridcolcard_item_body vk_gridcolcard_item_body-valign-center';
	} else if (verticalAlignment === 'bottom') {
		containerClass =
			'vk_gridcolcard_item_body vk_gridcolcard_item_body-valign-bottom';
	} else {
		containerClass = 'vk_gridcolcard_item_body';
	}
	const blockProps = useBlockProps({
		className: `${containerClass}`,
	});

	const innerBlockProps = useInnerBlocksProps(blockProps, {
		template: MY_TEMPLATE,
		templateLock: false,
	});

	return (
		<>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={updateAlignment}
					value={verticalAlignment}
				/>
			</BlockControls>
			<div {...innerBlockProps} />
		</>
	);
}
