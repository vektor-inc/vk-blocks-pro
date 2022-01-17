import { visitAdminPage } from '@wordpress/e2e-test-utils';

describe('VK Blocks E2E Test Sample', () => {

    it('Sample Test', async () => {
        await visitAdminPage( '/' );
        expect(true).toEqual(true);
    });

});
