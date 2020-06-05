const { __ } = wp.i18n;
const { useState } = wp.element;
const { Toolbar } = wp.components;

export const AlignControl = props => {
  const { setAttributes, schema, initial, component,direction  } = props;
  const [activeControl, setActiveControl] = useState(initial);

  function createAlignControl(align) {

    return {
      icon: `editor-align${align}`,
      title: __(`Align ${align}`, "vk-blocks"),
      isActive: activeControl === align,
      onClick: () => {
        schema[component] = align;
        setAttributes({ activeControl: JSON.stringify(schema) });
        setActiveControl(align);
      }
		};
	}

	if(direction === "vertical"){
		return (
			<Toolbar controls={["top", "center", "bottom"].map(createAlignControl)} />
		);
	}else{
		return (
			<Toolbar controls={["left", "center", "right"].map(createAlignControl)} />
		);
	}
};
