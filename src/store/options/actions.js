import { GET_OPTIONS, POPULATE_OPTIONS } from './types';
export function getOptions() {
    return {
        type: GET_OPTIONS
    };
}

export function populateOptions(options) {
    return {
        type: POPULATE_OPTIONS,
        options,
    };
}
