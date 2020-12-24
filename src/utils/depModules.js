import { select, dispatch } from '@wordpress/data';

export const vkbBlockEditor =
	wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
export const depServerSideRender = () => {
	if (wp.serverSideRender) {
		return wp.serverSideRender;
	}
	return wp.components.ServerSideRender;
};
export const selectEditor = select('core/block-editor')
	? select('core/block-editor')
	: select('core/editor');
export const dispatchEditor = dispatch('core/block-editor')
	? dispatch('core/block-editor')
	: dispatch('core/editor');

//fixBrokenUnicode.jsに同じ関数がある。リファクタリング後に移行。
export const isValidJson = (value) => {
	try {
		JSON.parse(value);
	} catch (e) {
		return false;
	}
	return true;
};
//fixBrokenUnicode.jsに同じ関数がある。リファクタリング後に移行。
export const fixBrokenUnicode = (text) => {
	if (!isValidJson(text)) {
		text = text.replace(/u0022/g, '"');
	}

	return text;
};
