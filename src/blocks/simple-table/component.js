import React from 'react';

const { lodash } = window;
const { times } = lodash;
import { vkbBlockEditor } from "./../../_helper/depModules";
const { InnerBlocks } = vkbBlockEditor;

export class Component extends React.Component {

    render() {

        const {
            rowNum
        } = this.props.attributes;
        let for_ = this.props.for_;
        const ALLOWED_BLOCKS = ['vk-blocks/tr'];

        /**
         * Get Block to repeat.
         * @param rowNum
         * @returns {Array}
         */
        const getRowsTemplate = (rowNum) => {
            return times(rowNum, () => ["vk-blocks/tr"]);
        };


        /**
         * Switch Element type for Editor or View.
         * @param rowNum
         * @returns {*}
         */
        const switchViewEdit = (rowNum) => {
            let content = '';
            //エディタとビューの切り替え
            if (for_ === 'edit') {
                return <InnerBlocks
                    template={getRowsTemplate(rowNum)}
                    templateLock="all"
                    ALLOWED_BLOCKS={ALLOWED_BLOCKS}
                />
            } else if ('save') {
                return <InnerBlocks.Content
                    template={getRowsTemplate(rowNum)}
                    templateLock="all"
                    ALLOWED_BLOCKS={ALLOWED_BLOCKS}
                />
            }
        };

        /**
         * Add Row indicated by RangeControl Number.
         * @param rowNum
         * @returns {string}
         */
        const addRow = (rowNum) => {

            let returnElm = '';
            for (let i = 0; i < rowNum; i++) {
                returnElm = switchViewEdit(rowNum);
            }
            return returnElm;
        };

        return (addRow(rowNum));
    }
}
