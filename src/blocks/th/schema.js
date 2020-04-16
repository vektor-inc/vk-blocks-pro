export const schema = {
    content: {
        type: 'string',
        source: 'html',
        selector: 'div',
    },
    textOverflow: {
        type: 'Boolean',
        default: false,
    }
};
