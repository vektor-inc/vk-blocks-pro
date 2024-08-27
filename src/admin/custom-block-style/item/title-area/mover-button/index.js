/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { chevronUp, chevronDown } from '@wordpress/icons';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export const MoverButton = ({ index }) => {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	return (
		<div className="move-button-container">
			<Button
				icon={chevronUp}
				disabled={index === 0}
				onClick={() => {
					const newItems = [
						...vkBlocksOption.custom_block_style_lists,
					];
					newItems[index - 1] =
						vkBlocksOption.custom_block_style_lists[index];
					newItems[index] =
						vkBlocksOption.custom_block_style_lists[index - 1];
					setVkBlocksOption({
						...vkBlocksOption,
						custom_block_style_lists: [...newItems],
					});
				}}
			/>
			<Button
				icon={chevronDown}
				disabled={
					index === vkBlocksOption.custom_block_style_lists.length - 1
				}
				onClick={() => {
					const newItems = [
						...vkBlocksOption.custom_block_style_lists,
					];
					newItems[index + 1] =
						vkBlocksOption.custom_block_style_lists[index];
					newItems[index] =
						vkBlocksOption.custom_block_style_lists[index + 1];
					setVkBlocksOption({
						...vkBlocksOption,
						custom_block_style_lists: [...newItems],
					});
				}}
			/>
		</div>
	);
};
