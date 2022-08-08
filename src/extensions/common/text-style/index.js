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
/*globals vkBlocksOptions */

Object.keys(vkBlocksOptions.textStyle).forEach((index) => {
	const textStyle = vkBlocksOptions.textStyle[index];
	if (!!textStyle.active) {
		const name = `vk-blocks/text-style-${index}`;
		const title = textStyle.title
			? textStyle.title
			: sprintf(
					/* translators: %s: number of index. */
					__('Custom Text Style %s'),
					index
			  );
		const className = `vk-text-style--${index}`;

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
