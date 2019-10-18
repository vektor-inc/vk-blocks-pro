import React from "react";
const {RichText} = wp.editor;

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
        save({attributes}) {
            const {
                style,
                content
            } = attributes;
            return (
                <div className={`alert alert-${style}`}>
                    <RichText.Content
                        tagName={'p'}
                        value={content}/>
                </div>
            );
        },
    }
];
