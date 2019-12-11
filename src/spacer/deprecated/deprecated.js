import React from "react";
import {SpacerComponentV1,SpacerComponentV2} from "./component";
import {schema} from './schema';
const {RichText} = wp.editor;

export const deprecated = [
    {
        attributes: schema,
        save({attributes}) {
            return (
                <SpacerComponentV2 attributes={attributes}/>
            );
        },
    },
    {
        attributes: schema,
        save({attributes}) {
            return (
                <SpacerComponentV1 attributes={attributes}/>
            );
        },
    }
];
