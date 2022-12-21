/**
 * WordPress dependencies
 */
import { Draggable } from '@wordpress/components';
import { useContext, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export const SortBlockStyleLists = () => {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const [droppingToIndex, setDroppingToIndex] = useState();
	const [draggedElID, setDragedElementID] = useState();

	const rearrangeStories = (oldIndex, newIndex) => {
		const selectedStoryIds = [...vkBlocksOption.custom_block_style_lists];
		selectedStoryIds.splice(
			newIndex,
			0,
			selectedStoryIds.splice(oldIndex, 1).pop()
		);
		setVkBlocksOption(() => {
			return {
				...vkBlocksOption,
				custom_block_style_lists: [...selectedStoryIds],
			};
		});
	};

	return (
		<>
			{Object.keys(vkBlocksOption.custom_block_style_lists).map(
				(key, index) => {
					const textStyleListObj =
						vkBlocksOption.custom_block_style_lists[key];
					return (
						<div
							key={index}
							onDragOver={(event) => {
								event.preventDefault();
								event.target.closest(
									'.droppable'
								).style.borderTop = '5px solid #000';

								setDroppingToIndex(
									event.target.parentElement.dataset.order
								);
							}}
							onDragLeave={(event) => {
								event.preventDefault();
								event.target.closest(
									'.droppable'
								).style.borderTop = 0;
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
									rearrangeStories(oldIndex, droppingToIndex);
								}

								event.target.closest(
									'.droppable'
								).style.borderTop = 0;
							}}
							className="droppable"
						>
							<div
								data-order={index}
								id={`draggable-example-box-${textStyleListObj.property_name}`}
							>
								<Draggable
									elementId={`draggable-example-box-${textStyleListObj.property_name}`}
								>
									{({ onDraggableStart, onDraggableEnd }) => {
										const handleOnDragStart = (event) => {
											setDragedElementID(
												textStyleListObj.property_name
											);
											onDraggableStart(event);
										};
										const handleOnDragEnd = (event) => {
											onDraggableEnd(event);
										};

										return (
											<div
												role="listitem"
												data-testid={`key-property_nameid-item-${textStyleListObj.property_name}`}
												onDragStart={handleOnDragStart}
												onDragEnd={handleOnDragEnd}
												data-order={index}
												draggable
											>
												{textStyleListObj.property_name}
											</div>
										);
									}}
								</Draggable>
							</div>
						</div>
					);
				}
			)}
			{Object.keys(vkBlocksOption.custom_block_style_lists).map(
				(key, index) => {
					const textStyleListObj =
						vkBlocksOption.custom_block_style_lists[key];
					return (
						<div id="draggable-example-box" key={index}>
							<Draggable
								elementId="draggable-example-box"
								transferData={{ index: 1 }}
							>
								{({ onDraggableStart, onDraggableEnd }) => {
									const handleOnDragStart = (event) => {
										setDragedElementID(
											textStyleListObj.property_name
										);
										onDraggableStart(event);
									};
									const handleOnDragEnd = (event) => {
										onDraggableEnd(event);
									};

									return (
										<div
											style={{
												alignItems: 'center',
												display: 'flex',
												justifyContent: 'center',
												width: 100,
												height: 100,
												background: '#ddd',
											}}
											onDragStart={handleOnDragStart}
											onDragEnd={handleOnDragEnd}
											draggable
										>
											{textStyleListObj.property_name}
										</div>
									);
								}}
							</Draggable>
						</div>
					);
				}
			)}
		</>
	);
};
