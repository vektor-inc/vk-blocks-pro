/**
 * heading block type
 *
 */
import VKBHeading from './component';
import Schema from './schema';

const Save = (props) => {
	return (
		<div>
			<VKBHeading {...props} for_={'save'} />
		</div>
	);
};

export default {
	attributes: Schema,
	save: Save,
};
