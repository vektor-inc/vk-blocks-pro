export const isValidJson = ( value ) => {
	try {
		JSON.parse( value );
	} catch ( e ) {
		return false;
	}
	return true;
};

export const fixBrokenUnicode = ( text ) => {
	if ( ! isValidJson( text ) ) {
		text = text.replace( /u0022/g, '"' );
	}

	return text;
};
