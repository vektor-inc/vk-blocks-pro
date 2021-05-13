/**
 * highlighter block type
 */
import { __ } from '@wordpress/i18n';
import {
	registerFormatType,
	toggleFormat,
	applyFormat,
	removeFormat,
	getActiveFormat,
} from '@wordpress/rich-text';
import {
	RichTextToolbarButton,
	RichTextShortcut,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';

import { ReactComponent as Icon } from './icon.svg';

const name = 'vk-blocks/font-size-extension';
const defaultFontSize = 16;

// 色が指定されていなかったらデフォルトカラーを指定する
const setFontSizeIfUndefined = (fontSize) => {
	if (fontSize === undefined) {
		fontSize = defaultFontSize;
	}
	return fontSize;
};

//ハイライトカラーが選択されたら
const fontSizeOnToggle = ({ fontSize, value, onChange }) => {
	fontSize = setFontSizeIfUndefined(fontSize);

	onChange(
		toggleFormat(value, {
			type: name,
			attributes: {
				data: fontSize,
				style: `font-size: ${fontSize}px;`,
			},
		})
	);
};

registerFormatType(name, {
	title: __('Font Size', 'vk-blocks'),
	tagName: 'span',
	className: 'vk_fontSize',
	attributes: {
		data: 16,
		style: 'font-size:16px',
	},
	edit(props) {
		const { value, isActive, onChange } = props;
		const shortcutType = 'primary';
		const shortcutChar = 'f';

		let selectedFontSize;
		if (isActive) {
			const activeFormat = getActiveFormat(value, name);
			selectedFontSize = activeFormat.attributes.data;
		}

		return (
			<>
				<InspectorControls></InspectorControls>
				<RichTextShortcut
					type={shortcutType}
					character={shortcutChar}
					onUse={() =>
						fontSizeOnToggle({
							selectedFontSize,
							value,
							onChange,
						})
					}
				/>
				<RichTextToolbarButton
					icon={Icon}
					title={__('Font Size', 'vk-blocks')}
					onClick={() =>
						fontSizeOnToggle({
							selectedFontSize,
							value,
							onChange,
						})
					}
					isActive={isActive}
					shortcutType={shortcutType}
					shortcutCharacter={shortcutChar}
				/>
			</>
		);
	},
});
