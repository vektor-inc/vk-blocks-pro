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
	const { linkUrl, linkTarget, className = '', url, dimRatio, customOverlayColor, overlayColor } = attributes;

	const blockProps = useBlockProps.save({
		className: className,
	});

	const relAttribute = linkTarget === '_blank' ? 'noopener noreferrer' : 'noopener';

	const textColorClass = getTextColorClass(customOverlayColor || overlayColor);

	return (
		<div {...blockProps}>
			{linkUrl && (
				<a
					href={linkUrl}
					target={linkTarget}
					rel={relAttribute}
					aria-label={__('Cover link', 'vk-blocks-pro')}
					className="wp-block-cover-vk-link"
				></a>
			)}
			<span
				aria-hidden="true"
				className={`wp-block-cover__background has-background-dim-${dimRatio} has-${overlayColor}-background-color`}
				style={{ backgroundColor: customOverlayColor }}
			></span>
			{url && (
				<img
					className="wp-block-cover__image-background"
					alt=""
					src={url}
					data-object-fit="cover"
				/>
			)}
			<div className={`wp-block-cover__inner-container ${textColorClass}`}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

/**
 * Determine the appropriate text color class based on the overlay color.
 *
 * @param {string} overlayColor The overlay color.
 * @return {string} The text color class.
 */
const getTextColorClass = (overlayColor) => {
	// Convert hex color to RGB
	const hexToRgb = (hex) => {
		if (hex.startsWith('#')) {
			hex = hex.slice(1);
		}
		const r = parseInt(hex.slice(0, 2), 16);
		const g = parseInt(hex.slice(2, 4), 16);
		const b = parseInt(hex.slice(4, 6), 16);
		return [r, g, b];
	};

	// Calculate luminance
	const calculateLuminance = (rgb) => {
		const [r, g, b] = rgb.map((v) => {
			v /= 255;
			return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
		});
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};

	const rgb = hexToRgb(overlayColor);
	const luminance = calculateLuminance(rgb);

	// Return appropriate class based on luminance
	return luminance > 0.5 ? 'has-dark-text-color' : 'has-light-text-color';
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
