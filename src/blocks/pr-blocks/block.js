/**
 * PR Block block type
 *
 */
import React from "react";
import {deprecated} from "./deprecated/block";
import {ComponentBlock} from "./component-block";
import {isNotJSON} from "../_helper/is-not-json";


const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {RadioControl, PanelBody, Button, BaseControl, CheckboxControl, TextControl} = wp.components;
const {Fragment} = wp.element;
const {InspectorControls, MediaUpload, ColorPalette} = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="576" height="512" viewBox="0 0 576 512">
		<g>
			<g>
				<circle cx="288" cy="186.2" r="60" />
				<rect x="213.5" y="278.8" width="149" height="107" />
			</g>
			<g>
				<circle cx="74.5" cy="186.2" r="60" />
				<rect y="278.8" width="149" height="107" />
			</g>
			<g>
				<circle cx="501.5" cy="186.2" r="60" />
				<rect x="427" y="278.8" width="149" height="107" />
			</g>
		</g>
	</svg>
);

function set_attributes(number) {

    const attributes = {};

    for (let i = 1; i <= number; i++) {

        attributes['heading' + i] = {
            type: 'string',
            source: 'html',
            selector: '.vk_prBlocks_item_title-' + i,
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

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('vk-blocks/pr-blocks', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('PR Blocks', 'vk-blocks'), // Block title.
    icon: BlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'vk-blocks-cat', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: set_attributes(4),

    /**
     * The edit function describes the structure of your block in the context of the editor.
     * This represents what the editor will render when the block is used.
     *
     * The "edit" property must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    edit ({attributes, setAttributes, className}) {

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

        let containerClass;
        if (className) {
            containerClass = `${className} vk_prBlocks row`;
        } else {
            containerClass = `vk_prBlocks row`;
        }

        const uploadNonAltImage1 = (insertImage) => {
            if (isNotJSON(insertImage)) {
                setAttributes({insertImage1: insertImage.url})
            } else {
                setAttributes({insertImage1: JSON.stringify(insertImage)})
            }
        };

        const uploadNonAltImage2 = (insertImage) => {
            if (isNotJSON(insertImage)) {
                setAttributes({insertImage2: insertImage.url})
            } else {
                setAttributes({insertImage2: JSON.stringify(insertImage)})
            }
        };

        const uploadNonAltImage3 = (insertImage) => {
            if (isNotJSON(insertImage)) {
                setAttributes({insertImage3: insertImage.url})
            } else {
                setAttributes({insertImage3: JSON.stringify(insertImage)})
            }
        };

        const renderEditAltImage = (insertImage) => {
            if (isNotJSON(insertImage)) {
                return !insertImage
                    ?
                    __('Select image', 'vk-blocks')
                    :
                    <img className={ 'icon-image' } src={ insertImage }
	alt={ __('Upload image', 'vk-blocks') } />
            } 
                const IconImageParse = JSON.parse(insertImage);
                return !insertImage
                    ? __('Select image', 'vk-blocks')
                    :
                    <img className={ 'icon-image' } src={ IconImageParse.sizes.full.url }
	alt={ IconImageParse.alt } />
            
        };

        return [
	<Fragment>
		<InspectorControls>

			<PanelBody title={ __('PR Block1 Setting', 'vk-blocks') }>
				<BaseControl
					label={ __('Link URL:', 'vk-blocks') }
                        >
					<TextControl
						value={ url1 }
						onChange={ (value) => setAttributes({url1: value}) }
                            />
					<CheckboxControl
						label={ __('Open link new tab.', 'vk-blocks') }
						checked={ urlOpenType1 }
						onChange={ (checked) => setAttributes({urlOpenType1: checked}) }
                            />
				</BaseControl>
				<BaseControl
					label={ __('Icon 1', 'vk-blocks') }

                        >
					<TextControl
						label={ __('Class name of the Font Awesome icon font you want to use:', 'vk-blocks') }
						value={ icon1 }
						onChange={ (value) => setAttributes({icon1: value}) }
						placeholder={ 'fas fa-file' }
						help={ <a href={ `https://fontawesome.com/icons?d=gallery&m=free` }
							target={ `_blank` }>{ __('Font Awesome icon list', 'vk-blocks') }</a> }
                            />
					<ColorPalette
						value={ color1 }
						onChange={ (value) => {
                                    if (value) {
                                        setAttributes({color1: value})
                                    } else {
                                        setAttributes({color1: '#0693e3'})
                                        setAttributes({bgType1: '0'})
                                    }
                                } }
                            />
					<RadioControl
						label={ __('Icon Background:', 'vk-blocks') }
						selected={ bgType1 }
						options={ [
                                    {label: __('Solid color', 'vk-blocks'), value: '0'},
                                    {label: __('No background', 'vk-blocks'), value: '1'},
                                ] }
						onChange={ (value) => setAttributes({bgType1: value}) }
                            />
				</BaseControl>
				<BaseControl
					// label={ __('PR Image 1', 'vk-blocks') }
					help={ __('When you have an image. Image is displayed with priority', 'vk-blocks') }
                        >
					<h4 className="components-base-control__title">{ __('PR Image 1', 'vk-blocks') }</h4>
					<MediaUpload
						onSelect={ uploadNonAltImage1 }
						type="image"
						value={ insertImage1 }
						render={ ({open}) => (
							<Button
								onClick={ open }
								className={ insertImage1 ? 'image-button' : 'button button-large' }
                                    >
								{ renderEditAltImage(insertImage1) }
							</Button>
                                ) }
                            />
				</BaseControl>
			</PanelBody>
			<PanelBody title={ __('PR Block2 Setting', 'vk-blocks') }>
				<BaseControl
					label={ __('Link URL:', 'vk-blocks') }
                        >
					<TextControl
						value={ url2 }
						onChange={ (value) => setAttributes({url2: value}) }
                            />
					<CheckboxControl
						label={ __('Open link new tab.', 'vk-blocks') }
						checked={ urlOpenType2 }
						onChange={ (checked) => setAttributes({urlOpenType2: checked}) }
                            />
				</BaseControl>
				<BaseControl
					label={ __('Icon 2', 'vk-blocks') }
                        >
					<TextControl
						label={ __('Class name of the Font Awesome icon font you want to use:', 'vk-blocks') }
						value={ icon2 }
						onChange={ (value) => setAttributes({icon2: value}) }
						placeholder={ 'fas fa-file' }
						help={ <a href={ `https://fontawesome.com/icons?d=gallery&m=free` }
							target={ `_blank` }>{ __('Font Awesome icon list', 'vk-blocks') }</a> }
                            />
					<ColorPalette
						value={ color2 }
						onChange={ (value) => {
                                    if (value) {
                                        setAttributes({color2: value})
                                    } else {
                                        setAttributes({color2: '#0693e3'})
                                        setAttributes({bgType2: '0'})
                                    }
                                } }
                            />
					<RadioControl
						label={ __('Icon Background:', 'vk-blocks') }
						selected={ bgType2 }
						options={ [
                                    {label: __('Solid color', 'vk-blocks'), value: '0'},
                                    {label: __('No background', 'vk-blocks'), value: '1'},
                                ] }
						onChange={ (value) => setAttributes({bgType2: value}) }
                            />
				</BaseControl>
				<BaseControl
					// label={ __('PR Image 2', 'vk-blocks') }
					help={ __('When you have an image. Image is displayed with priority.', 'vk-blocks') }
                        >
					<h4 className="components-base-control__title">{ __('PR Image 2', 'vk-blocks') }</h4>
					<MediaUpload
						onSelect={ uploadNonAltImage2 }
						type="image"
						value={ insertImage2 }
						render={ ({open}) => (
							<Button
								onClick={ open }
								className={ insertImage2 ? 'image-button' : 'button button-large' }
                                    >
								{ renderEditAltImage(insertImage2) }
							</Button>
                                ) }
                            />
				</BaseControl>
			</PanelBody>
			<PanelBody title={ __('PR Block3 Setting', 'vk-blocks') }>
				<BaseControl
					label={ __('Link URL:', 'vk-blocks') }
                        >
					<TextControl
						value={ url3 }
						onChange={ (value) => setAttributes({url3: value}) }
                            />
					<CheckboxControl
						label={ __('Open link new tab.', 'vk-blocks') }
						checked={ urlOpenType3 }
						onChange={ (checked) => setAttributes({urlOpenType3: checked}) }
                            />
				</BaseControl>
				<BaseControl
					label={ __('Icon 3', 'vk-blocks') }
                        >
					<TextControl
						label={ __('Class name of the Font Awesome icon font you want to use:', 'vk-blocks') }
						value={ icon3 }
						onChange={ (value) => setAttributes({icon3: value}) }
						placeholder={ 'fas fa-file' }
						help={ <a href={ `https://fontawesome.com/icons?d=gallery&m=free` }
							target={ `_blank` }>{ __('Font Awesome icon list', 'vk-blocks') }</a> }
                            />
					<ColorPalette
						value={ color3 }
						onChange={ (value) => {
                                    if (value) {
                                        setAttributes({color3: value})
                                    } else {
                                        setAttributes({color3: '#0693e3'})
                                        setAttributes({bgType3: '0'})
                                    }
                                } }
                            />
					<RadioControl
						label={ __('Icon Background:', 'vk-blocks') }
						selected={ bgType3 }
						options={ [
                                    {label: __('Solid color', 'vk-blocks'), value: '0'},
                                    {label: __('No background', 'vk-blocks'), value: '1'},
                                ] }
						onChange={ (value) => setAttributes({bgType3: value}) }
                            />
				</BaseControl>
				<BaseControl
					// label={ __('PR Image 3', 'vk-blocks') }
					help={ __('When you have an image. Image is displayed with priority.', 'vk-blocks') }
                        >
					<h4 className="components-base-control__title">{ __('PR Image 3', 'vk-blocks') }</h4>
					<MediaUpload
						onSelect={ uploadNonAltImage3 }
						type="image"
						value={ insertImage3 }
						render={ ({open}) => (
							<Button
								onClick={ open }
								className={ insertImage3 ? 'image-button' : 'button button-large' }
                                    >
								{ renderEditAltImage(insertImage3) }
							</Button>
                                ) }
                            />
				</BaseControl>
			</PanelBody>
		</InspectorControls>
		<div className={ containerClass }>
			<ComponentBlock
				attributes={ attributes }
				setAttributes={ setAttributes }
				blockNum={ 1 }
				for_={ 'edit' }
                    />
			<ComponentBlock
				attributes={ attributes }
				setAttributes={ setAttributes }
				blockNum={ 2 }
				for_={ 'edit' }
                    />
			<ComponentBlock
				attributes={ attributes }
				setAttributes={ setAttributes }
				blockNum={ 3 }
				for_={ 'edit' }
                    />
		</div>
	</Fragment>
        ];
    },

    /**
     * The save function defin className }> which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    save({attributes,className}) {

        let containerClass;
        if (className) {
            containerClass = `${className} vk_prBlocks row`;
        } else {
            containerClass = `vk_prBlocks row`;
        }

        return (
	<div className={ containerClass }>
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

    deprecated

});
