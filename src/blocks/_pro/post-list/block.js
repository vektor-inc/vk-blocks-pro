/**
 * post-list block type
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RangeControl, PanelBody, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { InspectorControls } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { ServerSideRender } = wp.components;
const BlockIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="576"
    height="512"
    viewBox="0 0 576 512"
  >
    <g>
      <g>
        <path
          d="M269.4,390.8h196.4c7.1,0,12.8-5.9,12.8-12.8v-45.6c0-7.1-5.9-12.8-12.8-12.8H269.4c-7.1,0-12.8,5.9-12.8,12.8V378
				C256.6,384.9,262.5,390.8,269.4,390.8z"
        />
        <path
          d="M269.4,291.6h196.4c7.1,0,12.8-5.9,12.8-12.8v-45.6c0-7.1-5.9-12.8-12.8-12.8H269.4c-7.1,0-12.8,5.9-12.8,12.8v45.6
				C256.6,285.9,262.5,291.6,269.4,291.6z"
        />
        <path
          d="M269.4,192.5h196.4c7.1,0,12.8-5.9,12.8-12.8V134c0-7.1-5.9-12.8-12.8-12.8H269.4c-7.1,0-12.8,5.9-12.8,12.8v45.6
				C256.6,186.8,262.5,192.5,269.4,192.5z"
        />
        <path
          d="M110.2,390.8H211c7.1,0,12.8-5.9,12.8-12.8v-45.6c0-7.1-5.9-12.8-12.8-12.8H110.2c-7.1,0-12.8,5.9-12.8,12.8V378
				C97.4,384.9,103.3,390.8,110.2,390.8z"
        />
        <path
          d="M110.2,291.6H211c7.1,0,12.8-5.9,12.8-12.8v-45.6c0-7.1-5.9-12.8-12.8-12.8H110.2c-7.1,0-12.8,5.9-12.8,12.8v45.6
				C97.4,285.9,103.3,291.6,110.2,291.6z"
        />
        <path
          d="M110.2,192.5H211c7.1,0,12.8-5.9,12.8-12.8V134c0-7.1-5.9-12.8-12.8-12.8H110.2c-7.1,0-12.8,5.9-12.8,12.8v45.6
				C97.4,186.8,103.3,192.5,110.2,192.5z"
        />
      </g>
    </g>
    <path
      d="M528,32H48C21.5,32,0,53.5,0,80v352c0,26.5,21.5,48,48,48h480c26.5,0,48-21.5,48-48V80C576,53.5,554.5,32,528,32z M528,432
		H48V80h480V432z"
    />
  </svg>
);

import { schema } from "./schema";
import { DisplayItemsControl } from "../../../components/display-items-control";
import { ColumnLayoutControl } from "../../../components/column-layout-control";
import { AdvancedCheckboxControl } from "../../../components/advanced-checkbox-control";
import { usePostTypes, usePostTypeTaxonomies } from "../../../utils/hooks";

registerBlockType("vk-blocks/post-list", {
  title: __("Post list", "vk-blocks"),
  icon: BlockIcon,
  category: "vk-blocks-cat",
  attributes: schema,

  edit(props) {
    const {
      className,
      attributes,
      setAttributes,
      clientId,
      name,
      isSelected
    } = props;

    const {
      selectId,
      numberPosts,
      layout,
      col_xs,
      col_sm,
      col_md,
      col_lg,
      col_xl,
      display_image,
      display_image_overlay_term,
      display_excerpt,
      display_date,
      display_new,
      display_btn,
      new_date,
      new_text,
      btn_text,
      btn_align,
      isCheckedPostType,
      coreTerms,
      isCheckedTerms
    } = attributes;
    attributes["name"] = name;

    // if (name === "vk-blocks/post-list") {
    // let blockAttributes = select("core/editor").getBlockAttributes(clientId);
    let oldIsCheckedPostType;
    let oldTaxList;
    let oldTermsList;
    let oldCoreTerms;

    //   subscribe(() => {
    //     if (blockAttributes.isCheckedPostType !== oldIsCheckedPostType) {
    //       oldIsCheckedPostType = blockAttributes.isCheckedPostType;
    //       let taxList = getTaxonomyFromPostType(
    //         blockAttributes.isCheckedPostType
    //       );

    //       if (taxList !== oldTaxList) {
    //         oldTaxList = taxList;

    //         let termsList = getTermsFromTaxonomy(taxList);
    //         if (termsList !== oldTermsList) {
    //           oldTermsList = termsList;
    //           let coreTerms = JSON.stringify(termsList);

    //           if (coreTerms !== oldCoreTerms) {
    //             oldCoreTerms = coreTerms;
    //             setAttributes({ coreTerms: coreTerms });
    //           }
    //         }
    //       }
    //     }
    //   });
    // }

    let postTypesProps = usePostTypes().map(postType => {
      return {
        label: postType.name,
        slug: postType.slug
      };
    });
    // let taxonomies = usePostTypeTaxonomies();

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__("Display conditions", "vk-blocks")}
            initialOpen={false}
          >
            <BaseControl label={__("Filter by PostTypes", "vk-blocks")}>
              <AdvancedCheckboxControl
                schema={"isCheckedPostType"}
                rawData={postTypesProps}
                checkedData={JSON.parse(isCheckedPostType)}
                {...props}
              />
            </BaseControl>
            <BaseControl label={__("Filter by Taxonomy Terms", "vk-blocks")}>
              {/* {addCheckBox(argsTaxonomy())} */}
            </BaseControl>
            <BaseControl label={__("Number of Posts", "vk-blocks")}>
              <RangeControl
                value={numberPosts}
                onChange={value => setAttributes({ numberPosts: value })}
                min="1"
                max="24"
              />
            </BaseControl>
          </PanelBody>
          <ColumnLayoutControl {...attributes} />
          <DisplayItemsControl {...attributes} />
        </InspectorControls>
        <ServerSideRender block="vk-blocks/post-list" attributes={attributes} />
      </Fragment>
    );
  },

  save() {
    return null;
  }
});
