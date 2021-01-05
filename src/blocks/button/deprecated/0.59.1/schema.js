export default {
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
		default: '',
	},
	fontAwesomeIconAfter: {
		type: 'string',
		default:  '',
	}
}
