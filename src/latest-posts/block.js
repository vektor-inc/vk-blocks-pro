/**
 * latest-posts block type
 *
 */
import addCheckBox from './checkbox';
import {schema} from './schema.js';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {RangeControl, PanelBody, BaseControl,TextControl, SelectControl,CheckboxControl} = wp.components;
const {Fragment} = wp.element;
const {InspectorControls} = wp.editor;
const BlockIcon = 'arrow-down';
const {withSelect, subscribe, select, dispatch} = wp.data;
const {ServerSideRender} = wp.components;

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('vk-blocks/latest-posts', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Latest Posts', 'vk-blocks'), // Block title.
    icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'vk-blocks-cat', // Block category —s Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: schema,

    /**
     * The edit function describes the structure of your block in the context of the editor.
     * This represents what the editor will render when the block is used.
     *
     * The "edit" property must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */

    edit: withSelect((select) => {

        return {
            postTypes: select('core').getPostTypes(),
        };
    })(({postTypes, className, attributes, setAttributes, clientId}) => {

        const {
            numberPosts,
            layout,
            col_xs,
            col_sm,
            col_md,
            col_lg,
            col_xl,
            display_excerpt,
            new_date,
            new_text,
            isCheckedPostType,
            coreTerms,
            isCheckedTerms
        } = attributes;

        /**
         * Check array is empty or not. If array is empty return true;
         * @returns {Boolean}
         */
        const isArrayEmpty = (array) => {
            return array === [];
        };

        const filterUnusedPostType = (postTypes) => {

            if (!Array.isArray(postTypes)) {
                return false;
            }
            return postTypes.filter(function (item) {
                return item.slug !== 'wp_block' && item.slug !== 'attachment';
            });
        };

        let argsPostTypes = {
            name: 'postTypes',
            originData: filterUnusedPostType(postTypes),
            checkedData: JSON.parse(isCheckedPostType),
            setAttributes: setAttributes
        };

        let argsTaxonomy = {
            name: 'taxonomy',
            originData: JSON.parse(coreTerms),
            checkedData: JSON.parse(isCheckedTerms),
            setAttributes: setAttributes
        };

        subscribe(() => {

            let blockAttributes = select("core/editor").getBlockAttributes(clientId);
            if (blockAttributes) {
                let newIsCheckedPostType = blockAttributes.isCheckedPostType;

                if (newIsCheckedPostType) {
                    let taxList = getTaxonomyFromPostType(newIsCheckedPostType);
                    let termsList = getTermsFromTaxonomy(taxList);

                    console.log(termsList);

                    setAttributes({coreTerms: JSON.stringify(termsList)});
                }
            }
        });

        /**
         * Get Taxonomies of checked postType. Return array of taxonomies.
         * @param isCheckedPostTypeArgs
         * @returns {boolean|*[]}
         */
        const getTaxonomyFromPostType = (isCheckedPostTypeArgs) => {

            if(isArrayEmpty(isCheckedPostTypeArgs)){
                return false;
            }

            let isCheckedPostType = JSON.parse(isCheckedPostTypeArgs);

            let returnTaxonomies = [];
            isCheckedPostType.forEach(postType => {

                let pt = select("core").getPostType(postType);
                let taxonomies = pt.taxonomies;

                taxonomies.forEach(item => {
                    returnTaxonomies.push(item);
                });
            });

            //重複を削除
            returnTaxonomies = returnTaxonomies.filter((x, i, self) => self.indexOf(x) === i);
            return returnTaxonomies;
        };

        /**
         * Get terms of given taxonomies. Return terms as `{taxonomySlug:[terms], ...}` format.
         * @param taxList
         * @returns {boolean|{}}
         */
        const getTermsFromTaxonomy = (taxList) => {

            if (!taxList) {
                return false;
            }

            let returnTerms = {};

            taxList.forEach(tax => {

                let terms = [];
                let taxData = select('core').getEntityRecords('taxonomy', tax);
                let returnTermsKey = Object.keys(returnTerms);

                if (taxData !== null) {

                    if (!returnTermsKey.includes(tax)) {

                        taxData.forEach(term => {
                            terms.push([term.slug, term.name]);
                            returnTerms[term.taxonomy] = terms;
                        })
                    } else {

                        delete returnTerms[tax];
                    }
                }
            });
            return returnTerms;
        };


        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Display type and layout', 'vk-blocks')}>
                        <BaseControl
                            label={__('Display type', 'vk-blocks')}
                        >
                            <SelectControl
                                value={layout}
                                onChange={(value) => setAttributes({layout: value})}
                                options={[
																	{
																		value: 'card',
																		label: __('Card', 'vk-blocks'),
																	},
																	{
																		value: 'media',
																		label: __('Media', 'vk-blocks'),
																	},
																	{
																		value: 'card-horizontal',
																		label: __('Card Horizontal', 'vk-blocks'),
																	},
                                ]}
                            />
                        </BaseControl>
												<BaseControl
														label={__('Column', 'vk-blocks') + ' ( min-width : 0px )'}
													>
													<RangeControl
														value={col_xs}
														onChange={(value) => setAttributes({col_xs: value})}
														min="1"
														max="4"
													/>
												</BaseControl>
												<BaseControl
														label={__('Column', 'vk-blocks') + ' ( min-width : 576px )'}
													>
													<RangeControl
														value={col_sm}
														onChange={(value) => setAttributes({col_sm: value})}
														min="1"
														max="4"
													/>
												</BaseControl>
												<BaseControl
														label={__('Column', 'vk-blocks') + ' ( min-width : 768px )'}
													>
													<RangeControl
														value={col_md}
														onChange={(value) => setAttributes({col_md: value})}
														min="1"
														max="4"
													/>
												</BaseControl>
												<BaseControl
														label={__('Column', 'vk-blocks') + ' ( min-width : 992px )'}
													>
													<RangeControl
														value={col_lg}
														onChange={(value) => setAttributes({col_lg: value})}
														min="1"
														max="4"
													/>
												</BaseControl>
												<BaseControl
														label={__('Column', 'vk-blocks') + ' ( min-width : 1200px )'}
													>
													<RangeControl
														value={col_xl}
														onChange={(value) => setAttributes({col_xl: value})}
														min="1"
														max="4"
													/>
												</BaseControl>
											</PanelBody>
											<PanelBody title={__('Display Post type and term', 'vk-blocks')}>
                        <BaseControl
                            label={__('Number of Posts', 'vk-blocks')}
                        >
                            <RangeControl
                                value={numberPosts}
                                onChange={(value) => setAttributes({numberPosts: value})}
                                min="1"
                                max="10"
                            />
                        </BaseControl>
                        <BaseControl
                            label={__('Filter by PostTypes', 'vk-blocks')}
                        >
                            {
                                addCheckBox(argsPostTypes)
                            }
                        </BaseControl>
                        <BaseControl
                            label={__('Filter by Taxonomy Terms', 'vk-blocks')}
                        >
                            {
                                addCheckBox(argsTaxonomy)
                            }
                        </BaseControl>
                    </PanelBody>
										<PanelBody title={__('Display item', 'vk-blocks')}>
											<CheckboxControl
													label={__('Excerpt', 'vk-blocks')}
													checked={display_excerpt}
													onChange={(checked) => setAttributes({display_excerpt: checked})}
											/>
											<TextControl
													label={__('Number of days to display the new post mark', 'vk-blocks')}
													value={new_date}
													onChange={(value) => setAttributes({new_date: value})}
													// placeholder={'Input button text.'}
											/>
											<TextControl
													label={__('New post mark', 'vk-blocks')}
													value={new_text}
													onChange={(value) => setAttributes({new_text: value})}
													// placeholder={'Input button text.'}
											/>
										</PanelBody>
                </InspectorControls>
                <div>
                    <ServerSideRender
                        block="vk-blocks/latest-posts"
                        attributes={attributes}
                    />
                </div>
            </Fragment>
        )
    }),

    /**
     * The save function define className }> which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    save() {
        return null;
    },
});
