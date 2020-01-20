/**
 * post-list block type
 *
 */
const { __ } = wp.i18n;
const {
  RangeControl,
  PanelBody,
  BaseControl,
  TextControl,
  SelectControl,
  CheckboxControl
} = wp.components;
const { Fragment } = wp.element;
const { InspectorControls, URLInput } =
  wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
<<<<<<< HEAD
const { subscribe, select } = wp.data;
=======
const { subscribe, select, dispatch } = wp.data;
>>>>>>> develop
const { ServerSideRender } = wp.components;
import addCheckBox from "./checkbox";

export class PostList extends React.Component {
  render() {
    const {
      postTypes,
<<<<<<< HEAD
      className,
      attributes,
      setAttributes,
      clientId,
      name,
      isSelected
    } = this.props.value;

    const {
      url,
=======
      attributes,
      setAttributes,
      clientId,
      name
    } = this.props.value;

    const {
      selectId,
>>>>>>> develop
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
<<<<<<< HEAD

    attributes["name"] = name;
    attributes["postId"] = select("core/editor").getCurrentPostId();
=======
    attributes["name"] = name;
>>>>>>> develop

    /**
     * Check array is empty or not. If array is empty return true;
     * @returns {Boolean}
     */
    const isArrayEmpty = array => {
      return array === [];
    };

    const filterUnusedPostType = postTypes => {
      if (!Array.isArray(postTypes)) {
        return false;
      }
      return postTypes.filter(function(item) {
        return item.slug !== "wp_block" && item.slug !== "attachment";
      });
    };
<<<<<<< HEAD

    let argsPostTypes = {
      name: "postTypes",
      originData: filterUnusedPostType(postTypes),
      checkedData: JSON.parse(isCheckedPostType),
      setAttributes: setAttributes
    };

    let argsTaxonomy = {
      name: "taxonomy",
      originData: JSON.parse(coreTerms),
      checkedData: JSON.parse(isCheckedTerms),
      setAttributes: setAttributes
    };

    let blockAttributes = select("core/editor").getBlockAttributes(clientId);
    let oldIsCheckedPostType;
    let oldTaxList;
    let oldTermsList;
    let oldCoreTerms;

    subscribe(() => {
      if (blockAttributes.isCheckedPostType !== oldIsCheckedPostType) {
        oldIsCheckedPostType = blockAttributes.isCheckedPostType;
        let taxList = getTaxonomyFromPostType(
          blockAttributes.isCheckedPostType
        );

        if (taxList !== oldTaxList) {
          oldTaxList = taxList;

          let termsList = getTermsFromTaxonomy(taxList);
          if (termsList !== oldTermsList) {
            oldTermsList = termsList;
            let coreTerms = JSON.stringify(termsList);

            if (coreTerms !== oldCoreTerms) {
              oldCoreTerms = coreTerms;
              setAttributes({ coreTerms: coreTerms });
            }
          }
        }
      }
    });
=======
    const argsPostTypes = () => {
      return {
        name: "postTypes",
        originData: filterUnusedPostType(postTypes),
        checkedData: JSON.parse(isCheckedPostType),
        setAttributes: setAttributes
      };
    };

    const argsTaxonomy = () => {
      return {
        name: "taxonomy",
        originData: JSON.parse(coreTerms),
        checkedData: JSON.parse(isCheckedTerms),
        setAttributes: setAttributes
      };
    };

    if (name === "vk-blocks/post-list") {
      let blockAttributes = select("core/editor").getBlockAttributes(clientId);
      let oldIsCheckedPostType;
      let oldTaxList;
      let oldTermsList;
      let oldCoreTerms;

      subscribe(() => {
        if (blockAttributes.isCheckedPostType !== oldIsCheckedPostType) {
          oldIsCheckedPostType = blockAttributes.isCheckedPostType;
          let taxList = getTaxonomyFromPostType(
            blockAttributes.isCheckedPostType
          );

          if (taxList !== oldTaxList) {
            oldTaxList = taxList;

            let termsList = getTermsFromTaxonomy(taxList);
            if (termsList !== oldTermsList) {
              oldTermsList = termsList;
              let coreTerms = JSON.stringify(termsList);

              if (coreTerms !== oldCoreTerms) {
                oldCoreTerms = coreTerms;
                setAttributes({ coreTerms: coreTerms });
              }
            }
          }
        }
      });
    }
>>>>>>> develop

    /**
     * Get Taxonomies of checked postType. Return array of taxonomies.
     * @param isCheckedPostTypeArgs
     * @returns {boolean|*[]}
     */
    const getTaxonomyFromPostType = isCheckedPostTypeArgs => {
      if (isArrayEmpty(isCheckedPostTypeArgs)) {
        return false;
      }

      let isCheckedPostType = JSON.parse(isCheckedPostTypeArgs);

      let returnTaxonomies = [];
      isCheckedPostType.forEach(postType => {
        let pt = select("core").getPostType(postType);

        if (pt !== undefined) {
          let taxonomies = pt.taxonomies;

          taxonomies.forEach(item => {
            returnTaxonomies.push(item);
          });
        }
      });

<<<<<<< HEAD
      //重複を削除
=======
      //驥崎､�ｒ蜑企勁
>>>>>>> develop
      returnTaxonomies = returnTaxonomies.filter(
        (x, i, self) => self.indexOf(x) === i
      );
      return returnTaxonomies;
    };

    /**
     * Get terms of given taxonomies. Return terms as `{taxonomySlug:[terms], ...}` format.
     * @param taxList
     * @returns {boolean|{}}
     */
    const getTermsFromTaxonomy = taxList => {
      if (!taxList) {
        return false;
      }

      let returnTerms = {};

      taxList.forEach(tax => {
        let terms = [];
        let taxData = select("core").getEntityRecords("taxonomy", tax);
        let returnTermsKey = Object.keys(returnTerms);

        if (taxData !== null) {
          if (!returnTermsKey.includes(tax)) {
            taxData.forEach(term => {
              terms.push([term.slug, term.name]);
              returnTerms[term.taxonomy] = terms;
            });
          } else {
            delete returnTerms[tax];
          }
        }
      });
      return returnTerms;
    };

<<<<<<< HEAD
    const renderConditions = (
      <PanelBody
        title={__("Display conditions", "vk-blocks")}
        initialOpen={false}
      >
        <BaseControl label={__("Filter by PostTypes", "vk-blocks")}>
          {addCheckBox(argsPostTypes)}
        </BaseControl>
        <BaseControl label={__("Filter by Taxonomy Terms", "vk-blocks")}>
          {addCheckBox(argsTaxonomy)}
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
    );

    const renderConditionsUrlInput = (
      <PanelBody
        title={__("Display conditions", "vk-blocks")}
        initialOpen={false}
      >
        <BaseControl label={__("Parent", "vk-blocks")}>
          <URLInput
            value={url}
            autoFocus={false}
            onChange={value => setAttributes({ url: value })}
            disableSuggestions={!isSelected}
            isFullWidth
            hasBorder
          />
        </BaseControl>
      </PanelBody>
    );

    const renderTypeSwitch = name => {
      if (name === "vk-blocks/card") {
        return (
=======
    const renderConditions = () => {
      return (
        <PanelBody
          title={__("Display conditions", "vk-blocks")}
          initialOpen={false}
        >
          <BaseControl label={__("Filter by PostTypes", "vk-blocks")}>
            {addCheckBox(argsPostTypes())}
          </BaseControl>
          <BaseControl label={__("Filter by Taxonomy Terms", "vk-blocks")}>
            {addCheckBox(argsTaxonomy())}
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
      );
    };

    const filterParents = pages => {
      return pages.filter(page => {
        if (page.parent === 0) {
          return true;
        }
        return false;
      });
    };

    const filterChildren = pages => {
      return pages.filter(page => {
        if (page.parent !== 0) {
          return true;
        }
        return false;
      });
    };

    const formatPulldonwOrder = parents => {
      let label;
      return parents.map(page => {
        if (page.parent !== 0) {
          label = " - " + page.title.rendered + "(Child Page)";
        } else {
          label = page.title.rendered;
        }
        return {
          value: page.id,
          label: __(label, "vk-blocks")
        };
      });
    };

    let renderPages = pages => {
      if (pages) {
        //隕ｪ繝壹�繧ｸ繧呈歓蜃ｺ
        let parents = filterParents(pages);

        //蟄舌�繝ｼ繧ｸ繧呈歓蜃ｺ
        let children = filterChildren(pages);

        //隕ｪ繝壹�繧ｸ縺ｮ逶ｴ蠕後↓蟄舌�繝ｼ繧ｸ縺梧諺蜈･縺輔ｌ縺滄�蛻励ｒ逕滓�
        children.forEach(child => {
          const index = parents.findIndex(parent => parent.id === child.parent);
          if (index !== -1) {
            parents.splice(index, 0, child);
          } else {
            parents.push(child);
          }
        });

        //鬆�分繧貞渚蟇ｾ縺ｫ
        parents.reverse();

        //繝励Ν繝繧ｦ繝ｳ繝｡繝九Η繝ｼ逕ｨ縺ｫ繝輔か繝ｼ繝槭ャ繝�
        let formated = formatPulldonwOrder(parents);

        let defaultOption = [
          {
            value: 0,
            label: __("Exsist Already Page", "vk-blocks")
          }
        ];
        let currentPageId = select("core/editor").getCurrentPostId();
        let isCurrentPageCreated = pages.find(
          page => page.id === currentPageId
        );

        //譁ｰ隕上�繝ｼ繧ｸ縺ｫ繝悶Ο繝�け霑ｽ蜉�譎� or 譌｢蟄倥�繝ｼ繧ｸ縺ｫ繝悶Ο繝�け霑ｽ蜉�譎�
        if (
          (isCurrentPageCreated === undefined && selectId === undefined) ||
          selectId === undefined ||
          (isCurrentPageCreated === undefined && currentPageId === selectId)
        ) {
          setAttributes({ selectId: currentPageId });
          //繝�ヵ繧ｩ繝ｫ繝医が繝励す繝ｧ繝ｳ
          defaultOption = [
            {
              value: currentPageId,
              label: __("Current Page", "vk-blocks")
            }
          ];
          formated = defaultOption.concat(formated);
        }
        return formated;
      }
    };

    const renderConditionsUrlInput = () => {
      return (
        <PanelBody
          title={__("Display conditions", "vk-blocks")}
          initialOpen={false}
        >
          <BaseControl label={__("Parent", "vk-blocks")}>
            <SelectControl
              value={selectId}
              onChange={value =>
                setAttributes({ selectId: parseInt(value, 10) })
              }
              options={renderPages(postTypes)}
            />
          </BaseControl>
        </PanelBody>
      );
    };

    const renderTypeColumn = () => {
      return (
        <PanelBody
          title={__("Display type and columns", "vk-blocks")}
          initialOpen={false}
        >
>>>>>>> develop
          <BaseControl label={__("Display type", "vk-blocks")}>
            <SelectControl
              value={layout}
              onChange={value => setAttributes({ layout: value })}
              options={[
                {
                  value: "card",
                  label: __("Card", "vk-blocks")
<<<<<<< HEAD
=======
                },
                {
                  value: "card-horizontal",
                  label: __("Card Horizontal", "vk-blocks")
                },
                {
                  value: "media",
                  label: __("Media", "vk-blocks")
>>>>>>> develop
                }
              ]}
            />
          </BaseControl>
<<<<<<< HEAD
        );
      } else {
        return (
          <BaseControl label={__("Display type", "vk-blocks")}>
            <SelectControl
              value={layout}
              onChange={value => setAttributes({ layout: value })}
              options={[
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
=======
          <BaseControl
            label={__("Column ( Screen size : Extra small )", "vk-blocks")}
          >
            <RangeControl
              value={col_xs}
              onChange={value => setAttributes({ col_xs: value })}
              min="1"
              max="4"
            />
          </BaseControl>
          <BaseControl
            label={__("Column ( Screen size : Small )", "vk-blocks")}
          >
            <RangeControl
              value={col_sm}
              onChange={value => setAttributes({ col_sm: value })}
              min="1"
              max="4"
            />
          </BaseControl>
          <BaseControl
            label={__("Column ( Screen size : Medium )", "vk-blocks")}
          >
            <RangeControl
              value={col_md}
              onChange={value => setAttributes({ col_md: value })}
              min="1"
              max="4"
            />
          </BaseControl>
          <BaseControl
            label={__("Column ( Screen size : Large )", "vk-blocks")}
          >
            <RangeControl
              value={col_lg}
              onChange={value => setAttributes({ col_lg: value })}
              min="1"
              max="4"
            />
          </BaseControl>
          <BaseControl
            label={__("Column ( Screen size : Extra large )", "vk-blocks")}
          >
            <RangeControl
              value={col_xl}
              onChange={value => setAttributes({ col_xl: value })}
              min="1"
              max="4"
            />
          </BaseControl>
        </PanelBody>
      );
    };

    const renderItem = () => {
      return (
        <PanelBody title={__("Display item", "vk-blocks")} initialOpen={false}>
          <CheckboxControl
            label={__("Image", "vk-blocks")}
            checked={display_image}
            onChange={checked => setAttributes({ display_image: checked })}
          />
          <CheckboxControl
            label={__("Term name", "vk-blocks")}
            checked={display_image_overlay_term}
            onChange={checked =>
              setAttributes({ display_image_overlay_term: checked })
            }
          />
          <CheckboxControl
            label={__("Excerpt", "vk-blocks")}
            checked={display_excerpt}
            onChange={checked => setAttributes({ display_excerpt: checked })}
          />
          <CheckboxControl
            label={__("Date", "vk-blocks")}
            checked={display_date}
            onChange={checked => setAttributes({ display_date: checked })}
          />

          <CheckboxControl
            label={__("New mark", "vk-blocks")}
            checked={display_new}
            onChange={checked => setAttributes({ display_new: checked })}
          />

          <CheckboxControl
            label={__("Button", "vk-blocks")}
            checked={display_btn}
            onChange={checked => setAttributes({ display_btn: checked })}
          />
          <h4>{__("New mark option", "vk-blocks")}</h4>
          <TextControl
            label={__(
              "Number of days to display the new post mark",
              "vk-blocks"
            )}
            value={new_date}
            onChange={value => setAttributes({ new_date: parseInt(value, 10) })}
          />
          <TextControl
            label={__("New post mark", "vk-blocks")}
            value={new_text}
            onChange={value => setAttributes({ new_text: value })}
            // placeholder={'Input button text.'}
          />
          <h4>{__("Button option", "vk-blocks")}</h4>
          <TextControl
            label={__("Button text", "vk-blocks")}
            value={btn_text}
            onChange={value => setAttributes({ btn_text: value })}
            // placeholder={'Input button text.'}
          />
          <BaseControl label={__("Button align", "vk-blocks")}>
            <SelectControl
              value={btn_align}
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
>>>>>>> develop
                }
              ]}
            />
          </BaseControl>
<<<<<<< HEAD
        );
      }
    };

    const renderTypeColumn = (
      <PanelBody
        title={__("Display type and columns", "vk-blocks")}
        initialOpen={false}
      >
        {renderTypeSwitch(name)}
        <BaseControl
          label={__("Column ( Screen size : Extra small )", "vk-blocks")}
        >
          <RangeControl
            value={col_xs}
            onChange={value => setAttributes({ col_xs: value })}
            min="1"
            max="4"
          />
        </BaseControl>
        <BaseControl label={__("Column ( Screen size : Small )", "vk-blocks")}>
          <RangeControl
            value={col_sm}
            onChange={value => setAttributes({ col_sm: value })}
            min="1"
            max="4"
          />
        </BaseControl>
        <BaseControl label={__("Column ( Screen size : Medium )", "vk-blocks")}>
          <RangeControl
            value={col_md}
            onChange={value => setAttributes({ col_md: value })}
            min="1"
            max="4"
          />
        </BaseControl>
        <BaseControl label={__("Column ( Screen size : Large )", "vk-blocks")}>
          <RangeControl
            value={col_lg}
            onChange={value => setAttributes({ col_lg: value })}
            min="1"
            max="4"
          />
        </BaseControl>
        <BaseControl
          label={__("Column ( Screen size : Extra large )", "vk-blocks")}
        >
          <RangeControl
            value={col_xl}
            onChange={value => setAttributes({ col_xl: value })}
            min="1"
            max="4"
          />
        </BaseControl>
      </PanelBody>
    );

    const renderItem = (
      <PanelBody title={__("Display item", "vk-blocks")} initialOpen={false}>
        <CheckboxControl
          label={__("Image", "vk-blocks")}
          checked={display_image}
          onChange={checked => setAttributes({ display_image: checked })}
        />
        <CheckboxControl
          label={__("Term name", "vk-blocks")}
          checked={display_image_overlay_term}
          onChange={checked =>
            setAttributes({ display_image_overlay_term: checked })
          }
        />
        <CheckboxControl
          label={__("Excerpt", "vk-blocks")}
          checked={display_excerpt}
          onChange={checked => setAttributes({ display_excerpt: checked })}
        />
        <CheckboxControl
          label={__("Date", "vk-blocks")}
          checked={display_date}
          onChange={checked => setAttributes({ display_date: checked })}
        />

        <CheckboxControl
          label={__("New mark", "vk-blocks")}
          checked={display_new}
          onChange={checked => setAttributes({ display_new: checked })}
        />

        <CheckboxControl
          label={__("Button", "vk-blocks")}
          checked={display_btn}
          onChange={checked => setAttributes({ display_btn: checked })}
        />
        <h4>{__("New mark option", "vk-blocks")}</h4>
        <TextControl
          label={__("Number of days to display the new post mark", "vk-blocks")}
          value={new_date}
          onChange={value => setAttributes({ new_date: value })}
          // placeholder={'Input button text.'}
        />
        <TextControl
          label={__("New post mark", "vk-blocks")}
          value={new_text}
          onChange={value => setAttributes({ new_text: value })}
          // placeholder={'Input button text.'}
        />
        <h4>{__("Button option", "vk-blocks")}</h4>
        <TextControl
          label={__("Button text", "vk-blocks")}
          value={btn_text}
          onChange={value => setAttributes({ btn_text: value })}
          // placeholder={'Input button text.'}
        />
        <BaseControl label={__("Button align", "vk-blocks")}>
          <SelectControl
            value={btn_align}
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

    const renderItemCard = (
      <PanelBody title={__("Display item", "vk-blocks")} initialOpen={false}>
        <CheckboxControl
          label={__("Image", "vk-blocks")}
          checked={display_image}
          onChange={checked => setAttributes({ display_image: checked })}
        />
        <CheckboxControl
          label={__("Excerpt", "vk-blocks")}
          checked={display_excerpt}
          onChange={checked => setAttributes({ display_excerpt: checked })}
        />
        <CheckboxControl
          label={__("Button", "vk-blocks")}
          checked={display_btn}
          onChange={checked => setAttributes({ display_btn: checked })}
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
          value={btn_text}
          onChange={value => setAttributes({ btn_text: value })}
        />
        <BaseControl label={__("Button align", "vk-blocks")}>
          <SelectControl
            value={btn_align}
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

=======
        </PanelBody>
      );
    };

>>>>>>> develop
    return (
      <Fragment>
        <InspectorControls>
          {(() => {
<<<<<<< HEAD
            if (name === "vk-blocks/child-page") {
              return (
                <div>
                  {renderConditionsUrlInput}
                  {renderTypeColumn}
                  {renderItem}
                </div>
              );
            } else if (name === "vk-blocks/card") {
              return (
                <div>
                  {renderTypeColumn}
                  {renderItemCard}
                </div>
              );
            } else {
              return (
                <div>
                  {renderConditions}
                  {renderTypeColumn}
                  {renderItem}
=======
            if (name === "vk-blocks/post-list") {
              return (
                <div>
                  {renderConditions()}
                  {renderTypeColumn()}
                  {renderItem()}
                </div>
              );
            } else if (name === "vk-blocks/child-page") {
              return (
                <div>
                  {renderConditionsUrlInput()}
                  {renderTypeColumn()}
                  {renderItem()}
>>>>>>> develop
                </div>
              );
            }
          })()}
        </InspectorControls>
        <div>
          {(() => {
<<<<<<< HEAD
            if (name === "vk-blocks/child-page") {
              return (
                <ServerSideRender
                  block="vk-blocks/child-page"
                  attributes={attributes}
                />
              );
            } else if (name === "vk-blocks/card") {
            } else {
              return (
                <ServerSideRender
                  block="vk-blocks/post-list"
=======
            if (name === "vk-blocks/post-list") {
              return (
                <ServerSideRender
                  block="vk-blocks/post-list"
                  attributes={attributes}
                />
              );
            } else if (name === "vk-blocks/child-page") {
              return (
                <ServerSideRender
                  block="vk-blocks/child-page"
>>>>>>> develop
                  attributes={attributes}
                />
              );
            }
          })()}
        </div>
      </Fragment>
    );
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> develop
