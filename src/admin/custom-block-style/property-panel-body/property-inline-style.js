/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { CodeMirrorCss } from '@vkblocks/components/code-mirror-css';

export const PropertyInlineStyle = ({ index, onChange, textStyleListObj }) => {
	return (
		<div className="custom_block_style_item_property_inline_style">
			<div>
				{__('CSS class', 'vk-blocks')}:
				<code>.is-style-{textStyleListObj.property_name}</code>
			</div>
			<CodeMirrorCss
				className="vk-codemirror-options"
				value={textStyleListObj.property_inline_style ?? ''}
				onChange={(value) =>
					onChange('property_inline_style', value, index)
				}
			/>
			<p>
				{createInterpolateElement(
					sprintf(
						/* translators: If selector is specified, it is replaced by CSS class (is-style-%1$s); CSS selectors other than selector and is-style-%2$s may affect the entire page. */
						__(
							'selector を指定した場合、CSS クラス(<code>.is-style-%1$s</code>)に置き換わります。selector,<code>.is-style-%2$s</code>以外のCSSセレクターは、ページ全体に影響する可能性があります。',
							// If selector is specified, it is replaced by CSS class (is-style-%1$s); CSS selectors other than selector and is-style-%2$s may affect the entire page.
							'vk-blocks'
						),
						textStyleListObj.property_name,
						textStyleListObj.property_name
					),
					{
						code: <code />,
					}
				)}
			</p>
		</div>
	);
};
