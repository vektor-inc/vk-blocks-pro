/**
 * Internal dependencies
 */
import { PropertyLabel } from './property-label';
import { PropertyInlineStyle } from './property-inline-style';
import { BlockName } from './block-name';

export const BodyArea = ({ showBlockTypes, index, onChange, textStyleListObj }) => {
	const activeBlockType = showBlockTypes.find(
		(blockType) => blockType.name === textStyleListObj.block_name
	);

	return (
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
	);
};
