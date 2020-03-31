import { schema, schema_v1 } from "./schema";
import { ComponentV0, ComponentV1 } from "./component";

export const deprecated = [
  {
    attributes: schema_v1,

    save({ attributes, className }) {
      {
        return (
          <ComponentV1
            attributes={attributes}
            className={className}
            for_={"save"}
          />
        );
      }
    }
  },
  {
    attributes: schema,

    save({ attributes }) {
      {
        if (vk_blocks_check.is_pro) {
          return <ComponentV0 attributes={attributes} for_={"save"} />;
        }
      }
    }
  }
];
