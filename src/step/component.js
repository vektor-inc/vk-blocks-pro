import React from 'react';
const {InnerBlocks} = wp.editor;
import hex2rgba from "../_helper/hex-to-rgba";

export class Component extends React.Component {

    render() {

        let {
        } = this.props.attributes;

        let className = this.props.className;
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
            <i class="fas fa-user-circle fa-2x"></i>
            {elm}
            </div>
        );
    }
}
