import React from 'react';
const {RichText,InnerBlocks} = wp.editor;
const {__} = wp.i18n; // Import __() from wp.i18n

export class Component extends React.Component {

    render() {

        let {
            content
        } = this.props.attributes;
        let className = this.props.className;
        let setAttributes = this.props.setAttributes;
        let for_ = this.props.for_;
        let elm;
        let containerClass = 'vk_step';

        //編集画面とサイト上の切り替え
        if(for_ === 'edit'){
            elm = <InnerBlocks/>;
        }else if('save'){
            elm = <InnerBlocks.Content/>;
        }
        return (
            <div className={containerClass}>
            <div className={"vk_step_header"}>
            <i class="fas fa-user-circle fa-2x"></i>
            <RichText
                tagName="p"
                onChange={ ( value ) => setAttributes( { content: value } ) }
                value={ content }
                placeholder={__('Input text', 'vk-blocks') }
                />
            </div>
            {elm}
            </div>
        );
    }
}
