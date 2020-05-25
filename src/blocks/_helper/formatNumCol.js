export default (value, initial) => {
	if (value || value == 0) {
		if ( value === 5 ){
			value = 4;
		}
		return value;
	} 
	return initial;
}