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
    content: `<!-- wp:media-text {"mediaPosition":"right","mediaId":150,"mediaType":"image","isStackedOnMobile":true} -->
	<div class="wp-block-media-text alignwide has-media-on-the-right is-stacked-on-mobile"><figure class="wp-block-media-text__media"><img src="https://www.vektor-inc.co.jp/wp-content/uploads/2019/11/eyecatch-pr-block.jpg" alt="" class="wp-image-150"/></figure><div class="wp-block-media-text__content"><!-- wp:heading {"level":3,"className":"is-style-vk-heading-plain"} -->
	<h3 class="is-style-vk-heading-plain"><strong>自社のコンセプトや、キャッチコピーが入ります。</strong></h3>
	<!-- /wp:heading -->
	
	<!-- wp:paragraph -->
	<p>この部分には、自社について説明が入ります。<br>自社のコンセプトや理念など、大切にしていることについて説明しましょう。お客様に一番伝えたいことを書くことをおススメします。</p>
	<!-- /wp:paragraph -->
	
	<!-- wp:button {"customBackgroundColor":"#cf0013"} -->
	<div class="wp-block-button"><a class="wp-block-button__link has-background" style="background-color:#cf0013">さらに詳しく</a></div>
	<!-- /wp:button --></div></div>
	<!-- /wp:media-text -->`
  },
  {
    name: "Three PR",
    icon: "📣",
    content: `<!-- wp:vk-blocks/outer {"bgColor":"#313131","bgImage":"","outerWidth":"full","opacity":0.4} -->
	<div class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-use vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(49, 49, 49, 0.4), rgba(49, 49, 49, 0.4));border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/heading {"align":"center","titleStyle":"plain","outerMarginBottom":0,"titleColor":"#ffffff","titleMarginBottom":0} -->
	<div class="wp-block-vk-blocks-heading vk_heading vk_heading-style-plain" style="margin-bottom:0rem"><h2 style="color:#ffffff;font-size:2rem;margin-bottom:0rem;text-align:center" class="vk_heading_title vk_heading_title-style-plain" placeholder="Input title…"><strong> 自社の3つの特長などが入ります </strong></h2><p style="color:#000000;font-size:1.2rem;text-align:center" class="vk_heading_subtext vk_heading_subtext-style-plain" placeholder="Input sub text…"></p></div>
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
	
	<!-- wp:button {"customBackgroundColor":"#cf0013","align":"center"} -->
	<div class="wp-block-button aligncenter"><a class="wp-block-button__link has-background" style="background-color:#cf0013">さらに詳しく</a></div>
	<!-- /wp:button -->
	
	<!-- wp:spacer -->
	<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->`
  },
  {
    name: "News",
    icon: "🗞",
    content: `<!-- wp:vk-blocks/outer {"bgColor":"#313131","bgImage":"","outerWidth":"full","opacity":0.3} -->
	<div class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-use vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(49, 49, 49, 0.3), rgba(49, 49, 49, 0.3));border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/heading {"align":"center","titleStyle":"plain","outerMarginBottom":0,"titleColor":"#ffffff","titleMarginBottom":0} -->
	<div class="wp-block-vk-blocks-heading vk_heading vk_heading-style-plain" style="margin-bottom:0rem"><h2 style="color:#ffffff;font-size:2rem;margin-bottom:0rem;text-align:center" class="vk_heading_title vk_heading_title-style-plain" placeholder="Input title…"><strong>お知らせなどが入ります</strong></h2><p style="color:#000000;font-size:1.2rem;text-align:center" class="vk_heading_subtext vk_heading_subtext-style-plain" placeholder="Input sub text…"></p></div>
	<!-- /wp:vk-blocks/heading --></div></div>
	<!-- /wp:vk-blocks/outer -->
	
	<!-- wp:vk-blocks/spacer {"pc":100} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:100px"></div><div class="vk_spacer-display-tablet" style="height:30px"></div><div class="vk_spacer-display-mobile" style="height:20px"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	
	<!-- wp:vk-blocks/post-list {"name":"vk-blocks/post-list","coreTerms":"{}"} /-->
	
	<!-- wp:button {"customBackgroundColor":"#cf0013","align":"center"} -->
	<div class="wp-block-button aligncenter"><a class="wp-block-button__link has-background" style="background-color:#cf0013">一覧を見る</a></div>
	<!-- /wp:button -->
	
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
	
	<!-- wp:button {"customBackgroundColor":"#cf0013","align":"center"} -->
	<div class="wp-block-button aligncenter"><a class="wp-block-button__link has-background" style="background-color:#cf0013">お問い合わせはこちら</a></div>
	<!-- /wp:button -->
	
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
