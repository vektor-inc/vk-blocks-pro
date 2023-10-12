/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	Button,
	__experimentalConfirmDialog as ConfirmDialog,
} from '@wordpress/components';

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
			<ConfirmDialog
				isOpen={confirmModal.open}
				cancelButtonText={__('Cancel')}
				confirmButtonText={__('続行', 'vk-blocks-pro')}
				onConfirm={() => {
					if (confirmModal.name) {
						onClickCategory(confirmModal.name);
					}
					setConfirmModal({ open: false });
					setHasUpdates(false);
				}}
				onCancel={() => setConfirmModal({ open: false })}
			>
				{__(
					'保存されていない変更があります。続行しますか ？',
					// 'There are unsaved changes. Do you want to continue ?',
					'vk-blocks-pro'
				)}
			</ConfirmDialog>
		</div>
	);
}
