import React from "react";
import { SpacerComponentV1, SpacerComponentV2, SpacerComponentV3 } from "./component";
import { schema, schemaV3 } from './schema';

export const deprecated = [
    {
        attributes: schema,
        save({ attributes }) {
            return (
	<SpacerComponentV2 attributes={ attributes } />
            );
        },
    },
    {
        attributes: schema,
        save({ attributes }) {
            return (
	<SpacerComponentV1 attributes={ attributes } />
            );
        },
	},
	{
        attributes: schemaV3,
        save({ attributes }) {
            return (
	<SpacerComponentV3 attributes={ attributes } />
            );
        },
    }
];
