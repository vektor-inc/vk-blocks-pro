/**
 * WordPress dependencies
 */
import { BlockIcon } from '@wordpress/block-editor';
import { CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockType from './block-type';

export default function BlockCategory(props) {
	const { blockTypes, category } = props;
	const [isChecked, setIsChecked] = useState(false);

	if (!blockTypes.length) {
		return null;
	}

	const blockNames = blockTypes.map((blockType) => {
		return blockType.name;
	});
	const checkedBlockNames = blockNames;
	const isAllChecked = checkedBlockNames.length === blockNames.length;

	let ariaChecked;
	if (isAllChecked) {
		ariaChecked = 'true';
	} else if (checkedBlockNames.length > 0) {
		ariaChecked = 'mixed';
	} else {
		ariaChecked = 'false';
	}

	return (
		<div className="block-manager__block-category">
			<div className="block-category__title">
				<CheckboxControl
					checked={isChecked}
					onChange={(checked) => setIsChecked(checked)}
					aria-checked={ariaChecked}
					label={
						<span>
							{category.title}
							{category.icon && (
								<BlockIcon icon={category.icon} />
							)}
						</span>
					}
				/>
			</div>
			<ul className="block-category__blocks-list">
				{blockTypes.map((blockType) => {
					return (
						<>
							<BlockType key={blockType} blockType={blockType} />
						</>
					);
				})}
			</ul>
		</div>
	);
}
