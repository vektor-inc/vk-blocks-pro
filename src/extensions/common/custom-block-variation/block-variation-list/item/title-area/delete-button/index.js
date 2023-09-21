/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Button, Modal, Flex, FlexItem } from '@wordpress/components';

export const DeleteButton = ({ index, variationState, setVariationState }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const deleteItem = () => {
		variationState.splice(index, 1);
		setVariationState([...variationState]);
	};
	return (
		<div className="custom_block_variation_item_delete_button">
			<Button
				className="delete-item-button"
				isDestructive
				onClick={openModal}
			>
				{__('Delete', 'vk-blocks-pro')}
			</Button>
			{isModalOpen && (
				<Modal
					title={__('Would you like to delete?', 'vk-blocks-pro')}
					overlayClassName="custom-block-variation__confirmation-modal"
					onRequestClose={closeModal}
					shouldCloseOnClickOutside={false}
				>
					<div className="custom_block_style_delete_modal">
						<div className="custom_block_style_delete_modal_button_area">
							<Flex justify="flex-end">
								<FlexItem>
									<Button
										variant="secondary"
										onClick={closeModal}
									>
										{__('Cancel')}
									</Button>
								</FlexItem>
								<FlexItem>
									<Button
										className="delete-item-button"
										isDestructive
										onClick={() => {
											deleteItem();
											closeModal();
										}}
									>
										{__('Delete', 'vk-blocks-pro')}
									</Button>
								</FlexItem>
							</Flex>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};
