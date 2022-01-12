/**
 * highlighter block type
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	registerFormatType,
	applyFormat,
	removeFormat,
	getActiveFormat,
	useAnchorRef,
} from '@wordpress/rich-text';
import {
	RichTextToolbarButton,
	RichTextShortcut,
	ColorPalette,
	URLPopover,
} from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';
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
	const { value, isActive, onChange } = props;
	const shortcutType = 'primary';
	const shortcutChar = 'h';

	let heightlightColor;
	if (isActive) {
		const activeFormat = getActiveFormat(value, name);
		heightlightColor = activeFormat.attributes.data;
	}
	const heightlightColorStyle = {
		background: heightlightColor,
	};
	const iconStyle = {
		width: '24px',
	};
	const anchorRef = useAnchorRef({ ref: props.contentRef, value });
	const [isAddingColor, setIsAddingColor] = useState(false);

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
				}}
				shortcutType={shortcutType}
				shortcutCharacter={shortcutChar}
				className="format-library-text-color-button"
				isActive={isActive}
				icon={
					<>
						<Icon icon={IconSVG} style={iconStyle} />
						{isActive && (
							<span
								className="format-library-text-color-button__indicator"
								style={heightlightColorStyle}
							/>
						)}
					</>
				}
			/>
			{isAddingColor && (
				<URLPopover
					value={value}
					className="components-inline-color-popover"
					anchorRef={anchorRef}
					onClose={() => setIsAddingColor(false)}
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
				</URLPopover>
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
