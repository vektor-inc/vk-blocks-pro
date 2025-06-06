import { select, dispatch } from '@wordpress/data';
/**
 * 下記は vkbBlockEditor でしか使われていなかったのでコメントアウト
 * vkbBlockEditor が復活したり他で必要になったときのために一応残す
 */
// import * as blockEditor from '@wordpress/block-editor';
// import * as editor from '@wordpress/editor';
import ServerSideRender from '@wordpress/server-side-render';
import * as components from '@wordpress/components';

/*
・vkbBlockEditor はすでに使われていない
・@wordpress/editor を読み込むと 外観 > ウィジェット で怒られる
("wp-editor" script should not be enqueued together with the new widgets editor (wp-edit-widgets or wp-customize-widgets).)

上記の点からコメントアウトしました

export const vkbBlockEditor =
	blockEditor && blockEditor.BlockEdit ? blockEditor : editor;
*/
export const depServerSideRender = () => {
	if (ServerSideRender) {
		return ServerSideRender;
	}
	return components.ServerSideRender;
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
               // Replace escaped Unicode double quotes with actual quotes.
               text = text.replace(/\\u0022/g, '"');
       }

	return text;
};
