const generateInlineCss = (attributes) => {
	let {
		clientId,
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

	const containerSelector = `.vkb-outer-${clientId} .vk_outer_container`;
	return `
	${containerSelector}{
		padding-left:${innerSideSpaceValueMobile}${innerSideSpaceUnit};
		padding-right:${innerSideSpaceValueMobile}${innerSideSpaceUnit};
	}
	@media (min-width: 576px) {
		${containerSelector}{
			padding-left:${innerSideSpaceValueTablet}${innerSideSpaceUnit};
			padding-right:${innerSideSpaceValueTablet}${innerSideSpaceUnit};
		}
	}
	@media (min-width: 992px) {
		${containerSelector}{
			padding-left:${innerSideSpaceValuePC}${innerSideSpaceUnit};
			padding-right:${innerSideSpaceValuePC}${innerSideSpaceUnit};
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
