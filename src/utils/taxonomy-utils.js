const getTaxonomySlugs = ( taxonomies ) => {
	if ( ! taxonomies ) {
		return false;
	}

	const slugs = [];
	for ( let i = 0; i <= taxonomies.length - 1; i++ ) {
		if ( taxonomies[ i ].slug !== 'post_tag' ) {
			slugs.push( taxonomies[ i ].slug );
		}
	}
	return slugs;
};

const getTagTaxonomySlugs = ( taxonomies ) => {
	if ( ! taxonomies ) {
		return false;
	}

	const slugs = [];
	for ( let i = 0; i <= taxonomies.length - 1; i++ ) {
		if ( taxonomies[ i ].slug === 'post_tag' ) {
			slugs.push( taxonomies[ i ].slug );
		}
	}
	return slugs;
};

const setUpTaxonomyData = ( taxonomies, slugs, select ) => {
	const Taxonomy = [];

	for ( let i = 0; i <= slugs.length - 1; i++ ) {
		const tax = select( 'core' ).getEntityRecords( 'taxonomy', slugs[ i ] );

		if ( tax !== null && tax !== undefined ) {
			for ( let j = 0; j <= tax.length - 1; j++ ) {
				if ( tax[ j ].slug !== null && tax[ j ].slug !== undefined ) {
					Taxonomy[ tax[ j ].slug ] = {
						name: tax[ j ].name,
						slug: tax[ j ].slug,
						taxonomyType: tax[ j ].taxonomy,
					};
				}
			}
		}
	}
	return Taxonomy;
};

export { getTaxonomySlugs, getTagTaxonomySlugs, setUpTaxonomyData };
