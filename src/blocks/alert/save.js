import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { style, content } = attributes;

	return (
		<div { ...useBlockProps.save( { className: `alert alert-${style}`} ) }>
			<RichText.Content tagName={'p'} value={content} />
		</div>
	);
}
