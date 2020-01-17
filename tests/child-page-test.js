const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //画像はスキップ
  await page.setRequestInterception(true);
  page.on("request", request => {
    if (request.resourceType() === "image") request.abort();
    else request.continue();
  });

  //1440x900にディスプレイサイズ設定
  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 1
  });

  //ログイン画面に移動
  await page.goto("http://vccw.test/wp-login.php");

  await page.screenshot({ path: "tests/child-page1.png" });

  //ログイン
  await page.type("#user_login", "vektor");
  await page.type("#user_pass", "vektor");
  await page.click("#wp-submit");

  //投稿画面に移動
  await page.goto("http://vccw.test/wp-admin/post-new.php");

  await page.type("#user_pass", "vektor");

  await page.type(
    ".rich-text.editor-rich-text__editable.block-editor-rich-text__editable.wp-block-paragraph",
    "/child-page"
  );
  await page.click(
    "button.components-button.components-autocomplete__result.editor-autocompleters__block.is-selected"
  );

  //スクショ撮る
  await page.screenshot({ path: "tests/child-page.png" });

  await browser.close();
})();
