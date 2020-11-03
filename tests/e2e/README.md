# e2e test

 Welocome to VK Blocks's E2E Test.
 We implement E2E tests by [wp-scripts](https://developer.wordpress.org/block-editor/packages/packages-scripts/#test-e2e).

 ## Notes
 - WordPress version for E2E test is specified by wp-env.
 - You can use [@wordpress/e2e-test-utils](https://github.com/WordPress/gutenberg/tree/master/packages/e2e-test-utils)
	- Notes: You need to specify 1 element for using this library (Maybe). For example, if you want to click "View Post button", check there is one. Otherwise it works buggy.
	- You can also use way of dom, like below.

	```

	const contents = await page.evaluate(() => {
			return document.querySelector(".entry-content").innerText;
	});

	```

## Reference
- https://github.com/liip/e2e-tests-example-wp-plugin
