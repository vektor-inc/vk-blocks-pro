import classnames from 'classnames';

export const filterHiddenControl = (el, attributes) => {
	const {
		vkb_hidden, // eslint-disable-line camelcase
		vkb_hidden_xxl, // eslint-disable-line camelcase
		vkb_hidden_xl_v2, // eslint-disable-line camelcase
		vkb_hidden_xl, // eslint-disable-line camelcase
		vkb_hidden_lg, // eslint-disable-line camelcase
		vkb_hidden_md, // eslint-disable-line camelcase
		vkb_hidden_sm, // eslint-disable-line camelcase
		vkb_hidden_xs, // eslint-disable-line camelcase
	} = attributes;

	if (
		vkb_hidden || // eslint-disable-line camelcase
		vkb_hidden_xxl || // eslint-disable-line camelcase
		vkb_hidden_xl_v2 || // eslint-disable-line camelcase
		vkb_hidden_xl || // eslint-disable-line camelcase
		vkb_hidden_lg || // eslint-disable-line camelcase
		vkb_hidden_md || // eslint-disable-line camelcase
		vkb_hidden_sm || // eslint-disable-line camelcase
		vkb_hidden_xs // eslint-disable-line camelcase
	) {
		const custom = vkb_hidden && 'vk_hidden'; // eslint-disable-line camelcase
		const customXxl = vkb_hidden_xxl && 'vk_hidden-xxl'; // eslint-disable-line camelcase
		const customXl2 = vkb_hidden_xl_v2 && 'vk_hidden-xl-v2'; // eslint-disable-line camelcase
		const customXl = vkb_hidden_xl && 'vk_hidden-xl'; // eslint-disable-line camelcase
		const customLg = vkb_hidden_lg && 'vk_hidden-lg'; // eslint-disable-line camelcase
		const customMd = vkb_hidden_md && 'vk_hidden-md'; // eslint-disable-line camelcase
		const customSm = vkb_hidden_sm && 'vk_hidden-sm'; // eslint-disable-line camelcase
		const customXs = vkb_hidden_xs && 'vk_hidden-xs'; // eslint-disable-line camelcase

		if (el) {
			el = {
				...el,
				...{
					props: {
						...el.props,
						...{
							className: classnames(
								el.props.className,
								custom,
								customXxl,
								customXl2,
								customXl,
								customLg,
								customMd,
								customSm,
								customXs
							),
						},
					},
				},
			};
		}
	}
	return el;
};
