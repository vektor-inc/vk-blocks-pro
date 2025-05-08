import { RangeControl, BaseControl } from '@wordpress/components';
import AdvancedUnitControl from '@vkblocks/components/advanced-unit-control';

export const getMaxByUnit = (unit) => {
	switch (unit) {
		case 'px':
			return 1000;
		case 'em':
		case 'rem':
		case 'vh':
		case 'svh':
		case 'lvh':
		case 'dvh':
		case 'vw':
			return 100;
		default:
			return 100;
	}
};

export const getStepByUnit = (unit) => (unit === 'px' ? 1 : 0.1);

const handleValueChange = (value, onChange) => {
	const numericValue = value !== '' && value !== null ? Number(value) : 0;
	onChange(numericValue);
};

export default function ResponsiveSizeControl({
	label,
	valuePC,
	valueTablet,
	valueMobile,
	unit,
	onChangePC,
	onChangeTablet,
	onChangeMobile,
	onChangeUnit,
	maxPC,
	maxTablet,
	maxMobile,
}) {
	const defaultMaxPC = maxPC !== undefined ? maxPC : getMaxByUnit(unit);
	const defaultMaxTablet =
		maxTablet !== undefined ? maxTablet : getMaxByUnit(unit);
	const defaultMaxMobile =
		maxMobile !== undefined ? maxMobile : getMaxByUnit(unit);

	return (
		<>
			<AdvancedUnitControl
				attributes={{ unit }}
				setAttributes={({ unit }) => {
					onChangeUnit(unit);
				}}
			/>
			<BaseControl label={label} id={`responsive-size-control-${label}`}>
				<RangeControl
					label="PC"
					value={valuePC}
					onChange={(value) => handleValueChange(value, onChangePC)}
					min={0}
					max={defaultMaxPC}
					step={getStepByUnit(unit)}
				/>
				<RangeControl
					label="Tablet"
					value={valueTablet}
					onChange={(value) =>
						handleValueChange(value, onChangeTablet)
					}
					min={0}
					max={defaultMaxTablet}
					step={getStepByUnit(unit)}
				/>
				<RangeControl
					label="Mobile"
					value={valueMobile}
					onChange={(value) =>
						handleValueChange(value, onChangeMobile)
					}
					min={0}
					max={defaultMaxMobile}
					step={getStepByUnit(unit)}
				/>
			</BaseControl>
		</>
	);
}
