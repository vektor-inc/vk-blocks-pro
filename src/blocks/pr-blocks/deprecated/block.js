import { ComponentBlock } from "./component-block";
import { ComponentBlockV2 } from "./component-blockV2"

const { __ } = wp.i18n; // Import __() from wp.i18n
import { vkbBlockEditor } from "./../../_helper/depModules";
const { RichText } = vkbBlockEditor;

function set_attributes(number) {

    const attributes = {};

    for (let i = 1; i <= number; i++) {

        attributes['heading' + i] = {
            type: 'string',
            source: 'html',
            selector: 'h3.vk_prBlocks_item_title-' + i,
        };
        attributes['content' + i] = {
            type: 'string',
            source: 'html',
            selector: 'p.vk_prBlocks_item_summary-' + i,
        };
        attributes['url' + i] = {
            type: 'string',
            default: null,
        };
        attributes['urlOpenType' + i] = {
            type: 'Boolean',
            default: false,
        };
        attributes['icon' + i] = {
            type: 'string',
            default: 'fas fa-file',
        };
        attributes['color' + i] = {
            type: 'string',
            default: '#0693e3',
        };
        attributes['bgType' + i] = {
            type: 'string',
            default: '0',
        };
        attributes['insertImage' + i] = {
            type: 'string',
            default: null,
        };
    }

    return attributes;
}
function set_attributes2(number) {

    const attributes = {};

    for (let i = 1; i <= number; i++) {

        attributes['heading' + i] = {
            type: 'string',
            source: 'html',
            selector: 'h1.vk_prBlocks_item_title-' + i,
        };
        attributes['content' + i] = {
            type: 'string',
            source: 'html',
            selector: 'p.vk_prBlocks_item_summary-' + i,
        };
        attributes['url' + i] = {
            type: 'string',
            default: null,
        };
        attributes['urlOpenType' + i] = {
            type: 'Boolean',
            default: false,
        };
        attributes['icon' + i] = {
            type: 'string',
            default: 'fas fa-file',
        };
        attributes['color' + i] = {
            type: 'string',
            default: '#0693e3',
        };
        attributes['bgType' + i] = {
            type: 'string',
            default: '0',
        };
        attributes['insertImage' + i] = {
            type: 'string',
            default: null,
        };
    }

    return attributes;
}

