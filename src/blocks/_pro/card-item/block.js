/**
 * card-item block type
 *
 */
import { Component } from './component';
import { schema } from './schema';
import { LinkControl } from '../../../components/link-control';
import { deprecated } from './deprecated/index';
import { ReactComponent as Icon } from './icon.svg';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl, TextControl } = wp.components;
const { InspectorControls } =
	wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const { Fragment } = wp.element;

registerBlockType('vk-blocks/card-item', {
	title: __('Card Item', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat',
	attributes: schema,
	parent: ['vk-blocks/card'],
	supports: {
		className: true,
	},

	edit(props) {
		const { setAttributes, attributes } = props;
		const { url } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('URL', 'vk-blocks')}>
						<BaseControl id="sidebar-card-block-url">
							<TextControl
								value={url}
								onChange={(value) =>
									setAttributes({ url: value })
								}
								placeholder={__(
									'https://example.com',
									'vk-blocks'
								)}
							/>
						</BaseControl>
						<LinkControl blockName={'card'} {...props} />
					</PanelBody>
				</InspectorControls>
				<Component {...props} for_={'edit'} />
			</Fragment>
		);
	},

	save(props) {
		return <Component {...props} for_={'save'} />;
	},
	deprecated,
});
