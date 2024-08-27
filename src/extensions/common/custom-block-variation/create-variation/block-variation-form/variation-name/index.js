/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

export default function VariationName({
	blockName,
	canSave,
	setCanSave,
	variation,
	getBlockVariations,
	setVariation,
}) {
	const [errorMessage, setErrorMessage] = useState('');
	const validateName = (value) => {
		let bool = true;
		let message;
		if (typeof value !== 'string') {
			bool = false;
			message = __('Please enter a string', 'vk-blocks-pro');
		}
		if (!/^[a-z][a-z0-9-]*$/.test(value)) {
			bool = false;
			message = __(
				'Must begin with an alphabetic character and only alphanumeric characters and hyphens may be used.',
				'vk-blocks-pro'
			);
		}
		if (value === '') {
			bool = false;
			message = __('name is required', 'vk-blocks-pro');
		}
		// 名前が既に登録されているか
		getBlockVariations.forEach((option) => {
			if (option.name === value) {
				bool = false;
				message = __('Already registered', 'vk-blocks-pro');
			}
		});
		setCanSave(bool);
		setErrorMessage(message);
	};
	useEffect(() => {
		validateName(variation.name);
	}, [blockName]);

	return (
		<div>
			<h4>{__('Name/Unique ID (required)', 'vk-blocks-pro')}</h4>
			<TextControl
				__nextHasNoMarginBottom
				value={variation.name}
				onChange={(value) => {
					value = value.trim();
					setVariation({ ...variation, name: value });
					validateName(value);
				}}
				placeholder={__('my-variation', 'vk-blocks-pro')}
			/>
			{!canSave && (
				<p className="block-variation-error-text">{errorMessage}</p>
			)}
		</div>
	);
}
