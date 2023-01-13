/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { CodeMirrorCss } from '@vkblocks/components/code-mirror-css';

export const PropertyInlineStyle = ({ index, onChange, blockStyleListObj }) => {
	return (
		<div className="custom_block_style_item_property_inline_style">
			<div>
				{__('CSS class', 'vk-blocks')}:
				<code>.is-style-{blockStyleListObj.property_name}</code>
			</div>
			<CodeMirrorCss
				className="vk-codemirror-options"
				value={blockStyleListObj.property_inline_style ?? ''}
				onChange={(value) =>
					onChange('property_inline_style', value, index)
				}
			/>
			<p>
				{createInterpolateElement(
					sprintf(
						/* translators: If selector is specified, it is replaced by CSS class (is-style-%1$s); CSS selectors other than selector and is-style-%2$s may affect the entire page. */
						__(
							'If selector is specified, it will be replaced with CSS class (<code>.is-style-%1$s</code>). CSS selectors other than selector,<code>.is-style-%2$s</code> may affect the entire page.',
							'vk-blocks'
						),
						blockStyleListObj.property_name,
						blockStyleListObj.property_name
					),
					{
						code: <code />,
					}
				)}
			</p>
		</div>
	);
};
