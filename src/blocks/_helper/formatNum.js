export default (value, initial) => {
	value = parseInt(value, 10)
	initial = parseInt(initial, 10)

	if (value || value == 0) {
		return value;
	} else {
		return initial;
	}

}
