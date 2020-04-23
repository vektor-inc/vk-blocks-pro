import { schema, schema_v1 } from "./schema";
import { ComponentV0, ComponentV1, ComponentForTemplate } from "./component";

export const deprecated = [
  //ブロックテンプレート用のdeprecated
  {
    attributes: schema_v1,
    save({ attributes, className }) {
      {
        return (
          <ComponentForTemplate
            attributes={attributes}
            className={className}
            for_={"save"}
          />
        );
      }
    }
  },
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
