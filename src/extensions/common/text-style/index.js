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
	vk_blocks_params.textStyleLists.forEach((textStyleList) => {
		// titleがなければregisterしない
		if (!!!textStyleList.title) {
			return;
		}

		const name =
			textStyleList.class_name && `vk-blocks/${textStyleList.class_name}`;
		const title = textStyleList.title;
		const className = textStyleList.class_name;

		registerFormatType(name, {
			title,
			tagName: 'span',
			className,
			edit(props) {
				const { value, isActive } = props;
				return (
					<>
						<RichTextToolbarButton
							icon={<Icon icon={IconSVG} />}
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
	});
}
