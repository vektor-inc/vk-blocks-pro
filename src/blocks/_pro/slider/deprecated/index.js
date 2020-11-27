// import Depreated0_56_3 from "./0.56.3"
import { ColumnResponsive0563 } from "./0.56.3";
import { ColumnResponsive0491 } from "./0.49.1";

const blockAttributes = {
	unit: {
		type: 'string',
		default: 'px',
	},
	pc: {
		type: 'number',
		default: 600,
	},
	tablet: {
		type: 'number',
		default: 600,
	},
	mobile: {
		type: 'number',
		default: 600,
	},
	autoPlay: {
		type: "boolean",
		default: true,
	},
	autoPlayDelay: {
		type: "number",
		default: 2500,
	},
	pagination: {
		type: "boolean",
		default: true,
	},
	clientId: {
		type: "string",
		default: "",
	},
	width:{
		type: "string",
		default: "",
	},
	loop: {
		type: "boolean",
		default: true,
	},
	effect: {
		type: "string",
		default: "slide",
	},
	speed: {
		type: 'number',
		default: 300,
	},
}

export default [
	{
		attributes: blockAttributes,
		save({ attributes, className }){
			return (
				<ColumnResponsive0563
					attributes={ attributes }
					className={ className }
					for_={ "save" }
				/>
			)
		}
	},
	{
		attributes: blockAttributes,
		save({ attributes, className }){
			return (
				<ColumnResponsive0491
					attributes={ attributes }
					className={ className }
					for_={ "save" }
				/>
			)
		}
	}
];
