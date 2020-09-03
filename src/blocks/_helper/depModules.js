const { select, dispatch } = wp.data;

export const vkbBlockEditor = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
export const depServerSideRender = () => {
	if (wp.serverSideRender) {
		return wp.serverSideRender;
	} 
		return wp.components.ServerSideRender;
	
}
export const selectEditor = select("core/block-editor")
	? select("core/block-editor")
	: select("core/editor");
export const dispatchEditor = dispatch("core/block-editor")
	? dispatch("core/block-editor")
	: dispatch("core/editor");
