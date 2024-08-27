/**
 * WordPress dependencies
 */
import {
	applyFormat,
	removeFormat,
	getActiveFormat,
	useAnchor,
	useAnchorRef,
} from '@wordpress/rich-text';
import { useCachedTruthy } from '@wordpress/block-editor';
import { Popover, FontSizePicker, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { inlineFontSize as settings } from './index';

const fontSizes = [
	{
		name: __('Small', 'vk-blocks-pro'),
		slug: 'small',
		size: '12px',
	},
	{
		name: __('Normal', 'vk-blocks-pro'),
		slug: 'normal',
		size: '16px',
	},
	{
		name: __('Big', 'vk-blocks-pro'),
		slug: 'big',
		size: '18px',
	},
	{
		name: __('Extra big', 'vk-blocks-pro'),
		slug: 'extra-big',
		size: '21px',
	},
];

function parseFontSize(fontSize = '') {
	return fontSize.replace('font-size:', '');
}

export function getActiveInlineFontSize(value, name) {
	const activeInlineFontSizeFormat = getActiveFormat(value, name);

	if (!activeInlineFontSizeFormat) {
		return undefined;
	}

	if (activeInlineFontSizeFormat.attributes.data !== undefined) {
		return activeInlineFontSizeFormat.attributes.data;
	}

	return parseFontSize(activeInlineFontSizeFormat.attributes.style);
}

function InlineFontSizePicker({ name, value, onChange, setIsSettingFontSize }) {
	const pickerStyle = {
		width: '200px',
	};
	const buttonStyle = {
		marginTop: '16px',
		padding: '0 16px',
		height: '30px',
	};

	const onInlineFontSizeChange = (newFontSize) => {
		if (!newFontSize) {
			// reset font size
			onChange(removeFormat(value, name));
		} else if (newFontSize.match(/\d/)) {
			// Applies only Font Size has a numeric value.
			onChange(
				applyFormat(value, {
					type: name,
					attributes: {
						data: `${newFontSize}`,
						style: `font-size: ${newFontSize};`,
					},
				})
			);
		}
	};

	const activeFontSize = getActiveInlineFontSize(value, name);

	return (
		<div style={pickerStyle}>
			<FontSizePicker
				__nextHasNoMarginBottom
				fontSizes={fontSizes}
				value={activeFontSize}
				onChange={onInlineFontSizeChange}
			/>
			<Button
				onClick={() => {
					setIsSettingFontSize(false);
				}}
				isSmall
				variant="secondary"
				style={buttonStyle}
			>
				{__('Apply', 'vk-blocks-pro')}
			</Button>
		</div>
	);
}

export default function InlineFontSizeUI({
	name,
	value,
	onChange,
	onClose,
	contentRef,
	setIsSettingFontSize,
}) {
	// NOTE: useAnchorRefが非推奨になったのでフォールバック WP6.0以下をサポートしなくなったら削除すること #1456
	const existsUseAnchor = typeof useAnchor === 'function';
	const _useAnchor = existsUseAnchor ? useAnchor : useAnchorRef;
	const useAnchorObj = existsUseAnchor
		? { editableContentElement: contentRef.current, value, settings }
		: { ref: contentRef, value };
	const popoverAnchor = useCachedTruthy(_useAnchor(useAnchorObj));

	const rect = useMemo(() => popoverAnchor.getBoundingClientRect(), []);
	if (!!popoverAnchor?.ownerDocument) {
		popoverAnchor.getBoundingClientRect = () => rect;
	}

	return (
		<Popover
			onClose={onClose}
			className="vk-blocks-format-popover components-inline-color-popover"
			anchor={existsUseAnchor ? popoverAnchor : undefined}
			anchorRef={existsUseAnchor ? undefined : popoverAnchor}
		>
			<InlineFontSizePicker
				name={name}
				value={value}
				onChange={onChange}
				setIsSettingFontSize={setIsSettingFontSize}
			/>
		</Popover>
	);
}
