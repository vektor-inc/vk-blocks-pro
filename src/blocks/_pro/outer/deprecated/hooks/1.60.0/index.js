const generateInlineCss = (attributes) => {
	let {
		blockId,
		innerSideSpaceValuePC,
		innerSideSpaceValueTablet,
		innerSideSpaceValueMobile,
		innerSideSpaceUnit,
	} = attributes;

	//For recovering block.
	if (undefined === innerSideSpaceUnit) {
		innerSideSpaceUnit = 'px';
	}
	if (undefined === innerSideSpaceValueMobile) {
		innerSideSpaceValueMobile = 0;
	}
	if (undefined === innerSideSpaceValueTablet) {
		innerSideSpaceValueTablet = 0;
	}
	if (undefined === innerSideSpaceValuePC) {
		innerSideSpaceValuePC = 0;
	}

	const containerSelector = `.vk_outer.vkb-outer-${blockId} > div > .vk_outer_container`;
	return `
	${containerSelector}{
		padding-left:${innerSideSpaceValueMobile}${innerSideSpaceUnit}!important;
		padding-right:${innerSideSpaceValueMobile}${innerSideSpaceUnit}!important;
	}
	@media (min-width: 576px) {
		${containerSelector}{
			padding-left:${innerSideSpaceValueTablet}${innerSideSpaceUnit}!important;
			padding-right:${innerSideSpaceValueTablet}${innerSideSpaceUnit}!important;
		}
	}
	@media (min-width: 992px) {
		${containerSelector}{
			padding-left:${innerSideSpaceValuePC}${innerSideSpaceUnit}!important;
			padding-right:${innerSideSpaceValuePC}${innerSideSpaceUnit}!important;
		}
	}
	`;
};

export default function OuterHook({ el, attributes }) {
	const cssTag = generateInlineCss(attributes);
	return (
		<>
			{el}
			<style type="text/css">{cssTag}</style>
		</>
	);
}
