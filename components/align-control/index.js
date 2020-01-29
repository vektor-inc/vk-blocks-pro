const { ToggleControl } = wp.components;
const { useState } = wp.element;

export const AdvancedToggleControl = props => {
  const {
    initialFixedBackground,
    label,
    helpYes,
    helpNo,
    setAttributes
  } = props;
  const [hasFixedBackground, setHasFixedBackground] = useState(
    initialFixedBackground
  );

  return (
    <ToggleControl
      label={label}
      help={hasFixedBackground ? helpYes : helpNo}
      checked={hasFixedBackground}
      onChange={() => {
        setAttributes({ hasFixedBackground: !hasFixedBackground });
        setHasFixedBackground(!hasFixedBackground);
      }}
    />
  );
};

// const { __ } = wp.i18n;
// const { Toolbar } = wp.components;
// const { withState } = wp.compose;
// const { PanelBody, BaseControl } = wp.components;

// export const AlignControl = withState({
//   activeControl: "left"
// })(({ activeControl, setState }) => {
//   function createAlignControl(align) {
//     return {
//       icon: `editor-align${align}`,
//       title: __(`Align ${align}`, "vk-blocks"),
//       isActive: activeControl === align,
//       onClick: () => setState({ activeControl: align })
//     };
//   }
//   return (
//     <Toolbar controls={["left", "center", "right"].map(createAlignControl)} />
//   );
// });

// export default () => {
//   return (
//     <PanelBody title={__("Align", "vk-blocks")} initialOpen={false}>
//       <BaseControl label={__("Title", "vk-blocks")}>
//         <AlignControl />
//       </BaseControl>
//       <BaseControl label={__("Text", "vk-blocks")}>
//         <AlignControl />
//       </BaseControl>
//       <BaseControl label={__("Button", "vk-blocks")}>
//         <AlignControl />
//       </BaseControl>
//     </PanelBody>
//   );
// };
