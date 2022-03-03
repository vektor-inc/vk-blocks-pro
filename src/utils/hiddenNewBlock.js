export const hiddenNewBlock = ( version ) => {
	if ( ! Number( version ) ) {
		return;
	}

	let inserterVisible = true;
	// eslint-disable-next-line no-undef
	if ( version > parseFloat( wpVersion ) ) {
		inserterVisible = false;
	}
	return inserterVisible;
};
