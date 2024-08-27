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

// 吹き出し設定 初期値
const BALLOON_DEFAULT_OBJ = {
	name: '',
	src: '',
};

export const AddButton = () => {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const addItem = () => {
		vkBlocksOption.balloon_meta_lists.push({
			...BALLOON_DEFAULT_OBJ,
		});
		setVkBlocksOption({ ...vkBlocksOption });
	};

	return (
		<div className="balloon_image_lists_item_add">
			<Button
				className="add-item-button"
				icon={plusCircle}
				iconSize={18}
				variant="secondary"
				onClick={addItem}
			>
				{__('Added balloon image setting', 'vk-blocks-pro')}
			</Button>
		</div>
	);
};
