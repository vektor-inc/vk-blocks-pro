export const fixBrokenUnicode = ( text ) => {
	if ( !isValidJson( text ) ) {
		text = text.replace( /u0022/g, '"' );
	}

	return text;
}
