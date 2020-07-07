/**
 * child-page block type
 *
 */
const BlockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 576 512">
    <path
      d="M333.5,151.4l-85.6-0.1c-16.2,0-29.3-13.2-29.3-29.4l0.1-90.2c0-16.2,13.2-29.3,29.4-29.3l85.6,0.1
    c16.2,0,29.3,13.2,29.3,29.4l-0.1,90.2C362.8,138.3,349.7,151.4,333.5,151.4z"
    />
    <g>
      <path
        d="M177.8,301L49,300.9c-20.6,0-37.3,16.7-37.3,37.3l-0.1,134.7c0,20.6,16.7,37.3,37.3,37.4l128.8,0.1
        c20.6,0,37.3-16.7,37.3-37.3l0.1-134.7C215.1,317.8,198.4,301,177.8,301z M57.5,464.3l0.1-117.4L169,347v117.4L57.5,464.3z"
      />
      <path
        d="M532.7,301.3l-128.8-0.1c-20.6,0-37.3,16.7-37.3,37.3l-0.1,134.7c0,10,3.9,19.4,10.9,26.4c7,7.1,16.4,11,26.4,11l128.8,0.1
        c20.6,0,37.3-16.7,37.3-37.3l0.1-134.7C570,318.1,553.2,301.3,532.7,301.3z M412.4,464.6l0.1-117.4l111.4,0.1l-0.1,117.4
        L412.4,464.6z"
      />
    </g>
    <polygon
      points="308.7,206.7 308.8,169.1 272.8,169 272.7,206.7 92.1,206.5 92.1,279.2 128.1,279.2 128.1,242.5 453.4,242.9
    453.4,279.2 489.4,279.2 489.4,206.9 "
    />
  </svg>
);

const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { PanelBody, BaseControl, SelectControl, CheckboxControl } = wp.components
const { Fragment } = wp.element
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor
const { withSelect, select } = wp.data
import { depServerSideRender } from "../../_helper/depModules"
const ServerSideRender = depServerSideRender()
import { schema } from "./schema"
import { DisplayItemsControl } from "../../../components/display-items-control"
import { ColumnLayoutControl } from "../../../components/column-layout-control"
import { hiddenNewBlock } from "../../_helper/hiddenNewBlock"
const inserterVisible = hiddenNewBlock(5.3)

registerBlockType("vk-blocks/child-page", {
  title: __("Child page list", "vk-blocks"),
  icon: BlockIcon,
  category: "vk-blocks-cat",
  attributes: schema,
  supports: {
    inserter: inserterVisible
  },

  edit: withSelect((select) => {
    return {
      pages: select("core").getEntityRecords("postType", "page", {
        _embed: true,
        per_page: -1,
      }),
    };
  })((props) => {
    const { setAttributes, attributes, pages, name } = props;
    const { selectId, selfIgnore } = attributes
		attributes["name"] = name
		let options = [ { label: __( "This Page", "veu-block" ), value: -1 } ]

		if (pages != undefined) {
			const l = pages.length
			let parents = []
			let i = 0
			for(i=0;i<l;i++) {
				if ( pages[i].parent != 0 ) {
					parents.push(pages[i].parent)
				}
			}
			for(i=0; i < l;i++) {
				if ( parents.includes(pages[i].id) ) {
					options.push({
						label: pages[i].title.rendered,
						value: pages[i].id
					})
				}
			}
		}

		//このページのIDを重複しないよう削除
		let currentPostId = select("core/editor").getCurrentPostId();
		if(currentPostId){
			options = options.filter(option => option.value !== currentPostId)
		}

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__("Display conditions", "vk-blocks")}
            initialOpen={false}
          >
            <BaseControl label={__("Parent", "vk-blocks")}>
              <SelectControl
                value={selectId}
                onChange={(value) =>
                  setAttributes({ selectId: parseInt(value, 10) })
                }
                options={options}
              />
            </BaseControl>
            <BaseControl>
              <CheckboxControl
                label={__("Ignore this post", "vk-blocks")}
                checked={selfIgnore}
                onChange={(v) => setAttributes({ selfIgnore: v })}
              />
            </BaseControl>
          </PanelBody>
          <ColumnLayoutControl {...props} />
          <DisplayItemsControl {...props} />
        </InspectorControls>
        <ServerSideRender
          block="vk-blocks/child-page"
          attributes={attributes}
        />
      </Fragment>
    );
  }),
  save() {
    return null;
  },
});
