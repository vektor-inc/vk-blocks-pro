/**
 * WordPress dependencies
 */
import { getBlockTypes } from '@wordpress/blocks';

// Check the keyword including str or not
export const inString = (str, keyword) => {
	// If keyword was included that return ( true or false )
	return str.indexOf(keyword) !== -1;
};

// The checking block is hidden function target or not
export const isExcludesBlocks = ({ blockName, addExclude }) => {
	// Target of hidden function active
	const allowed = ['core', 'vk-blocks'];
	// name には allowed の項目が一つずつ入る
	// 判断中のブロック名の中にname( core or vk-blocks )がある（ undefinedじゃない ）場合
	// true を返す
	let hiddenReturn =
		allowed.find((name) => inString(blockName, name)) !== undefined;

	const blockArr = getBlockTypes();
	// "customClassName": false,のブロックを取得する
	const notUseCustomClassNameBlockArray = blockArr.filter(
		(block) => block.supports.customClassName === false
	);
	const notUseCustomClassNameBlockLists = notUseCustomClassNameBlockArray.map(
		(item) => item.name
	);
	// console.log(blockArr);

	// コアブロックのdynamic blockを取得する
	const dynamicBlockArray = [];
	for (let i = 0; i < blockArr.length; i++) {
		if (blockArr[i].name.match(/core/)) {
			if (blockArr[i].save.name === 'save') {
				dynamicBlockArray.push(blockArr[i]);
			}
		}
	}
	// これでコアのdynamic blockを取得出来ているはずだがなぜかコアのブロックがすべて除外されるので一旦仮で手打ち実装
	// const dynamicBlockLists = dynamicBlockArray.map((item) => item.name);
	// console.log(dynamicBlockLists);

	const dynamicBlockLists = [
		'core/archives',
		'core/audio',
		'core/calendar',
		'core/categories',
		'core/latest-comments',
		'core/latest-posts',
		'core/page-list',
		'core/pattern',
		'core/block',
		'core/rss',
		'core/search',
		//'core/social-link',
		'core/tag-cloud',
		//'core/site-logo',
		//'core/site-title',
		//'core/site-tagline',
		'core/template-part',
		'core/post-title',
		'core/post-excerpt',
		'core/post-featured-image',
		'core/post-content',
		'core/post-author',
		'core/post-date',
		'core/post-terms',
		'core/post-navigation-link',
		'core/query-pagination-next',
		'core/query-pagination-numbers',
		'core/query-pagination-previous',
		'core/post-comments',
		'core/loginout',
		'core/term-description',
		'core/query-title',
	];

	// 除外するブロック名をまとめる
	const excludesBlocks = [
		...dynamicBlockLists,
		...notUseCustomClassNameBlockLists,
		...addExclude,
	];

	const excludeBlock =
		excludesBlocks.find((excludeName) =>
			inString(blockName, excludeName)
		) !== undefined;

	if (excludeBlock) {
		hiddenReturn = false;
	}
	return hiddenReturn;
};
