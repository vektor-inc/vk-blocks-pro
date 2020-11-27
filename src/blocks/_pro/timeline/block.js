/**
 * timeline block type
 *
 */
import { Component } from "./component";
import { schema } from './schema';
import { hiddenNewBlock } from "../../_helper/hiddenNewBlock"
import BlockIcon from "./icon.svg";
import { title } from "../../_helper/example-data";

const inserterVisible = hiddenNewBlock(5.3);

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Fragment } = wp.element;

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
registerBlockType('vk-blocks/timeline', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Timeline', 'vk-blocks'), // Block title.
    icon: <BlockIcon />, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'vk-blocks-cat', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    attributes: schema,
    supports: {
        inserter: inserterVisible
	},
	example: {
		innerBlocks: [
			{
				name: 'vk-blocks/timeline-item',
				attributes: {
					label: '6:00AM',
					color: '#337ab7',
					style: 'outlined',
					styleLine: 'default',
				},
				innerBlocks: [
					{
						name: 'core/heading',
						attributes: {
							level: 4,
							content: title,
						},
					},
				],
			},
		],
	},

    /**
     * The edit function describes the structure of your block in the context of the editor.
     * This represents what the editor will render when the block is used.
     *
     * The "edit" property must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    edit({ attributes, setAttributes, className }) {

        return (
	<Fragment>
		<Component
			attributes={ attributes }
			className={ className }
			setAttributes={ setAttributes }
			for_={ "edit" }
                />
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
        return <Component attributes={ attributes } className={ className } for_={ "save" } />;
    },

    //Please comment out, when you need to use deprecated.
    // deprecated:deprecated
});
