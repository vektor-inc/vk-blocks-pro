/**
 * post-list block type
 *
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RangeControl, PanelBody, BaseControl, SelectControl, CheckboxControl, TextControl } = wp.components;
const { Fragment } = wp.element;
import { vkbBlockEditor, fixBrokenUnicode } from "../../_helper/depModules";
import { depServerSideRender } from "../../_helper/depModules";
const { InspectorControls } = vkbBlockEditor;
const ServerSideRender = depServerSideRender();
import { hiddenNewBlock } from "../../_helper/hiddenNewBlock"
import BlockIcon from "./icon.svg";
const inserterVisible = hiddenNewBlock(5.3);


import { schema } from "./schema";
import { DisplayItemsControl } from "../../../components/display-items-control";
import { ColumnLayoutControl } from "../../../components/column-layout-control";
import { AdvancedCheckboxControl } from "../../../components/advanced-checkbox-control";
import {
	usePostTypes,
	useTaxonomies,
	useTermsGroupbyTaxnomy
} from "../../../utils/hooks";
import { flat } from "../../../utils/multi-array-flaten";

registerBlockType("vk-blocks/post-list", {
	title: __("Post list", "vk-blocks"),
	icon: <BlockIcon />,
	category: "vk-blocks-cat",
	attributes: schema,
	supports: {
		inserter: inserterVisible
	},

	edit(props) {
		const { attributes, setAttributes, name } = props;

		const { numberPosts, isCheckedPostType, isCheckedTerms, offset, order, orderby, selfIgnore } = attributes;
		attributes.name = name;

		const postTypes = usePostTypes();
		const postTypesProps = postTypes.map(postType => {
			return {
				label: postType.name,
				slug: postType.slug
			};
		});

		const taxonomies = useTaxonomies();
		const terms = useTermsGroupbyTaxnomy(taxonomies);
		const taxonomiesPropsRaw = Object.keys(terms).map(function (taxonomy) {
			return this[taxonomy].map(term => {
				return {
					label: term.name,
					slug: term.id
				};
			});
		}, terms);
		const taxonomiesProps = flat(taxonomiesPropsRaw);

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __("Display conditions", "vk-blocks") }
						initialOpen={ false }
					>
						<BaseControl label={ __("Filter by PostTypes", "vk-blocks") }>
							<AdvancedCheckboxControl
								schema={ "isCheckedPostType" }
								rawData={ postTypesProps }
								checkedData={ JSON.parse( fixBrokenUnicode( isCheckedPostType) ) }
								{ ...props }
							/>
						</BaseControl>
						<BaseControl label={ __("Filter by Taxonomy Terms", "vk-blocks") }>
							<AdvancedCheckboxControl
								schema={ "isCheckedTerms" }
								rawData={ taxonomiesProps }
								checkedData={ JSON.parse( fixBrokenUnicode(isCheckedTerms) ) }
								{ ...props }
							/>
						</BaseControl>
						<BaseControl label={ __("Number of Posts", "vk-blocks") }>
							<RangeControl
								value={ numberPosts }
								onChange={ value => setAttributes({ numberPosts: value }) }
								min="1"
								max="100"
							/>
						</BaseControl>
						<BaseControl label={ __("Order", "vk-blocks") }>
							<SelectControl
								value={ order }
								onChange={ (v) => setAttributes({ order: v }) }
								options={
									[
										{ value: 'ASC', label: __("ASC", "vk-blocks") },
										{ value: 'DESC', label: __("DESC", "vk-blocks") }
									]
								}
							/>
						</BaseControl>
						<BaseControl label={ __("Order by", "vk-blocks") }>
							<SelectControl
								value={ orderby }
								onChange={ (v) => setAttributes({ orderby: v }) }
								options={
									[
										{ value: 'date', label: __("Published Date", "vk-blocks") },
										{ value: 'modified', label: __("Modefied Date", "vk-blocks") },
										{ value: 'title', label: __("Title", "vk-blocks") },
										{ value: 'rand', label: __("Random", "vk-blocks") }
									]
								}
							/>
						</BaseControl>
						<BaseControl label={ __("offset", "vk-blocks") }>
							<TextControl
								value={ offset }
								onChange={ (v) => setAttributes({ offset: parseInt(v,10) }) }
								type="number"
								min="0"
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
				<ServerSideRender block="vk-blocks/post-list" attributes={ attributes } />
			</Fragment>
		);
	},

	save() {
		return null;
	}
});
