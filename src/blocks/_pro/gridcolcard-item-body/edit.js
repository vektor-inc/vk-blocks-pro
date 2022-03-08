import {
	InnerBlocks,
	useBlockProps,
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
				placeholder:
					'グリッドカラムカードブロックでは様々なレイアウトが可能です。レイアウトパターンは、新規ブロック挿入時に画面左側に表示されるパネルで、「パターン」タブに切り替え -> セレクトボックスで「VK Grid Column Card」から呼び出す事ができます。',
			},
		],
	];
	const { verticalAlignment } = attributes;
	const updateAlignment = (value) => {
		setAttributes({ verticalAlignment: value });
	};
	let containerClass;
	if (verticalAlignment === 'center') {
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

	return (
		<>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={updateAlignment}
					value={verticalAlignment}
				/>
			</BlockControls>
			<div {...blockProps}>
				<div className={`vk_gridcolcard_item_body_inner`}>
					<InnerBlocks template={MY_TEMPLATE} templateLock={false} />
				</div>
			</div>
		</>
	);
}
