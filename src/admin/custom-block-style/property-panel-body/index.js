/**
 * WordPress dependencies
 */
import { BaseControl, PanelBody } from '@wordpress/components';
import { BlockIcon } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { DeleteButton } from './delete-button';
import { PropertyLabel } from './property-label';
import { PropertyInlineStyle } from './property-inline-style';
import { BlockName } from '@vkblocks/admin/custom-block-style/block-name';

export const PropertyPanelBody = ({
	showBlockTypes,
	index,
	onChange,
	textStyleListObj,
}) => {
	const activeBlockType = showBlockTypes.find(
		(blockType) => blockType.name === textStyleListObj.block_name
	);

	return (
		<PanelBody
			title={
				<>
					<BlockIcon icon={activeBlockType.icon} />
					{textStyleListObj.property_label}
				</>
			}
			initialOpen={false}
		>
			<BaseControl id="format-setting">
				<BlockName
					activeBlockType={activeBlockType}
					textStyleListObj={textStyleListObj}
				/>
				<PropertyLabel
					index={index}
					onChange={onChange}
					textStyleListObj={textStyleListObj}
				/>
				<DeleteButton
					index={index}
					textStyleListObj={textStyleListObj}
				/>
				<PropertyInlineStyle
					index={index}
					onChange={onChange}
					textStyleListObj={textStyleListObj}
				/>
			</BaseControl>
		</PanelBody>
	);
};
