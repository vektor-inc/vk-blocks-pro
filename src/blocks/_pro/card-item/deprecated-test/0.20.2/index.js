import { Component } from './component';
import { schema } from './schema';

const Save = (props) => {
	return <Component value={props} for_={'save'} />;
};

export default {
	attributes: schema,
	save: Save,
};
