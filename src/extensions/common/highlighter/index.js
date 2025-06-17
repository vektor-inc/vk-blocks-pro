/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useState } from '@wordpress/element';
import { registerFormatType, getActiveFormat } from '@wordpress/rich-text';
import {
	RichTextToolbarButton,
	RichTextShortcut,
} from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ReactComponent as IconSVG } from './icon.svg';
import hex2rgba from '@vkblocks/utils/hex-to-rgba';
import { default as InlineColorUI } from './inline';
import { name, alpha, highlighterOnApply } from './common';

function HighlighterEdit({
	value,
	onChange,
	isActive,
	activeAttributes,
	contentRef,
}) {
	const shortcutType = 'primary';
	const shortcutChar = 'h';

	let heightlightColor;
	if (isActive) {
		const activeFormat = getActiveFormat(value, name);
		heightlightColor = activeFormat.attributes.data;
	}
	let iconStyle = {};
	if (heightlightColor) {
		const rgbaHeightlightColor = hex2rgba(heightlightColor, alpha);
		iconStyle = {
			color: 'initial',
			background: `linear-gradient(transparent 60%, ${rgbaHeightlightColor} 0)`,
		};
	}

	const [isAddingColor, setIsAddingColor] = useState(false);

	const enableIsAddingColor = useCallback(
		() => setIsAddingColor(true),
		[setIsAddingColor]
	);
	const disableIsAddingColor = useCallback(
		() => setIsAddingColor(false),
		[setIsAddingColor]
	);

	return (
		<>
			<RichTextShortcut
				type={shortcutType}
				character={shortcutChar}
				onUse={() => setIsAddingColor(true)}
			/>
			<RichTextToolbarButton
				title={__('Highlighter', 'vk-blocks-pro')}
				onClick={() => {
					if (heightlightColor === undefined) {
						// set default color on initial
						highlighterOnApply({
							heightlightColor,
							value,
							onChange,
						});
					}
					setIsAddingColor(true);
					enableIsAddingColor(true);
				}}
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
			{isAddingColor && (
				<InlineColorUI
					name={name}
					onClose={disableIsAddingColor}
					activeAttributes={activeAttributes}
					value={value}
					onChange={onChange}
					contentRef={contentRef}
					setIsAddingColor={setIsAddingColor}
				/>
			)}
		</>
	);
}

export const highlighColor = {
	title: __('Highlighter', 'vk-blocks-pro'),
	tagName: 'span',
	className: 'vk_highlighter',
	attributes: {
		data: 'data-color',
		style: 'style',
	},
	edit: HighlighterEdit,
};

registerFormatType(name, highlighColor);
