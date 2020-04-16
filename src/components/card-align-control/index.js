const { __ } = wp.i18n;
const { PanelBody, BaseControl } = wp.components;
import { AlignControl } from "../align-control";
import { capitalize } from "../../blocks/_helper/capitalize";

export const CardAlignControls = (props) => {
  const { attributes } = props;
  const schema = JSON.parse(attributes.activeControl);

  const createAlignControl = (label, index) => {
    props = {
      ...props,
      ...{
        initial: schema[label],
      },
      ...{
        component: label,
      },
    };
    return (
      <BaseControl key={index} label={__(`${capitalize(label)}`, "vk-blocks")}>
        <AlignControl schema={schema} {...props} />
      </BaseControl>
    );
  };

  const alignControls = ["title", "text", "button"].map(createAlignControl);
  return (
    <PanelBody title={__("Align", "vk-blocks")} initialOpen={false}>
      {alignControls}
    </PanelBody>
  );
};
