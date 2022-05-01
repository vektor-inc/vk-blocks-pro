export default function SliderHook0_49_7( {el, attributes}) {
	return(
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
