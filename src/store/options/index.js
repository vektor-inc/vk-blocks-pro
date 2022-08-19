import { createReduxStore, register } from '@wordpress/data';
import reducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';
import * as resolvers from './resolvers';
import controls from './controls';

const store = createReduxStore('vk-blocks-pro/options', {
	reducer,
	selectors,
	actions,
	resolvers,
	controls,
});

register(store);
