/**
 * cover-style block type
 *
 * @package
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { ToolbarGroup } from '@wordpress/components';
import {
	BlockControls,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import LinkToolbar from '@vkblocks/components/link-toolbar';

/**
 * Check if the block type is valid for customization.
 *
 * @param {string} name The name of the block type.
 * @return {boolean} Whether the block type is valid.
 */
const isValidBlockType = (name) => {
	const validBlockTypes = ['core/cover'];
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
addFilter('blocks.registerBlockType', 'vk-blocks/cover-style', addAttribute);

/**
 * Add custom controls to the block edit interface.
 *
 * @param {Function} BlockEdit The block edit component.
 * @return {Function} The modified block edit component.
 */
export const addBlockControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (isValidBlockType(props.name) && props.isSelected) {
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
				</>
			);
		}
		return <BlockEdit {...props} />;
	};
}, 'addMyCustomBlockControls');

addFilter('editor.BlockEdit', 'vk-blocks/cover-style', addBlockControl);

/**
 * Define the save function for the cover block, including link settings.
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
	const prefix = 'wp-block-cover';

	return (
		<div {...blockProps}>
			{linkUrl && (
				<a
					href={linkUrl}
					target={linkTarget}
					rel={relAttribute}
					aria-label={__('Cover link', 'vk-blocks-pro')}
					className={`${prefix}-vk-link`}
				></a>
			)}
			<InnerBlocks.Content />
		</div>
	);
};

// Support for existing cover blocks and version management
import { assign } from 'lodash';

/**
 * Override block settings to include custom save function and attributes.
 *
 * @param {Object} settings The block settings.
 * @param {string} name     The block name.
 * @return {Object} The modified block settings.
 */
const overrideBlockSettings = (settings, name) => {
	if (name === 'core/cover') {
		const newSettings = assign({}, settings, {
			save,
		});
		// Support for existing cover blocks by adding default values for new attributes
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
	'vk-blocks/cover-save',
	overrideBlockSettings
);
