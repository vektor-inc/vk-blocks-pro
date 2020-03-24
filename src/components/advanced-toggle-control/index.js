const { ToggleControl } = wp.components;
const { useState } = wp.element;

export const AdvancedToggleControl = props => {
  const {
    initialFixedTable,
    label,
    helpYes,
    helpNo,
    schema,
    setAttributes,
    jsonKey
  } = props;

  console.log(props);

  const [hasFixedTable, setHasFixedTable] = useState(initialFixedTable);
  return (
    <ToggleControl
      label={label}
      help={hasFixedTable ? helpYes : helpNo}
      checked={hasFixedTable}
      onChange={() => {
        setHasFixedTable(!hasFixedTable);

        if (saveAsJson && initialFixedTable[jsonKey]) {
          lodash.assign(initialFixedTable, {
            [jsonKey]: !hasFixedTable
          });
          setAttributes({ [schema]: JSON.stringify(initialFixedTable) });
        } else {
          setAttributes({ [schema]: !hasFixedTable });
        }
      }}
    />
  );
};
