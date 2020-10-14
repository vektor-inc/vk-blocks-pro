import { ColumnResponsive } from "./component";
import attributes from "./schema";


const save = ({ attributes, className }) => {
	return (
		<ColumnResponsive
			attributes={ attributes }
			className={ className }
			for_={ "save" }
		/>
	);
};

export default {
	attributes,
	save
}


