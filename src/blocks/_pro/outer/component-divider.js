/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { isHexColor } from '@vkblocks/utils/is-hex-color';

const componentDivider = (level, color, whichSide, dividerType) => {
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
	if (dividerType === 'tilt') {
		sectionPadding = Math.abs(level);
		lenderDivider = tiltSectionStyle(level, color);
	} else if (dividerType === 'curve') {
		if (level > 0) {
			sectionPadding = Math.abs(level);
		} else if (level < 0) {
			sectionPadding = Math.abs(level) * 2;
		}
		lenderDivider = curveSectionStyle(level, color);
	} else if (dividerType === 'wave') {
		sectionPadding = Math.abs(level);
		lenderDivider = waveSectionStyle(level, color);
	} else if (dividerType === 'triangle') {
		sectionPadding = Math.abs(level);
		lenderDivider = triangleSectionStyle(level, color);
	}

	//classにdividerTypeを追加
	// eslint-disable-next-line prefer-const
	sectionClass = dividerType;

	//upper-paddingを追加
	if (whichSide === 'upper') {
		return (
			<div
				className={`vk_outer_separator vk_outer_separator-position-upper vk_outer_separator-type-${sectionClass}`}
				style={{ paddingBottom: sectionPadding + `px` }}
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
		//lower-paddingを追加
	} else if (whichSide === 'lower') {
		return (
			<div
				className={`vk_outer_separator vk_outer_separator-position-lower vk_outer_separator-type-${sectionClass}`}
				style={{ paddingTop: sectionPadding + `px` }}
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
	}
};

export { componentDivider };
