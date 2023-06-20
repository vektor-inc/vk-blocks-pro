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
import BlockStyleChecklist from './checklist';
import { AdminContext } from '@vkblocks/admin/index';

export default function BlockStyleManagerCategory({
	blockName,
	blockTitle,
	blockStyleTypes,
}) {
	const instanceId = useInstanceId(BlockStyleManagerCategory);
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const defaultAllowedBlockStyleTypes = true;
	const hiddenBlockTypes = vkBlocksOption.disable_block_style_lists;
	const filteredBlockStyleTypes = useMemo(() => {
		if (defaultAllowedBlockStyleTypes === true) {
			return blockStyleTypes;
		}
		return blockStyleTypes.filter(({ name }) => {
			const hiddenBlockStyleLists =
				vkBlocksOption.disable_block_style_lists.find(
					(item) => item.block_name === blockName
				);
			return !hiddenBlockStyleLists.includes(name);
		});
	}, [defaultAllowedBlockStyleTypes, blockStyleTypes]);

	const showBlockStyles = (blockStyles) => {
		const targetBlockStyles = vkBlocksOption.disable_block_style_lists.find(
			(item) => item.block_name === blockName
		);
		const existingBlockStyleNames = targetBlockStyles?.property_name ?? [];
		const mergedBlockNames = existingBlockStyleNames.filter(
			(type) =>
				!(
					Array.isArray(blockStyles) ? blockStyles : [blockStyles]
				).includes(type)
		);

		// 対象のオプション値がない時
		if (
			existingBlockStyleNames.length === 0 &&
			targetBlockStyles === undefined
		) {
			vkBlocksOption.disable_block_style_lists.push({
				block_name: blockName,
				property_name: [...mergedBlockNames],
			});
		}
		// vkBlocksOptionのproperty_nameを上書きする
		vkBlocksOption.disable_block_style_lists.forEach((item) => {
			if (item.block_name === blockName) {
				item.property_name = [...mergedBlockNames];
			}
		});

		setVkBlocksOption({ ...vkBlocksOption });
	};

	const hideBlockStyles = (blockStyles) => {
		const targetBlockStyles = vkBlocksOption.disable_block_style_lists.find(
			(item) => item.block_name === blockName
		);
		const existingBlockStyleNames = targetBlockStyles?.property_name ?? [];
		const mergedBlockNames = new Set([
			...existingBlockStyleNames,
			...(Array.isArray(blockStyles) ? blockStyles : [blockStyles]),
		]);

		// 対象のオプション値がない時
		if (
			existingBlockStyleNames.length === 0 &&
			targetBlockStyles === undefined
		) {
			vkBlocksOption.disable_block_style_lists.push({
				block_name: blockName,
				property_name: [...mergedBlockNames],
			});
		}
		// vkBlocksOptionのproperty_nameを上書きする
		vkBlocksOption.disable_block_style_lists.forEach((item) => {
			if (item.block_name === blockName) {
				item.property_name = [...mergedBlockNames];
			}
		});

		setVkBlocksOption({ ...vkBlocksOption });
	};

	const toggleVisible = useCallback(
		(blockStyleName, nextIsChecked) => {
			if (nextIsChecked) {
				showBlockStyles(blockStyleName);
			} else {
				hideBlockStyles(blockStyleName);
			}
		},
		[showBlockStyles, hideBlockStyles]
	);
	const toggleAllVisible = useCallback(
		(nextIsChecked) => {
			const blockStyles = blockStyleTypes.map(
				(blockType) => blockType.name
			);
			if (nextIsChecked) {
				showBlockStyles(blockStyles);
			} else {
				hideBlockStyles(blockStyles);
			}
		},
		[blockStyleTypes, showBlockStyles, hideBlockStyles]
	);

	if (!filteredBlockStyleTypes.length) {
		return null;
	}

	// checkするブロック名配列を作る
	const hiddenBlockStyleLists = hiddenBlockTypes.find(
		(item) => item.block_name === blockName
	);
	const checkedBlockStyles = filteredBlockStyleTypes
		.map((blockType) => blockType.name)
		.filter((type) => !hiddenBlockStyleLists?.property_name.includes(type));

	const titleId = 'block-manager__category-title-' + instanceId;

	const isAllChecked =
		checkedBlockStyles.length === filteredBlockStyleTypes.length;

	let ariaChecked;
	if (isAllChecked) {
		ariaChecked = 'true';
	} else if (checkedBlockStyles.length > 0) {
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
				label={<span id={titleId}>{blockTitle}</span>}
			/>
			<BlockStyleChecklist
				blockStyleTypes={filteredBlockStyleTypes}
				value={checkedBlockStyles}
				onItemChange={toggleVisible}
				blockName={blockName}
			/>
		</div>
	);
}
