import { POPULATE_OPTIONS } from './types';

const DEFAULT_STATE = {
    vkBlocksOption: {},
    balloonMeta: {}
 };

const reducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case POPULATE_OPTIONS:
			const a = {
                ...state,
                 [action.optionType]: action.options
            };
            console.log(a);
            return a;
		default:
			return state;
	}
};

export default reducer;
