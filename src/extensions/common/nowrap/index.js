/**
 * No Wrap
 */
import { ReactComponent as Icon } from './icon.svg';

import { __ } from '@wordpress/i18n';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';

registerFormatType('vk-blocks/nowrap', {
	title: __('No wrap', 'vk-blocks-pro'),
	tagName: 'span',
	className: 'text-nowrap',
	edit(props) {
		const { value, isActive } = props;

		return (
			<>
				<RichTextToolbarButton
					icon={Icon}
					title={__('No wrap', 'vk-blocks-pro')}
					onClick={() => {
						props.onChange(
							toggleFormat(value, { type: 'vk-blocks/nowrap' })
						);
					}}
					isActive={isActive}
				/>
			</>
		);
	},
});
