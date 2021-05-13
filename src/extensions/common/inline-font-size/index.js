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
	TextControl,
} from '@wordpress/block-editor';

import { ReactComponent as Icon } from './icon.svg';

const name = 'vk-blocks/inline-font-size';
const defaultFontSize = 16;

// 色が指定されていなかったらデフォルトカラーを指定する
const setFontSizeIfUndefined = (fontSize) => {
	if (fontSize === undefined) {
		fontSize = defaultFontSize;
	}
	return fontSize;
};

//ハイライトカラーが選択されたら
const fontSizeOnToggle = ({ fontSize, value }) => {
	fontSize = setFontSizeIfUndefined(fontSize);

	toggleFormat(value, {
		type: name,
		attributes: {
			fontSize,
			style: `font-size: ${fontSize}px;`,
		},
	});
};

registerFormatType(name, {
	title: __('Font Size', 'vk-blocks'),
	tagName: 'span',
	className: 'vk_fontSize',
	attributes: {
		fontSize: 16,
		style: 'font-size:16px',
	},
	edit(props) {
		const { value, isActive } = props;
		const shortcutType = 'primary';
		const shortcutChar = 'f';

		let selectedFontSize;
		if (isActive) {
			const activeFormat = getActiveFormat(value, name);
			selectedFontSize = activeFormat.attributes.fontSize;
		}

		return (
			<>
				<InspectorControls>
					<TextControl
						label="Additional CSS Class"
						value={selectedFontSize}
						onChange={(fontSize) => {
							if (fontSize) {
								applyFormat(value, {
									type: name,
									attributes: {
										fontSize,
										style: `font-size: ${fontSize}px;`,
									},
								});
								return;
							}
							removeFormat(value, name);
						}}
					/>
				</InspectorControls>
				<RichTextToolbarButton
					icon={Icon}
					title={__('Font Size', 'vk-blocks')}
					onClick={() =>
						toggleFormat(value, {
							type: name,
							attributes: {
								fontSize,
								style: `font-size: ${fontSize}px;`,
							},
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
