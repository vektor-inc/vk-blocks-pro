import { generateHeightCss } from '../0.49.7/utils'

export default function SliderHook( {el,attributes}) {
	const {
		clientId,
	} = attributes;
	const cssSelector = `.vk_slider_${clientId},`;
	const cssTag = generateHeightCss( attributes, cssSelector );
	return (
		<div>
			{el}
			<style type="text/css">{cssTag}</style>
		</div>
	);
}
