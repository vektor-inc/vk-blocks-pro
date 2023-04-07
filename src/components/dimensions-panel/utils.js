/**
 * Attempts to fetch the value of a theme.json CSS variable.
 *
 * @param {Object}   features  GlobalStylesContext config, e.g., user, base or merged. Represents the theme.json tree.
 * @param {string}   blockName The name of a block as represented in the styles property. E.g., 'root' for root-level, and 'core/${blockName}' for blocks.
 * @param {string|*} variable  An incoming style value. A CSS var value is expected, but it could be any value.
 * @return {string|*|{ref}} The value of the CSS var, if found. If not found, the passed variable argument.
 */
export function getValueFromVariable(features, blockName, variable) {
	if (!variable || typeof variable !== 'string') {
		if (variable?.ref && typeof variable?.ref === 'string') {
			const refPath = variable.ref.split('.');
			// variable = get( features, refPath );
			let current = features;
			for (let i = 0; i < refPath.length; i++) {
				current = current[refPath[i]];
			}
			variable = current;
			// Presence of another ref indicates a reference to another dynamic value.
			// Pointing to another dynamic value is not supported.
			if (!variable || !!variable?.ref) {
				return variable;
			}
		} else {
			return variable;
		}
	}
	// const USER_VALUE_PREFIX = 'var:';
	// const THEME_VALUE_PREFIX = 'var(--wp--';
	// const THEME_VALUE_SUFFIX = ')';

	// let parsedVar;

	// if (variable.startsWith(USER_VALUE_PREFIX)) {
	// 	parsedVar = variable.slice(USER_VALUE_PREFIX.length).split('|');
	// } else if (
	// 	variable.startsWith(THEME_VALUE_PREFIX) &&
	// 	variable.endsWith(THEME_VALUE_SUFFIX)
	// ) {
	// 	parsedVar = variable
	// 		.slice(THEME_VALUE_PREFIX.length, -THEME_VALUE_SUFFIX.length)
	// 		.split('--');
	// } else {
	// 	// We don't know how to parse the value: either is raw of uses complex CSS such as `calc(1px * var(--wp--variable) )`
	// 	return variable;
	// }

	// const [type, ...path] = parsedVar;
	// if (type === 'preset') {
	// 	return getValueFromPresetVariable(features, blockName, variable, path);
	// }
	// if (type === 'custom') {
	// 	return getValueFromCustomVariable(features, blockName, variable, path);
	// }
	return variable;
}
