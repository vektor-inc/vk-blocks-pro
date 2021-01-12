import { CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { destructiveDeleteFromArray } from '@vkblocks/utils/delete-from-array';

export const AdvancedCheckboxControl = (props) => {
	const { schema, rawData, checkedData, setAttributes } = props;

	if (!rawData || !checkedData) return false;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [checkedState, setCheckedState] = useState(checkedData);
	// eslint-disable-next-line no-shadow
	const advancedSetAttributes = (schema, saveData) => {
		setAttributes({ [schema]: JSON.stringify(saveData) });
	};

	const checkBoxComponents = rawData.map((data) => {
		return (
			<CheckboxControl
				key={data.slug}
				label={data.label}
				checked={checkedState.some((item) => item === data.slug)}
				onChange={(value) => {
					if (value) {
						checkedState.push(data.slug);
					} else {
						destructiveDeleteFromArray(checkedState, data.slug);
					}
					setCheckedState(checkedState);
					advancedSetAttributes.bind(null, schema, checkedState)();
				}}
			/>
		);
	});
	return <ul>{checkBoxComponents}</ul>;
};
