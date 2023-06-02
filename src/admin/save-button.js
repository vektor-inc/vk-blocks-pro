/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { Button, Snackbar } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import classNames from 'classnames';

export const SaveButton = (props) => {
	const { vkBlocksOption, classOption, reloadFlag } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [isSaveSuccess, setIsSaveSuccess] = useState('');

	const onClickUpdate = () => {
		setIsLoading(true);

		apiFetch({
			path: '/vk-blocks/v1/update_vk_blocks_options',
			method: 'POST',
			data: {
				vkBlocksOption,
			},
		}).then((/*response, status*/) => {
			setTimeout(() => {
				// console.log(response);
				// console.log(status);
				setIsLoading(false);
				setIsSaveSuccess(true);
			}, 600);
			if (reloadFlag === true) {
				// eslint-disable-next-line no-undef
				location.reload();
			}
		});
	};

	// snackbar更新する
	useEffect(() => {
		if (isSaveSuccess) {
			setTimeout(() => {
				setIsSaveSuccess();
			}, 3000);
		}
	}, [isSaveSuccess]);

	return (
		<>
			<div className={classNames('submit', classOption)}>
				<Button
					className="update-button"
					isPrimary
					onClick={onClickUpdate}
					isBusy={isLoading}
				>
					{__('Save setting', 'vk-blocks-pro')}
				</Button>
				{isSaveSuccess && (
					<div>
						<Snackbar>
							{__('Save Success', 'vk-blocks-pro')}{' '}
						</Snackbar>
					</div>
				)}
			</div>
		</>
	);
};
