/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';
import {
	Button,
	Modal,
	TextControl,
	Flex,
	FlexItem,
} from '@wordpress/components';
import { plusCircle } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { SetBlockName } from './set-block-name';
import { SetPropertyName } from './set-property-name';
import { AdminContext } from '@vkblocks/admin/index';

// ブロックスタイル設定 初期値
const CUSTOM_BLOCK_STYLE_DEFAULT_OBJ = {
	block_name: '',
	property_name: '',
	property_label: '',
	property_inline_style: '',
	property_transform_inline_style: '',
};

export const AddButton = ({
	showBlockTypes,
	categories,
	search,
	setSearch,
	openNameLists,
	setOpenNameLists,
}) => {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [blockName, setBlockName] = useState('');
	const [propertyName, setPropertyName] = useState('');
	const [propertyLabel, setPropertyLabel] = useState('');
	const [isDisableAdd, setIsDisableAdd] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const openModal = () => setIsModalOpen(true);
	// モーダルをクローズしたらstateを初期値に戻す
	const closeModal = () => {
		setIsModalOpen(false);
		setBlockName('');
		setPropertyName('');
		setPropertyLabel('');
		setIsDisableAdd(false);
		setErrorMessage('');
		setSearch('');
	};

	const addItem = () => {
		vkBlocksOption.custom_block_style_lists.push({
			...CUSTOM_BLOCK_STYLE_DEFAULT_OBJ,
			...{
				block_name: blockName,
				property_name: propertyName,
				property_label: propertyLabel,
			},
		});
		setVkBlocksOption({ ...vkBlocksOption });
		const openNames = [...openNameLists];
		openNames.push(propertyName);
		setOpenNameLists(openNames);
	};

	return (
		<div className="custom_block_style_item_add">
			<Button
				className="add-item-button"
				icon={plusCircle}
				iconSize={18}
				variant="secondary"
				onClick={openModal}
			>
				{__('Add Custom Block Style', 'vk-blocks-pro')}
			</Button>
			{isModalOpen && (
				<Modal
					title={__('Add Custom Block Style', 'vk-blocks-pro')}
					onRequestClose={closeModal}
					isDismissible={false}
					className="custom_block_style_add_modal"
					isFullScreen={true}
				>
					<div className="custom_block_style_add_modal">
						<SetBlockName
							blockName={blockName}
							setBlockName={setBlockName}
							showBlockTypes={showBlockTypes}
							categories={categories}
							search={search}
							setSearch={setSearch}
						/>
						<SetPropertyName
							blockName={blockName}
							propertyName={propertyName}
							setPropertyName={setPropertyName}
							isDisableAdd={isDisableAdd}
							setIsDisableAdd={setIsDisableAdd}
							errorMessage={errorMessage}
							setErrorMessage={setErrorMessage}
						/>
						<TextControl
							className="custom_block_style_item_title"
							label={__(
								'Block Style Label (Changeable)',
								'vk-blocks-pro'
							)}
							onChange={(value) => {
								setPropertyLabel(value);
							}}
							value={propertyLabel}
						/>
						<div className="custom_block_style_add_modal_button_area">
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
										onClick={() => {
											addItem();
											closeModal();
										}}
										variant="primary"
										disabled={!isDisableAdd}
									>
										{__('Add', 'vk-blocks-pro')}
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
