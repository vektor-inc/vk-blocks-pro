/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ReactComponent as Icon } from './icon.svg';

const QUERY_DEFAULT_ATTRIBUTES = {
	query: {
		perPage: 3,
		pages: 0,
		offset: 0,
		postType: 'post',
		order: 'desc',
		orderBy: 'date',
		author: '',
		search: '',
		exclude: [],
		sticky: '',
		inherit: false,
		postParent: '',
	},
};

// variations
const variations = [
	{
		name: 'posts-list',
		title: __('Posts List', 'vk-blocks'),
		description: __(
			'Display a list of your most recent posts, excluding sticky posts.',
			'vk-blocks'
		),
		icon: <Icon />,
		// ここでデフォルトのattributeを設定しているみたいだがコアも動いていない気がする
		attributes: {
			query: {
				perPage: 4,
				pages: 1,
				offset: 0,
				postType: 'post',
				order: 'desc',
				orderBy: 'date',
				author: '',
				search: '',
				sticky: 'exclude',
				inherit: false,
			},
		},
		// インサーターにするとブロックを追加したかのようにインサーターに表示される コアのpost list
		scope: ['inserter'],
	},
	{
		name: 'title-only',
		title: __('Title Only', 'vk-blocks'),
		icon: <Icon />,
		attributes: { ...QUERY_DEFAULT_ATTRIBUTES },
		innerBlocks: [
			['vk-blocks/post-template', {}, [['core/post-title']]],
			['vk-blocks/query-pagination'],
		],
		scope: ['block'],
	},
	{
		name: 'image-title-date',
		title: __('Image Title Date', 'vk-blocks'),
		icon: <Icon />,
		attributes: { ...QUERY_DEFAULT_ATTRIBUTES },
		innerBlocks: [
			[
				'vk-blocks/post-template',
				{},
				[
					['core/post-featured-image'],
					['core/post-title'],
					['core/post-date'],
				],
			],
			['vk-blocks/query-pagination'],
		],
		scope: ['block'],
	},
];
export default variations;
