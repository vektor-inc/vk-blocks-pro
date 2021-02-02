/**
 * highlighter block type
 */
import { __ } from '@wordpress/i18n'; // Import __() from wp.i18n
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

import hex2rgba from '@vkblocks/utils/hex-to-rgba';
import { ReactComponent as Icon } from './icon.svg';

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
const hightliterOnToggle = ({ color, value, onChange }) => {
	color = setColorIfUndefined(color);

	onChange(
		toggleFormat(value, {
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

registerFormatType(name, {
	title: __('Highlighter', 'vk-blocks'),
	tagName: 'span',
	className: 'vk_highlighter',
	attributes: {
		data: 'data-color',
		style: 'style',
	},
	edit(props) {
		const { value, isActive, onChange } = props;
		const shortcutType = 'primary';
		const shortcutChar = 'h';

		let heightlightColor;
		if (isActive) {
			const activeFormat = getActiveFormat(value, name);
			heightlightColor = activeFormat.attributes.data;
		}

		return (
			<>
				<InspectorControls>
					<PanelColorSettings
						title={__('Highlighter', 'vk-blocks')}
						initialOpen={false}
						colorSettings={[
							{
								value: heightlightColor,
								onChange: (color) => {
									if (color) {
										onChange(
											applyFormat(value, {
												type: name,
												attributes: {
													data: color,
													style: `background: linear-gradient(transparent 60%,${hex2rgba(
														color,
														0.7
													)} 0);`,
												},
											})
										);
										return;
									}
									onChange(removeFormat(value, name));
								},
								label: __('Highlight Color', 'vk-blocks'),
							},
						]}
					/>
				</InspectorControls>
				<RichTextShortcut
					type={shortcutType}
					character={shortcutChar}
					onUse={() =>
						hightliterOnToggle({
							heightlightColor,
							value,
							onChange,
						})
					}
				/>
				<RichTextToolbarButton
					icon={Icon}
					title={__('Highlighter', 'vk-blocks')}
					onClick={() =>
						hightliterOnToggle({
							heightlightColor,
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
