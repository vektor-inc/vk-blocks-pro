/**
 * Pr-Content block type
 *
 */
import { PRcontent } from "./component";
export default ( props ) => {
	const { attributes, className } = props
	return (
		<PRcontent attributes={ attributes } className={ className } for_={ "save" } />
	);
}
