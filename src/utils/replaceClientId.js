/*
 * Return clientId wthiout "-".
 */
const replaceClientId = ( clientId ) => {
	if ( ! clientId ) {
		return;
	}
	return clientId.replace( /-/g, '' );
};

export default replaceClientId;
