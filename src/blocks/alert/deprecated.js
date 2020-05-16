import { vkbBlockEditor } from "./../_helper/depModules";
const { RichText } = vkbBlockEditor;

export const deprecated = [
    {
        attributes: {
            style: {
                type: 'string',
                default: 'info',
            },
            content: {
                type: 'string',
                source: 'html',
                selector: 'p',
            }
        },
        save({ attributes }) {
            const {
                style,
                content
            } = attributes;
            return (
                <div className={`alert alert-${style}`}>
                    <RichText.Content
                        tagName={'p'}
                        value={content} />
                </div>
            );
        },
    }
];
