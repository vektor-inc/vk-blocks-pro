import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test('login', async ({ page }) => {
  await page.goto('http://localhost:8889/wp-login.php');
  await page.getByLabel('Username or Email Address').click();
  await page.getByLabel('Username or Email Address').fill('admin');
  await page.getByLabel('Username or Email Address').press('Tab');
  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.goto('http://localhost:8889/wp-admin/');
  await page.waitForTimeout(1000);
});