import { kebabCase } from 'lodash';

export const sanitizeSlug = (slug) => {
	return kebabCase(slug);
};
