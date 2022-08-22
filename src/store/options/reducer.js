import { POPULATE_OPTIONS } from './types';

const DEFAULT_STATE = {
	vkBlocksOption: {},
	balloonMeta: {},
};

const reducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case POPULATE_OPTIONS:
			return {
				...state,
				[action.optionType]: action.options,
			};

		default:
			return state;
	}
};

export default reducer;
