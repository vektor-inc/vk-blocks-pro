/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { Button, Snackbar } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

export const SaveButton = (props) => {
	const { vkBlocksOption, vkBlocksBalloonMeta } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [isSaveSuccess, setIsSaveSuccess] = useState('');

	const onClickUpdate = () => {
		setIsLoading(true);

		apiFetch({
			path: '/vk-blocks/v1/update_vk_blocks_options',
			method: 'POST',
			data: {
				vkBlocksOption,
				vkBlocksBalloonMeta,
			},
		}).then((/*response, status*/) => {
			setTimeout(() => {
				// console.log(response);
				// console.log(status);
				setIsLoading(false);
				setIsSaveSuccess(true);
			}, 600);
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
			<div className="submit">
				<Button
					className="update-button"
					isPrimary
					onClick={onClickUpdate}
					isBusy={isLoading}
				>
					{__('Save setting', 'vk-blocks')}
				</Button>
				{isSaveSuccess && (
					<div
						style={{
							position: 'fixed',
							right: '30px',
							bottom: '50px',
						}}
					>
						<Snackbar>{__('Save Success', 'vk-blocks')} </Snackbar>
					</div>
				)}
			</div>
		</>
	);
};
