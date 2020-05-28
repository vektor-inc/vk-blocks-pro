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
  url: {
    type: "string",
    default: "",
  },
  activeControl: {
    type: "string",
    default: '{"text""center"}',
  },
	urlOpenType:{
		type: 'Boolean',
		default: false,
	},
	icon:{
		type: 'string',
		default: 'fas fa-file',
	},
	color:{
		type: 'string',
		default: '#0693e3',
	},
	bgType:{
		type: 'string',
		default: '0',
	},
	heading:{
		type: 'string',
		source: 'html',
		selector: '.vk_prBlocks_item_title',
	},
	content:{
		type: 'string',
		source: 'html',
		selector: '.vk_prBlocks_item_summary',
	}
};
