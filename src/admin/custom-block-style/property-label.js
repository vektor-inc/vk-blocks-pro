/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

export const PropertyLabel = ({ index, onChange, textStyleListObj }) => {
	return (
		<div className="custom_block_style_item_property_label">
			<TextControl
				className="custom_block_style_item_name"
				name={`vk_blocks_options[custom_block_style_lists][${index}][title]`}
				id={`vk_blocks_custom_block_style_${index}_title`}
				label={__(
					'ブロックスタイル ラベル',
					// 'Block Style Labels',
					'vk-blocks'
				)}
				onChange={(value) => onChange('property_label', value, index)}
				value={textStyleListObj.property_label ?? ''}
			/>
			{!textStyleListObj.property_label && (
				<p className="custom_block_style_item_name_warning">
					{__(
						'※ ラベルが入力されていない場合、ブロックスタイルには表示されません。',
						// '※ Required If no title is entered, it will not appear on the toolbar.',
						'vk-blocks'
					)}
				</p>
			)}
		</div>
	);
};