export const deprecated = [
	{
		attributes:set_attributes(4),
		save({ attributes, className }) {

			let containerClass;
			if (className) {
				containerClass = `${className} vk_prBlocks row`;
			} else {
				containerClass = `vk_prBlocks row`;
			}

			return (
				<div className={ containerClass }>
					<ComponentBlockV2
						attributes={ attributes }
						blockNum={ 1 }
						for_={ 'save' }
					/>
					<ComponentBlockV2
						attributes={ attributes }
						blockNum={ 2 }
						for_={ 'save' }
					/>
					<ComponentBlockV2
						attributes={ attributes }
						blockNum={ 3 }
						for_={ 'save' }
					/>
				</div>
			);

		},
	},
    {
        attributes: set_attributes(4),

        save({ attributes }) {
            const {
                heading1,
                heading2,
                heading3,
                content1,
                content2,
                content3,
                url1,
                url2,
                url3,
                urlOpenType1,
                urlOpenType2,
                urlOpenType3,
                icon1,
                icon2,
                icon3,
                color1,
                color2,
                color3,
                bgType1,
                bgType2,
                bgType3,
                insertImage1,
                insertImage2,
                insertImage3
            } = attributes;

            return (
	<div className="vk_prBlocks row">

		<div className="vk_prBlocks_item col-sm-4">
			<a
				href={ url1 }
				target={ urlOpenType1 ? '_blank' : '_self' }
				className="vk_prBlocks_item_link"
                        >
				{ (() => {

                                if (insertImage1) {

                                    return <div className="vk_prBlocks_item_image"
	style={ {
                                            backgroundImage: 'url(' + insertImage1 + ')',
                                            backgroundRepeat: 'no-repeat 50% center',
                                            backgroundSize: 'cover'
                                        } }
                                    >
	<img
		src={ insertImage1 }
		alt=''
                                        />
                                    </div>

                                } 

                                    if (!color1) {
                                        color1 = '#0693e3';
                                        bgType1 === '0';
                                    }
                                    if (bgType1 === '0') {

                                        return <div
	className="vk_prBlocks_item_icon_outer"
	style={ {
                                                backgroundColor: color1,
                                                border: `1px solid ${color1}`
                                            } }
                                        ><i className={ `${icon1} vk_prBlocks_item_icon` }
	style={ { color: '#fff' } }>
                                            </i>
                                        </div>
                                    } 
                                        return <div
	className="vk_prBlocks_item_icon_outer"
	style={ { backgroundColor: 'transparent', border: '1px solid ' + color1 } }
                                        ><i className={ `${icon1} vk_prBlocks_item_icon` }
	style={ { color: color1 } }>
                                            </i>
                                        </div>
                                    
                                
                            })() }
				<RichText.Content
					className="vk_prBlocks_item_title vk_prBlocks_item_title-1"
					tagName={ 'h1' }
					value={ heading1 } />
				<RichText.Content
					className="vk_prBlocks_item_summary vk_prBlocks_item_summary-1"
					tagName={ 'p' }
					value={ content1 } />
			</a>
		</div>
		<div className="vk_prBlocks_item col-sm-4">
			<a
				href={ url2 }
				target={ urlOpenType2 ? '_blank' : '_self' }
				className="vk_prBlocks_item_link"
                        >
				{ (() => {

                                if (insertImage2) {

                                    return <div className="vk_prBlocks_item_image"
	style={ {
                                            backgroundImage: 'url(' + insertImage2 + ')',
                                            backgroundRepeat: 'no-repeat 50% center',
                                            backgroundSize: 'cover'
                                        } }
                                    >
	<img
		src={ insertImage2 }
		alt=''
                                        />
                                    </div>

                                } 
                                    if (!color2) {
                                        color2 = '#0693e3';
                                        bgType2 === '0';
                                    }
                                    if (bgType2 === '0') {
                                        return <div
	className="vk_prBlocks_item_icon_outer"
	style={ {
                                                backgroundColor: color2,
                                                border: `1px solid ${color2}`
                                            } }
                                        ><i className={ `${icon2} vk_prBlocks_item_icon` }
	style={ { color: '#fff' } }>
                                            </i>
                                        </div>
                                    } 
                                        return <div
	className="vk_prBlocks_item_icon_outer"
	style={ { backgroundColor: 'transparent', border: '1px solid ' + color2 } }
                                        ><i className={ `${icon2} vk_prBlocks_item_icon` }
	style={ { color: color2 } }>
                                            </i>
                                        </div>
                                    
                                
                            })() }
				<RichText.Content
					className="vk_prBlocks_item_title vk_prBlocks_item_title-2"
					tagName={ 'h1' }
					value={ heading2 } />
				<RichText.Content
					className="vk_prBlocks_item_summary vk_prBlocks_item_summary-2"
					tagName={ 'p' }
					value={ content2 } />
			</a>
		</div>

		<div className="vk_prBlocks_item col-sm-4">
			<a
				href={ url3 }
				target={ urlOpenType3 ? '_blank' : '_self' }
				className="vk_prBlocks_item_link"
                        >
				{ (() => {

                                if (insertImage3) {

                                    return <div className="vk_prBlocks_item_image"
	style={ {
                                            backgroundImage: 'url(' + insertImage3 + ')',
                                            backgroundRepeat: 'no-repeat 50% center',
                                            backgroundSize: 'cover'
                                        } }
                                    >
	<img
		src={ insertImage3 }
		alt=''
                                        />
                                    </div>

                                } 
                                    if (!color3) {
                                        color3 = '#0693e3';
                                        bgType3 === '0';
                                    }
                                    if (bgType3 === '0') {
                                        return <div
	className="vk_prBlocks_item_icon_outer"
	style={ {
                                                backgroundColor: color3,
                                                border: `1px solid ${color3}`
                                            } }
                                        ><i className={ `${icon3} vk_prBlocks_item_icon` }
	style={ { color: '#fff' } }>
                                            </i>
                                        </div>
                                    } 
                                        return <div
	className="vk_prBlocks_item_icon_outer"
	style={ { backgroundColor: 'transparent', border: '1px solid ' + color3 } }
                                        ><i className={ `${icon3} vk_prBlocks_item_icon` }
	style={ { color: color3 } }>
                                            </i>
                                        </div>
                                    
                                
                            })() }
				<RichText.Content
					className="vk_prBlocks_item_title vk_prBlocks_item_title-3"
					tagName={ 'h1' }
					value={ heading3 } />
				<RichText.Content
					className="vk_prBlocks_item_summary vk_prBlocks_item_summary-3"
					tagName={ 'p' }
					value={ content3 } />
			</a>
		</div>
	</div>
            );
        },


    },
    {
        attributes: set_attributes2(4),
        save({ attributes }) {

            return (
	<div className="vk_prBlocks row">
		<ComponentBlock
			attributes={ attributes }
			blockNum={ 1 }
			for_={ 'save' }
                    />
		<ComponentBlock
			attributes={ attributes }
			blockNum={ 2 }
			for_={ 'save' }
                    />
		<ComponentBlock
			attributes={ attributes }
			blockNum={ 3 }
			for_={ 'save' }
                    />
	</div>
            );

        },
    }
];
