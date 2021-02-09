import { CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { destructiveDeleteFromArray } from '@vkblocks/utils/delete-from-array';

const advancedSetAttributes = (schema, saveData) => {
	setAttributes({ [schema]: JSON.stringify(saveData) });
};

export const AdvancedCheckboxControl = (props) => {
	const { schema, rawData, checkedData, setAttributes } = props;
	const [checkedState, setCheckedState] = useState(checkedData);

	if (!rawData || !checkedData) return false;

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
					advancedSetAttributes.bind(null, schema, checkedState, setAttributes)();
				}}
			/>
		);
	});
	return <ul>{checkBoxComponents}</ul>;
};
