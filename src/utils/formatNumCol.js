export default ( value, initial ) => {
	let returnValue = initial;
	if ( value || value === 0 || value === undefined || value === null ) {
		if ( value === 5 ) {
			value = 4;
		}
		returnValue = value;
	}
	return returnValue;
};
