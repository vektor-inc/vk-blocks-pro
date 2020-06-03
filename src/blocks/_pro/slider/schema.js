export const schema = {
  col_xs: {
    type: "number",
    default: 1,
  },
  col_sm: {
    type: "number",
    default: 2,
  },
  col_md: {
    type: "number",
    default: 3,
  },
  col_lg: {
    type: "number",
    default: 3,
  },
  col_xl: {
    type: "number",
    default: 3,
	},
	unit: {
		type: 'string',
		default: 'px',
	},
	pc: {
		type: 'number',
		default: 600,
	},
	tablet: {
		type: 'number',
		default: 600,
	},
	mobile: {
		type: 'number',
		default: 600,
	},
	autoPlay: {
		type: "boolean",
		default: true,
	},
	autoPlayDelay: {
		type: "number",
		default: 2500,
	},
	navigation: {
		type: "boolean",
		default: true,
	},
};
