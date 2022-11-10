/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
// 登録されたブロックを取得するため
import '@wordpress/block-library';
// コアブロックを取得するならこれ
// import { registerCoreBlocks } from '@wordpress/block-library';
// registerCoreBlocks();

/**
 * Internal dependencies
 */
import BlockManagerCategory from './category';
/*globals vkBlocksObject */

function BlockManager({ blockTypes, categories, hasBlockSupport }) {
	const showCategories = categories.filter((category) => {
		return category.slug.match(/vk-blocks/);
	});
	const addCategory = {
		slug: 'vk-blocks-deprecated-cat',
		title: __('非推奨ブロック', 'vk-blocks'),
		icon: '',
	};
	showCategories.push(addCategory);

	const showBlockTypes = blockTypes.filter(
		(blockType) =>
			// showCategoriesにcategoryが含まれる
			showCategories.find((showCategory) => {
				return showCategory.slug === blockType.category;
			}) !== undefined &&
			// vk-blocksが含まれる
			blockType.name.match(/vk-blocks/) &&
			// inserterがtrueのもの
			hasBlockSupport(blockType, 'inserter', true) &&
			// 子ブロックではない
			!blockType.parent
	);

	const filterBlockTypes = [...showBlockTypes];
	vkBlocksObject.vkBlockSettings.forEach((block, index) => {
		// vkBlocksObject.blocksにdeprecated_versionが含まれていたらvk-blocks-deprecated-catに書き換える
		// nameを指定して非推奨カテゴリーをつける
		if (
			filterBlockTypes[index] &&
			filterBlockTypes[index].name === 'vk-blocks/' + block.name &&
			!!block.deprecated_version
		) {
			filterBlockTypes[index].category = 'vk-blocks-deprecated-cat';
		}
	});

	// const deprecatedBlockNameLists = vkBlocksObject.vkBlockSettings.filter(
	// 	(setting) => !!setting.deprecated_version
	// );
	// console.log(deprecatedBlockNameLists);
	// const filterBlockTypesTest = [...showBlockTypes];
	// filterBlockTypesTest.map((block, index) => {
	// 	// blockType.name
	// 	if (
	// 		block.name === 'vk-blocks/' + block.name &&
	// 		!!block.deprecated_version
	// 	) {
	// 		filterBlockTypes = {
	// 			...filterBlockTypes,
	// 			[index]: {
	// 				...filterBlockTypes[index],
	// 				category: 'vk-blocks-deprecated-cat',
	// 			},
	// 		};
	// 	}
	// });

	return (
		<>
			<section>
				<h3 id="block-manager-setting">
					{__('Block Manager', 'vk-blocks')}
				</h3>
				<div
					tabIndex="0"
					role="region"
					aria-label={__('Available block types', 'vk-blocks')}
					className="block-manager__results"
				>
					{showCategories.map((category) => {
						const propsBlockTypes =
							filterBlockTypes &&
							filterBlockTypes.filter((blockType) => {
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
