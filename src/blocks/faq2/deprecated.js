import { vkbBlockEditor } from "./../../utils/depModules";
const { InnerBlocks } = vkbBlockEditor;

export const deprecated = [{
	attributes: {
		heading: {
			type: "string",
			source: "html",
			selector: "dt"
		},
		content:{
			type: "string"
		}
	},
	save() {
		return (
			<dl className={ `vk_faq` }>
				<InnerBlocks.Content />
			</dl>
	 	);
	},
}]
