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
