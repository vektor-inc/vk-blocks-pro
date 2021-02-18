import { InnerBlocks } from '@wordpress/block-editor';
import classNames from "classnames";


export default function save( props ) {
	return (
		<div className={ classNames( `vk_animation vk_animation-${ props.attributes.effect } vk_animation-${ props.attributes.clientId }` ) }>
			<InnerBlocks.Content />
		</div>
	);
}
