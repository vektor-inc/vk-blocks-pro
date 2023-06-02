/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockIcon } from '@wordpress/block-editor';

export const BlockName = ({ activeBlockType, blockStyleListObj }) => {
	return (
		<div className="custom_block_style_item_block_name">
			<div className="custom_block_style_item_block_name_target">
				{__('Target block', 'vk-blocks-pro')}
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
				({blockStyleListObj.block_name})
			</span>
		</div>
	);
};
