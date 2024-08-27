export const prefix = 'vk_card_';
const generateInlineCss = (attributes) => {
	let { clientId, mobile, tablet, pc, unit } = attributes;

	//For recovering block.
	if (undefined === unit) {
		unit = 'px';
	}
	if (undefined === mobile) {
		mobile = 150;
	}
	if (undefined === tablet) {
		tablet = 150;
	}
	if (undefined === pc) {
		pc = 150;
	}

	const cardImgSelector = `.${prefix}${clientId} .vk_card_item .vk_post_imgOuter::before`;
	return `@media (max-width: 576px) {
		${cardImgSelector}{
			padding-top:${mobile}${unit}!important;
		}
	}
	@media (min-width: 577px) and (max-width: 768px) {
		${cardImgSelector}{
			padding-top:${tablet}${unit}!important;
		}
	}
	@media (min-width: 769px) {
		${cardImgSelector}{
			padding-top:${pc}${unit}!important;
		}
	}`;
};

export default function CardHook( {el,attributes}) {
	const cssTag = generateInlineCss(attributes);
	return (
		<>
			{el}
			<style type="text/css">{cssTag}</style>
		</>
	);
}
