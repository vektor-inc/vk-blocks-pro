/**
 * WordPress dependencies
 */
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ReactComponent as IconSVG } from './icon.svg';
/*globals vk_blocks_params */

if (window.vk_blocks_params) {
	vk_blocks_params.custom_format_lists.forEach((formatList) => {
		if (!formatList.title) return;

		const name = formatList.class_name && `vk-blocks/${formatList.class_name}`;
		const title = formatList.title;
		const className = formatList.is_active_highlighter
			? `${formatList.class_name}--vk-highlighter`
			: formatList.class_name;

		registerFormatType(name, {
			title,
			tagName: 'span',
			className,
			edit(props) {
				const { value, isActive } = props;
				return (
					<RichTextToolbarButton
						title={
							<>
								<Icon icon={IconSVG} style={{ marginRight: '8px' }} />
								<span className={className}>{title}</span>
							</>
						}
						onClick={() => {
							props.onChange(toggleFormat(value, { type: name }));
						}}
						isActive={isActive}
					/>
				);
			},
		});
	});
}
