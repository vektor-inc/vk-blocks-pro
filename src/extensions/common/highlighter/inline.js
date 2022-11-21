/**
 * WordPress dependencies
 */
import {
	removeFormat,
	getActiveFormat,
	useAnchor,
	useAnchorRef,
} from '@wordpress/rich-text';
import { ColorPalette, useCachedTruthy } from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { highlighColor as settings, highlighterOnApply } from './index';

export function getActiveColors(value, name) {
	const activeColorFormat = getActiveFormat(value, name);

	if (!activeColorFormat) {
		return undefined;
	}

	return activeColorFormat.attributes.data;
}

function ColorPicker({ name, value, onChange, setIsAddingColor }) {
	const onColorChange = (color) => {
		if (color) {
			// select color on palette
			highlighterOnApply({
				color,
				value,
				onChange,
			});
		} else {
			// clear palette
			onChange(removeFormat(value, name));
			setIsAddingColor(false);
		}
	};

	const activeColor = getActiveColors(value, name);

	return <ColorPalette value={activeColor} onChange={onColorChange} />;
}

export default function InlineColorUI({
	name,
	value,
	onChange,
	onClose,
	contentRef,
	setIsAddingColor,
}) {
	/*
		As you change the text color by typing a HEX value into a field,
		the return value of document.getSelection jumps to the field you're editing,
		not the highlighted text. Given that useAnchor uses document.getSelection,
		it will return null, since it can't find the <mark> element within the HEX input.
		This caches the last truthy value of the selection anchor reference.
		*/

	// NOTE: useAnchorRefが非推奨になったのでフォールバック WP6.0以下をサポートしなくなったら削除すること #1456
	const existsUseAnchor = typeof useAnchor === 'function';
	const _useAnchor = existsUseAnchor ? useAnchor : useAnchorRef;
	const useAnchorObj = existsUseAnchor
		? { editableContentElement: contentRef.current, value, settings }
		: { ref: contentRef, value };
	const popoverAnchor = useCachedTruthy(_useAnchor(useAnchorObj));

	return (
		<Popover
			onClose={onClose}
			className="vk-blocks-format-popover components-inline-color-popover"
			anchor={popoverAnchor}
		>
			<ColorPicker
				name={name}
				value={value}
				onChange={onChange}
				setIsAddingColor={setIsAddingColor}
			/>
		</Popover>
	);
}
