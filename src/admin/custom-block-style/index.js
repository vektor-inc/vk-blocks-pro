/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { Draggable } from '@wordpress/components';
// コアブロックを取得するため
import { registerCoreBlocks } from '@wordpress/block-library';
registerCoreBlocks();

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';
import { AddButton } from '@vkblocks/admin/custom-block-style/add-button';
import { Item } from './item';
import { SortBlockStyleLists } from './sort-block-style-lists';
/*globals vkBlocksObject */

function AdminCustomBlockStyle({
	blockTypes,
	categories,
	hasBlockSupport,
	isMatchingSearchTerm,
}) {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const [search, setSearch] = useState('');
	const [droppingToIndex, setDroppingToIndex] = useState();
	const [draggedElID, setDragedElementID] = useState();

	const rearrangeLists = (oldIndex, newIndex) => {
		const newLists = [...vkBlocksOption.custom_block_style_lists];
		newLists.splice(newIndex, 0, newLists.splice(oldIndex, 1).pop());
		setVkBlocksOption(() => {
			return {
				...vkBlocksOption,
				custom_block_style_lists: [...newLists],
			};
		});
	};

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
					{__(
						'カスタムブロックスタイル設定',
						// 'Custom Format Setting',
						'vk-blocks'
					)}
				</h3>
				<p>
					{__(
						'ブロックスタイル設定を登録することができます。',
						// 'You can apply commonly used block style on the block toolbar.',
						'vk-blocks'
					)}
				</p>
				<SortBlockStyleLists />
				{Object.keys(vkBlocksOption.custom_block_style_lists).map(
					(key, index) => {
						const blockStyleListObj =
							vkBlocksOption.custom_block_style_lists[key];
						return (
							// <div
							// 	className="custom_block_style_item"
							// 	key={index}
							// >
							// 	<Item
							// 		showBlockTypes={showBlockTypes}
							// 		index={index}
							// 		onChange={onChange}
							// 		blockStyleListObj={blockStyleListObj}
							// 	/>
							// </div>
							<div
								key={index}
								onDragOver={(event) => {
									event.preventDefault();
									event.target.closest(
										'.droppable'
									).style.borderLeft = '5px solid #000';

									setDroppingToIndex(
										event.target.parentElement.dataset.order
									);
								}}
								onDragLeave={(event) => {
									event.preventDefault();
									event.target.closest(
										'.droppable'
									).style.borderLeft = 0;
								}}
								onDrop={(event) => {
									event.preventDefault();
									event.stopPropagation();

									// Update the list after drop
									if (draggedElID) {
										const oldIndex =
											vkBlocksOption.custom_block_style_lists.findIndex(
												(item) =>
													item.property_name ===
													draggedElID
											);
										rearrangeLists(
											oldIndex,
											droppingToIndex
										);
									}

									event.target.closest(
										'.droppable'
									).style.borderLeft = 0;
								}}
								className="droppable custom_block_style_item"
							>
								<div
									data-order={index}
									id={`draggable-example-box-${blockStyleListObj.property_name}`}
								>
									<Draggable
										elementId={`draggable-example-box-${blockStyleListObj.property_name}`}
									>
										{({
											onDraggableStart,
											onDraggableEnd,
										}) => {
											const handleOnDragStart = (
												event
											) => {
												setDragedElementID(
													blockStyleListObj.property_name
												);
												onDraggableStart(event);
											};
											const handleOnDragEnd = (event) => {
												onDraggableEnd(event);
											};

											return (
												<div
													role="listitem"
													data-testid={`key-property_id-item-${blockStyleListObj.property_name}`}
													onDragStart={
														handleOnDragStart
													}
													onDragEnd={handleOnDragEnd}
													data-order={index}
													draggable
												>
													{
														blockStyleListObj.property_name
													}
												</div>
											);
										}}
									</Draggable>
									<Item
										showBlockTypes={showBlockTypes}
										index={index}
										onChange={onChange}
										blockStyleListObj={blockStyleListObj}
									/>
								</div>
							</div>
						);
					}
				)}
				<AddButton
					showBlockTypes={showBlockTypes}
					categories={categories}
					search={search}
					setSearch={setSearch}
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
