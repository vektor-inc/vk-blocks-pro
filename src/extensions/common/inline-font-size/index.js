/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useState } from '@wordpress/element';
import { registerFormatType, removeFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ReactComponent as IconSVG } from './icon.svg';
import { default as InlineFontSizeUI, getActiveInlineFontSize } from './inline';

const name = 'vk-blocks/inline-font-size';

function FontSizeEdit({
	value,
	onChange,
	isActive,
	activeAttributes,
	contentRef,
}) {
	const shortcutType = 'primary';
	const shortcutChar = 'h';

	const iconStyle = {
		width: '24px',
		height: '24px',
	};
	const [isSettingFontSize, setIsSettingFontSize] = useState(false);

	const enableIsAddingFontSize = useCallback(
		() => setIsSettingFontSize(true),
		[setIsSettingFontSize]
	);
	const disableIsAddingFontSize = useCallback(
		() => setIsSettingFontSize(false),
		[setIsSettingFontSize]
	);

	const activeInlineFontSize = getActiveInlineFontSize(value, name);

	const hasFontSizeToChoose = !!!value.length || !activeInlineFontSize;
	if (!hasFontSizeToChoose && !isActive) {
		return null;
	}

	return (
		<>
			<RichTextToolbarButton
				title={__('Inline Font Size', 'vk-blocks-pro')}
				onClick={
					hasFontSizeToChoose
						? enableIsAddingFontSize
						: () => onChange(removeFormat(value, name))
				}
				shortcutType={shortcutType}
				shortcutCharacter={shortcutChar}
				className="format-library-text-color-button"
				isActive={isActive}
				icon={
					<>
						<Icon icon={IconSVG} style={iconStyle} />
					</>
				}
			/>
			{isSettingFontSize && (
				<InlineFontSizeUI
					name={name}
					onClose={disableIsAddingFontSize}
					activeAttributes={activeAttributes}
					value={value}
					onChange={onChange}
					contentRef={contentRef}
					setIsSettingFontSize={setIsSettingFontSize}
				/>
			)}
		</>
	);
}

export const inlineFontSize = {
	title: __('Inline font size', 'vk-blocks-pro'),
	tagName: 'span',
	className: 'vk_inline-font-size',
	attributes: {
		data: 'data-fontSize',
		style: 'style',
	},
	edit: FontSizeEdit,
};

registerFormatType(name, inlineFontSize);
