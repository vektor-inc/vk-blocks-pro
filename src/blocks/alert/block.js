/**
 * Alert block type
 *
 */
import { deprecated } from './deprecated';
import { vkbBlockEditor } from "./../_helper/depModules";
import { content } from "./../_helper/example-data"
import BlockIcon from "./icon.svg";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, SelectControl } = wp.components;
const { InspectorControls, RichText } = vkbBlockEditor;
const { Fragment } = wp.element;


registerBlockType('vk-blocks/alert', {

	title: __('Alert', 'vk-blocks'),

	icon: <BlockIcon />,

	category: 'vk-blocks-cat',

	attributes: {
		style: {
			type: 'string',
			default: 'info',
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
		}
	},
	example: {
		attributes: {
			style: 'info',
			content
		},
	},

	edit({ attributes, setAttributes, className }) {
		const {
			style,
			content
		} = attributes;

		const onChangeContent = (newContent) => {
			setAttributes({ content: newContent });
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __("Style Settings", "vk-blocks") }>
						<SelectControl
							value={ style }
							onChange={ value => setAttributes({ style: value }) }
							options={ [
								{ label: __("Success", "vk-blocks"), value: "success" },
								{ label: __("Info", "vk-blocks"), value: "info" },
								{ label: __("Warning", "vk-blocks"), value: "warning" },
								{ label: __("Danger", "vk-blocks"), value: "danger" },
							] }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ `${className} alert alert-${style}` }>
					<RichText
						tagName="p"
						onChange={ onChangeContent }
						value={ content }
					/>
				</div>
			</Fragment>
		);
	},

	save({ attributes, className }) {
		const {
			style,
			content
		} = attributes;
		return (
			<div className={ `${className} alert alert-${style}` }>
				<RichText.Content
					tagName={ 'p' }
					value={ content } />
			</div>
		);
	},
	deprecated,
});
