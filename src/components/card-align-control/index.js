const { __ } = wp.i18n;
const { PanelBody, BaseControl } = wp.components;
import { AlignControl } from "../align-control";
import { capitalize } from "../../blocks/_helper/capitalize";

export const CardAlignControls = props => {
  const { attributes } = props;
  const shema = JSON.parse(attributes.activeControl);
  props.schema = shema;

  const createAlignControl = label => {
    props.initial = shema[label];
    props.component = label;
    return (
      <BaseControl label={__(`${capitalize(label)}`, "vk-blocks")}>
        <AlignControl {...props} />
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
