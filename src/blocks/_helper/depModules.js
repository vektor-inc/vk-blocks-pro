export const vkbBlockEditor = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
export const depServerSideRender = () => {
    if (wp.serverSideRender) {
        return wp.serverSideRender;
    } else {
        return wp.components.ServerSideRender;
    }
}