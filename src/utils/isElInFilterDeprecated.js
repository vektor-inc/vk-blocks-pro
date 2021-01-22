/**
 * Check element in blocks.getSaveElement filter is deprecated or not.
 * @param {*} element
 * @return {string | boolean} DeprecatedComponentName or false
 */
export default function isElInFilterDeprecated(element){
	if(element.hasOwnProperty('type') && element.type.name){
		return element.type.name
	} else {
		return false
	}
}
