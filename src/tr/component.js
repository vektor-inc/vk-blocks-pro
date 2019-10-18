import React from 'react';

const { lodash } = window;
const { times } = lodash;
const {InnerBlocks} = wp.editor;

export class Component extends React.Component {

    render() {

        const {
            colNum,
            innerTag
        } = this.props.attributes;
        let for_ = this.props.for_;
        const ALLOWED_BLOCKS = ['vk-blocks/th','vk-blocks/td'];

        /**
         * Get Th Block to repeat.
         * @param colNum
         * @returns {Array}
         */
        const getTh = (colNum) => {
            return times(colNum, () => ["vk-blocks/th"]);
        };
        /**
         * Get Th Block to repeat.
         * @param colNum
         * @returns {Array}
         */
        const getTd = (colNum) => {
            return times(colNum, () => ["vk-blocks/td"]);
        };

        /**
         * Switch Element type for Editor or View.
         * @param colNum
         * @returns {*}
         */
        const templateInnerTr = (colNum) => {

            //エディタとビューの切り替え
            if (for_ === 'edit') {
                return <tr><InnerBlocks
                    template={getTd(colNum)}
                    templateLock="all"
                    ALLOWED_BLOCKS={ALLOWED_BLOCKS}
                /></tr>;
            } else if ('save') {
                return <tr><InnerBlocks.Content
                    template={getTd(colNum)}
                    templateLock="all"
                    ALLOWED_BLOCKS={ALLOWED_BLOCKS}
                /></tr>;
            }
        };

        const templateInnerTrSimpleTable = () => {

            //エディタとビューの切り替え
            if (for_ === 'edit') {
                return <tr>
                    <InnerBlocks
                        template={[["vk-blocks/th"],["vk-blocks/td"]]}
                        templateLock="all"
                        ALLOWED_BLOCKS={ALLOWED_BLOCKS}
                    />
                </tr>;
            } else if ('save') {
                return <tr>
                    <InnerBlocks.Content
                        template={[["vk-blocks/th"],["vk-blocks/td"]]}
                        templateLock="all"
                        ALLOWED_BLOCKS={ALLOWED_BLOCKS}
                    />
                </tr>;
            }
        };

        /**
         * Add Col indicated by RangeControl Number.
         * @param colNum
         * @returns {string}
         */
        const addCol = (colNum) => {

            let returnElm = '';
            switch (innerTag) {
                case 'vk-blocks/simple-table':
                    returnElm = templateInnerTrSimpleTable();
                    break;
                default:
                    for (let i = 0; i < colNum; i++) {
                        returnElm = templateInnerTr(colNum);
                    }
                    break;
            }
            return returnElm;
        };

        return (addCol(colNum));
    }
}
