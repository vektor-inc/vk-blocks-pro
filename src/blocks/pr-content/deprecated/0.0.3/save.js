/**
 * Pr-Content block type
 *
 */
import { PRcontent } from './component';
export default function save({ attributes, className }) {
	return (
		<PRcontent
			attributes={attributes}
			className={className}
			for_={'save'}
		/>
	);
}
