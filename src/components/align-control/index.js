const { __ } = wp.i18n;
const { useState } = wp.element;
const { Toolbar } = wp.components;

export const AlignControl = props => {
  const { setAttributes, schema, initial, component,direction  } = props;
  const [activeControl, setActiveControl] = useState(initial);

  function createAlignControl(align) {

    return {
			icon: smileIcon,
			// icon: `editor-align${align}`,
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


const smileIcon = wp.element.createElement('svg',
	{
		width: 512,
		height: 512
	},
	wp.element.createElement( 'path',
		{
			d: "M438.2,57H73.8c-7.7,0-14,7.2-14,16v32c0,8.8,6.3,16,14,16h364.5c7.7,0,14-7.2,14-16V73C452.2,64.2,446,57,438.2,57z"
		}
	),
	wp.element.createElement( 'path',
		{
			d: "M331.2,221.4l-67.3-67.3c-4.4-4.4-11.5-4.4-15.8,0l-67.2,67.3c-7,7-2.1,19.1,7.9,19.1H224v201.6c0,7.1,5.7,12.8,12.8,12.8	h38.3c7.1,0,12.8-5.7,12.8-12.8V240.6h35.2C333.3,240.6,338.2,228.4,331.2,221.4z"
		}
	)
);
