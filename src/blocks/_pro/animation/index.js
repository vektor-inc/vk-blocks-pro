/**
 * Animation block
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated/';

import { addFilter } from '@wordpress/hooks';
import { select } from '@wordpress/data';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Animation', 'vk-blocks'),
	icon: <Icon />,
	edit,
	save,
	deprecated,
};

/**
 * 	表示領域に入ったら、アニメーションエフェクトを適用させるフィルター。
 *  0.49.8で、jSをfooterに出力するよう構造変更。
 *
 * @param {*} el
 * @param {*} type
 * @param {*} attributes
 */
const addAnimationActiveClass = (el, type, attributes) => {
	if ( 5.6 <= parseFloat(wpVersion) ) {
		return;
	}
	const post = select('core/editor').getCurrentPost();
	//0.49.8未満（_vkb_saved_block_version が ""）+ JSのフィルターでscriptタグを追加していたバージョンが対象。
	if (
		'vk-blocks/animation' === type.name &&
		post.hasOwnProperty('meta') &&
		post.content.match(/<script>/) &&
		!post.meta._vkb_saved_block_version
	) {
		el = (
			<div>
				<script>{`window.addEventListener('load', (event) => {
				let animationElm = document.querySelector('.vk_animation-${attributes.clientId}');
				if(animationElm){
					const observer = new IntersectionObserver((entries) => {
						if(entries[0].isIntersecting){
							animationElm.classList.add('vk_animation-active');
						}else{
							animationElm.classList.remove('vk_animation-active');
						}
					});
					observer.observe(animationElm);
				}
			}, false);`}</script>
				{el}
			</div>
		);
	}
	return el;
};

addFilter(
	'blocks.getSaveElement',
	'vk-blocks/animation',
	addAnimationActiveClass
);
