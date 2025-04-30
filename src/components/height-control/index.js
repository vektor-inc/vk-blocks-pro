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

export default function HeightControl({
	label,
	valuePC,
	valueTablet,
	valueMobile,
	unit,
	onChangePC,
	onChangeTablet,
	onChangeMobile,
	onChangeUnit,
	maxPC = getMaxByUnit(unit),
	maxTablet = getMaxByUnit(unit),
	maxMobile = getMaxByUnit(unit),
}) {
	return (
		<>
			<AdvancedUnitControl
				attributes={{ unit }}
				setAttributes={({ unit }) => onChangeUnit(unit)}
			/>
			<BaseControl label={label}>
				<RangeControl
					label="PC"
					value={valuePC}
					onChange={onChangePC}
					min={0}
					max={maxPC}
					step={getStepByUnit(unit)}
				/>
				<RangeControl
					label="Tablet"
					value={valueTablet}
					onChange={onChangeTablet}
					min={0}
					max={maxTablet}
					step={getStepByUnit(unit)}
				/>
				<RangeControl
					label="Mobile"
					value={valueMobile}
					onChange={onChangeMobile}
					min={0}
					max={maxMobile}
					step={getStepByUnit(unit)}
				/>
			</BaseControl>
		</>
	);
}