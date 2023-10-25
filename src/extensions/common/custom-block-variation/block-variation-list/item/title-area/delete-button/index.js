/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	Button,
	__experimentalConfirmDialog as ConfirmDialog,
} from '@wordpress/components';

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
			<ConfirmDialog
				isOpen={isModalOpen}
				cancelButtonText={__('Cancel')}
				confirmButtonText={__('Delete', 'vk-blocks-pro')}
				onConfirm={() => {
					deleteItem();
					closeModal();
				}}
				onCancel={() => {
					closeModal();
				}}
			>
				{__(
					'Are you sure you want to delete this variation?',
					'vk-blocks-pro'
				)}
			</ConfirmDialog>
		</div>
	);
};
