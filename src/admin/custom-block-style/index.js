/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
// コアブロックを取得するため
import { registerCoreBlocks } from '@wordpress/block-library';
registerCoreBlocks();

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';
import { AddButton } from '@vkblocks/admin/custom-block-style/add-button';
import { Item } from './item';
/*globals vkBlocksObject */

function AdminCustomBlockStyle({
	blockTypes,
	categories,
	hasBlockSupport,
	isMatchingSearchTerm,
}) {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const [search, setSearch] = useState('');
	const [openNameLists, setOpenNameLists] = useState([]);

	const onChange = (key, value, index) => {
		const newItems = vkBlocksOption.custom_block_style_lists;
		newItems[index] = {
			...vkBlocksOption.custom_block_style_lists[index],
			[key]: value,
		};
		setVkBlocksOption({
			...vkBlocksOption,
			custom_block_style_lists: [...newItems],
		});
	};

	// blockJsonのtitleがあったらblockTypesのtitleがあれば
	const getBlockTitle = (name, blockTypeTitle) => {
		const blockJsonList = vkBlocksObject.blockJsonLists.find(
			(item) => item.name === name
		);
		return blockJsonList && blockJsonList.title
			? blockJsonList.title
			: blockTypeTitle;
	};

	const showBlockTypes = [];
	blockTypes.forEach((blockType) => {
		if (
			// inserterがtrueのもの
			hasBlockSupport(blockType, 'inserter', true) &&
			// search
			(!search || isMatchingSearchTerm(blockType, search)) &&
			// customClassがtrueのもの
			hasBlockSupport(blockType.name, 'customClassName', true) &&
			// ブロックマネージャーのリストに含まれない
			!vkBlocksOption.disable_block_lists.includes(blockType.name) &&
			// 親ブロックのinserterがtrueの子ブロック
			(!blockType.parent ||
				!vkBlocksOption.disable_block_lists.includes(
					blockType.parent[0]
				))
		) {
			blockType.title = getBlockTitle(blockType.name, blockType.title);
			showBlockTypes.push(blockType);
		}
	});

	return (
		<>
			<section>
				<h3 id="custom-block-style-setting">
					{__('Custom Block Style Setting', 'vk-blocks-pro')}
				</h3>
				<p>{__('You can register block styles.', 'vk-blocks-pro')}</p>
				{Object.keys(vkBlocksOption.custom_block_style_lists).map(
					(key, index, array) => {
						const blockStyleListObj =
							vkBlocksOption.custom_block_style_lists[key];
						const activeBlockType = blockTypes.find(
							(blockType) =>
								blockType.name === blockStyleListObj.block_name
						);
						return (
							<div key={index}>
								<Item
									activeBlockType={activeBlockType}
									index={index}
									onChange={onChange}
									blockStyleListObj={blockStyleListObj}
									openNameLists={openNameLists}
									setOpenNameLists={setOpenNameLists}
									array={array}
								/>
							</div>
						);
					}
				)}
				<AddButton
					showBlockTypes={showBlockTypes}
					categories={categories}
					search={search}
					setSearch={setSearch}
					openNameLists={openNameLists}
					setOpenNameLists={setOpenNameLists}
				/>
			</section>
		</>
	);
}

export default withSelect((select) => {
	const {
		getCategories,
		getBlockTypes,
		hasBlockSupport,
		isMatchingSearchTerm,
	} = select('core/blocks');

	return {
		blockTypes: getBlockTypes(),
		categories: getCategories(),
		hasBlockSupport,
		isMatchingSearchTerm,
	};
})(AdminCustomBlockStyle);
