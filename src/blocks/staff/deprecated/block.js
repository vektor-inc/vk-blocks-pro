import React from "react";
import {schema} from "./schema";
import {NewComponent} from "./block";

export const deprecated = [
    {
        attributes: schema,

        save({attributes}) {
            const {
                heading,
            } = attributes;

            return (
                <div className="vk_staff">
                    <div>Front</div>
                    <NewComponent
                        attributes={attributes}
                        for_={'save'}
                    />
                </div>
            );
        },
    }
];
