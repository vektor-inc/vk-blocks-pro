/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import { Button, Modal, Flex, FlexItem } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export const DeleteButton = (props) => {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const { index, balloonMetaListObj } = props;

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const deleteItem = () => {
		vkBlocksOption.balloon_meta_lists.splice(index, 1);
		setVkBlocksOption({
			...vkBlocksOption,
		});
	};

	const balloonTitle = !!balloonMetaListObj.name
		? balloonMetaListObj.name
		: __(
				'吹き出し画像設定',
				// 'Custom Format',
				'vk-blocks'
		  );

	return (
		<>
			<Button
				className="delete-item-button button-block"
				isDestructive
				onClick={openModal}
			>
				{__('Delete', 'vk-blocks')}
			</Button>
			{isModalOpen && (
				<Modal
					title={sprintf(
						// translators: Would you like to delete %s
						__(
							'%sを削除しますか？',
							// 'Would you like to delete %s?',
							'vk-blocks'
						),
						balloonTitle
					)}
					className="custom_format_delete_modal"
					onRequestClose={closeModal}
					isDismissible={false}
				>
					<div className="custom_format_delete_modal_content">
						<div className="custom_format_delete_modal_button_area">
							<Flex justify="flex-end">
								<FlexItem>
									<Button isSecondary onClick={closeModal}>
										{__('Cancel')}
									</Button>
								</FlexItem>
								<FlexItem>
									<Button
										isDestructive
										onClick={() => {
											deleteItem();
											closeModal();
										}}
									>
										{__('Delete', 'vk-blocks')}
									</Button>
								</FlexItem>
							</Flex>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};
