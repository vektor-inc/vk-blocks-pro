import { GET_OPTIONS, POPULATE_OPTIONS } from './types';

const DEFAULT_STATE = { options: {} };

const reducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case POPULATE_OPTIONS:
			return { ...state, options: action.options };
		default:
			return state;
	}
};

export default reducer;