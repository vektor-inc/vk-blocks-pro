/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { plusCircle } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';
import { schema } from '@vkblocks/admin/text-style/schema';

export const AddItemButton = () => {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	// indexは被らないように設定されているindexの最大値+1を設定する
	let maxIndex = 0;
	vkBlocksOption.text_style.forEach((option) => {
		if (option.index > maxIndex) {
			maxIndex = option.index;
		}
	});

	const addItem = () => {
		const addIndex = maxIndex + 1;
		vkBlocksOption.text_style.push({
			...schema,
			...{
				index: addIndex,
				class_name: `vk-text-style--${addIndex}`,
			},
		});
		setVkBlocksOption({ ...vkBlocksOption });
	};

	return (
		<div className="text_style_item_add">
			<Button
				className="add-item-button"
				icon={plusCircle}
				iconSize={18}
				variant="secondary"
				onClick={addItem}
			>
				{__('Add Text Style', 'vk-blocks')}
			</Button>
		</div>
	);
};
