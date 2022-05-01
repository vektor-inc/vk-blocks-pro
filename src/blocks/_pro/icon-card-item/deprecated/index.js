import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save0_0_2 from './0.0.2/save';
import save0_49_8 from './0.49.8/save';
import save0_60_1 from './0.60.1/save';
import save1_20_2 from './1.20.2/save';

const blockAttributes = {
	col_xs: {
		type: 'number',
		default: 1,
	},
	col_sm: {
		type: 'number',
		default: 2,
	},
	col_md: {
		type: 'number',
		default: 3,
	},
	col_lg: {
		type: 'number',
		default: 3,
	},
	col_xl: {
		type: 'number',
		default: 3,
	},
	url: {
		type: 'string',
		default: '',
	},
	activeControl: {
		type: 'string',
		default: '{"title":"center","text":"center"}',
	},
	urlOpenType: {
		type: 'Boolean',
		default: false,
	},
	icon: {
		type: 'string',
		default: 'fas fa-file',
	},
	color: {
		type: 'string',
		default: '#0693e3',
	},
	bgType: {
		type: 'string',
		default: '1',
	},
	heading: {
		type: 'string',
		source: 'html',
		selector: '.vk_icon-card_item_title',
	},
	content: {
		type: 'string',
		source: 'html',
		selector: '.vk_icon_card_item_summary',
	},
};

const blockAttributes2 = {
	...blockAttributes,
	faIcon: {
		type: 'string',
		default: '<i class="fas fa-user"></i>',
	}
}

const blockAttributes3 = {
	...blockAttributes2,
	col_xxl: {
		type: 'number',
		default: 3,
	}
}

const deprecated = [
	{
		attributes: blockAttributes3,
		save: save1_20_2
	},
	// Fix: https://github.com/vektor-inc/vk-blocks-pro/issues/349
	// 独自後方互換処理のための、後方互換を追加
	{
		attributes: blockAttributes3,
		save:save0_0_2
	},
	// {
	// 	attributes: blockAttributes3,
	// 	save: save0_60_1,
	// },
	// {
	// 	attributes: blockAttributes3,
	// 	save: save0_49_8,
	// },
	// {
	// 	attributes: blockAttributes2,
	// 	save: save001,
	// },
	// {
	// 	attributes: blockAttributes,
	// 	save: save000,
	// },
];
export default deprecated;
