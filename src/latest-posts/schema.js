export const schema = {
    layout: {
        type: 'string',
        default: 'card',
    },
    col_xs: {
        type: 'number',
        default: 1,
    },
    col_sm: {
        type: 'number',
        default: 2,
    },
    col_md: {
        type: 'number',
        default: 3,
    },
    col_lg: {
        type: 'number',
        default: 3,
    },
    col_xl: {
        type: 'number',
        default: 3,
    },
    display_excerpt: {
        type: 'boolean',
        default: false,
    },
    new_date: {
        type: 'number',
        default: 7,
    },
    new_text: {
        type: 'string',
        default: 'New!!',
    },
    numberPosts: {
        type: 'number',
        default: 6,
    },
    isCheckedPostType: {
        type: 'string',
        default: '[]'
    },
    coreTerms: {
        type: 'string',
        default: '[]'
    },
    isCheckedTerms: {
        type: 'string',
        default: '{}'
    }
};
