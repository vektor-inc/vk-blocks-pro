/**
 * your-block-slug block type
 *
 */
import Component from "./component";
import { schema } from './schema';
import { vkbBlockEditor } from "./../../utils/depModules";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RangeControl, RadioControl, PanelBody, Button, PanelColor, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { RichText, InspectorControls, MediaUpload, ColorPalette } = vkbBlockEditor;
const Icon = 'arrow-down';

/**
 * Register: a Gutenberg Block.
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
registerBlockType('vk-blocks/your-block-slug', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('your-block-slug', 'vk-blocks'), // Block title.
    icon: Icon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'vk-blocks-cat', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: schema,

    /**
     * The edit function describes the structure of your block in the context of the editor.
     * This represents what the editor will render when the block is used.
     *
     * The "edit" property must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    edit({ attributes, setAttributes, className }) {
        const {
            heading,
            content,
            insertImage,
            arrowFlag,
        } = attributes;

        return (
	<Fragment>
		<InspectorControls>
			<PanelBody title={ __('Color Setting', 'vk-blocks') }>
				<BaseControl label={ __('Title Color', 'vk-blocks') }>
					<ColorPalette
						value={ content }
						onChange={ (value) => setAttributes({ content: value }) }
                            />
				</BaseControl>
			</PanelBody>
		</InspectorControls>
		<div className="vk_your-block-slug">
			<div>Editor</div>
			<Component
				attributes={ attributes }
				className={ className }
				for_={ 'edit' }
                    />
		</div>
	</Fragment>
        );
    },

    /**
     * The save function define className }> which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    save({ attributes, className }) {

        return (
	<div className="vk_your-block-slug">
		<div>Front</div>
		<Component
			attributes={ attributes }
			className={ className }
			for_={ 'save' }
                />
	</div>
        );
    },
});
