'use strict';

export default function toNumber( value, min = -100, max = null ) {
	value = Number( value );

	if ( isNaN( value ) || value < min ) {
		value = min;
	}

	if ( null !== max && value > max ) {
		value = max;
	}

	return value;
}
