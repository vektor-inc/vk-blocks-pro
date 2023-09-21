/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Button, Modal, Flex, FlexItem } from '@wordpress/components';

export default function PatternExplorerSidebar(props) {
	const { selectedCategory, onClickCategory, hasUpdates, setHasUpdates } =
		props;
	const patternCategories = [
		{
			name: 'create',
			label: __('作成', 'vk-blocks-pro'),
		},
		{
			name: 'registered',
			label: __('登録済み', 'vk-blocks-pro'),
		},
	];
	const baseClassName = 'block-editor-block-patterns-explorer__sidebar';

	const [confirmModal, setConfirmModal] = useState({
		open: false,
	});

	return (
		<div className="block-editor-block-patterns-explorer__sidebar">
			<div className={`${baseClassName}__categories-list`}>
				{patternCategories.map(({ name, label }) => {
					return (
						<Button
							key={name}
							label={label}
							className={`${baseClassName}__categories-list__item`}
							isPressed={selectedCategory === name}
							onClick={() => {
								if (hasUpdates) {
									setConfirmModal({ open: true, name });
								} else {
									onClickCategory(name);
								}
							}}
						>
							{label}
						</Button>
					);
				})}
			</div>
			{confirmModal.open && (
				<Modal
					overlayClassName="custom-block-variation__confirmation-modal"
					title={__('未保存の変更', 'vk-blocks-pro')}
					onRequestClose={() => setConfirmModal({ open: false })}
					shouldCloseOnClickOutside={false}
				>
					<p>
						{__(
							'保存されていない変更があります。続行しますか ? ',
							'vk-blocks-pro'
						)}
					</p>
					<div className="custom-block-variation-confirmation_modal_button_area">
						<Flex justify="flex-end">
							<FlexItem>
								<Button
									variant="secondary"
									onClick={() =>
										setConfirmModal({ open: false })
									}
								>
									{__('Cancel', 'vk-blocks-pro')}
								</Button>
							</FlexItem>
							<FlexItem>
								<Button
									variant="primary"
									onClick={() => {
										if (confirmModal.name) {
											onClickCategory(confirmModal.name);
										} else {
											// onClickCategory(name);
										}
										setConfirmModal({ open: false });
										setHasUpdates(false);
									}}
								>
									{__('続行', 'vk-blocks-pro')}
								</Button>
							</FlexItem>
						</Flex>
					</div>
				</Modal>
			)}
		</div>
	);
}
