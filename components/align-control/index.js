const { __ } = wp.i18n;
const { Toolbar } = wp.components;
const { withState } = wp.compose;
const {
  PanelBody,
  BaseControl,
  TextControl,
  SelectControl,
  CheckboxControl
} = wp.components;

export const AlignControl = withState({
  activeControl: "left"
})(({ activeControl, setState }) => {
  function createAlignControl(align) {
    return {
      icon: `editor-align${align}`,
      title: __(`Align ${align}`, "vk-blocks"),
      isActive: activeControl === align,
      onClick: () => setState({ activeControl: align })
    };
  }
  return (
    <Toolbar controls={["left", "center", "right"].map(createAlignControl)} />
  );
});

export default () => {
  return (
    <PanelBody title={__("Align", "vk-blocks")} initialOpen={false}>
      <BaseControl label={__("Title", "vk-blocks")}>
        <AlignControl />
      </BaseControl>
      <BaseControl label={__("Text", "vk-blocks")}>
        <AlignControl />
      </BaseControl>
      <BaseControl label={__("Button", "vk-blocks")}>
        <AlignControl />
      </BaseControl>
    </PanelBody>
  );
};
