import classNames from "classnames";
import {vkbBlockEditor} from "../../../_helper/depModules";
import { Fragment } from "react";
import Schema0_49_1 from "./0.49.1/schema"
import Save0_49_1 from "./0.49.1/index"

const { InnerBlocks } = vkbBlockEditor;

export const deprecated = [
	{
		attributes: Schema0_49_1,
		save: Save0_49_1
	},
	{
		attributes:{
			effect: {
			  type: "string",
			  default: "slide-up",
		  },
		  speed: {
			  type: "string",
			  default: "fast",
		  },
		  range: {
			  type: "string",
			  default: "short",
		  },
		  clientId: {
			  type: "string",
			  default: "",
		  },
	  },
	  save(props) {
		  let {effect, speed, range, clientId} = props.attributes;
		  //For recovering block.
		  effect = effect ? effect : "slide-up"
		  speed = speed ? speed : "fast"
		  range = range ? range : "short"

		  return (
			  <Fragment>
				<div className={ classNames(`vk_animation vk_animation-${effect} vk_animation-speed-${speed} vk_animation-range-${range} vk_animation-${clientId}`) }>
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
			</Fragment>
				);
		}
	},
    {
        attributes: {
			effect: {
				type: "string",
				default: "slide-up",
			},
			clientId: {
				type: "string",
				default: "",
			},
        },
        save(props) {
            return (
	<div className={ classNames(`vk_animation vk_animation-${props.attributes.effect} vk_animation-${props.attributes.clientId}`) }>
		<InnerBlocks.Content />
	</div>
            );
        },
    }
];
