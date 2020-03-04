/**
 * WordPress dependencies
 */
const { parse } = wp.blocks;

/**
 * External dependencies
 */
import memoize from "memize";

const defaultTemplates = [
  {
    name: "About",
    icon: "👋",
    content: `<!-- wp:vk-blocks/spacer {"pc":100} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:100px"></div><div class="vk_spacer-display-tablet" style="height:30px"></div><div class="vk_spacer-display-mobile" style="height:20px"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	
	<!-- wp:vk-blocks/pr-content {"url":"https://example.com","buttonColorCustom":"#cf2e2e","Image":"https://www.vektor-inc.co.jp/wp-content/uploads/2020/02/pr-img.png","layout":"right"} -->
	<div class="wp-block-vk-blocks-pr-content vk_prContent vk_prContent-layout-imageRight"><div class="col-sm-6 vk_prContent_colImg"><img class="vk_prContent_colImg_image" src="https://www.vektor-inc.co.jp/wp-content/uploads/2020/02/pr-img.png" alt="画像をアップロード" style="border:none"/></div><div class="col-sm-6 vk_prContent_colTxt"><h3 class="vk_prContent_colTxt_title">自社のコンセプトや、キャッチコピーが入ります。</h3><p class="vk_prContent_colTxt_text">この部分には、自社について説明が入ります。<br>自社のコンセプトや理念など、大切にしていることについて説明しましょう。お客様に一番伝えたいことを書くことをおススメします。</p><div class="vk_button vk_button-color-custom"><a href="https://example.com" class="btn btn-block vk_button_link vk_prContent_colTxt_btn btn-primary" style="background-color:#cf2e2e;border:1px solid #cf2e2e" rel="noopener noreferrer"><span class="vk_button_link_txt">さらに詳しく</span></a></div></div></div>
	<!-- /wp:vk-blocks/pr-content -->
	
	<!-- wp:vk-blocks/spacer {"pc":100} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:100px"></div><div class="vk_spacer-display-tablet" style="height:30px"></div><div class="vk_spacer-display-mobile" style="height:20px"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	`
  },
  {
    name: "Three PR",
    icon: "📣",
    content: `<!-- wp:vk-blocks/outer {"bgColor":"#313131","bgImage":"","outerWidth":"full","opacity":0.4} -->
	<div class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-use vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(49, 49, 49, 0.4), rgba(49, 49, 49, 0.4));border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/heading {"align":"center","titleStyle":"plain","titleColor":"#ffffff"} -->
	<div class="wp-block-vk-blocks-heading vk_heading vk_heading-style-plain"><h2 style="color:#ffffff;font-size:2rem;margin-bottom:1rem;text-align:center" class="vk_heading_title vk_heading_title-style-plain" placeholder="タイトルを入力"><strong>自社の3つの特徴などが入ります</strong></h2><p style="color:#000000;font-size:1.2rem;text-align:center" class="vk_heading_subtext vk_heading_subtext-style-plain" placeholder="サブテキストを入力"></p></div>
	<!-- /wp:vk-blocks/heading --></div></div>
	<!-- /wp:vk-blocks/outer -->
	
	<!-- wp:vk-blocks/spacer {"pc":100} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:100px"></div><div class="vk_spacer-display-tablet" style="height:30px"></div><div class="vk_spacer-display-mobile" style="height:20px"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	
	<!-- wp:vk-blocks/pr-blocks {"icon1":"fas fa-pencil-alt","color1":"#cf0013","bgType1":"1","icon2":"fas fa-home","color2":"#cf0013","bgType2":"1","icon3":"fas fa-calculator","color3":"#cf0013","bgType3":"1"} -->
	<div class="wp-block-vk-blocks-pr-blocks vk_prBlocks row"><div class="vk_prBlocks_item col-sm-4"><div class="vk_prBlocks_item_icon_outer" style="background-color:transparent;border:1px solid #cf0013"><i class="fas fa-pencil-alt vk_prBlocks_item_icon" style="color:#cf0013"></i></div><h3 class="vk_prBlocks_item_title vk_prBlocks_item_title-1">自社の強み</h3><p class="vk_prBlocks_item_summary vk_prBlocks_item_summary-1">この部分には自社の強みの説明が入ります。文字数は約50文字前後です。内容に応じてテキストを変更してください。</p></div><div class="vk_prBlocks_item col-sm-4"><div class="vk_prBlocks_item_icon_outer" style="background-color:transparent;border:1px solid #cf0013"><i class="fas fa-home vk_prBlocks_item_icon" style="color:#cf0013"></i></div><h3 class="vk_prBlocks_item_title vk_prBlocks_item_title-2">自社の強み</h3><p class="vk_prBlocks_item_summary vk_prBlocks_item_summary-2">この部分には自社の強みの説明が入ります。文字数は約50文字前後です。内容に応じてテキストを変更してください。</p></div><div class="vk_prBlocks_item col-sm-4"><div class="vk_prBlocks_item_icon_outer" style="background-color:transparent;border:1px solid #cf0013"><i class="fas fa-calculator vk_prBlocks_item_icon" style="color:#cf0013"></i></div><h3 class="vk_prBlocks_item_title vk_prBlocks_item_title-3">自社の強み</h3><p class="vk_prBlocks_item_summary vk_prBlocks_item_summary-3">この部分には自社の強みの説明が入ります。文字数は約50文字前後です。内容に応じてテキストを変更してください。</p></div></div>
	<!-- /wp:vk-blocks/pr-blocks -->
	
	<!-- wp:vk-blocks/spacer {"pc":50} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:50px"></div><div class="vk_spacer-display-tablet" style="height:30px"></div><div class="vk_spacer-display-mobile" style="height:20px"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	
	<!-- wp:vk-blocks/button {"buttonUrl":"https://example.com/","buttonColorCustom":"#cf2e2e","buttonAlign":"center"} -->
	<div class="wp-block-vk-blocks-button vk_button vk_button-color-custom vk_button-align-center"><a href="https://example.com/" id="vk_button_link" style="background-color:#cf2e2e;border:1px solid #cf2e2e" class="btn vk_button_link btn-primary btn-md" role="button" aria-pressed="true" rel="noopener noreferrer"><span class="vk_button_link_txt">さらに詳しく</span></a></div>
	<!-- /wp:vk-blocks/button -->
	
	<!-- wp:spacer -->
	<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->`
  },
  {
    name: "News",
    icon: "🗞",
    content: `<!-- wp:vk-blocks/outer {"bgColor":"#313131","bgImage":"","outerWidth":"full","opacity":0.3} -->
	<div class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-use vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(49, 49, 49, 0.3), rgba(49, 49, 49, 0.3));border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/heading {"align":"center","titleStyle":"plain","titleColor":"#ffffff"} -->
	<div class="wp-block-vk-blocks-heading vk_heading vk_heading-style-plain"><h2 style="color:#ffffff;font-size:2rem;margin-bottom:1rem;text-align:center" class="vk_heading_title vk_heading_title-style-plain" placeholder="タイトルを入力"><strong>お知らせなどが入ります</strong></h2><p style="color:#000000;font-size:1.2rem;text-align:center" class="vk_heading_subtext vk_heading_subtext-style-plain" placeholder="サブテキストを入力"></p></div>
	<!-- /wp:vk-blocks/heading --></div></div>
	<!-- /wp:vk-blocks/outer -->
	
	<!-- wp:vk-blocks/spacer {"pc":100} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:100px"></div><div class="vk_spacer-display-tablet" style="height:30px"></div><div class="vk_spacer-display-mobile" style="height:20px"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	
	<!-- wp:vk-blocks/post-list {"name":"vk-blocks/post-list","coreTerms":"{\u0022category\u0022:[[\u0022uncategorized\u0022,\u0022Uncategorized\u0022]]}"} /-->
	
	<!-- wp:vk-blocks/button {"buttonUrl":"https://example.com/","buttonColorCustom":"#cf2e2e","buttonAlign":"center"} -->
	<div class="wp-block-vk-blocks-button vk_button vk_button-color-custom vk_button-align-center"><a href="https://example.com/" id="vk_button_link" style="background-color:#cf2e2e;border:1px solid #cf2e2e" class="btn vk_button_link btn-primary btn-md" role="button" aria-pressed="true" rel="noopener noreferrer"><span class="vk_button_link_txt">一覧を見る</span></a></div>
	<!-- /wp:vk-blocks/button -->
	
	<!-- wp:vk-blocks/spacer {"pc":100} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:100px"></div><div class="vk_spacer-display-tablet" style="height:30px"></div><div class="vk_spacer-display-mobile" style="height:20px"></div></div>
	<!-- /wp:vk-blocks/spacer -->`
  },
  {
    name: "Contact",
    icon: "✉️",
    content: `<!-- wp:vk-blocks/outer {"bgColor":"#313131","bgImage":"","outerWidth":"full","opacity":0.3} -->
	<div class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-use vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(49, 49, 49, 0.3), rgba(49, 49, 49, 0.3));border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/spacer {"pc":30} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:30px"></div><div class="vk_spacer-display-tablet" style="height:30px"></div><div class="vk_spacer-display-mobile" style="height:20px"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	
	<!-- wp:heading {"align":"center","customTextColor":"#ffffff","className":"is-style-vk-heading-plain"} -->
	<h2 class="has-text-color has-text-align-center is-style-vk-heading-plain" style="color:#ffffff"><strong>お気軽にご連絡ください</strong><br><strong>など連絡見出しが入ります</strong></h2>
	<!-- /wp:heading -->
	
	<!-- wp:paragraph {"align":"center","customTextColor":"#ffffff"} -->
	<p style="color:#ffffff" class="has-text-color has-text-align-center">この部分には、お問い合わせに繋がりそうな文章がはいります。<br>どんなことが書いてあるとお問い合わせ繋がりそうか、<br>想像しながら書きましょう。文字数は約 80~100 文字前後です。<br>内容に応じてテキストを変更してください。</p>
	<!-- /wp:paragraph -->
	
	<!-- wp:vk-blocks/button {"buttonUrl":"https://example.com/","buttonColorCustom":"#cf2e2e","buttonAlign":"center"} -->
	<div class="wp-block-vk-blocks-button vk_button vk_button-color-custom vk_button-align-center"><a href="https://example.com/" id="vk_button_link" style="background-color:#cf2e2e;border:1px solid #cf2e2e" class="btn vk_button_link btn-primary btn-md" role="button" aria-pressed="true" rel="noopener noreferrer"><span class="vk_button_link_txt">お問い合わせはこちら</span></a></div>
	<!-- /wp:vk-blocks/button -->
	
	<!-- wp:vk-blocks/spacer {"pc":65} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:65px"></div><div class="vk_spacer-display-tablet" style="height:30px"></div><div class="vk_spacer-display-mobile" style="height:20px"></div></div>
	<!-- /wp:vk-blocks/spacer --></div></div>
	<!-- /wp:vk-blocks/outer -->`
  }
];

const parsedTemplates = memoize(() =>
  defaultTemplates.map(template => ({
    ...template,
    blocks: parse(template.content)
  }))
);

export default parsedTemplates;
