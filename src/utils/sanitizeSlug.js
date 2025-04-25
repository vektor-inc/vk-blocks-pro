// Sanitize function to normalize slugs
export const sanitizeSlug = (slug) =>
	slug
		?.replace(/[^a-z0-9\-]/gi, '-') // Remove unwanted characters
		.replace(/-{2,}/g, '-') // Replace multiple hyphens with a single one
		.replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
