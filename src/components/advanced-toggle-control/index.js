const { ToggleControl } = wp.components;
const { useState } = wp.element;

export const AdvancedToggleControl = props => {
  const {
    initialFixedTable,
    label,
    helpYes,
    helpNo,
    hidden,
    setAttributes
  } = props;
  const [hasFixedTable, setHasFixedTable] = useState(initialFixedTable);

  return (
    <ToggleControl
      label={label}
      help={hasFixedTable ? helpYes : helpNo}
      checked={hasFixedTable}
      onChange={() => {
        setAttributes({ [hidden]: !hasFixedTable });
        setHasFixedTable(!hasFixedTable);
      }}
    />
  );
};
