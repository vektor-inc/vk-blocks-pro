import { select, dispatch } from '@wordpress/data';
import * as blockEditor from '@wordpress/block-editor';
import * as Editor from '@wordpress/editor';
import ServerSideRender from '@wordpress/server-side-render';
import * as Components from '@wordpress/components';

export const vkbBlockEditor = blockEditor && blockEditor.BlockEdit ? blockEditor : Editor;
export const depServerSideRender = () => {
	if ( ServerSideRender ) {
		return ServerSideRender;
	}
		return Components.ServerSideRender;

}

export const selectEditor = select("core/block-editor")
	? select("core/block-editor")
	: select("core/editor");
export const dispatchEditor = dispatch("core/block-editor")
	? dispatch("core/block-editor")
	: dispatch("core/editor");

//fixBrokenUnicode.jsに同じ関数がある。リファクタリング後に移行。
export const isValidJson = ( value ) => {
	try {
		JSON.parse( value )
	} catch (e) {
		return false
	}
	return true
};
//fixBrokenUnicode.jsに同じ関数がある。リファクタリング後に移行。
export const fixBrokenUnicode = ( text ) => {
	if ( !isValidJson( text ) ) {
		text = text.replace( /u0022/g, '"' );
	}

	return text;
}
