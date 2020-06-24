const schema = {
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
  url: {
    type: "string",
    default: "",
  },
  activeControl: {
    type: "string",
    default: '{"title":"center","text":"center"}',
  },
	urlOpenType:{
		type: 'Boolean',
		default: false,
	},
	color:{
		type: 'string',
		default: '#0693e3',
	},
	bgType:{
		type: 'string',
		default: '1',
	},
	heading:{
		type: 'string',
		source: 'html',
		selector: '.vk_icon-card_item_title',
	},
	content:{
		type: 'string',
		source: 'html',
		selector: '.vk_icon_card_item_summary',
	},
	faIcon: {
		type: 'string',
		default: '',
	}
};
