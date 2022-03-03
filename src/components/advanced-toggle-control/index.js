import { ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

export const AdvancedToggleControl = ( props ) => {
	const {
		initialFixedTable,
		label,
		helpYes,
		helpNo,
		schema,
		setAttributes,
	} = props;

	const [ hasFixedTable, setHasFixedTable ] = useState( initialFixedTable );
	return (
		<ToggleControl
			label={ label }
			help={ hasFixedTable ? helpYes : helpNo }
			checked={ hasFixedTable }
			onChange={ () => {
				setHasFixedTable( ! hasFixedTable );
				setAttributes( { [ schema ]: ! hasFixedTable } );
			} }
		/>
	);
};
