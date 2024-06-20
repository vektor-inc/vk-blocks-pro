import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save002 from './0.0.2/save';
import save0_57_4 from './0.57.4/save';
import save1_3_2 from './1.3.2/save';
import save1_13_2 from './1.13.2/save';
import save1_25_1 from './1.25.1/save';
import save1_40_0 from './1.40.0/save';
import save1_72_1 from './1.72.1/save';

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
    spaceType: {
        type: 'string',
        default: 'height',
    },
};

const blockAttributes2 = {
	...blockAttributes,
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
    anchor: {
        type: 'string',
        default: null,
	},
}

const blockAttributes3 = {
	...blockAttributes2,
    spaceSize: {
		type: 'string',
		default: 'medium',
	}
}

const deprecated = [
	{
        attributes:blockAttributes3,
        save: save1_72_1,
    },
	{
        attributes:blockAttributes3,
        save: save1_40_0,
    },
	{
        attributes:blockAttributes3,
        save: save1_25_1,
    },
	{
        attributes:blockAttributes3,
        save: save1_13_2,
    },
    {
        attributes:blockAttributes2,
        save: save1_3_2,
    },
    {
        attributes: blockAttributes2,
        save: save0_57_4,
    },
    {
        attributes: blockAttributes2,
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

export default deprecated;
