/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Snackbar } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { STORE_NAME } from '@vkblocks/utils/store/constants';
import { updateOptions } from '@vkblocks/utils/store';

export const SaveButton = ({
	onClick = () => {},
	variationState,
	disabled,
	saveButtonChildren,
	setHasUpdates = () => {},
}) => {
	const [isSaveSuccess, setIsSaveSuccess] = useState(false);
	const { optionObj } = useSelect((select) => {
		const { getOptions } = select(STORE_NAME);
		return {
			optionObj: getOptions(),
		};
	}, []);
	const { setOptions } = useDispatch(STORE_NAME);

	const updateSettings = () => {
		onClick();
		const newObj = {
			...optionObj,
			vkBlocksOption: {
				...optionObj.vkBlocksOption,
				block_variation_lists: [...variationState],
			},
		};
		setOptions(newObj);
		updateOptions(newObj);
		setIsSaveSuccess(true);
		setHasUpdates(false);
	};

	useEffect(() => {
		if (isSaveSuccess) {
			setTimeout(() => {
				setIsSaveSuccess(false);
			}, 3000);
		}
	}, [isSaveSuccess]);

	return (
		<>
			<div
				style={{
					position: 'sticky',
					bottom: '0',
					backgroundColor: 'rgb(255, 255, 255,.8)',
					padding: '1.5em 0',
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				{isSaveSuccess && (
					<div
						style={{
							position: 'absolute',
							bottom: '0.75em',
							left: '0',
						}}
					>
						<Snackbar>
							{__('Save Success', 'vk-blocks-pro')}
						</Snackbar>
					</div>
				)}
				<Button
					disabled={disabled}
					onClick={updateSettings}
					variant="primary"
				>
					{saveButtonChildren}
				</Button>
			</div>
		</>
	);
};
