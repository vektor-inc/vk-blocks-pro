import { schema, schema_v1,schema_v2 } from "./schema";
import { ComponentV0, ComponentV1, ComponentForTemplate0, ComponentForTemplate1, ComponentForTemplate2, ComponentForTemplate3, ComponentForTemplate4, ComponentForTemplate5, ComponentForTemplate6 } from "./component";
import {ComponentV3} from './componentv3'
import {ComponentV2_1} from './componentv2'

export const deprecated = [
	// -> 0.37.4
	{
		attributes: schema_v2,
		save(props) {
			const { attributes, className } = props;
			return (
				<ComponentV3
					clientId={attributes.clientId}
					attributes={attributes}
					className={className}
					for_={"save"}
				/>
			);
		},
	},
	//ブロックテンプレート用のdeprecated
	{
		attributes: schema_v2,
		save(props) {
			const { attributes, className } = props;
			return (
				<ComponentV2_1
					clientId={attributes.clientId}
					attributes={attributes}
					className={className}
					for_={"save"}
				/>
			);
		},
	},
  {
    attributes: schema_v1,
    save({ attributes, className }) {
      {
        return (
          <ComponentForTemplate6
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
          <ComponentForTemplate5
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
          <ComponentForTemplate4
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
          <ComponentForTemplate3
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
          <ComponentForTemplate2
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
          <ComponentForTemplate1
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
          <ComponentForTemplate0
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
