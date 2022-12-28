/**
 * Internal dependencies
 */
import { PropertyLabel } from './property-label';
import { PropertyInlineStyle } from './property-inline-style';
import { BlockName } from './block-name';

export const BodyArea = ({
	activeBlockType,
	index,
	onChange,
	blockStyleListObj,
}) => {
	return (
		<div className="custom_block_style_body-area">
			<BlockName
				activeBlockType={activeBlockType}
				blockStyleListObj={blockStyleListObj}
			/>
			<PropertyLabel
				index={index}
				onChange={onChange}
				blockStyleListObj={blockStyleListObj}
			/>
			<PropertyInlineStyle
				index={index}
				onChange={onChange}
				blockStyleListObj={blockStyleListObj}
			/>
		</div>
	);
};
