/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { TextControl } from '@wordpress/components';
import { useContext, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

export const SetPropertyName = ({
	propertyName,
	isDisableAdd,
	setIsDisableAdd,
	blockName,
	setPropertyName,
	errorMessage,
	setErrorMessage,
}) => {
	const { vkBlocksOption } = useContext(AdminContext);

	const { getBlockStyles } = select('core/blocks');

	const validatePropertyName = (value) => {
		let bool = true;
		let message;

		if (typeof value !== 'string') {
			bool = false;
			message = __('Please enter a string', 'vk-blocks-pro');
		}
		if (!/^[a-z][a-z0-9-_]*$/.test(value)) {
			bool = false;
			message = __(
				'Only alphanumeric characters, hyphens, and underscores are allowed.',
				'vk-blocks-pro'
			);
		}

		if (value === '') {
			bool = false;
			message = __('Class name is required', 'vk-blocks-pro');
		}

		if (blockName === '') {
			bool = false;
		}

		// オプション値からブロックスタイルが既に登録されているか
		vkBlocksOption.custom_block_style_lists?.forEach((option) => {
			if (option.property_name === value) {
				bool = false;
				message = __('Already registered', 'vk-blocks-pro');
			}
		});

		// プラグインからブロックスタイルが既に登録されているか
		getBlockStyles(blockName)?.forEach((blockStyle) => {
			if (blockStyle.name === value) {
				bool = false;
				message = __('Already registered', 'vk-blocks-pro');
			}
		});

		setIsDisableAdd(bool);
		setErrorMessage(message);
	};

	useEffect(() => {
		validatePropertyName(propertyName);
	}, [blockName]);

	const hyphenBlockName = blockName.replace(/\//, '-');
	const isCore = blockName.startsWith('core');
	const placeHolder = isCore ? `vk-${hyphenBlockName}` : hyphenBlockName;

	return (
		<>
			<TextControl
				className="custom_block_style_item_class_name"
				label={__(
					'The identifier of the style used to compute a CSS class. (Required/Unchangeable)',
					'vk-blocks-pro'
				)}
				help={__(
					'This will be the CSS class name following is-style-.',
					'vk-blocks-pro'
				)}
				placeholder={sprintf(
					/* translators: (e.g.) %s-block-style */
					__('(e.g.) %s-block-style', 'vk-blocks-pro'),
					placeHolder ? placeHolder : 'block-name'
				)}
				onChange={(value) => {
					value = value.trim();
					setPropertyName(value);
					validatePropertyName(value);
				}}
				value={propertyName ? propertyName : ''}
			/>
			{!isDisableAdd && (
				<p className="custom_block_style_item_name_error">
					{errorMessage}
				</p>
			)}
		</>
	);
};
