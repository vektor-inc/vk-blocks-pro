import classNames from "classnames";
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( props ) {
	let {effect, speed, range, clientId} = props.attributes;
	//For recovering block.
	effect = effect ? effect : "slide-up"
	speed = speed ? speed : "fast"
	range = range ? range : "short"

	return (
		<>
			<div
				className={ classNames(`vk_animation vk_animation-${effect} vk_animation-speed-${speed} vk_animation-range-${range} vk_animation-${clientId}`) }
			>
				<InnerBlocks.Content />
			</div>
			<script>
				{ `window.addEventListener('load', (event) => {
				let animationElm = document.querySelector('.vk_animation-${clientId}');
				const observer = new IntersectionObserver((entries) => {
					if(entries[0].isIntersecting){
						animationElm.classList.add('vk_animation-active');
					}else{
						animationElm.classList.remove('vk_animation-active');
					}
				});
				observer.observe(animationElm);
				}, false);` }
			</script>
		</>
	);
}
