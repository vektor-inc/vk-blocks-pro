import { ColumnResponsive } from "./component";
import attributes from "./schema";

export default {
	attributes,
	save({ attributes, className }){
		console.log(attributes);
		return (
			<ColumnResponsive
				attributes={ attributes }
				className={ className }
				for_={ "save" }
			/>
		)
	}
}


