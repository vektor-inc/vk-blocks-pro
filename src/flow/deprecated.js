import React from "react";
const {RichText} = wp.editor;

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
            },
            arrowFlag: {
                type: 'string',
                default: 'vk_flow-arrow-on',
            },
            insertImage: {
                type: 'string',
                default: null, // no image by default!
            }
        },

        save({attributes}) {
            const {
                heading,
                content,
                insertImage,
                arrowFlag,
            } = attributes;

            return (
                <div className={`${ arrowFlag } vk_flow`}>
                    <div className={ 'vk_flow_frame' }>
                        <dl className={ 'vk_flow_frame_text' }>
                            <RichText.Content
                                tagName="dt"
                                className={ 'vk_flow_frame_text_title' }
                                value={heading}
                            />
                            <RichText.Content
                                tagName="dd"
                                className={ 'vk_flow_frame_text_content' }
                                value={content}
                            />
                        </dl>
                        { insertImage ?
                            <div className={ 'vk_flow_frame_image' }>
                                <img
                                    src={ insertImage }
                                    alt=''
                                /></div> : '' }
                    </div>
                </div>
            );
        },
    }
];
