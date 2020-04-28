const { RichText } = wp.editor;

export const deprecated = [
    {
        attributes: {
            heading: {
                type: 'string',
                source: 'html',
                selector: 'dt',
            },
            content: {
                type: 'string',
                source: 'html',
                selector: 'dd',
            }
        },

        save({ attributes }) {
            const {
                heading,
                content
            } = attributes;

            return (
                <dl className={'vk_faq'}>
                    <RichText.Content
                        tagName="dt"
                        className={'vk_faq_title'}
                        value={heading}
                    />
                    <RichText.Content
                        tagName="dd"
                        className={'vk_faq_content'}
                        value={content}
                    />
                </dl>
            );
        },
    }
];
