/**
 * child-page block type
 *
 */


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
import BlockIcon from "./icon.svg";
const inserterVisible = hiddenNewBlock(5.3)

registerBlockType("vk-blocks/child-page", {
  title: __("Child page list", "vk-blocks"),
  icon: <BlockIcon />,
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
		attributes.name = name

		// Choice of This Page.
		let options = [ { label: __( "Current page", "vk-blocks" ), value: -1 } ];

		// Make choice list of pages
		if (pages !== undefined && pages !== null ) {
			const l = pages.length;
			const parents = []
			let i = 0
			for(i=0;i<l;i++) {
				if ( pages[i].parent !== 0 ) {
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

		// Remove choice of the page
		/*
		const currentPostId = select("core/editor").getCurrentPostId();
		if(currentPostId){
			options = options.filter(option => option.value !== currentPostId)
		}
		*/


    return (
	<Fragment>
		<InspectorControls>
			<PanelBody
				title={ __("Display conditions", "vk-blocks") }
				initialOpen={ false }
          >
				<BaseControl label={ __("Parent", "vk-blocks") }>
					<SelectControl
						value={ selectId }
						onChange={ (value) =>
                  setAttributes({ selectId: parseInt(value, 10) })
                }
						options={ options }
              />
				</BaseControl>
				<BaseControl>
					<CheckboxControl
						label={ __("Ignore this post", "vk-blocks") }
						checked={ selfIgnore }
						onChange={ (v) => setAttributes({ selfIgnore: v }) }
              />
				</BaseControl>
			</PanelBody>
			<ColumnLayoutControl { ...props } />
			<DisplayItemsControl { ...props } />
		</InspectorControls>
		<ServerSideRender
			block="vk-blocks/child-page"
			attributes={ attributes }
        />
	</Fragment>
    );
  }),
  save() {
    return null;
  },
});
