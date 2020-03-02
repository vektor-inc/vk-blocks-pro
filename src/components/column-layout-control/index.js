const { __ } = wp.i18n;
const { RangeControl, PanelBody, BaseControl, SelectControl } = wp.components;

const setOptions = name => {
  const options = {
    "vk-blocks/card": [
      {
        value: "card",
        label: __("Card", "vk-blocks")
      },
      {
        value: "card-noborder",
        label: __("Card ( No border )", "vk-blocks")
      }
    ],
    "vk-blocks/else": [
      {
        value: "card",
        label: __("Card", "vk-blocks")
      },
      {
        value: "card-horizontal",
        label: __("Card Horizontal", "vk-blocks")
      },
      {
        value: "media",
        label: __("Media", "vk-blocks")
      }
    ]
  };

  if (name === "vk-blocks/card") {
    return options[name];
  } else {
    return options["vk-blocks/else"];
  }
};

const defaultMinMax = {
  min: "1",
  max: "4"
};

export const ColumnLayoutControl = props => {
  const { setAttributes, attributes } = props;
  const { layout, name, col_xs, col_sm, col_md, col_lg, col_xl } = attributes;
  console.log(name);
  return (
    <PanelBody
      title={__("Display type and columns", "vk-blocks")}
      initialOpen={false}
    >
      <BaseControl label={__("Display type", "vk-blocks")}>
        <SelectControl
          value={layout}
          onChange={value => setAttributes({ layout: value })}
          options={setOptions(name)}
        />
      </BaseControl>
      <BaseControl
        label={__("Column ( Screen size : Extra small )", "vk-blocks")}
      >
        <RangeControl
          value={col_xs}
          onChange={value => setAttributes({ col_xs: value })}
          min={defaultMinMax.min}
          max={defaultMinMax.max}
        />
      </BaseControl>
      <BaseControl label={__("Column ( Screen size : Small )", "vk-blocks")}>
        <RangeControl
          value={col_sm}
          onChange={value => setAttributes({ col_sm: value })}
          min={defaultMinMax.min}
          max={defaultMinMax.max}
        />
      </BaseControl>
      <BaseControl label={__("Column ( Screen size : Medium )", "vk-blocks")}>
        <RangeControl
          value={col_md}
          onChange={value => setAttributes({ col_md: value })}
          min={defaultMinMax.min}
          max={defaultMinMax.max}
        />
      </BaseControl>
      <BaseControl label={__("Column ( Screen size : Large )", "vk-blocks")}>
        <RangeControl
          value={col_lg}
          onChange={value => setAttributes({ col_lg: value })}
          min={defaultMinMax.min}
          max={defaultMinMax.max}
        />
      </BaseControl>
      <BaseControl
        label={__("Column ( Screen size : Extra large )", "vk-blocks")}
      >
        <RangeControl
          value={col_xl}
          onChange={value => setAttributes({ col_xl: value })}
          min={defaultMinMax.min}
          max={defaultMinMax.max}
        />
      </BaseControl>
    </PanelBody>
  );
};
