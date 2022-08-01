/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PlainText, useBlockProps } from '@wordpress/block-editor';

export default function CustomCSSEdit({ attributes, setAttributes }) {
	const { content } = attributes;

	return (
		<>
			<div {...useBlockProps()}>
				<style>{content}</style>
				<PlainText
					value={content}
					onChange={(value) => setAttributes({ content: value })}
					placeholder={__('Write CSS…')}
					aria-label={__('CSS')}
				/>
			</div>
		</>
	);
}
