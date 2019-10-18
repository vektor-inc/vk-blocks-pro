export const schema = {
    heading: {
        type: 'string',
        source: 'html',
        selector: 'h1',
    },
    content: {
        type: 'string',
        source: 'html',
        selector: 'p',
    },
    bgImage: {
        type: 'string',
        default: null,
    },
    opacity: {
        type: 'number',
        default: 0.5,
    }
};
