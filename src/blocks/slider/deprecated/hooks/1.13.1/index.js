const generateHeightCss = (attributes, cssSelector = '') => {
	const { clientId, mobile, tablet, pc, unit } = attributes;
	let css = '';
	if (unit !== undefined && unit !== null) {
		if (mobile !== undefined && mobile !== null) {
			css += `@media (max-width: 576px) {
				${cssSelector}
				.vk_slider_${clientId} .vk_slider_item{
					height:${mobile}${unit}!important;
				}
			}`;
		}
		if (tablet !== undefined && tablet !== null) {
			css += `@media (min-width: 577px) and (max-width: 768px) {
				${cssSelector}
				.vk_slider_${clientId} .vk_slider_item{
					height:${tablet}${unit}!important;
				}
			}`;
		}
		if (pc !== undefined && pc !== null) {
			css += `@media (min-width: 769px) {
				${cssSelector}
				.vk_slider_${clientId} .vk_slider_item{
					height:${pc}${unit}!important;
				}
			}`;
		}
	}

	return css;
};

export default function SliderHook( {el,attributes}) {
	const cssSelector = `.vk_slider_${attributes.clientId},`;
	const cssTag = generateHeightCss(attributes, cssSelector);
	return (
		<div>
			{el}
			<style type="text/css">{cssTag}</style>
		</div>
	);
}
