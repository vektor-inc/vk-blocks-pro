/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { PropertyLabel } from './property-label';
import { PropertyInlineStyle } from './property-inline-style';
import { TitleArea } from './title-area';
import { BlockName } from '@vkblocks/admin/custom-block-style/block-name';

export const Item = ({ showBlockTypes, index, onChange, textStyleListObj }) => {
	const activeBlockType = showBlockTypes.find(
		(blockType) => blockType.name === textStyleListObj.block_name
	);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<TitleArea
				showBlockTypes={showBlockTypes}
				index={index}
				textStyleListObj={textStyleListObj}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			{isOpen && (
				<div className="custom_block_style_body-area">
					<BlockName
						activeBlockType={activeBlockType}
						textStyleListObj={textStyleListObj}
					/>
					<PropertyLabel
						index={index}
						onChange={onChange}
						textStyleListObj={textStyleListObj}
					/>
					<PropertyInlineStyle
						index={index}
						onChange={onChange}
						textStyleListObj={textStyleListObj}
					/>
				</div>
			)}
		</>
	);
};
