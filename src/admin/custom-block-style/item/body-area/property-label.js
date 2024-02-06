/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

export const PropertyLabel = ({ index, onChange, blockStyleListObj }) => {
	return (
		<div className="custom_block_style_item_property_label">
			<TextControl
				className="custom_block_style_item_name"
				name={`vk_blocks_options[custom_block_style_lists][${index}][title]`}
				id={`vk_blocks_custom_block_style_${index}_title`}
				label={__('Block Style Labels', 'vk-blocks-pro')}
				onChange={(value) => onChange('property_label', value, index)}
				value={blockStyleListObj.property_label ?? ''}
			/>
			{!blockStyleListObj.property_label && (
				<p className="custom_block_style_item_name_warning">
					{__(
						'※ Required If no title is entered, it will not appear on the toolbar.',
						'vk-blocks-pro'
					)}
				</p>
			)}
		</div>
	);
};
