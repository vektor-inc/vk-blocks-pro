/**
 * highlighter block type
 */
import { __ } from '@wordpress/i18n';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';

import { ReactComponent as Icon } from './icon.svg';

const name = 'vk-blocks/inline-font-size';

registerFormatType(name, {
	title: __('Inline font size', 'vk-blocks'),
	tagName: 'span',
	className: 'vk_inlineFontSize',
	attributes: {
		style: 'style',
	},
	edit(props) {
		const { value, isActive } = props;
		const shortcutType = 'primary';
		const shortcutChar = 'h';

		return (
			<>
				<RichTextToolbarButton
					icon={Icon}
					title={__('Inline Font Size', 'vk-blocks')}
					onClick={() =>
						props.onChange(
							toggleFormat(value, {
								type: name,
								attributes: {
									style: `font-size: 16px;`,
								},
							})
						)
					}
					isActive={isActive}
					shortcutType={shortcutType}
					shortcutCharacter={shortcutChar}
				/>
			</>
		);
	},
});
