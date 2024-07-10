/**
 * group-style block type
 *
 * @package
 */
import { convertColorClass } from '@vkblocks/utils/color-code-to-class.js';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, ToolbarGroup } from '@wordpress/components';
import {
	InspectorControls,
	ColorPalette,
	BlockControls,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { registerBlockVariation } from '@wordpress/blocks';
import LinkToolbar from '@vkblocks/components/link-toolbar';
import { ReactComponent as Icon } from './icon.svg';

/**
 * Check if the block type is valid for customization.
 *
 * @param {string} name The name of the block type.
 * @return {boolean} Whether the block type is valid.
 */
const isValidBlockType = (name) => {
	const validBlockTypes = ['core/group'];
	return validBlockTypes.includes(name);
};

/**
 * Add custom attributes to the block settings.
 *
 * @param {Object} settings The block settings.
 * @return {Object} The modified block settings.
 */
export const addAttribute = (settings) => {
	if (isValidBlockType(settings.name)) {
		settings.attributes = {
			...settings.attributes,
			color: {
				type: 'string',
			},
			linkUrl: {
				type: 'string',
				default: '',
			},
			linkTarget: {
				type: 'string',
				default: '',
			},
		};
	}
	return settings;
};
addFilter('blocks.registerBlockType', 'vk-blocks/group-style', addAttribute);

/**
 * Add custom controls to the block edit interface.
 *
 * @param {Function} BlockEdit The block edit component.
 * @return {Function} The modified block edit component.
 */
export const addBlockControl = createHigherOrderComponent((BlockEdit) => {
	let activeColor = '';

	return (props) => {
		if (isValidBlockType(props.name) && props.isSelected) {
			if (props.attributes.color) {
				activeColor = props.attributes.color;
			} else {
				activeColor = '#fffd6b';
			}

			return (
				<>
					<BlockEdit {...props} />
					<BlockControls>
						<ToolbarGroup>
							<LinkToolbar
								linkUrl={props.attributes.linkUrl}
								setLinkUrl={(url) =>
									props.setAttributes({ linkUrl: url })
								}
								linkTarget={props.attributes.linkTarget}
								setLinkTarget={(target) =>
									props.setAttributes({ linkTarget: target })
								}
							/>
						</ToolbarGroup>
					</BlockControls>
					<InspectorControls>
						<PanelBody
							title={__('Border Color', 'vk-blocks-pro')}
							initialOpen={false}
							className="group-border-color-controle"
						>
							<p className="font-size-11px alert alert-danger">
								{__(
									'Because of the theme that enabled theme.json become can specify the color from border panel that, specification from here is deprecated.',
									'vk-blocks-pro'
								)}
							</p>
							<ColorPalette
								value={activeColor}
								disableCustomColors={true}
								onChange={(newColor) => {
									let newClassName =
										convertColorClass(newColor);

									if (props.attributes.className) {
										let inputClassName =
											props.attributes.className;

										inputClassName =
											inputClassName.split(' ');

										const filterClassName =
											inputClassName.filter(
												function (name) {
													return (
														-1 ===
														name.indexOf('vk-has-')
													);
												}
											);

										filterClassName.push(newClassName);

										newClassName =
											filterClassName.join(' ');
									}

									activeColor = newColor;
									props.setAttributes({
										className: newClassName,
										color: newColor,
									});
								}}
							/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		}
		return <BlockEdit {...props} />;
	};
}, 'addMyCustomBlockControls');

addFilter('editor.BlockEdit', 'vk-blocks/group-style', addBlockControl);

/**
 * Define the save function for the group block, including link settings.
 *
 * @param {Object} props The block properties.
 * @return {JSX.Element} The saved content.
 */
const save = (props) => {
	const { attributes } = props;
	const { linkUrl, linkTarget, className } = attributes;

	// Use block properties, setting className to include has-link if linkUrl is present
	const blockProps = useBlockProps.save({
		className: linkUrl ? `${className} has-link` : className,
	});

	// Determine rel attribute based on linkTarget
	const relAttribute =
		linkTarget === '_blank' ? 'noopener noreferrer' : 'noopener';

	// Extract prefix for custom link class
	const prefix = 'wp-block-group';

	return (
		<div {...blockProps}>
			{linkUrl && (
				<a
					href={linkUrl}
					target={linkTarget}
					rel={relAttribute}
					aria-label={__('Group link', 'vk-blocks-pro')}
					className={`${prefix}-vk-link`}
				></a>
			)}
			<InnerBlocks.Content />
		</div>
	);
};

// Support for existing group blocks and version management
import { assign } from 'lodash';

/**
 * Override block settings to include custom save function and attributes.
 *
 * @param {Object} settings The block settings.
 * @param {string} name     The block name.
 * @return {Object} The modified block settings.
 */
const overrideBlockSettings = (settings, name) => {
	if (name === 'core/group') {
		const newSettings = assign({}, settings, {
			save,
		});
		// Support for existing group blocks by adding default values for new attributes
		if (!newSettings.attributes.linkUrl) {
			newSettings.attributes.linkUrl = {
				type: 'string',
				default: '',
			};
		}
		if (!newSettings.attributes.linkTarget) {
			newSettings.attributes.linkTarget = {
				type: 'string',
				default: '',
			};
		}
		return newSettings;
	}
	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'vk-blocks/group-save',
	overrideBlockSettings
);

registerBlockVariation('core/group', {
	name: 'alert-test',
	title: __('Alert Test', 'vk-blocks-pro'),
	scope: ['inserter'],
	icon: <Icon />,
	category: 'vk-blocks-variation',
	attributes: {
		className: 'is-style-vk-group-alert-warning',
		layout: {
			type: 'constrained',
		},
	},
	keyword: __('alert', 'vk-blocks-pro'),
	innerBlocks: [
		{
			name: 'core/columns',
			innerBlocks: [
				{
					name: 'core/column',
					attributes: {
						width: '50px',
					},
					innerBlocks: [
						{
							name: 'core/group',
							attributes: {
								layout: {
									type: 'constrained',
								},
							},
							innerBlocks: [
								{
									name: 'vk-blocks/icon',
									attributes: {
										faIcon: '<i class="fas fa-exclamation-triangle"></i>',
										iconSize: '24',
										iconMargin: 0,
										iconRadius: 0,
										iconAlign: 'center',
										iconType: '2',
										iconColor: '#bd8c06',
									},
								},
								{
									name: 'core/paragraph',
									attributes: {
										align: 'center',
										content: 'Point',
									},
								},
							],
						},
					],
				},
				{
					name: 'core/column',
					attributes: {
						width: '90%',
					},
					innerBlocks: [
						{
							name: 'core/group',
							attributes: {
								style: {
									border: {
										left: {
											color: '#c9960b',
										},
									},
									spacing: {
										padding: {
											left: 'var:preset|spacing|40',
										},
									},
								},
								layout: {
									type: 'constrained',
								},
							},
							innerBlocks: [
								{
									name: 'core/paragraph',
									attributes: {
										content:
											'この記事は Lightning 15.4 以降でのみ有効です。最新版にアップデートしてご確認ください。',
									},
								},
							],
						},
					],
				},
			],
		},
	],
});