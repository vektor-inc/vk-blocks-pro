export const wpEditor = () => {
    if(wp.blockEditor !== undefined){
        return wp.blockEditor;
    }else {
        return wp.editor;
    }
};
