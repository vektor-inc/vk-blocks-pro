import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save002 from './0.0.2/save';
import save0_57_4 from './0.57.4/save';
import save1_3_2 from './1.3.2/save';
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
        type: "string",
        default: "height"
    },    
};

const blockAttributes003 = {
	...blockAttributes,
	...blockAttributes.pc.default=40,
	...blockAttributes.tablet.default=30,
    ...blockAttributes.mobile.default=20,
    anchor: {
        type: 'string',
        default: null,
	},
}

const deprecated = [
    {
        attributes: 
        {
            "anchor": {
            "type": "string",
            "default": null
            },
            "spaceType": {
                "type": "string",
                "default": "height"
            },
            "unit": {
                "type": "string",
                "default": "px"
            },
            "pc": {
                "type": "number",
                "default": 40
            },
            "tablet": {
                "type": "number",
                "default": 30
            },
            "mobile": {
                "type": "number",
                "default": 20
            },
        },
        save: save1_3_2,
    }, 
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

export default deprecated;