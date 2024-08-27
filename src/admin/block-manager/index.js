/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
// 登録されたブロックを取得するため
import '@wordpress/block-library';

/**
 * Internal dependencies
 */
import BlockManagerCategory from './category';
/*globals vkBlocksObject */

function BlockManager({ blockTypes, categories, hasBlockSupport }) {
	const showCategories = categories.filter((category) => {
		return category.slug.match(/vk-blocks/);
	});

	const showBlockTypes = [];
	blockTypes.forEach((blockType) => {
		if (
			// showCategoriesにcategoryが含まれる
			showCategories.find((showCategory) => {
				return showCategory.slug === blockType.category;
			}) !== undefined &&
			// vk-blocksが含まれる
			blockType.name.match(/vk-blocks/) &&
			// inserterがtrueのもの
			hasBlockSupport(blockType, 'inserter', true) &&
			// 子ブロックではない
			!blockType.parent &&
			// 非推奨ブロックに含まれない
			!vkBlocksObject.deprecatedLists.includes(blockType.name)
		) {
			showBlockTypes.push(blockType);
		} else if (vkBlocksObject.deprecatedLists.includes(blockType.name)) {
			// 非推奨ブロックの時はカテゴリー名を上書きする
			const pushBlockType = {
				...blockType,
				category: 'vk-blocks-cat-deprecated',
			};
			showBlockTypes.push(pushBlockType);
		}
	});

	return (
		<>
			<section>
				<h3 id="block-manager-setting">
					{__('Block Manager Setting', 'vk-blocks-pro')}
				</h3>
				<div
					tabIndex="0"
					role="region"
					className="block-manager__results"
				>
					{showCategories.map((category) => {
						const propsBlockTypes =
							showBlockTypes &&
							showBlockTypes.filter((blockType) => {
								return (
									blockType &&
									blockType.category &&
									blockType.category === category.slug
								);
							});
						return (
							<BlockManagerCategory
								key={category.slug}
								title={category.title}
								blockTypes={propsBlockTypes}
							/>
						);
					})}
				</div>
			</section>
		</>
	);
}

export default withSelect((select) => {
	const { getCategories, getBlockTypes, hasBlockSupport } =
		select('core/blocks');

	return {
		blockTypes: getBlockTypes(),
		categories: getCategories(),
		hasBlockSupport,
	};
})(BlockManager);
