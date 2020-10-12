import { ComponentDeprecated } from "./component-deprecated";
import { ComponentNoBorderColor } from "./component-no-boder-color";
import { ComponentV1 } from "./componentV1"
import Save0_43_0 from "./0.43.0/index"
import Schema0_43_0 from "./0.43.0/schema"

export const deprecated = [
	{
        attributes: Schema0_43_0,
        save: Save0_43_0,
    },
	{
        attributes: {
			title: {
				source: "html",
				selector: ".vk_prContent_colTxt_title"
			},
			titleColor: {
				type: "string",
				default: ""
			},
			content: {
				source: "html",
				selector: ".vk_prContent_colTxt_text"
			},
			contentColor: {
				type: "string",
				default: ""
			},
			url: {
				type: "string",
				default: ""
			},
			buttonType: {
				type: "string",
				default: "0"
			},
			buttonColor: {
				type: "string",
				default: "primary"
			},
			buttonColorCustom: {
				type: "string",
				default: ""
			},
			buttonText: {
				source: "html",
				selector: ".vk_button_link_txt",
				default: ""
			},
			buttonTarget: {
				type: "Boolean",
				default: false
			},
			Image: {
				type: "string",
				default: "{}"
			},
			ImageBorderColor: {
				type: "string",
				default: ""
			},
			layout: {
				type: "string",
				default: "left"
			},
			fontAwesomeIconBefore: {
				type: "string",
				default: ""
			},
			fontAwesomeIconAfter: {
				type: "string",
				default: ""
			}
		},
        save({ attributes, className }) {

            return (<ComponentV1 attributes={ attributes } className={ className } for_={ "save" } />);
        },
    },
    {
        attributes: {
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
        },

        save({ attributes, className }) {

            return (
	<ComponentDeprecated
		attributes={ attributes }
		for_={ 'save' }
                />
            );
        },
    },
    {
        attributes: {
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
        },
        save({ attributes, className }) {

            return (
	<ComponentNoBorderColor
		attributes={ attributes }
		className={ className }
		for_={ 'save' }
                />
            );
        },
    }
];

