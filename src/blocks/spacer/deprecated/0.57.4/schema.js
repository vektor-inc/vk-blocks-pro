export const schema = {
    anchor: {
        type: 'string',
        default: null,
	},
	spaceType: {
        type: 'string',
        default: 'height',
	},
    unit: {
        type: 'string',
        default: 'px',
    },
    pc: {
        type: 'number',
        default: 40,
    },
    tablet: {
        type: 'number',
        default: 30,
    },
    mobile: {
        type: 'number',
        default: 20,
    },
};

export const example = {
	anchor: null,
	spaceType: 'height',
    unit: 'px',
    pc: 40,
    tablet: 30,
    mobile: 20
};
