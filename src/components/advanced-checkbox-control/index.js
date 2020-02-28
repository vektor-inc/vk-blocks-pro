const { CheckboxControl } = wp.components;
const { useState } = wp.element;
import { destructiveDeleteFromArray } from "../../utils/delete-from-array";

export const AdvancedCheckboxControl = props => {
  const { schema, rawData, checkedData, setAttributes } = props;

  if (!rawData || !checkedData) return false;

  const [checkedState, setCheckedState] = useState(checkedData);

  const advancedSetAttributes = (schema, saveData) => {
    setAttributes({ [schema]: JSON.stringify(saveData) });
  };

  let checkBoxComponents = rawData.map(data => {
    return (
      <CheckboxControl
        label={data.label}
        checked={checkedState.some(item => item === data.slug)}
        onChange={value => {
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
