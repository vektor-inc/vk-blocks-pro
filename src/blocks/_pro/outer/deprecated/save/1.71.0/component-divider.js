/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { isHexColor } from '@vkblocks/utils/is-hex-color';

const componentDivider = (
	level,
	color,
	whichSide,
	dividerType,
	levelSettingPerDevice,
	level_mobile,
	level_tablet,
	level_pc
) => {
	let sectionPadding;
	let sectionClass;
	let lenderDivider;

	const pathClassNames = classnames({
		[`has-text-color`]: color !== undefined,
		[`has-${color}-color`]: color !== undefined && !isHexColor(color),
	});

	// eslint-disable-next-line no-shadow
	const tiltSectionStyle = (level, color) => {
		if (level > 0) {
			return (
				<path
					d={`m0,${100 - level} L100,100 L0,100 z`}
					strokeWidth="0"
					fill={isHexColor(color) ? color : 'currentColor'}
					className={pathClassNames}
				/>
			);
		} else if (level < 0) {
			//絶対値に変換
			const absLevel = Math.abs(level);

			return (
				<path
					d={`m100,${100 - absLevel} L0,100 L100,100 z`}
					strokeWidth="0"
					fill={isHexColor(color) ? color : 'currentColor'}
					className={pathClassNames}
				/>
			);
		}
	};

	// eslint-disable-next-line no-shadow
	const curveSectionStyle = (level, color) => {
		if (level > 0) {
			return (
				<path
					d={`m0,${100 - level} q50,${level * 2},100,0 V100 L0,100 z`}
					strokeWidth="0"
					fill={isHexColor(color) ? color : 'currentColor'}
					className={pathClassNames}
				/>
			);
		} else if (level < 0) {
			return (
				<path
					d={`m0,100 q50,${level * 2},100,0 V100 L0,100 z`}
					strokeWidth="0"
					fill={isHexColor(color) ? color : 'currentColor'}
					className={pathClassNames}
				/>
			);
		}
	};

	// eslint-disable-next-line no-shadow
	const waveSectionStyle = (level, color) => {
		if (level > 0) {
			return (
				<path
					d={`m0,${
						100 - level / 2
					} q20,${level},40,0 t40,0 t40,0 V100 L0,100 z`}
					strokeWidth="0"
					fill={isHexColor(color) ? color : 'currentColor'}
					className={pathClassNames}
				/>
			);
		} else if (level < 0) {
			return (
				<path
					d={`m0,${
						level / 2 + 100
					} q20,${level},40,0 t40,0 t40,0 V100 L0,100 z`}
					strokeWidth="0"
					fill={isHexColor(color) ? color : 'currentColor'}
					className={pathClassNames}
				/>
			);
		}
	};

	// eslint-disable-next-line no-shadow
	const triangleSectionStyle = (level, color) => {
		const absLevel = Math.abs(level);
		const DivideAbs4 = absLevel / 4;

		if (level > 0) {
			return (
				<path
					d={`m0,100 h${
						50 - DivideAbs4
					} l${DivideAbs4},-${absLevel} l${DivideAbs4},${absLevel} h${DivideAbs4} v100 h-100 z`}
					strokeWidth="0"
					fill={isHexColor(color) ? color : 'currentColor'}
					className={pathClassNames}
				/>
			);
		} else if (level < 0) {
			return (
				<path
					d={`m0,${100 - absLevel} h${
						50 - DivideAbs4
					} l${DivideAbs4},${absLevel} l${DivideAbs4},-${absLevel} h${
						50 - DivideAbs4
					} v${absLevel + 1} h-100 z`}
					strokeWidth="0"
					fill={isHexColor(color) ? color : 'currentColor'}
					className={pathClassNames}
				/>
			);
		}
	};

	//背景色をクリアした時は、白に変更
	if (!color) {
		color = '#fff';
	}

	//Paddingの条件分岐を追加
	const getSectionStyle = (lvl) => {
		if (dividerType === 'tilt') {
			sectionPadding = Math.abs(lvl);
			return tiltSectionStyle(lvl, color);
		} else if (dividerType === 'curve') {
			sectionPadding = lvl > 0 ? Math.abs(lvl) : Math.abs(lvl) * 2;
			return curveSectionStyle(lvl, color);
		} else if (dividerType === 'wave') {
			sectionPadding = Math.abs(lvl);
			return waveSectionStyle(lvl, color);
		} else if (dividerType === 'triangle') {
			sectionPadding = Math.abs(lvl);
			return triangleSectionStyle(lvl, color);
		}
	};

	lenderDivider = getSectionStyle(level);

	//classにdividerTypeを追加
	// eslint-disable-next-line prefer-const
	sectionClass = dividerType;

	// vk_outerのクラス名をデバイスタイプに基づいて追加する

	const renderSVG = (lvl, side, deviceType) => {
		lenderDivider = getSectionStyle(lvl);
		const style =
			side === 'upper'
				? { paddingBottom: sectionPadding + `px` }
				: { paddingTop: sectionPadding + `px` };

		let displayDeviceTypeClass;
		if (deviceType === undefined) {
			displayDeviceTypeClass = '';
		} else {
			displayDeviceTypeClass = ` vk_outer-display-${deviceType}`;
		}

		return (
			<div
				className={`vk_outer_separator vk_outer_separator-position-${side} vk_outer_separator-type-${sectionClass}${displayDeviceTypeClass}`}
				style={style}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
				>
					{lenderDivider}
				</svg>
			</div>
		);
	};

	if (whichSide === 'upper') {
		if (levelSettingPerDevice) {
			return (
				<>
					{level_pc !== 0 &&
						level_pc &&
						renderSVG(level_pc, 'upper', 'pc')}
					{level_tablet !== 0 &&
						level_tablet &&
						renderSVG(level_tablet, 'upper', 'tablet')}
					{level_mobile !== 0 &&
						level_mobile &&
						renderSVG(level_mobile, 'upper', 'mobile')}
				</>
			);
		}
		return renderSVG(level, 'upper');
	} else if (whichSide === 'lower') {
		if (levelSettingPerDevice) {
			return (
				<>
					{level_pc !== 0 &&
						level_pc &&
						renderSVG(level_pc, 'lower', 'pc')}
					{level_tablet !== 0 &&
						level_tablet &&
						renderSVG(level_tablet, 'lower', 'tablet')}
					{level_mobile !== 0 &&
						level_mobile &&
						renderSVG(level_mobile, 'lower', 'mobile')}
				</>
			);
		}
		return renderSVG(level, 'lower');
	}
};

export { componentDivider };
