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
	const defaultMaxTablet = maxTablet !== undefined ? maxTablet : getMaxByUnit(unit);
	const defaultMaxMobile = maxMobile !== undefined ? maxMobile : getMaxByUnit(unit);

	return (
		<>
			<AdvancedUnitControl
				attributes={{ unit }}
				setAttributes={({ unit }) => {
					onChangeUnit(unit);
					handleUnitChange(unit, 'minHeightUnit', ['minHeightValuePC', 'minHeightValueTablet', 'minHeightValueMobile']);
				}}
			/>
			<BaseControl label={label}>
				<RangeControl
					label="PC"
					value={valuePC}
					onChange={onChangePC}
					min={0}
					max={defaultMaxPC}
					step={getStepByUnit(unit)}
				/>
				<RangeControl
					label="Tablet"
					value={valueTablet}
					onChange={onChangeTablet}
					min={0}
					max={defaultMaxTablet}
					step={getStepByUnit(unit)}
				/>
				<RangeControl
					label="Mobile"
					value={valueMobile}
					onChange={onChangeMobile}
					min={0}
					max={defaultMaxMobile}
					step={getStepByUnit(unit)}
				/>
			</BaseControl>
		</>
	);
}
