export const destructiveDeleteFromArray = ( array, value ) => {
	const index = array.indexOf( value );
	if ( index !== -1 ) {
		array = array.splice( index, 1 );
	}
	return array;
};
