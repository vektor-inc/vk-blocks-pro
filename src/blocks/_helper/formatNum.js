export default (value, initial) => {
	if (value || value == 0) {
		return value;
	} else {
		return initial;
	}

}
