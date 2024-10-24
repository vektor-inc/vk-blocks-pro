import { CheckboxControl } from '@wordpress/components';
import { destructiveDeleteFromArray } from '@vkblocks/utils/delete-from-array';

const advancedSetAttributes = (schema, saveData, setAttributes) => {
	setAttributes({ [schema]: JSON.stringify(saveData) });
};

export const AdvancedCheckboxControl = (props) => {
	const { schema, rawData, checkedData, setAttributes, saveState } = props;

	if (!rawData || !checkedData) {
		return false;
	}

	const checkBoxComponents = rawData.map((data) => {
		return (
			<CheckboxControl
				key={data.slug}
				label={data.label}
				checked={checkedData.some((item) => item === data.slug)}
				onChange={(value) => {
					if (value) {
						saveState(data.slug);
					} else {
						destructiveDeleteFromArray(checkedData, data.slug);
					}
					advancedSetAttributes.bind(
						null,
						schema,
						checkedData,
						setAttributes
					)();
				}}
			/>
		);
	});
	return <ul>{checkBoxComponents}</ul>;
};
