/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export const ClassNameControl = (props) => {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const { i } = props;

	const onChange = (key, value, index) => {
		const newItems = vkBlocksOption.text_style;
		newItems[index] = {
			...vkBlocksOption.text_style[index],
			[key]: value,
		};
		setVkBlocksOption({
			...vkBlocksOption,
			text_style: [...newItems],
		});
	};

	return (
		<>
			<TextControl
				className="text_style_item_class_name"
				name={`vk_blocks_options[text_style][${i}][class_name]`}
				id={`vk_blocks_text_style_${i}_class_name`}
				label={__('CSS class/ID', 'vk-blocks')}
				help={__('※ Required', 'vk-blocks')}
				onChange={(value) => {
					onChange('class_name', value, i);
				}}
				value={
					!!vkBlocksOption.text_style[i].class_name
						? vkBlocksOption.text_style[i].class_name
						: ''
				}
			/>
			<p>
				{__(
					'If you are using this formatting for saved content, changing the class name may change the style.',
					'vk-blocks'
				)}
			</p>
		</>
	);
};
