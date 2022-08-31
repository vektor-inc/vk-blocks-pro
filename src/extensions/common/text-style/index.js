/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ReactComponent as IconSVG } from './icon.svg';
/*globals vk_blocks_params */

if (window.vk_blocks_params) {
	vk_blocks_params.textStyle.forEach((option) => {
		if (!!option.title) {
			const name = option.class_name && `vk-blocks/${option.class_name}`;
			const title = option.title
				? option.title
				: sprintf(
						/* translators: %s: number of index. */
						__('Custom Text Style %s'),
						option.index
				  );
			const className = option.class_name
				? option.class_name
				: `vk-text-style--${option.index}`;

			registerFormatType(name, {
				title,
				tagName: 'span',
				className,
				edit(props) {
					const { value, isActive } = props;
					return (
						<>
							<RichTextToolbarButton
								icon={
									<>
										<Icon icon={IconSVG} />
									</>
								}
								title={title}
								onClick={() => {
									props.onChange(
										toggleFormat(value, { type: name })
									);
								}}
								isActive={isActive}
							/>
						</>
					);
				},
			});
		}
	});
}
