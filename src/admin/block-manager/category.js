/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BlockTypesChecklist from './checklist';
// import { AdminContext } from '@vkblocks/admin/index';

function BlockManagerCategory({ title, blockTypes }) {
	const instanceId = useInstanceId(BlockManagerCategory);
	const [isChecked, setIsChecked] = useState(false);
	// const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	if (!blockTypes.length) {
		return null;
	}

	const filteredBlockTypes = blockTypes.map((blockType) => {
		return blockType.name;
	});

	if (!filteredBlockTypes.length) {
		return null;
	}

	// checkされたブロック名配列を作る
	const checkedBlockNames = blockTypes;

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
			className="block-manager__category"
		>
			<CheckboxControl
				__nextHasNoMarginBottom
				checked={isChecked}
				onChange={(checked) => setIsChecked(checked)}
				className="block-manager__category-title"
				aria-checked={ariaChecked}
				label={<span id={titleId}>{title}</span>}
			/>
			<BlockTypesChecklist blockTypes={blockTypes} />
		</div>
	);
}
export default BlockManagerCategory;
