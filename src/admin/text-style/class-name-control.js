/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export const ClassNameControl = (props) => {
	const { vkBlocksOption } = useContext(AdminContext);
	const { i } = props;

	return (
		<>
			<span>
				{__('CSS class', 'vk-blocks')}:
				<code>.{vkBlocksOption.text_style[i].class_name}</code>
			</span>
		</>
	);
};
