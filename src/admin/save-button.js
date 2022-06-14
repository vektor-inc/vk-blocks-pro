/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import api from '@wordpress/api';

export const SaveButton = (props) => {
	const { vkBlocksOption, vkBlocksBalloonMeta } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [isSaveSuccess, setIsSaveSuccess] = useState('');

	// オプション値を保存
	const onClickUpdate = () => {
		setIsLoading(true);
		api.loadPromise.then((/*response*/) => {
			const model = new api.models.Settings({
				vk_blocks_options: vkBlocksOption,
				vk_blocks_balloon_meta: vkBlocksBalloonMeta,
			});
			const save = model.save();

			save.success((/*response, status*/) => {
				// console.log(response);
				// console.log(status);
				setTimeout(() => {
					setIsLoading(false);
					setIsSaveSuccess(true);
				}, 600);
			});

			save.error(() => {
				setTimeout(() => {
					setIsLoading(false);
					setIsSaveSuccess(false);
				}, 600);
			});
		});
	};

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
				{isSaveSuccess === false && (
					<p>{__('Failed to save.', 'vk-blocks')}</p>
				)}
				{isSaveSuccess === true && <p>{__('OK.', 'vk-blocks')}</p>}
			</div>
		</>
	);
};
