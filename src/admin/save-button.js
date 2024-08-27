/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useContext } from '@wordpress/element';
import { Button, Snackbar } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { API_PATH, STORE_NAME } from '@vkblocks/utils/store/constants';
import { AdminContext } from '@vkblocks/admin/index';

export const SaveButton = (props) => {
	const { vkBlocksOption, reloadFlag } = useContext(AdminContext);
	const { classOption, isChanged, setIsChanged } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [isSaveSuccess, setIsSaveSuccess] = useState('');
	const storeOptions = useSelect((select) => {
		const { getOptions } = select(STORE_NAME);
		return getOptions();
	}, []);
	const { setOptions } = useDispatch(STORE_NAME);

	const onClickUpdate = () => {
		setIsLoading(true);

		const newObj = {
			...storeOptions,
			vkBlocksOption: {
				...vkBlocksOption,
			},
		};
		setOptions(newObj);

		apiFetch({
			path: API_PATH,
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
				setIsChanged(false);
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
					disabled={!isChanged}
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
