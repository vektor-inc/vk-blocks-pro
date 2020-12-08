import { vkbBlockEditor } from "@vkblocks/utils/depModules";
const  { RichText } = vkbBlockEditor;

export default function save( { attributes, className } ) {
	console.log(className)

	const {
		style,
		content
	} = attributes;

	return (
		<div className={ `alert alert-${style}` }>
			<RichText.Content
				tagName={ 'p' }
				value={ content } />
		</div>
	);
}
