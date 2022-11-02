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
import BlockCategory from './block-category';
/*globals vkBlocksObject */

function BlockManager(props) {
	const { blockTypes, categories, hasBlockSupport } = props;

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

	let filterBlockTypes = [...showBlockTypes];
	vkBlocksObject.blocks.forEach((block, index) => {
		// vkBlocksObject.blocksにdeprecated_versionが含まれていたらvk-blocks-deprecated-catに書き換える
		if (!!block.deprecated_version) {
			filterBlockTypes = {
				...filterBlockTypes,
				[index]: {
					...filterBlockTypes[index],
					category: 'vk-blocks-deprecated-cat',
				},
			};
		}
	});

	return (
		<>
			<section>
				<h3 id="block-manager-setting">
					{__('Block Manager', 'vk-blocks')}
				</h3>
				<ul className="blockManagerList">
					{showCategories.map((category) => {
						// <p>{category.slug}</p>
						return (
							<BlockCategory
								key={category.slug}
								category={category}
								// blockTypes={ filter( showBlockTypes, {
								// 	category: category.slug,
								// } ) }
								blockTypes={showBlockTypes}
								// disabledBlocks={ disabledBlocksState }
							/>
						);
					})}
				</ul>
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
