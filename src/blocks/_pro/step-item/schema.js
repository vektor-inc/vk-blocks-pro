import {faSchema} from "../../_helper/font-awesome";

export const originalSchema = {
    color: {
        type: 'string',
        default: '#337ab7',
    },
    style: {
        type: 'string',
        default: 'solid',
    },
    styleLine: {
        type: 'string',
        default: 'default',
    },
    dotCaption: {
        type: 'string',
        default: 'STEP',
    },
    dotNum: {
        type: 'number',
        default: 1,
    }
};


let mergeSchema = () => {
    return Object.assign(originalSchema, faSchema);
};

export const schema = mergeSchema();
