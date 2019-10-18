import React from "react";
import {SpacerComponent} from "./component";
import {schema} from './schema';
const {RichText} = wp.editor;

export const deprecated = [
    {
        attributes: schema,
        save({attributes}) {
            return (
                <SpacerComponent attributes={attributes}/>
            );
        },
    }
];
