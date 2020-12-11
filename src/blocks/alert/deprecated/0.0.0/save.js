import { vkbBlockEditor } from '@vkblocks/utils/depModules';
const { RichText } = vkbBlockEditor;

export  function save({ attributes }) {
	const { style, content } = attributes;
	return (
		<div className={`alert alert-${style}`}>
			<RichText.Content tagName={'p'} value={content} />
		</div>
	);
}
