// import Depreated0_56_3 from "./0.56.3"
import { ColumnResponsive0574 } from "./0.57.4";

const blockAttributes = {
	name: {
		type: "string",
		default: "grid-column-item",
	},
	layout: {
		type: "string",
		default: "card",
	},
	col_xs: {
		type: "number",
		default: 1,
	},
	col_sm: {
		type: "number",
		default: 2,
	},
	col_md: {
		type: "number",
		default: 3,
	},
	col_lg: {
		type: "number",
		default: 3,
	},
	col_xl: {
		type: "number",
		default: 3,
	},
	col_xxl: {
		type: "number",
		default: 3,
	},
}


export default [
	{
		attributes: blockAttributes,
		save({ attributes, className }) {
			return (
				<ColumnResponsive
					attributes={ attributes }
					className={ className }
					for_={ "save" }
				/>
			);
		},
	}
];
