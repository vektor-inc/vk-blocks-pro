/**
 * WordPress dependencies
 */
import {
    insertBlock,
    getEditedPostContent,
    createNewPost,
    pressKeyWithModifier,
} from '@wordpress/e2e-test-utils';

describe('Ballon', () => {
    beforeEach( async () => {
		await createNewPost();
	} );
});
