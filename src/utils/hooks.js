import { useSelect } from '@wordpress/data';

export const useTaxonomies = () => {
	return useSelect((select) => {
		return select('core').getTaxonomies({ per_page: -1 }) || [];
	}, []);
};

export const usePosts = (postType, query) => {
	return useSelect(
		(select) => {
			return (
				select('core').getEntityRecords(
					'postType',
					postType.slug,
					query
				) || []
			);
		},
		[postType, query]
	);
};

export const useCurrentBlocks = () => {
	return useSelect((select) => {
		return select('core/block-editor').getBlocks();
	});
};

export const useBlocksByName = (blockName) =>
	// eslint-disable-next-line no-shadow
	useSelect((select) => {
		const { getBlocks } = select('core/block-editor');
		return getBlocks().filter((block) => block.name === blockName);
	}, []);
