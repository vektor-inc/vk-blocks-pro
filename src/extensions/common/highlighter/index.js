/**
 * highlighter block type
 */
/* eslint no-shadow: 0 */
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
const name = 'vk-blocks/highlighter';

import hex2rgba from '@vkblocks/utils/hex-to-rgba';
import { ReactComponent as Icon } from './icon.svg';

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
		const alpha = 0.7;
		const defaultColor = '#fffd6b';
		const shortcutType = 'primary';
		const shortcutChar = 'h';

		let activeColor;
		if (isActive) {
			const activeFormat = getActiveFormat(value, name);
			activeColor = activeFormat.attributes.data;
		}

		const setColorIfUndefined = (activeColor) => {
			if (activeColor === undefined) {
				activeColor = defaultColor;
			}
			return activeColor;
		};

		const onToggle = (activeColor) => {
			activeColor = setColorIfUndefined(activeColor);

			onChange(
				toggleFormat(value, {
					type: name,
					attributes: {
						data: activeColor,
						style: `background: linear-gradient(transparent 60%,${hex2rgba(
							activeColor,
							alpha
						)} 0);`,
					},
				})
			);
		};

		return (
			<>
				<InspectorControls>
					<PanelColorSettings
						title={__('Highlighter', 'vk-blocks')}
						initialOpen={false}
						colorSettings={[
							{
								value: activeColor,
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
					onUse={() => onToggle(activeColor)}
				/>
				<RichTextToolbarButton
					icon={Icon}
					title={__('Highlighter', 'vk-blocks')}
					onClick={() => onToggle(activeColor)}
					isActive={isActive}
					shortcutType={shortcutType}
					shortcutCharacter={shortcutChar}
				/>
			</>
		);
	},
});
