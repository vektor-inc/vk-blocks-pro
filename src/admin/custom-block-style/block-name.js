/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockIcon } from '@wordpress/block-editor';

export const BlockName = ({ showBlockTypes, textStyleListObj }) => {
	const activeBlockType = showBlockTypes.find(
		(blockType) => blockType.name === textStyleListObj.block_name
	);
	return (
		<div className="custom_block_style_item_block_name">
			<div className="custom_block_style_item_block_name_target">
				{__(
					`対象のブロック`,
					// 'Target block',
					'vk-blocks'
				)}
			</div>
			{activeBlockType && (
				<>
					<BlockIcon icon={activeBlockType.icon} />
					<span className="active_block_name">
						{activeBlockType.title}
					</span>
				</>
			)}
			<span className="custom_block_style_item_block_name_block_name">
				{textStyleListObj.block_name}
			</span>
		</div>
	);
};
