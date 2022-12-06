import { POPULATE_OPTIONS } from './types';

const DEFAULT_STATE = {
};

const reducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case POPULATE_OPTIONS:
			return {
				...state,
				vkBlocksOption: action.options.vkBlocksOption,
				vkBlocksBalloonMeta: action.options.vkBlocksBalloonMeta
			};
		default:
			return state;
	}
};

export default reducer;
