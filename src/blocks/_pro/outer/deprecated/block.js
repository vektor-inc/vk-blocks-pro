import React from "react";
import {schema} from "./schema";
import {Component} from "./component";

export const deprecated = [
    {
        attributes: schema,

        save({attributes}) {
            {
                if (vk_blocks_check.is_pro) {

                    return (
                        <Component
                            attributes={attributes}
                            for_={'save'}/>
                    );

                }
            }

        },
    }
];
