import replaceClientId from '@vkblocks/utils/replaceClientId';
import { generateHeightCss } from './utils'

export default function SliderHook( {el, attributes}) {
	const {
		clientId,
		pagination,
		autoPlay,
		autoPlayDelay,
		loop,
		effect,
		speed,
	} = attributes;

	const cssSelector = `.vk_slider_${clientId},`;
	const cssTag = generateHeightCss(attributes, cssSelector);

	let autoPlayScripts;
	if (autoPlay) {
		autoPlayScripts = `autoplay: {
			delay: ${autoPlayDelay},
			disableOnInteraction: false,
		},`;
	} else {
		autoPlayScripts = '';
	}

	let paginationScripts;
	if (pagination) {
		paginationScripts = `
		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			clickable : true,
		},`;
	} else {
		paginationScripts = '';
	}

	let speedScripts;
	if (speed) {
		speedScripts = `speed: ${speed},`;
	} else {
		speedScripts = '';
	}

	return (
		<div className={el.props.className}>
			{el}
			<style type="text/css">{cssTag}</style>
			<script>
				{`
			var swiper${replaceClientId(clientId)} = new Swiper ('.vk_slider_${clientId}', {

			${speedScripts}

			// Optional parameters
			loop: ${loop},

			effect: '${effect}',

			${paginationScripts}

			// navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			// And if we need scrollbar
			scrollbar: {
				el: '.swiper-scrollbar',
			},

			${autoPlayScripts}
			})`}
			</script>
		</div>
	);
}
