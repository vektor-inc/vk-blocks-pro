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

import { RichTextToolbarButton, URLPopover } from '@wordpress/block-editor';
import { FontSizePicker, Button, Icon } from '@wordpress/components';
import { ReactComponent as IconSVG } from './icon.svg';

import { FontSizePicker, Button } from '@wordpress/components';

import { ReactComponent as Icon } from './icon.svg';

const name = 'vk-blocks/inline-font-size';

const FontSizeEdit = (props) => {
	const { value, isActive, onChange } = props;
	const shortcutType = 'primary';
	const shortcutChar = 'h';

	// 選択した font-size を格納
	let selectedFontSize;

	if (isActive) {
		const activeFormat = getActiveFormat(value, name);
		selectedFontSize = activeFormat.attributes.data;
	}
	const pickerStyle = {
		width: '200px',
	};
	const iconStyle = {
		width: '24px',
		height: '24px',
	};
	const buttonStyle = {
		marginTop: '16px',
		padding: '0 16px',
		height: '30px',
	};
	const anchorRef = useAnchorRef({ ref: props.contentRef, value });
	const [isSettingFontSize, setIsSettingFontSize] = useState(false);

	const fontSizes = [
		{
			name: __('Small', 'vk-blocks'),
			slug: 'small',
			size: '12px',
		},
		{
			name: __('Normal', 'vk-blocks'),
			slug: 'normal',
			size: '16px',
		},
		{
			name: __('Big', 'vk-blocks'),
			slug: 'big',
			size: '18px',
		},
		{
			name: __('Extra big', 'vk-blocks'),
			slug: 'extra-big',
			size: '21px',
		},
	];

	const fallbackFontSize = 16;

	return (
		<>
			<RichTextToolbarButton
				title={__('Inline Font Size', 'vk-blocks')}
				onClick={() => {
					setIsSettingFontSize(true);
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
			{isSettingFontSize && (
				<URLPopover
					value={value}
					className="components-inline-color-popover"
					anchorRef={anchorRef}
					onClose={() => setIsSettingFontSize(false)}
				>
					<div style={pickerStyle}>
						<FontSizePicker
							fontSizes={fontSizes}
							value={selectedFontSize}
							fallbackFontSize={fallbackFontSize}
							withSlider={true}
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
								} else {
									// reset font size
									onChange(removeFormat(value, name));
								}
								//setIsSettingFontSize(false);
							}}
						/>
						<Button
							onClick={() => {
								setIsSettingFontSize(false);
							}}
							isSmall
							isSecondary
							style={buttonStyle}
						>
							{__('Apply', 'vk-blocks')}
						</Button>
					</div>
				</URLPopover>
			)}
		</>
	);
};

registerFormatType(name, {
	title: __('Inline font size', 'vk-blocks'),
	tagName: 'span',
	className: 'vk_inline-font-size',
	attributes: {
		data: 'data-fontSize',
		style: 'style',
	},
	edit: FontSizeEdit,
});
