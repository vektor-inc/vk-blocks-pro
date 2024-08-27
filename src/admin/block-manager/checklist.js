/**
 * WordPress dependencies
 */
import { BlockIcon } from '@wordpress/block-editor';
import { CheckboxControl } from '@wordpress/components';

/*globals vkBlocksObject */

function BlockTypesChecklist({ blockTypes, value, onItemChange }) {
	// blockJsonのtitleがあったらblockTypesのtitleがあれば
	const getBlockTitle = (name, blockTypeTitle) => {
		const blockJsonList = vkBlocksObject.blockJsonLists.find(
			(item) => item.name === name
		);
		return blockJsonList && blockJsonList.title
			? blockJsonList.title
			: blockTypeTitle;
	};

	return (
		<ul className="block-manager__checklist">
			{blockTypes.map((blockType) => (
				<li
					key={blockType.name}
					className="block-manager__checklist-item"
				>
					<CheckboxControl
						__nextHasNoMarginBottom
						label={
							<>
								{getBlockTitle(blockType.name, blockType.title)}
								<BlockIcon icon={blockType.icon} />
							</>
						}
						checked={value.includes(blockType.name)}
						onChange={(...args) =>
							onItemChange(blockType.name, ...args)
						}
					/>
				</li>
			))}
		</ul>
	);
}
export default BlockTypesChecklist;
