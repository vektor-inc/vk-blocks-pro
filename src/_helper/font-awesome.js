import React from "react";

const {TextControl} = wp.components;
const {__} = wp.i18n;

export const faSchema = {
    faIcon: {
        type: 'string',
        default: 'fas fa-arrow-circle-right fa-2x',
    },
};

export class FontAwesome extends React.Component {

    render() {
        let {faIcon} = this.props.attributes;
        let setAttributes = this.props.setAttributes;

        return (
            <TextControl
                label={__('FontAwesome', 'vk-blocks')}
                help={__('Enter Font Awesome Class.This icon will appear before text. Ex) fas fa-arrow-circle-right', 'vk-blocks') +
                <a href={`https://fontawesome.com/icons?d=gallery&m=free`}
                   target={`_blank`}>{__('Font Awesome icon list', 'vk-blocks')}</a>}
                value={faIcon}
                onChange={(value) => setAttributes({faIcon: value})}
                placeholder={'fas fa-arrow-circle-right'}
            />
        );
    }
}
