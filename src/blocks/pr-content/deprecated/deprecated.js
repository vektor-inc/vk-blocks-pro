import { ComponentDeprecated } from "./component-deprecated";
import { ComponentNoBorderColor } from "./component-no-boder-color";
import { ComponentV1 } from "./componentV1"
import Save0_43_0 from "./0.43.0/index"
import Save0_58_7 from "./0.58.7"
import Save0_58_9 from "./0.58.9/save"

const blockAttributes = {
	title: {
		source: 'html',
		selector: '.vk_prContent_colTxt_title',
	},
	titleColor: {
		type: 'string',
	},
	content: {
		source: 'html',
		selector: '.vk_prContent_colTxt_text',
	},
	contentColor: {
		type: 'string',
	},
	url: {
		type: 'string',
		default: null,
	},
	buttonType: {
		type: 'string',
		default: '0',
	},
	buttonColor: {
		type: 'string',
		default: 'primary',
	},
	buttonColorCustom: {
		type: 'string',
		default: null,
	},
	buttonText: {
		source: 'html',
		selector: '.vk_button_link_txt',
		default: '',
	},
	buttonTarget: {
		type: 'Boolean',
		default: false,
	},
	Image: {
		type: 'string',
		default: null,
	},
	ImageBorderColor: {
		type: 'string',
		default: null,
	},
	layout: {
		type: 'string',
		default: 'left',
	},
	fontAwesomeIconBefore: {
		type: 'string',
	},
	fontAwesomeIconAfter: {
		type: 'string',
	}
}

const blockAttributes2 = {
	...blockAttributes,
	...blockAttributes.titleColor.default = "",
	...blockAttributes.contentColor.default = "",
	...blockAttributes.url.default = "",
	...blockAttributes.buttonColorCustom.default = "",
	...blockAttributes.Image.default = "",
	...blockAttributes.ImageBorderColor.default = "",
	...blockAttributes.fontAwesomeIconBefore.default = "",
	...blockAttributes.fontAwesomeIconAfter.default = "",
}

const blockAttributes3 = {
	...blockAttributes,
	...blockAttributes.fontAwesomeIconBefore.default = '<i class="fas fa-user"></i>',
	...blockAttributes.fontAwesomeIconAfter.default = '<i class="fas fa-user"></i>',
}

export const deprecated = [
	{
		attributes:blockAttributes3,
		save:Save0_58_9
	},
	{
        attributes: blockAttributes3,
        save: Save0_58_7,
    },
	{
        attributes: blockAttributes3,
        save: Save0_43_0,
    },
	{
		attributes: blockAttributes2,
        save({ attributes, className }) {
            return (<ComponentV1 attributes={ attributes } className={ className } for_={ "save" } />);
        },
    },
    {
        attributes: blockAttributes,
        save({ attributes }) {
            return (
				<ComponentDeprecated
					attributes={ attributes }
					for_={ 'save' }/>
            );
        },
    },
    {
        attributes: blockAttributes,
        save({ attributes, className }) {
            return (
				<ComponentNoBorderColor
					attributes={ attributes }
					className={ className }
					for_={ 'save' }/>
			);
		},
    }
];

