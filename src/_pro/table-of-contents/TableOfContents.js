import ReactDOMServer from 'react-dom/server';

const {__} = wp.i18n; // Import __() from wp.i18n

class TableOfContents {

    /**
     * Get hTag's NodeList included in target class's element.
     * @param targetClass
     * @returns {*} NodeListOf<Element> or false
     */
    getDom(targetClass) {
        let editor = document.getElementsByClassName(targetClass);
        if (editor[0] === undefined) {
            return false;
        } else {
            return editor[0].querySelectorAll("h1, h2, h3, h4, h5, h6");
        }
    }

    /**
     * Get array of hTag's innerText and tagName.
     * @returns {Array}
     */
    getHtagsInEditor() {

        let nodeList_raw = this.getDom('edit-post-visual-editor');

        if(nodeList_raw === undefined){
            return false;
        }

        let nodeList = Array.from(nodeList_raw);

        let sourceOfTocHtml = [];

        nodeList.forEach(function (item, index) {

            sourceOfTocHtml[index] = {
                'tagName': nodeList[index]['tagName'],
                'innerText': nodeList[index]['innerText']
            }
        });

        return sourceOfTocHtml;
    };

    /**
     * Return Html of Toc block.
     * @param source
     * @param style
     * @param className
     * @returns {*}
     */
    returnHtml(source, style, className) {

        if (!className) {
            className = 'vk_tableOfContents';
        } else {
            className = className + ' vk_tableOfContents';
        }

				if ( style ){
					className = className + ' vk_tableOfContents-style-' + style;
				}

        let listClassName = 'vk_tableOfContents_list_item';
        let countSeparater = '.';
        let h2Count = 0;
        let h3Count = 0;
        let h4Count = 0;
        let h5Count = 0;
        let h6Count = 0;
        const fixZero = (count) => {
          if ( count === 0 ){
            return 1;
          } else {
            return count;
          }
        };

        let returnHtmlContent;
        if(source) {
            returnHtmlContent =
                <ul className={'vk_tableOfContents_list'}>
                    {
                        source.map((data) => {

                            let baseClass = 'vk_tableOfContents_list_item';

                            let level = Number(data.tagName.replace(/H/g, ''));

                            let preNumber = '';

                            if (level === 2) {
                                h2Count++;
                                preNumber = h2Count;

                                // Reset
                                h3Count = 0;
                                h4Count = 0;
                                h5Count = 0;
                                h6Count = 0;
                            }

                            if (level === 3) {
                                h3Count++;
                                preNumber = h2Count + countSeparater + h3Count;

                                // Reset
                                h4Count = 0;
                                h5Count = 0;
                                h6Count = 0;
                            }

                            if (level === 4) {
                                h4Count++;
                                preNumber = h2Count + countSeparater + fixZero(h3Count) + countSeparater + h4Count;

                                // Reset
                                h5Count = 0;
                                h6Count = 0;
                            }

                            if (level === 5) {
                                h5Count++;
                                preNumber = h2Count + countSeparater + fixZero(h3Count) + countSeparater + fixZero(h4Count) + countSeparater + h5Count;

                                // Reset
                                h6Count = 0;
                            }

                            if (level === 6) {
                                h6Count++;
                                preNumber = h2Count + countSeparater + fixZero(h3Count) + countSeparater + fixZero(h4Count) + countSeparater + fixZero(h5Count) + countSeparater + h6Count;

                            }

                            preNumber = preNumber + '. ';

                            return <li className={`${baseClass} ${baseClass}-h-${level}`}>
                                <a href="" className={`${baseClass}_link`}>
                                    <span className={`${baseClass}_link_preNumber`}>{preNumber}</span>
                                    {data.innerText}
                                </a>
                            </li>;
                        })}
                </ul>;
        }else {
            returnHtmlContent = '';
        }

        let returnHtml = <div className={className}>
            <div className={'vk_tableOfContents_title'}>{__('Table of Contents', 'vk-blocks')}</div>
            {returnHtmlContent}
        </div>;

        return ReactDOMServer.renderToString(returnHtml);
    }
}

export default TableOfContents;
