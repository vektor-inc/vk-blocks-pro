// ベース https://github.com/WordPress/gutenberg/blob/a1f2679cfeec924c2d769b40575626820ac2cfbd/packages/block-editor/src/components/global-styles/dimensions-panel.js

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';
import { __experimentalSpacingSizesControl as SpacingSizesControl } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getValueFromVariable } from './utils';

const AXIAL_SIDES = ['horizontal', 'vertical'];

function useHasPadding(settings) {
	return settings?.spacing?.padding;
}

export function filterValuesBySides(values, sides) {
	if (!sides) {
		// If no custom side configuration all sides are opted into by default.
		return values;
	}

	// Only include sides opted into within filtered values.
	const filteredValues = {};
	sides.forEach((side) => {
		if (side === 'vertical') {
			filteredValues.top = values.top;
			filteredValues.bottom = values.bottom;
		}
		if (side === 'horizontal') {
			filteredValues.left = values.left;
			filteredValues.right = values.right;
		}
		filteredValues[side] = values?.[side];
	});

	return filteredValues;
}

function splitStyleValue(value) {
	// Check for shorthand value (a string value).
	if (value && typeof value === 'string') {
		// Convert to value for individual sides for BoxControl.
		return {
			top: value,
			right: value,
			bottom: value,
			left: value,
		};
	}

	return value;
}

export function DimensionsPanel({
	value,
	onChange,
	inheritedValue = value,
	settings,
}) {
	const decodeValue = (rawValue) =>
		getValueFromVariable({ settings }, '', rawValue);

	// const showSpacingPresetsControl = useHasSpacingPresets(settings);
	const units = useCustomUnits({
		availableUnits: settings?.spacing?.units || [
			'%',
			'px',
			'em',
			'rem',
			'vw',
		],
	});

	// Padding
	const showPaddingControl = useHasPadding(settings);
	const rawPadding = decodeValue(inheritedValue?.spacing?.padding);
	const paddingValues = splitStyleValue(rawPadding);
	const paddingSides = Array.isArray(settings?.spacing?.padding)
		? settings?.spacing?.padding
		: settings?.spacing?.padding?.sides;
	const isAxialPadding =
		paddingSides && paddingSides.some((side) => AXIAL_SIDES.includes(side));
	const setPaddingValues = (newPaddingValues) => {
		// resetPaddingValueでnewPaddingValuesにundefinedが入って来た時にエラーになるので条件追加
		const padding =
			newPaddingValues === undefined
				? undefined
				: filterValuesBySides(newPaddingValues, paddingSides);
		onChange(padding);
	};
	const hasPaddingValue = () =>
		!!value?.spacing?.padding &&
		Object.keys(value?.spacing?.padding).length;
	const resetPaddingValue = () => setPaddingValues(undefined);

	return (
		<>
			{showPaddingControl && (
				<ToolsPanelItem
					hasValue={hasPaddingValue}
					label={__('Padding')}
					onDeselect={resetPaddingValue}
					isShownByDefault
					className="tools-panel-item-spacing"
				>
					<SpacingSizesControl
						values={paddingValues}
						onChange={setPaddingValues}
						label={__('Padding')}
						sides={paddingSides}
						units={units}
						allowReset={false}
						splitOnAxis={isAxialPadding}
					/>
				</ToolsPanelItem>
			)}
		</>
	);
}
