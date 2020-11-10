/**
 * Animation block
 *
 */
import classNames from "classnames";
import {vkbBlockEditor} from "../../../../_helper/depModules"
const { InnerBlocks } = vkbBlockEditor;

export default ( props ) => {
	let {effect, speed, range, clientId} = props.attributes;

	//For recovering block.
	effect = effect ? effect : "slide-up"
	speed = speed ? speed : "fast"
	range = range ? range : "short"

	return (
		<div className={ classNames(`vk_animation vk_animation-${effect} vk_animation-speed-${speed} vk_animation-range-${range} vk_animation-${clientId}`) }>
			<InnerBlocks.Content />
		</div>
	);
}
