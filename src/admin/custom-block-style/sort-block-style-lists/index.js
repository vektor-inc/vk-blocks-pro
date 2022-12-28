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
	const [draggedElID, setDraggedElementID] = useState();

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

	return (
		<>
			{Object.keys(vkBlocksOption.custom_block_style_lists).map(
				(key, index) => {
					const blockStyleListObj =
						vkBlocksOption.custom_block_style_lists[key];
					return (
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
									rearrangeLists(oldIndex, droppingToIndex);
								}

								event.target.closest(
									'.droppable'
								).style.borderLeft = 0;
							}}
							className="droppable"
						>
							<div
								data-order={index}
								id={`draggable-example-box-${blockStyleListObj.property_name}`}
							>
								<Draggable
									elementId={`draggable-example-box-${blockStyleListObj.property_name}`}
								>
									{({ onDraggableStart, onDraggableEnd }) => {
										const handleOnDragStart = (event) => {
											setDraggedElementID(
												blockStyleListObj.property_name
											);
											onDraggableStart(event);
										};
										const handleOnDragEnd = (event) => {
											onDraggableEnd(event);
										};

										return (
											<div
												variant="secondary"
												role="listitem"
												data-testid={`key-property_nameid-item-${blockStyleListObj.property_name}`}
												onDragStart={handleOnDragStart}
												onDragEnd={handleOnDragEnd}
												data-order={index}
												draggable
											>
												{
													blockStyleListObj.property_label
												}
											</div>
										);
									}}
								</Draggable>
							</div>
						</div>
					);
				}
			)}
		</>
	);
};
