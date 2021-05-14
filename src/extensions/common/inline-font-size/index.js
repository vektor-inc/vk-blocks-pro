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
	InspectorControls,
} from '@wordpress/block-editor';

import { FontSizePicker, PanelBody } from '@wordpress/components';

import { ReactComponent as Icon } from './icon.svg';

const name = 'vk-blocks/inline-font-size';

registerFormatType(name, {
	title: __('Inline font size', 'vk-blocks'),
	tagName: 'span',
	className: 'vk_inline-font-size',
	attributes: {
		data: 'data-value',
		style: 'style',
	},
	edit(props) {
		const { value, isActive, onChange } = props;
		const shortcutType = 'primary';
		const shortcutChar = 'h';

		// 選択した font-size を格納
		let selectedFontSize;

		if (isActive) {
			const activeFormat = getActiveFormat(value, name);
			selectedFontSize = activeFormat.attributes.data;
		}

		const fontSizes = [
			{
				name: __('Small'),
				slug: 'small',
				size: '12px',
			},
			{
				name: __('Normal'),
				slug: 'normal',
				size: '16px',
			},
			{
				name: __('Big'),
				slug: 'big',
				size: '18px',
			},
			{
				name: __('Extra big'),
				slug: 'extra-big',
				size: '21px',
			},
		];

		const fallbackFontSize = 16;

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Inline Font Size Settings', 'vk-blocks')}
						initialOpen={false}
					>
						<FontSizePicker
							fontSizes={fontSizes}
							value={selectedFontSize}
							fallbackFontSize={fallbackFontSize}
							onChange={(newFontSize) => {
								if (newFontSize) {
									onChange(
										applyFormat(value, {
											type: name,
											attributes: {
												data: `${newFontSize}`,
												style: `font-size: ${newFontSize};`,
											},
										})
									);
									return;
								}
								onChange(removeFormat(value, name));
							}}
						/>
					</PanelBody>
				</InspectorControls>
				<RichTextToolbarButton
					icon={Icon}
					title={__('Inline Font Size', 'vk-blocks')}
					onClick={() => {
						if (selectedFontSize === undefined) {
							selectedFontSize = fallbackFontSize;
						}
						props.onChange(
							toggleFormat(value, {
								type: name,
								attributes: {
									data: `${selectedFontSize}`,
									style: `font-size: ${selectedFontSize};`,
								},
							})
						);
					}}
					isActive={isActive}
					shortcutType={shortcutType}
					shortcutCharacter={shortcutChar}
				/>
			</>
		);
	},
});
