/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { CodeMirrorCss } from '@vkblocks/components/code-mirror-css';

export const PropertyInlineStyle = ({ index, onChange, textStyleListObj }) => {
	return (
		<div className="custom_block_style_item_property_inline_style">
			<div>
				{__(
					'CSSクラス名',
					// 'CSS class name',
					'vk-blocks'
				)}
				.is-style-{textStyleListObj.property_name}
			</div>
			<CodeMirrorCss
				className="vk-codemirror-options"
				value={textStyleListObj.property_inline_style ?? ''}
				onChange={(value) =>
					onChange('property_inline_style', value, index)
				}
			/>
			<p>
				{sprintf(
					/* translators: If selector is specified, it is replaced by CSS class (is-style-%1$s); CSS selectors other than selector and is-style-%2$s may affect the entire page. */
					__(
						'selector を指定した場合、CSS クラス(is-style-%1$s)に置き換わります。selector、is-style-%2$s以外のCSSセレクターは、ページ全体に影響する可能性があります。',
						// If selector is specified, it is replaced by CSS class (is-style-%1$s); CSS selectors other than selector and is-style-%2$s may affect the entire page.
						'vk-blocks'
					),
					textStyleListObj.property_name,
					textStyleListObj.property_name
				)}
			</p>
		</div>
	);
};
