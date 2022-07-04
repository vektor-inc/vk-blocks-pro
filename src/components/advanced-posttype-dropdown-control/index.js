/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

export const AdvancedPosttypeDropdownControl = (props) => {
	const { attributes, setAttributes } = props;
	const { postType } = attributes;
	return (
		<SelectControl
			label={__('Post Type', 'vk-blocks')}
			value={postType}
			onChange={(value) => setAttributes({ postType: value })}
			options={[
				{
					value: 'post',
					label: __('post', 'vk-blocks'),
				},
				{
					value: 'em',
					label: __('em', 'vk-blocks'),
				},
				{
					value: 'rem',
					label: __('rem', 'vk-blocks'),
				},
				{
					value: 'vw',
					label: __('vw', 'vk-blocks'),
				},
			]}
		/>
	);
};
