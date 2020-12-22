/**
 * Flow block type
 *
 */
import { deprecated } from './deprecated'
import { vkbBlockEditor } from "./../_helper/depModules";
import { content, title, iconPicture } from "./../_helper/example-data"
import BlockIcon from "./icon.svg";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RadioControl, PanelBody, Button } = wp.components;
const { Fragment } = wp.element;
const { RichText, InspectorControls, MediaUpload } = vkbBlockEditor;


registerBlockType('vk-blocks/flow', {
	title: __('Flow', 'vk-blocks'), // Block title.
	icon: <BlockIcon />, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'vk-blocks-cat', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		heading: {
			type: 'string',
			source: 'html',
			selector: 'dt',
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'dd',
		},
		arrowFlag: {
			type: 'string',
			default: 'vk_flow-arrow-on',
		},
		insertImage: {
			type: 'string',
			default: null, // no image by default!
		}
	},
	example:{
		attributes: {
			heading: title,
			content,
			arrowFlag:  'vk_flow-arrow-on',
			insertImage: iconPicture
		},
	},

	edit({ attributes, setAttributes, className, clientId }) {
		const {
			heading,
			content,
			insertImage,
			arrowFlag,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __('Display of arrow', 'vk-blocks') }>
						<RadioControl
							selected={ arrowFlag }
							options={ [
								{ label: __('Arrow display', 'vk-blocks'), value: 'vk_flow-arrow-on' },
								{ label: __('Arrow hidden', 'vk-blocks'), value: 'vk_flow-arrow-off' },
							] }
							onChange={ (value) => setAttributes({ arrowFlag: value }) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className={ `${className} ${arrowFlag} vk_flow` }>
					<div className={ 'vk_flow_frame' } >
						<dl
							className={ 'vk_flow_frame_text' }
						>
							<RichText
								key={ `${clientId}2` }
								tagName="dt"
								className={ 'vk_flow_frame_text_title' }
								onChange={ (value) => setAttributes({ heading: value }) }
								value={ heading }
								placeholder={ __('Input title', 'vk-blocks') }
							/>
							<RichText
								key={ `${clientId}3` }
								tagName="dd"
								className={ 'vk_flow_frame_text_content' }
								onChange={ (value) => setAttributes({ content: value }) }
								value={ content }
								placeholder={ __('Input content', 'vk-blocks') }
							/>
						</dl>
						<div className={ 'vk_flow_frame_image' }>
							<MediaUpload
								onSelect={ (value) => setAttributes({ insertImage: value.url }) }
								type="image"
								className={ 'vk_flow_frame_image' }
								value={ insertImage }
								render={ ({ open }) => (
									<Button
										onClick={ open }
										className={ insertImage ? 'image-button' : 'button button-large' }
									>
										{ !insertImage ? __('Select image', 'vk-blocks') :
										<img className={ 'icon-image' } src={ insertImage } alt={ __('Upload image', 'vk-blocks') } /> }
									</Button>
								) }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save({ attributes }) {
		const {
			heading,
			content,
			insertImage,
			arrowFlag,
		} = attributes;

		return (
			<div className={ `${arrowFlag} vk_flow` }>
				<div className={ 'vk_flow_frame' }>
					<dl className={ 'vk_flow_frame_text' }>
						<RichText.Content
							tagName="dt"
							className={ 'vk_flow_frame_text_title' }
							value={ heading }
						/>
						<RichText.Content
							tagName="dd"
							className={ 'vk_flow_frame_text_content' }
							value={ content }
						/>
					</dl>
					{ insertImage ?
						<div className={ 'vk_flow_frame_image' }>
							<img
								src={ insertImage }
								alt=''
							/></div> : '' }
				</div>
			</div>
		);
	},

	deprecated
});
