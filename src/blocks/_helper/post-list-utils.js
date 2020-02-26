const { __ } = wp.i18n;
const {
  PanelBody,
  BaseControl,
  TextControl,
  SelectControl,
  CheckboxControl
} = wp.components;

export const DisplayItems = props => {
  return (
    <PanelBody title={__("Display item", "vk-blocks")} initialOpen={false}>
      <CheckboxControl
        label={__("Image", "vk-blocks")}
        checked={props.display_image}
        onChange={checked => setAttributes({ display_image: checked })}
      />
      <CheckboxControl
        label={__("Term name", "vk-blocks")}
        checked={props.display_image_overlay_term}
        onChange={checked =>
          setAttributes({ display_image_overlay_term: checked })
        }
      />
      <CheckboxControl
        label={__("Excerpt", "vk-blocks")}
        checked={props.display_excerpt}
        onChange={checked => setAttributes({ display_excerpt: checked })}
      />
      <CheckboxControl
        label={__("Date", "vk-blocks")}
        checked={props.display_date}
        onChange={checked => setAttributes({ display_date: checked })}
      />

      <CheckboxControl
        label={__("New mark", "vk-blocks")}
        checked={props.display_new}
        onChange={checked => setAttributes({ display_new: checked })}
      />

      <CheckboxControl
        label={__("Button", "vk-blocks")}
        checked={props.display_btn}
        onChange={checked => setAttributes({ display_btn: checked })}
      />
      <h4>{__("New mark option", "vk-blocks")}</h4>
      <TextControl
        label={__("Number of days to display the new post mark", "vk-blocks")}
        value={props.new_date}
        onChange={value => setAttributes({ new_date: parseInt(value, 10) })}
      />
      <TextControl
        label={__("New post mark", "vk-blocks")}
        value={props.new_text}
        onChange={value => setAttributes({ new_text: value })}
      />
      <h4 className={"postList_itemCard_button-option"}>
        {__("Button option", "vk-blocks")}
      </h4>
      <p>
        {__(
          "Click each card block to set the target url. You can find the url form at it's sidebar.",
          "vk-blocks"
        )}
      </p>
      <TextControl
        label={__("Button text", "vk-blocks")}
        value={props.btn_text}
        onChange={value => setAttributes({ btn_text: value })}
      />
      <BaseControl label={__("Button align", "vk-blocks")}>
        <SelectControl
          value={props.btn_align}
          onChange={value => setAttributes({ btn_align: value })}
          options={[
            {
              value: "text-left",
              label: __("Left", "vk-blocks")
            },
            {
              value: "text-center",
              label: __("Center", "vk-blocks")
            },
            {
              value: "text-right",
              label: __("Right", "vk-blocks")
            }
          ]}
        />
      </BaseControl>
    </PanelBody>
  );
};

const setOptions = name => {
  options = {
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

  if (name === options[name]) {
    return options[name];
  } else {
    options["vk-blocks/else"];
  }
};

const defaultMinMax = {
  min: "1",
  max: "4"
};

export const SelectColumns = props => {
  return (
    <PanelBody
      title={__("Display type and columns", "vk-blocks")}
      initialOpen={false}
    >
      <BaseControl label={__("Display type", "vk-blocks")}>
        <SelectControl
          value={props.layout}
          onChange={value => setAttributes({ layout: value })}
          options={setOptions(props.name)}
        />
      </BaseControl>
      <BaseControl
        label={__("Column ( Screen size : Extra small )", "vk-blocks")}
      >
        <RangeControl
          value={props.col_xs}
          onChange={value => setAttributes({ col_xs: value })}
          min={defaultMinMax.min}
          max={defaultMinMax.max}
        />
      </BaseControl>
      <BaseControl label={__("Column ( Screen size : Small )", "vk-blocks")}>
        <RangeControl
          value={props.col_sm}
          onChange={value => setAttributes({ col_sm: value })}
          min={defaultMinMax.min}
          max={defaultMinMax.max}
        />
      </BaseControl>
      <BaseControl label={__("Column ( Screen size : Medium )", "vk-blocks")}>
        <RangeControl
          value={props.col_md}
          onChange={value => setAttributes({ col_md: value })}
          min={defaultMinMax.min}
          max={defaultMinMax.max}
        />
      </BaseControl>
      <BaseControl label={__("Column ( Screen size : Large )", "vk-blocks")}>
        <RangeControl
          value={props.col_lg}
          onChange={value => setAttributes({ col_lg: value })}
          min={defaultMinMax.min}
          max={defaultMinMax.max}
        />
      </BaseControl>
      <BaseControl
        label={__("Column ( Screen size : Extra large )", "vk-blocks")}
      >
        <RangeControl
          value={props.col_xl}
          onChange={value => setAttributes({ col_xl: value })}
          min={defaultMinMax.min}
          max={defaultMinMax.max}
        />
      </BaseControl>
    </PanelBody>
  );
};
