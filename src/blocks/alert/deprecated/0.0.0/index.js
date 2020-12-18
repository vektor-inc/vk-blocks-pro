import { RichText } from '@wordpress/block-editor';

export  function save({ attributes }) {
	const { style, content } = attributes;
	return (
		<div className={`alert alert-${style}`}>
			<RichText.Content tagName={'p'} value={content} />
		</div>
	);
}
