const { __ } = wp.i18n;
import {vkbBlockEditor} from "../../../../_helper/depModules"
const { InnerBlocks } = vkbBlockEditor;
import schema from "./schema";

const Save = (props) => {
	const { className } = props;
	return (
		<div className={ `${className}` }>
			<InnerBlocks.Content />
		</div>
	);
}

export default {
	attributes:schema,
	save:Save
}
