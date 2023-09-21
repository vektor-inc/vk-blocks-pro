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
		<>
			<TextControl
				__nextHasNoMarginBottom
				label={__('名前/固有ID (必須)', 'vk-blocks-pro')}
				value={variation.name}
				onChange={(value) => {
					value = value.trim();
					setVariation({ ...variation, name: value });
					validateName(value);
				}}
				placeholder={__('my-variation', 'vk-blocks-pro')}
			/>
			{!canSave && (
				<p style={{ marginTop: '0', color: '#c00' }}>{errorMessage}</p>
			)}
		</>
	);
}
