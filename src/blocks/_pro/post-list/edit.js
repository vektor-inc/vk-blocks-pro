// import WordPress Scripts
import { __, sprintf } from '@wordpress/i18n';
import {
	RangeControl,
	PanelBody,
	BaseControl,
	SelectControl,
	CheckboxControl,
	TextControl,
	FormToggle,
	FormTokenField,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

// Load VK Blocks Utils
import {
	usePostTypes,
	useTerms,
	useTaxonomies,
	useTermsGroupbyTaxnomy,
} from '@vkblocks/utils/hooks';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';

// Load VK Blocks Compornents
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';
import { AdvancedCheckboxControl } from '@vkblocks/components/advanced-checkbox-control';

export default function PostListEdit(props) {
	const { attributes, setAttributes, name } = props;
	const {
		numberPosts,
		isCheckedPostType,
		isCheckedTerms,
		offset,
		order,
		orderby,
		selfIgnore,
	} = attributes;
	attributes.name = name;

	const [isCheckedTermsData, setIsCheckedTermsData] = useState(
		JSON.parse(fixBrokenUnicode(isCheckedTerms))
	);
	const [isCheckedPostTypeData, setIsCheckedPostTypeData] = useState(
		JSON.parse(fixBrokenUnicode(isCheckedPostType))
	);
	



	const saveStateTerms = (termId) => {
		isCheckedTermsData.push(termId);
		setIsCheckedTermsData(isCheckedTermsData);
	};

	const saveStatePostTypes = (slug) => {
		isCheckedPostTypeData.push(slug);
		setIsCheckedPostTypeData(isCheckedPostTypeData);
	};

	const postTypes = usePostTypes();
	let postTypesProps = postTypes.map((postType) => {
		return {
			label: postType.name,
			slug: postType.slug,
		};
	});
	// メディアと再利用ブロックを除外
	postTypesProps = postTypesProps.filter(
		(postType) =>
			'attachment' !== postType.slug && 'wp_block' !== postType.slug
	);

	const taxonomies = useTaxonomies();

	// タクソノミー名をキーとしたタームの一覧
	const termsByTaxonomyName = useTerms('rest_base', taxonomies);

	const replaceIsCheckedTermData = (termIds, termName, newIds) => {
		
		const removedTermIds = termIds.filter( termId => {
			let find = false;
			termsByTaxonomyName[termName].forEach(term => {
				if (term.id == termId) {
					find = true;
				}
			})
			return !find;
		});
		

		return removedTermIds.concat(newIds);
	}


	const termControls = taxonomies.map(function (
		taxonomy,
		index
	) {

		if ( ! termsByTaxonomyName[taxonomy.rest_base]) {
			return null;
		}

		
		const termsMapByName = termsByTaxonomyName[taxonomy.rest_base].reduce((acc, term) => {
			return {
				...acc,
				[ term.name ]: term
			}
		}, {});
		const termsMapById = termsByTaxonomyName[taxonomy.rest_base].reduce((acc, term) => {
			return {
				...acc,
				[ term.id ]: term
			}
		}, {});
		




		//console.log(termsMapById);

		const termNames = termsByTaxonomyName[taxonomy.rest_base].map((term) => {
			console.log(term.name);
			return term.name
		});

		return termsByTaxonomyName[taxonomy.rest_base] && termsByTaxonomyName[taxonomy.rest_base].length > 0 ? (
			<FormTokenField
				key={taxonomy.rest_base}
				label={taxonomy.labels.name}
				value={isCheckedTermsData.filter( termId => {
					return termId in termsMapById;
				}).map( termId => {
					if (termId in termsMapById) {
						return termsMapById[termId].name;
					}
				})}
				suggestions={termNames}
				onChange={ (newTerms) => {
					const termIds = newTerms.map( termName => {
						return termsMapByName[termName].id;
					})
					setIsCheckedTermsData(replaceIsCheckedTermData(isCheckedTermsData, taxonomy.rest_base, termIds));
				}}
				
			></FormTokenField>
		) : null;
	},
	taxonomies);

	// key を BaseControlのlabelに代入。valueの配列をmapでAdvancedCheckboxControlに渡す
	const taxonomiesCheckBox = Object.keys(termsByTaxonomyName).map(function (
		taxonomy,
		index
	) {
		const taxonomiesProps = this[taxonomy].map((term) => {
			return {
				label: term.name,
				slug: term.id,
			};
		});

		return (
			<BaseControl
				label={sprintf(
					// translators: Filter by %s
					__('Filter by %s', 'vk-blocks'),
					taxonomy
				)}
				id={`vk_postList-terms`}
				key={index}
			>
				<AdvancedCheckboxControl
					schema={'isCheckedTerms'}
					rawData={taxonomiesProps}
					checkedData={isCheckedTermsData}
					saveState={saveStateTerms}
					{...props}
				/>
			</BaseControl>
		);
	},
	termsByTaxonomyName);

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Display conditions', 'vk-blocks')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Filter by PostTypes', 'vk-blocks')}
						id={`vk_postList-postTypes`}
					>
						<AdvancedCheckboxControl
							schema={'isCheckedPostType'}
							rawData={postTypesProps}
							checkedData={isCheckedPostTypeData}
							saveState={saveStatePostTypes}
							{...props}
						/>
					</BaseControl>
					{taxonomiesCheckBox}
					{termControls}
					<BaseControl
						label={__('Number of Posts', 'vk-blocks')}
						id={`vk_postList-numberPosts`}
					>
						<RangeControl
							value={numberPosts}
							onChange={(value) =>
								setAttributes({ numberPosts: value })
							}
							min="1"
							max="100"
						/>
					</BaseControl>
					<BaseControl
						label={__('Order', 'vk-blocks')}
						id={`vk_postList-order`}
					>
						<SelectControl
							value={order}
							onChange={(v) => setAttributes({ order: v })}
							options={[
								{
									value: 'ASC',
									label: __('ASC', 'vk-blocks'),
								},
								{
									value: 'DESC',
									label: __('DESC', 'vk-blocks'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						label={__('Order by', 'vk-blocks')}
						id={`vk_postList-orderBy`}
					>
						<SelectControl
							value={orderby}
							onChange={(v) => setAttributes({ orderby: v })}
							options={[
								{
									value: 'date',
									label: __('Published Date', 'vk-blocks'),
								},
								{
									value: 'modified',
									label: __('Modefied Date', 'vk-blocks'),
								},
								{
									value: 'title',
									label: __('Title', 'vk-blocks'),
								},
								{
									value: 'rand',
									label: __('Random', 'vk-blocks'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						label={__('offset', 'vk-blocks')}
						id={`vk_postList-offset`}
					>
						<TextControl
							value={offset}
							onChange={(v) =>
								setAttributes({ offset: parseInt(v, 10) })
							}
							type="number"
							min="0"
						/>
					</BaseControl>
					<BaseControl>
						<CheckboxControl
							label={__('Ignore this post', 'vk-blocks')}
							checked={selfIgnore}
							onChange={(v) => setAttributes({ selfIgnore: v })}
						/>
					</BaseControl>
				</PanelBody>
				<ColumnLayoutControl {...props} />
				<DisplayItemsControl {...props} />
			</InspectorControls>
			<div {...blockProps}>
				<ServerSideRender
					block="vk-blocks/post-list"
					attributes={attributes}
				/>
			</div>
		</>
	);
}
