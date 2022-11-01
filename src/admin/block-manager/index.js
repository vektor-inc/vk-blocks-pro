/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
// これがないとregisterブロックされたものが取得できない
import '@wordpress/block-library';
// コアブロックを取得するならこれ
// import { registerCoreBlocks } from '@wordpress/block-library';
// registerCoreBlocks();

/**
 * Internal dependencies
 */
import BlockCategory from './block-category';

function BlockManager(props) {
	const { blockTypes, categories, hasBlockSupport } = props;

	const allowedBlockTypes = blockTypes.filter(
		(blockType) =>
			hasBlockSupport(blockType, 'inserter', true) && !blockType.parent
	);

	const filteredBlockTypes = allowedBlockTypes;
	// console.log(filteredBlockTypes);

	return (
		<>
			<section>
				<h3 id="block-manager-setting">
					{__('Block Manager', 'vk-blocks')}
				</h3>
				<ul className="blockManagerList">
					{categories.map((category) => {
						// <p>{category.slug}</p>
						return (
							<BlockCategory
								key={category.slug}
								category={category}
								// blockTypes={ filter( filteredBlockTypes, {
								// 	category: category.slug,
								// } ) }
								blockTypes={filteredBlockTypes}
								// disabledBlocks={ disabledBlocksState }
							/>
						);
					})}
				</ul>
				<h4>{__('非推奨ブロック', 'vk-blocks')}</h4>
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
