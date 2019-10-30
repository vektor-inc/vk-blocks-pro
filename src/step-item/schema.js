import {dcpSchema} from "../_helper/default-color-palette";
import {faSchema} from "../_helper/font-awesome";

const originalSchema = {
    content: {
        source: 'html',
        selector: 'p',
    },
    iconStyle: {
        type: 'string',
        default: 'default',
    },
};

let mergeSchema = () => {
    return Object.assign(originalSchema, dcpSchema, faSchema);
};

export const schema = mergeSchema();
