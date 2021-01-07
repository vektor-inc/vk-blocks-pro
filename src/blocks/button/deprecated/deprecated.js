import { VKBButtonDeprecated } from "./component-deprecated";
import { VKBButtonDeprecatedId } from "./component-deprecated-id";
import { VKBButtonDeprecatedNoOpnnerNoRefererID } from "./component-deprecated-noopenernoreferer-id";
import { VKBButtonDeprecatedSubcaptionNoopennerId } from "./component-deprecated-subcaption-noNoopnnernoreferer-id";
import { VKBButton } from "../component";
import { VKBButtonV1 } from "./componentV1"
import Schema0410 from "./0.41.0/schema"
import VKBButton0410 from "./0.41.0/block"
import Schema0591 from "./0.59.1/schema"
import VKBButton0591 from "./0.59.1/block"
import Schema0600 from "./0.60.0/schema"
import VKBButton0600 from "./0.60.0/block"

import { vkbBlockEditor } from "./../../_helper/depModules";
const { RichText } = vkbBlockEditor;

export const deprecated = [
	{
		attributes:Schema0600,
		save:VKBButton0600
	},
	{
		attributes:Schema0591,
		save:VKBButton0591
	},
	{
		attributes:Schema0410,
		save:VKBButton0410
	},
	{
		attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'span',
			},
			subCaption: {
				type: 'string',
				default: "",
			},
			buttonUrl: {
				type: 'string',
				default: "",
			},
			buttonTarget: {
				type: 'Boolean',
				default: false,
			},
			buttonSize: {
				type: 'string',
				default: 'md',
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
				default: 'undefined',
			},
			buttonAlign: {
				type: 'string',
				default: 'left',
			},
			fontAwesomeIconBefore: {
				type: 'string',
				default: "",
			},
			fontAwesomeIconAfter: {
				type: 'string',
				default: "",
			}
		},
		save({ attributes, className }) {
			const {
				content,
				subCaption,
				buttonUrl,
				buttonTarget,
				buttonSize,
				buttonType,
				buttonColor,
				buttonColorCustom,
				buttonAlign,
				fontAwesomeIconBefore,
				fontAwesomeIconAfter,
			} = attributes;

			let containerClass = '';
			if (buttonColorCustom) {

				containerClass = `vk_button vk_button-color-custom vk_button-align-${buttonAlign}`;

			} else if (!buttonColorCustom) {

				containerClass = `vk_button vk_button-align-${buttonAlign}`;

			}

			if (className) {
				containerClass = className + ' ' + containerClass;
			}

			return (
				<div className={ containerClass }>

					<VKBButtonV1 lbColorCustom={ buttonColorCustom } lbColor={ buttonColor } lbType={ buttonType }
						lbAlign={ buttonAlign }
						lbSize={ buttonSize }
						lbUrl={ buttonUrl }
						lbTarget={ buttonTarget }
						lbFontAwesomeIconBefore={ fontAwesomeIconBefore }
						lbFontAwesomeIconAfter={ fontAwesomeIconAfter }
						lbsubCaption={ subCaption }
						lbRichtext={
							<RichText.Content
								tagName="span"
								className={ 'vk_button_link_txt' }
								value={ content }
							/>
						} />
				</div>
			);
		}
	},
	{
		attributes: {
			content: {
				source: 'html',
				selector: 'span',
			},
			buttonUrl: {
				type: 'string',
				default: null,
			},
			buttonTarget: {
				type: 'Boolean',
				default: false,
			},
			buttonSize: {
				type: 'string',
				default: 'md',
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
			buttonAlign: {
				type: 'string',
				default: 'left',
			},
			fontAwesomeIconBefore: {
				type: 'string',
				default: null,
			},
			fontAwesomeIconAfter: {
				type: 'string',
				default: null,
			}
		},

		save({ attributes }) {
			const {
				content,
				buttonUrl,
				buttonTarget,
				buttonSize,
				buttonType,
				buttonColor,
				buttonColorCustom,
				buttonAlign,
				fontAwesomeIconBefore,
				fontAwesomeIconAfter,
			} = attributes;

			let containerClass = '';

			if (buttonColorCustom) {

				containerClass = `vk_button vk_button-color-custom vk_button-align-${buttonAlign}`;

			} else if (!buttonColorCustom) {

				containerClass = `vk_button vk_button-align-${buttonAlign}`;

			}

			return (
				<div className={ containerClass }>

					<VKBButtonDeprecated lbColorCustom={ buttonColorCustom } lbColor={ buttonColor } lbType={ buttonType }
						lbAlign={ buttonAlign }
						lbSize={ buttonSize }
						lbUrl={ buttonUrl }
						lbTarget={ buttonTarget }
						lbFontAwesomeIconBefore={ fontAwesomeIconBefore }
						lbFontAwesomeIconAfter={ fontAwesomeIconAfter }
						lbRichtext={
							<RichText.Content
								tagName="span"
								className={ 'vk_button_link_txt' }
								value={ content }
							/>
						} />
				</div>
			);
		},
	},
	{
		attributes: {
			content: {
				source: 'html',
				selector: 'span',
			},
			buttonUrl: {
				type: 'string',
				default: null,
			},
			buttonTarget: {
				type: 'Boolean',
				default: false,
			},
			buttonSize: {
				type: 'string',
				default: 'md',
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
			buttonAlign: {
				type: 'string',
				default: 'left',
			},
			fontAwesomeIconBefore: {
				type: 'string',
				default: null,
			},
			fontAwesomeIconAfter: {
				type: 'string',
				default: null,
			}
		},

		save({ attributes }) {
			const {
				content,
				buttonUrl,
				buttonTarget,
				buttonSize,
				buttonType,
				buttonColor,
				buttonColorCustom,
				buttonAlign,
				fontAwesomeIconBefore,
				fontAwesomeIconAfter,
			} = attributes;

			let containerClass = '';

			if (buttonColorCustom) {

				containerClass = `vk_button vk_button-color-custom vk_button-align-${buttonAlign}`;

			} else if (!buttonColorCustom) {

				containerClass = `vk_button vk_button-align-${buttonAlign}`;

			}

			return (
				<div className={ containerClass }>

					<VKBButtonDeprecatedId lbColorCustom={ buttonColorCustom } lbColor={ buttonColor } lbType={ buttonType }
						lbAlign={ buttonAlign }
						lbSize={ buttonSize }
						lbUrl={ buttonUrl }
						lbTarget={ buttonTarget }
						lbFontAwesomeIconBefore={ fontAwesomeIconBefore }
						lbFontAwesomeIconAfter={ fontAwesomeIconAfter }
						lbRichtext={
							<RichText.Content
								tagName="span"
								className={ 'vk_button_link_txt' }
								value={ content }
							/>
						} />
				</div>
			);
		},
	},
	{
		attributes: {
			content: {
				source: 'html',
				selector: 'span',
			},
			subCaption: {
				type: 'string',
				default: null,
			},
			buttonUrl: {
				type: 'string',
				default: null,
			},
			buttonTarget: {
				type: 'Boolean',
				default: false,
			},
			buttonSize: {
				type: 'string',
				default: 'md',
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
			buttonAlign: {
				type: 'string',
				default: 'left',
			},
			fontAwesomeIconBefore: {
				type: 'string',
				default: null,
			},
			fontAwesomeIconAfter: {
				type: 'string',
				default: null,
			}
		},
		save({ attributes, className }) {
			const {
				content,
				subCaption,
				buttonUrl,
				buttonTarget,
				buttonSize,
				buttonType,
				buttonColor,
				buttonColorCustom,
				buttonAlign,
				fontAwesomeIconBefore,
				fontAwesomeIconAfter,
			} = attributes;

			let containerClass = '';

			if (buttonColorCustom) {

				containerClass = `vk_button vk_button-color-custom vk_button-align-${buttonAlign}`;

			} else if (!buttonColorCustom) {

				containerClass = `vk_button vk_button-align-${buttonAlign}`;

			}

			return (
				<div className={ containerClass }>

					<VKBButtonDeprecatedNoOpnnerNoRefererID lbColorCustom={ buttonColorCustom } lbColor={ buttonColor }
						lbType={ buttonType }
						lbAlign={ buttonAlign }
						lbSize={ buttonSize }
						lbUrl={ buttonUrl }
						lbTarget={ buttonTarget }
						lbFontAwesomeIconBefore={ fontAwesomeIconBefore }
						lbFontAwesomeIconAfter={ fontAwesomeIconAfter }
						lbsubCaption={ subCaption }
						lbRichtext={
							<RichText.Content
								tagName="span"
								className={ 'vk_button_link_txt' }
								value={ content }
							/>
						} />
				</div>
			);
		},
	},
	{
		attributes: {
			content: {
				source: 'html',
				selector: 'span',
			},
			subCaption: {
				type: 'string',
				default: null,
			},
			buttonUrl: {
				type: 'string',
				default: null,
			},
			buttonTarget: {
				type: 'Boolean',
				default: false,
			},
			buttonSize: {
				type: 'string',
				default: 'md',
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
			buttonAlign: {
				type: 'string',
				default: 'left',
			},
			fontAwesomeIconBefore: {
				type: 'string',
				default: null,
			},
			fontAwesomeIconAfter: {
				type: 'string',
				default: null,
			}
		},
		save({ attributes, className }) {
			const {
				content,
				subCaption,
				buttonUrl,
				buttonTarget,
				buttonSize,
				buttonType,
				buttonColor,
				buttonColorCustom,
				buttonAlign,
				fontAwesomeIconBefore,
				fontAwesomeIconAfter,
			} = attributes;

			let containerClass = '';

			if (buttonColorCustom) {

				containerClass = `vk_button vk_button-color-custom vk_button-align-${buttonAlign}`;

			} else if (!buttonColorCustom) {

				containerClass = `vk_button vk_button-align-${buttonAlign}`;

			}

			return (
				<div className={ containerClass }>

					<VKBButtonDeprecatedSubcaptionNoopennerId lbColorCustom={ buttonColorCustom }
						lbColor={ buttonColor }
						lbType={ buttonType }
						lbAlign={ buttonAlign }
						lbSize={ buttonSize }
						lbUrl={ buttonUrl }
						lbTarget={ buttonTarget }
						lbFontAwesomeIconBefore={ fontAwesomeIconBefore }
						lbFontAwesomeIconAfter={ fontAwesomeIconAfter }
						lbsubCaption={ subCaption }
						lbRichtext={
							<RichText.Content
								tagName="span"
								className={ 'vk_button_link_txt' }
								value={ content }
							/>
						} />
				</div>
			);
		}

	},
	{
		attributes: {
			content: {
				source: 'html',
				selector: 'span',
			},
			subCaption: {
				type: 'string',
				default: null,
			},
			buttonUrl: {
				type: 'string',
				default: null,
			},
			buttonTarget: {
				type: 'Boolean',
				default: false,
			},
			buttonSize: {
				type: 'string',
				default: 'md',
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
			buttonAlign: {
				type: 'string',
				default: 'left',
			},
			fontAwesomeIconBefore: {
				type: 'string',
				default: null,
			},
			fontAwesomeIconAfter: {
				type: 'string',
				default: null,
			}
		},
		save({ attributes, className }) {
			const {
				content,
				subCaption,
				buttonUrl,
				buttonTarget,
				buttonSize,
				buttonType,
				buttonColor,
				buttonColorCustom,
				buttonAlign,
				fontAwesomeIconBefore,
				fontAwesomeIconAfter,
			} = attributes;

			let containerClass = '';
			if (buttonColorCustom) {

				containerClass = `vk_button vk_button-color-custom vk_button-align-${buttonAlign}`;

			} else if (!buttonColorCustom) {

				containerClass = `vk_button vk_button-align-${buttonAlign}`;

			}

			if (className) {
				containerClass = className + ' ' + containerClass;
			}

			return (
				<div className={ containerClass }>

					<VKBButton lbColorCustom={ buttonColorCustom } lbColor={ buttonColor } lbType={ buttonType }
						lbAlign={ buttonAlign }
						lbSize={ buttonSize }
						lbUrl={ buttonUrl }
						lbTarget={ buttonTarget }
						lbFontAwesomeIconBefore={ fontAwesomeIconBefore }
						lbFontAwesomeIconAfter={ fontAwesomeIconAfter }
						lbsubCaption={ subCaption }
						lbRichtext={
							<RichText.Content
								tagName="span"
								className={ 'vk_button_link_txt' }
								value={ content }
							/>
						} />
				</div>
			);
		}
	}
];
