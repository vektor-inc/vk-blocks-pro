import React from "react";
const {InnerBlocks} = wp.editor;
const {__} = wp.i18n; // Import __() from wp.i18n
import {faSchema} from "../_helper/font-awesome";

export const originalSchema = {
    label: {
        type: 'string',
        default:  'Write Caption here ...',
    },
    color: {
        type: 'string',
        default: '#337ab7',
    },
    style: {
        type: 'string',
        default: 'solid',
    },
    styleLine: {
        type: 'string',
        default: 'default',
    },
    dotCaption: {
        type: 'string',
        default: 'STEP',
    },
    dotNum: {
        type: 'number',
        default: 1,
    }
};
let mergeSchema = () => {
    return Object.assign(originalSchema, faSchema);
};
export const schema = mergeSchema();

export class Component extends React.Component {
    render() {
        const {
            label,
            color,
            style,
            styleLine,
            dotCaption,
            dotNum,
            faIcon
        } = this.props.attributes;
        let for_ = this.props.for_;
        let className = this.props.className;
        let containerClass = " vk_step_item";
        let elm;
        let styleClass;
        let inlineStyle;
        let styleLineClass;
        const TEMPLATE = [['core/heading', {level: 4}]];

        //編集画面とサイト上の切り替え
        if (for_ === "edit") {
            elm = <InnerBlocks template={TEMPLATE}/>;
        } else if ("save") {
            elm = <InnerBlocks.Content/>;
        }

        if (style === "solid") {
            styleClass = ' vk_step_item_style-default';
            inlineStyle = {backgroundColor: `${color}`, color: "#ffffff"};
        }else if(style === "outlined"){
            styleClass = ' vk_step_item_style-outlined';
            inlineStyle = {border: `2px solid ${color}`, color: `${color}`};
        }

        if (styleLine === "default") {
            styleLineClass = ' vk_step_item_lineStyle-default';
        }else if(styleLine === "none"){
            styleLineClass = ' vk_step_item_lineStyle-none'
        }

        return (
            <div className={className + containerClass + styleLineClass}>
                <div className={"vk_step_item_caption"}>{label}</div>
                <div className={"vk_step_item_content"}>{elm}</div>
                <div
                    className={'vk_step_item_dot' + styleClass}
                    style={inlineStyle}
                >
                    <div className={'vk_step_item_dot_caption'}>{dotCaption}</div>
                    {(() => {
                        if (faIcon){
                            return <i className={faIcon}/>;
                        }else if(dotNum){
                            return <div className={'vk_step_item_dot_num'}>{dotNum}</div>;
                        }
                    })()}
                </div>
            </div>
        );
    }
}

export const deprecated = [
    {
        attributes: schema,
        save({attributes, className}) {
            return <Component attributes={attributes} className={className} for_={"save"}/>;
        },
    }
];
