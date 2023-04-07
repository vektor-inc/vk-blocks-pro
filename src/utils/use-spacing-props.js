/**
 * WordPress dependencies
 */
import { getCSSRules } from '@wordpress/style-engine';

export function getInlineStyles(styles = {}) {
	const output = {};
	// The goal is to move everything to server side generated engine styles
	// This is temporary as we absorb more and more styles into the engine.
	getCSSRules(styles).forEach((rule) => {
		output[rule.key] = rule.value;
	});

	return output;
}

// This utility is intended to assist where the serialization of the spacing
// block support is being skipped for a block but the spacing related CSS
// styles still need to be generated so they can be applied to inner elements.

/**
 * Provides the CSS class names and inline styles for a block's spacing support
 * attributes.
 *
 * @param {Object} attributes Block attributes.
 *
 * @return {Object} Spacing block support derived CSS classes & styles.
 */
export function getSpacingClassesAndStyles(attributes) {
	const { style } = attributes;

	// Collect inline styles for spacing.
	const spacingStyles = style?.spacing || {};
	const styleProp = getInlineStyles({ spacing: spacingStyles });

	return {
		style: styleProp,
	};
}
