/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
// import { store as coreStore } from '@wordpress/core-data';
import { isMatch } from 'lodash';

/**
 * @typedef IHasNameAndId
 * @property {string|number} id   The entity's id.
 * @property {string}        name The entity's name.
 */

/**
 * The object used in Query block that contains info and helper mappings
 * from an array of IHasNameAndId objects.
 *
 * 情報およびヘルパーマッピングを含む Query ブロックで使用されるオブジェクトです。を IHasNameAndId オブジェクトの配列で返します。
 *
 * @typedef {Object} QueryEntitiesInfo
 * @property {IHasNameAndId[]}               entities  The array of entities.
 * @property {Object<string, IHasNameAndId>} mapById   Object mapping with the id as key and the entity as value.
 * @property {Object<string, IHasNameAndId>} mapByName Object mapping with the name as key and the entity as value.
 * @property {string[]}                      names     Array with the entities' names.
 */

/**
 * Returns a helper object with mapping from Objects that implement
 * the `IHasNameAndId` interface. The returned object is used for
 * integration with `FormTokenField` component.
 *
 * IHasNameAndId` インターフェースを実装した Object からマッピングを行うヘルパーオブジェクトを返す。返されたオブジェクトは `FormTokenField` コンポーネントと統合するために使用される。
 *
 * @param {IHasNameAndId[]} entities The entities to extract of helper object.
 * @return {QueryEntitiesInfo} The object with the entities information.
 */
export const getEntitiesInfo = (entities) => {
	const mapping = entities?.reduce(
		(accumulator, entity) => {
			const { mapById, mapByName, names } = accumulator;
			mapById[entity.id] = entity;
			mapByName[entity.name] = entity;
			names.push(entity.name);
			return accumulator;
		},
		{ mapById: {}, mapByName: {}, names: [] }
	);
	return {
		entities,
		...mapping,
	};
};

/**
 * Returns a helper object that contains:
 * 1. An `options` object from the available post types, to be passed to a `SelectControl`.
 * 選択コントロールに渡す、利用可能な投稿タイプからの `options` オブジェクト。
 * 2. A helper map with available taxonomies per post type.
 * 投稿タイプごとに利用可能なタクソノミが記載されたヘルパーマップです。
 *
 * @return {Object} The helper object related to post types.
 */
export const usePostTypes = () => {
	const postTypes = useSelect((select) => {
		const { getPostTypes } = select('core');
		const excludedPostTypes = ['attachment'];
		const filteredPostTypes = getPostTypes({ per_page: -1 })?.filter(
			({ viewable, slug }) =>
				viewable && !excludedPostTypes.includes(slug)
		);
		return filteredPostTypes;
	}, []);
	const postTypesTaxonomiesMap = useMemo(() => {
		if (!postTypes?.length) return;
		return postTypes.reduce((accumulator, type) => {
			accumulator[type.slug] = type.taxonomies;
			return accumulator;
		}, {});
	}, [postTypes]);
	const postTypesSelectOptions = useMemo(
		() =>
			(postTypes || []).map(({ labels, slug }) => ({
				label: labels.singular_name,
				value: slug,
			})),
		[postTypes]
	);
	return { postTypesTaxonomiesMap, postTypesSelectOptions };
};

/**
 * Hook that returns the taxonomies associated with a specific post type.
 * 特定の投稿タイプに関連するタクソノミを返すフックです。
 *
 * @param {string} postType The post type from which to retrieve the associated taxonomies.
 * @return {Object[]} An array of the associated taxonomies.
 */
export const useTaxonomies = (postType) => {
	const taxonomies = useSelect(
		(select) => {
			const { getTaxonomies } = select('core');
			const filteredTaxonomies = getTaxonomies({
				type: postType,
				per_page: -1,
				context: 'view',
			});
			return filteredTaxonomies;
		},
		[postType]
	);
	return taxonomies;
};

/**
 * ブロックのリストを再帰的に検索し、最初に見つかったQuery LoopブロックのclientIdを返します。
 *
 * @param {WPBlock[]} blocks The list of blocks to look through.
 * @return {string=} The first found Query Loop's clientId.
 */
export const getFirstQueryClientIdFromBlocks = (blocks) => {
	const blocksQueue = [...blocks];
	while (blocksQueue.length > 0) {
		const block = blocksQueue.shift();
		if (block.name === 'vk-blocks/query') {
			return block.clientId;
		}
		block.innerBlocks?.forEach((innerBlock) => {
			blocksQueue.push(innerBlock);
		});
	}
};

export const getMatchingVariation = (blockAttributes, variations) => {
	if (!variations || !blockAttributes) return;
	const matches = variations.filter(({ attributes }) => {
		if (!attributes || !Object.keys(attributes).length) return false;
		return isMatch(blockAttributes, attributes);
	});
	if (matches.length !== 1) return;
	return matches[0];
};
