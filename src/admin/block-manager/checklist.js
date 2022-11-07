/**
 * WordPress dependencies
 */
import { BlockIcon } from '@wordpress/block-editor';
import { CheckboxControl } from '@wordpress/components';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

function BlockTypesChecklist({ blockTypes }) {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	// console.log(vkBlocksOption);

	const existsBlock = (blockName, deprecated_blocks) => {
		return deprecated_blocks.indexOf(blockName) !== -1;
	};

	const isCheckedValue = (blockType) => {
		return existsBlock(blockType.name, vkBlocksOption.deprecated_blocks);
	};

	const onChange = (blockType) => {
		if (!existsBlock(blockType.name, vkBlocksOption.deprecated_blocks)) {
			vkBlocksOption.deprecated_blocks.push(blockType.name);
			setVkBlocksOption({ ...vkBlocksOption });
		} else {
			// もし既にvkBlocksOption.deprecated_blocksが存在したら削除する
			const clickIndex = vkBlocksOption.deprecated_blocks.indexOf(
				blockType.name
			);
			vkBlocksOption.deprecated_blocks.splice(clickIndex, 1);
			setVkBlocksOption({
				...vkBlocksOption,
				...vkBlocksOption.deprecated_blocks,
			});
		}
	};

	return (
		<ul className="edit-post-block-manager__checklist">
			{blockTypes.map((blockType) => (
				<li
					key={blockType.name}
					className="edit-post-block-manager__checklist-item"
				>
					<CheckboxControl
						__nextHasNoMarginBottom
						label={
							<>
								{blockType.title}
								<BlockIcon icon={blockType.icon} />
							</>
						}
						checked={isCheckedValue(blockType)}
						onChange={() => onChange(blockType)}
					/>
				</li>
			))}
		</ul>
	);
}
export default BlockTypesChecklist;
