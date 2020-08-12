const { __ } = wp.i18n;
const { RangeControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
import formatNumCol from "../../blocks/_helper/formatNumCol";

export const ColumnLayout = (props) => {

	const { setAttributes, attributes } = props;
	const { col_xs, col_sm, col_md, col_lg, col_xl, col_xxl } = attributes;

	const defaultMinMax = {
		min: "1",
		max: "6"
	};

	return (
		<Fragment>
			<BaseControl
				label={ __("Column ( Screen size : Extra small )", "vk-blocks") }
			>
				<RangeControl
					value={ col_xs }
					onChange={ value => setAttributes({ col_xs: formatNumCol(value, col_xs) }) }
					min={ defaultMinMax.min }
					max={ defaultMinMax.max }
				/>
			</BaseControl>
			<BaseControl label={ __("Column ( Screen size : Small )", "vk-blocks") }>
				<RangeControl
					value={ col_sm }
					onChange={ value => setAttributes({ col_sm: formatNumCol(value, col_sm) }) }
					min={ defaultMinMax.min }
					max={ defaultMinMax.max }
				/>
			</BaseControl>
			<BaseControl label={ __("Column ( Screen size : Medium )", "vk-blocks") }>
				<RangeControl
					value={ col_md }
					onChange={ value => setAttributes({ col_md: formatNumCol(value, col_md) }) }
					min={ defaultMinMax.min }
					max={ defaultMinMax.max }
				/>
			</BaseControl>
			<BaseControl label={ __("Column ( Screen size : Large )", "vk-blocks") }>
				<RangeControl
					value={ col_lg }
					onChange={ value => setAttributes({ col_lg: formatNumCol(value, col_lg) }) }
					min={ defaultMinMax.min }
					max={ defaultMinMax.max }
				/>
			</BaseControl>
			<BaseControl
				label={ __("Column ( Screen size : Extra large )", "vk-blocks") }
			>
				<RangeControl
					value={ col_xl }
					onChange={ value => setAttributes({ col_xl: formatNumCol(value, col_xl) }) }
					min={ defaultMinMax.min }
					max={ defaultMinMax.max }
				/>
			</BaseControl>
			<BaseControl
				label={ __("Column ( Screen size : XX large )", "vk-blocks") }
			>
				<RangeControl
					value={ col_xxl }
					onChange={ value => setAttributes({ col_xxl: formatNumCol(value, col_xxl) }) }
					min={ defaultMinMax.min }
					max={ defaultMinMax.max }
				/>
			</BaseControl>

		</Fragment>
	)
}
