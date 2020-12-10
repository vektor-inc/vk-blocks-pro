const getTaxonomySlugs = (taxonomies) => {

    if (!taxonomies) {
        return false
    }

    const slugs = [];
    for (let i = 0; i <= taxonomies.length - 1; i++) {

        if (taxonomies[i].slug !== 'post_tag') {

            slugs.push(taxonomies[i].slug);

        }

    }
    return slugs;
};

const getTagTaxonomySlugs = (taxonomies) => {

    if (!taxonomies) {
        return false
    }

    const slugs = [];
    for (let i = 0; i <= taxonomies.length - 1; i++) {

        if (taxonomies[i].slug === 'post_tag') {

            slugs.push(taxonomies[i].slug);

        }

    }
    return slugs;
};

const setUpTaxonomyData = (taxonomies, slugs, select) => {

    const Taxonomy = [];

    for (let i = 0; i <= slugs.length - 1; i++) {

        const tax = (select('core').getEntityRecords('taxonomy', slugs[i]));

        if (tax != null) {

            for (let i = 0; i <= tax.length - 1; i++) {

                if (tax[i].slug != null) {

                    Taxonomy[tax[i].slug] = {
                        name: tax[i].name,
                        slug: tax[i].slug,
                        taxonomyType: tax[i].taxonomy,
                    }
                }
            }
        }
    }
    return Taxonomy;
};

export {getTaxonomySlugs, getTagTaxonomySlugs, setUpTaxonomyData};
