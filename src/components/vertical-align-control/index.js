const { __ } = wp.i18n;
const { PanelBody, BaseControl } = wp.components;
import { AlignControl } from "../align-control";
import { capitalize } from "../../blocks/_helper/capitalize";

export const VerticalAlignControls = (props) => {

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

		//ツールバーが1つ以上の時は、ラベルを表示
		if(props.keyArray.length > 1){
			return (
				<BaseControl key={ index } label={ __(`${capitalize(label)}`, "vk-blocks") }>
					<AlignControl schema={ schema } direction={"vertical"} { ...props } />
			</BaseControl>
			);
		}else{
			return (<AlignControl key={ index } schema={ schema } direction={"vertical"} { ...props } />);
		}
	};

	const alignControls = props.keyArray.map(createAlignControl);

  return (
	<PanelBody title={ __("Align", "vk-blocks") } initialOpen={ false }>
		{ alignControls }
	</PanelBody>
  );
};
