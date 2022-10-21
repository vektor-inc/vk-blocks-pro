/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useState } from '@wordpress/element';
import {
	registerFormatType,
	applyFormat,
	removeFormat,
	getActiveFormat,
	useAnchor,
} from '@wordpress/rich-text';
import {
	RichTextToolbarButton,
	RichTextShortcut,
	ColorPalette,
} from '@wordpress/block-editor';
import { Popover, Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ReactComponent as IconSVG } from './icon.svg';
import hex2rgba from '@vkblocks/utils/hex-to-rgba';

const name = 'vk-blocks/highlighter';
const alpha = 0.7;
const defaultColor = '#fffd6b';

// 色が指定されていなかったらデフォルトカラーを指定する
const setColorIfUndefined = (color) => {
	if (color === undefined) {
		color = defaultColor;
	}
	return color;
};

//ハイライトカラーが選択されたら
const hightliterOnApply = ({ color, value, onChange }) => {
	color = setColorIfUndefined(color);

	onChange(
		applyFormat(value, {
			type: name,
			attributes: {
				data: color,
				style: `background: linear-gradient(transparent 60%,${hex2rgba(
					color,
					alpha
				)} 0);`,
			},
		})
	);
};

const HighlighterEdit = (props) => {
	const { value, isActive, onChange, contentRef } = props;
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
	const anchorRef = useAnchor({ ref: contentRef, value });
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
				title={__('Highlighter', 'vk-blocks')}
				onClick={() => {
					if (heightlightColor === undefined) {
						// set default color on initial
						hightliterOnApply({
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
				<Popover
					value={value}
					className="vk-blocks-format-popover components-inline-color-popover"
					anchorRef={anchorRef}
					onClose={disableIsAddingColor}
				>
					<ColorPalette
						value={heightlightColor}
						onChange={(color) => {
							if (color) {
								// select color on palette
								hightliterOnApply({
									color,
									value,
									onChange,
								});
							} else {
								// clear palette
								onChange(removeFormat(value, name));
							}
							setIsAddingColor(false);
						}}
					/>
				</Popover>
			)}
		</>
	);
};

registerFormatType(name, {
	title: __('Highlighter', 'vk-blocks'),
	tagName: 'span',
	className: 'vk_highlighter',
	attributes: {
		data: 'data-color',
		style: 'style',
	},
	edit: HighlighterEdit,
});
