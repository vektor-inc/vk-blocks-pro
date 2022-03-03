export const convertColorClass = ( color ) => {
	switch ( color ) {
		case '#f78da7':
			return 'vk-has-pale-pink-color';

		case '#cf2e2e':
			return 'vk-has-vivid-red-color';

		case '#ff6900':
			return 'vk-has-luminous-vivid-orange-color';

		case '#fcb900':
			return 'vk-has-luminous-vivid-amber-color';

		case '#7bdcb5':
			return 'vk-has-light-green-cyan-color';

		case '#00d084':
			return 'vk-has-vivid-green-cyan-color';

		case '#8ed1fc':
			return 'vk-has-pale-cyan-blue-color';

		case '#0693e3':
			return 'vk-has-vivid-cyan-blue-color';

		case '#9b51e0':
			return 'vk-has-vivid-purple-color';

		case '#eee':
			return 'vk-has-very-light-gray-color';

		case '#abb8c3':
			return 'vk-has-cyan-bluish-gray-color';

		case '#313131':
			return 'vk-has-very-dark-gray-color';

		case '#ffffff':
			return 'vk-has-white-color';
	}
};
