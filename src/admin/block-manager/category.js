/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';
import { useMemo, useContext, useCallback } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BlockTypesChecklist from './checklist';
import { AdminContext } from '@vkblocks/admin/index';

function BlockManagerCategory({ title, blockTypes }) {
	const instanceId = useInstanceId(BlockManagerCategory);
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const defaultAllowedBlockTypes = true;
	const hiddenBlockTypes = vkBlocksOption.disable_block_lists;
	const filteredBlockTypes = useMemo(() => {
		if (defaultAllowedBlockTypes === true) {
			return blockTypes;
		}
		return blockTypes.filter(({ name }) => {
			return !vkBlocksOption.disable_block_lists.includes(name);
		});
	}, [defaultAllowedBlockTypes, blockTypes]);

	const showBlockTypes = (blockNames) => {
		const existingBlockNames = vkBlocksOption.disable_block_lists ?? [];
		const newBlockNames = existingBlockNames.filter(
			(type) =>
				!(
					Array.isArray(blockNames) ? blockNames : [blockNames]
				).includes(type)
		);
		vkBlocksOption.disable_block_lists = newBlockNames;
		setVkBlocksOption({ ...vkBlocksOption });
	};

	const hideBlockTypes = (blockNames) => {
		const existingBlockNames = vkBlocksOption.disable_block_lists ?? [];
		const mergedBlockNames = new Set([
			...existingBlockNames,
			...(Array.isArray(blockNames) ? blockNames : [blockNames]),
		]);
		vkBlocksOption.disable_block_lists = [...mergedBlockNames];
		setVkBlocksOption({ ...vkBlocksOption });
	};

	const toggleVisible = useCallback(
		(blockName, nextIsChecked) => {
			if (nextIsChecked) {
				showBlockTypes(blockName);
			} else {
				hideBlockTypes(blockName);
			}
		},
		[showBlockTypes, hideBlockTypes]
	);
	const toggleAllVisible = useCallback(
		(nextIsChecked) => {
			const blockNames = blockTypes.map((blockType) => blockType.name);
			if (nextIsChecked) {
				showBlockTypes(blockNames);
			} else {
				hideBlockTypes(blockNames);
			}
		},
		[blockTypes, showBlockTypes, hideBlockTypes]
	);

	if (!filteredBlockTypes.length) {
		return null;
	}

	// checkするブロック名配列を作る
	const checkedBlockNames = filteredBlockTypes
		.map((blockType) => blockType.name)
		.filter((type) => !hiddenBlockTypes.includes(type));

	const titleId = 'block-manager__category-title-' + instanceId;

	const isAllChecked = checkedBlockNames.length === filteredBlockTypes.length;

	let ariaChecked;
	if (isAllChecked) {
		ariaChecked = 'true';
	} else if (checkedBlockNames.length > 0) {
		ariaChecked = 'mixed';
	} else {
		ariaChecked = 'false';
	}

	return (
		<div
			role="group"
			aria-labelledby={titleId}
			className={classnames(
				'block-manager__category',
				'blockManagerList'
			)}
		>
			<CheckboxControl
				__nextHasNoMarginBottom
				checked={isAllChecked}
				onChange={toggleAllVisible}
				className="block-manager__category-title"
				aria-checked={ariaChecked}
				label={<span id={titleId}>{title}</span>}
			/>
			<BlockTypesChecklist
				blockTypes={filteredBlockTypes}
				value={checkedBlockNames}
				onItemChange={toggleVisible}
			/>
		</div>
	);
}
export default BlockManagerCategory;
