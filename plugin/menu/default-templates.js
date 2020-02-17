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
    content: `<!-- wp:media-text {"mediaPosition":"right","mediaId":61,"mediaType":"image","isStackedOnMobile":true,"imageFill":false} -->
	<div class="wp-block-media-text alignwide has-media-on-the-right is-stacked-on-mobile"><figure class="wp-block-media-text__media"><img src="http://vccw.test/wp-content/uploads/2020/02/dylan-gillis-KdeqA3aTnBY-unsplash-1024x683.jpg" alt="" class="wp-image-61"/></figure><div class="wp-block-media-text__content"><!-- wp:heading {"level":3,"className":"is-style-vk-heading-plain"} -->
	<h3 class="is-style-vk-heading-plain"><strong>人の心を暖かくする、<br>住居。</strong></h3>
	<!-- /wp:heading -->
	
	<!-- wp:paragraph -->
	<p>このページでは、弊社についてを、ご紹介しております。弊社では、様々なお客様に満足していただけるよう、幅広いサービスを行っております。このページでは、弊社のサービスをご紹介しております。</p>
	<!-- /wp:paragraph -->
	
	<!-- wp:button {"customBackgroundColor":"#6a0014"} -->
	<div class="wp-block-button"><a class="wp-block-button__link has-background" style="background-color:#6a0014">さらに詳しく</a></div>
	<!-- /wp:button --></div></div>
	<!-- /wp:media-text -->
	
	<!-- wp:spacer -->
	<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->`
  },
  {
    name: "Three PR",
    icon: "📣",
    content: `<!-- wp:vk-blocks/outer {"bgColor":"#313131","bgImage":"http://vccw.test/wp-content/uploads/2020/02/waldemar-brandt-734Ie1BsViU-unsplash-scaled.jpg","outerWidth":"full","opacity":0.3} -->
	<div class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-use vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(49, 49, 49, 0.3), rgba(49, 49, 49, 0.3)), url(http://vccw.test/wp-content/uploads/2020/02/waldemar-brandt-734Ie1BsViU-unsplash-scaled.jpg);border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/heading {"align":"center","titleStyle":"plain","outerMarginBottom":0,"titleColor":"#ffffff","titleMarginBottom":0} -->
	<div class="wp-block-vk-blocks-heading vk_heading vk_heading-style-plain" style="margin-bottom:0rem"><h2 style="color:#ffffff;font-size:2rem;margin-bottom:0rem;text-align:center" class="vk_heading_title vk_heading_title-style-plain" placeholder="Input title…"> サンプル建設株式会社 3つの特長 </h2><p style="color:#000000;font-size:1.2rem;text-align:center" class="vk_heading_subtext vk_heading_subtext-style-plain" placeholder="Input sub text…"></p></div>
	<!-- /wp:vk-blocks/heading --></div></div>
	<!-- /wp:vk-blocks/outer -->
	
	<!-- wp:vk-blocks/spacer -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:40px"></div><div class="vk_spacer-display-tablet" style="height:30px"></div><div class="vk_spacer-display-mobile" style="height:20px"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	
	<!-- wp:vk-blocks/pr-blocks {"icon1":"fas fa-pencil-alt","color1":"#6a0014","bgType1":"1","icon2":"fas fa-home","color2":"#6a0014","bgType2":"1","icon3":"fas fa-calculator","color3":"#6a0014","bgType3":"1"} -->
	<div class="wp-block-vk-blocks-pr-blocks vk_prBlocks row"><div class="vk_prBlocks_item col-sm-4"><div class="vk_prBlocks_item_icon_outer" style="background-color:transparent;border:1px solid #6a0014"><i class="fas fa-pencil-alt vk_prBlocks_item_icon" style="color:#6a0014"></i></div><h3 class="vk_prBlocks_item_title vk_prBlocks_item_title-1">お客様の理想を形に</h3><p class="vk_prBlocks_item_summary vk_prBlocks_item_summary-1">専門知識を持った設計士が、お客様一人一人に寄り添い丁寧にお話を伺います。ぴったりの提案を致します。</p></div><div class="vk_prBlocks_item col-sm-4"><div class="vk_prBlocks_item_icon_outer" style="background-color:transparent;border:1px solid #6a0014"><i class="fas fa-home vk_prBlocks_item_icon" style="color:#6a0014"></i></div><h3 class="vk_prBlocks_item_title vk_prBlocks_item_title-2">安心・安全な家づくり</h3><p class="vk_prBlocks_item_summary vk_prBlocks_item_summary-2">災害の多い国日本において、安心して暮らせる住居は必須です。大切なご家族をお守りします。</p></div><div class="vk_prBlocks_item col-sm-4"><div class="vk_prBlocks_item_icon_outer" style="background-color:transparent;border:1px solid #6a0014"><i class="fas fa-calculator vk_prBlocks_item_icon" style="color:#6a0014"></i></div><h3 class="vk_prBlocks_item_title vk_prBlocks_item_title-3">シンプルな料金</h3><p class="vk_prBlocks_item_summary vk_prBlocks_item_summary-3">事前に料金を提示し、納得していただいた上で建築を開始します。まずはお気軽にご相談ください。 </p></div></div>
	<!-- /wp:vk-blocks/pr-blocks -->
	
	<!-- wp:button {"customBackgroundColor":"#6a0014","align":"center"} -->
	<div class="wp-block-button aligncenter"><a class="wp-block-button__link has-background" style="background-color:#6a0014">さらに詳しく</a></div>
	<!-- /wp:button -->
	
	<!-- wp:spacer -->
	<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->`
  },
  {
    name: "News",
    icon: "🗞",
    content: `<!-- wp:vk-blocks/outer {"bgColor":"#313131","bgImage":"http://vccw.test/wp-content/uploads/2020/02/armin-djuhic-2ZCls_ZHu3A-unsplash-1-scaled.jpg","outerWidth":"full","opacity":0.3} -->
	<div class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-use vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(49, 49, 49, 0.3), rgba(49, 49, 49, 0.3)), url(http://vccw.test/wp-content/uploads/2020/02/armin-djuhic-2ZCls_ZHu3A-unsplash-1-scaled.jpg);border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/heading {"align":"center","titleStyle":"plain","outerMarginBottom":0,"titleColor":"#ffffff","titleMarginBottom":0} -->
	<div class="wp-block-vk-blocks-heading vk_heading vk_heading-style-plain" style="margin-bottom:0rem"><h2 style="color:#ffffff;font-size:2rem;margin-bottom:0rem;text-align:center" class="vk_heading_title vk_heading_title-style-plain" placeholder="Input title…">お知らせ</h2><p style="color:#000000;font-size:1.2rem;text-align:center" class="vk_heading_subtext vk_heading_subtext-style-plain" placeholder="Input sub text…"></p></div>
	<!-- /wp:vk-blocks/heading --></div></div>
	<!-- /wp:vk-blocks/outer -->
	
	<!-- wp:spacer {"height":50} -->
	<div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->
	
	<!-- wp:vk-blocks/post-list {"name":"vk-blocks/post-list","coreTerms":"{}"} /-->
	
	<!-- wp:button {"customBackgroundColor":"#6a0014","align":"center"} -->
	<div class="wp-block-button aligncenter"><a class="wp-block-button__link has-background" style="background-color:#6a0014">一覧を見る</a></div>
	<!-- /wp:button -->
	
	<!-- wp:spacer -->
	<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->
	`
  },
  {
    name: "Contact",
    icon: "✉️",
    content: `<!-- wp:vk-blocks/outer {"bgColor":"#313131","bgImage":"http://vccw.test/wp-content/uploads/2020/02/fredrik-ohlander-MMlQOlOZoGo-unsplash-scaled.jpg","outerWidth":"full","opacity":0.3} -->
	<div class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-use vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(49, 49, 49, 0.3), rgba(49, 49, 49, 0.3)), url(http://vccw.test/wp-content/uploads/2020/02/fredrik-ohlander-MMlQOlOZoGo-unsplash-scaled.jpg);border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:spacer {"height":50} -->
	<div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->
	
	<!-- wp:heading {"align":"center","customTextColor":"#ffffff","className":"is-style-vk-heading-plain"} -->
	<h2 class="has-text-color has-text-align-center is-style-vk-heading-plain" style="color:#ffffff"><strong>お気軽にご連絡ください</strong></h2>
	<!-- /wp:heading -->
	
	<!-- wp:paragraph {"align":"center","customTextColor":"#ffffff"} -->
	<p style="color:#ffffff" class="has-text-color has-text-align-center">このページでは、弊社についてを、ご紹介しております。弊社では、<br>様々なお客様に満足していただけるよう、幅広いサービスを行っております。<br>このページでは、弊社のサービスをご紹介しております。</p>
	<!-- /wp:paragraph -->
	
	<!-- wp:button {"customBackgroundColor":"#6a0014","align":"center"} -->
	<div class="wp-block-button aligncenter"><a class="wp-block-button__link has-background" style="background-color:#6a0014">お問い合わせはこちら</a></div>
	<!-- /wp:button -->
	
	<!-- wp:spacer -->
	<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer --></div></div>
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
