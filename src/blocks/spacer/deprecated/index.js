import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save002 from './0.0.2/save';
import save0_57_4 from './0.57.4/save';
export const blockAttributes = {
    unit: {
        type: 'string',
        default: 'px',
    },
    pc: {
        type: 'number',
        default: 50,
    },
    tablet: {
        type: 'number',
        default: 10,
    },
    mobile: {
        type: 'number',
        default: 10,
    },
};

const blockAttributes003 = {
	...blockAttributes,
	...blockAttributes.anchor.default=null,
	...blockAttributes.pc.default=40,
	...blockAttributes.tablet.default=30,
	...blockAttributes.mobile.default=20,
}

export const deprecated = [
    {
        attributes: blockAttributes003,
        save: save0_57_4,
    },
    {
        attributes: blockAttributes003,
        save: save002,
    },
    {
        attributes: blockAttributes,
        save: save001,
    },
    {
        attributes: blockAttributes,
        save: save000,
    },
];
