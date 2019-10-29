import {dcpSchema} from "../_helper/default-color-palette";
import {faSchema} from "../_helper/font-awesome";


let mergeSchema = () => {
  return Object.assign(originalSchema, dcpSchema, faSchema);
};

const originalSchema = {
  content: {
    source: 'html',
    selector: 'p',
  }
};

export const schema = mergeSchema();
