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
		name: "Cover",
		icon: "",
		content: `
		<!-- wp:vk-blocks/outer {"bgColor":"#000000","bgImage":"https://www.vektor-inc.co.jp/vk-blocks-tmpl-images/programming-942487_1920.jpg","outerWidth":"full","padding_top_and_bottom":"0","opacity":0.7} -->
		<div id="vk-htags-" class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-none vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://www.vektor-inc.co.jp/vk-blocks-tmpl-images/programming-942487_1920.jpg);border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/spacer {"unit":"rem","pc":4.5,"tablet":4.5,"mobile":4.5} -->
		<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:4.5rem"></div><div class="vk_spacer-display-tablet" style="height:4.5rem"></div><div class="vk_spacer-display-mobile" style="height:4.5rem"></div></div>
		<!-- /wp:vk-blocks/spacer -->
	
		<!-- wp:vk-blocks/pr-content {"titleColor":"#eeeeee","contentColor":"#eeeeee","url":"https://example.com","buttonType":"1","buttonColorCustom":"#eeeeee","Image":"https://www.vektor-inc.co.jp/vk-blocks-tmpl-images/device_01.png","layout":"right","fontAwesomeIconBefore":"fas fa-arrow-circle-right","fontAwesomeIconAfter":""} -->
		<div class="wp-block-vk-blocks-pr-content vk_prContent vk_prContent-layout-imageRight"><div class="col-sm-6 vk_prContent_colImg"><img class="vk_prContent_colImg_image" src="https://www.vektor-inc.co.jp/vk-blocks-tmpl-images/device_01.png" alt="画像をアップロード" style="border:none"/></div><div class="col-sm-6 vk_prContent_colTxt"><h3 class="vk_prContent_colTxt_title" style="color:#eeeeee">自社のコンセプトやキャッチコピーが入ります。</h3><p class="vk_prContent_colTxt_text" style="color:#eeeeee">この部分には、自社について説明が入ります。<br>自社のコンセプトや理念など、大切にしていることについて説明しましょう。お客様に一番伝えたいことを書くことをおススメします。</p><div class="vk_button vk_button-color-custom"><a href="https://example.com" class="btn btn-block vk_button_link vk_prContent_colTxt_btn btn-primary" style="background-color:transparent;border:1px solid #eeeeee;color:#eeeeee" rel="noopener noreferrer"><i class="fas fa-arrow-circle-right vk_button_link_before"></i><span class="vk_button_link_txt">さらに詳しく</span></a></div></div></div>
		<!-- /wp:vk-blocks/pr-content -->
		
		<!-- wp:vk-blocks/spacer {"unit":"rem","pc":2,"tablet":4,"mobile":4} -->
		<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:2rem"></div><div class="vk_spacer-display-tablet" style="height:4rem"></div><div class="vk_spacer-display-mobile" style="height:4rem"></div></div>
		<!-- /wp:vk-blocks/spacer --></div></div>
		<!-- /wp:vk-blocks/outer -->
		`
	},
	{
		name: "Full Wide Title Set",
		icon: "",
		content: `
		<!-- wp:vk-blocks/outer {"bgColor":"#0c7abb","outerWidth":"full","padding_top_and_bottom":"0","opacity":1} -->
		<div id="vk-htags-11" class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-none vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(12, 122, 187, 1), rgba(12, 122, 187, 1));border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/spacer {"unit":"rem","pc":3,"tablet":3,"mobile":3} -->
		<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:3rem"></div><div class="vk_spacer-display-tablet" style="height:3rem"></div><div class="vk_spacer-display-mobile" style="height:3rem"></div></div>
		<!-- /wp:vk-blocks/spacer -->
		
		<!-- wp:vk-blocks/heading {"align":"center","titleStyle":"plain","outerMarginBottom":0,"titleColor":"#ffffff","titleMarginBottom":0,"subTextColor":"#ffffff"} -->
		<div class="wp-block-vk-blocks-heading vk_heading vk_heading-style-plain" style="margin-bottom:0rem"><h2 style="color:#ffffff;font-size:2rem;margin-bottom:0rem;text-align:center" class="vk_heading_title vk_heading_title-style-plain" placeholder="タイトルを入力">Title test</h2><p style="color:#ffffff;font-size:1.2rem;text-align:center" class="vk_heading_subtext vk_heading_subtext-style-plain" placeholder="サブテキストを入力">Sub title text</p></div>
		<!-- /wp:vk-blocks/heading -->
		
		<!-- wp:vk-blocks/spacer {"unit":"rem","pc":3,"tablet":3,"mobile":3} -->
		<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:3rem"></div><div class="vk_spacer-display-tablet" style="height:3rem"></div><div class="vk_spacer-display-mobile" style="height:3rem"></div></div>
		<!-- /wp:vk-blocks/spacer --></div></div>
		<!-- /wp:vk-blocks/outer -->
		`
	},
	{
		name: "Service",
		icon: "",
		content: `
		<!-- wp:vk-blocks/outer {"bgColor":"#ffffff","outerWidth":"full","padding_top_and_bottom":"0"} -->
		<div id="vk-htags-5" class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-none vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/spacer {"unit":"rem","pc":4,"tablet":4,"mobile":4} -->
		<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:4rem"></div><div class="vk_spacer-display-tablet" style="height:4rem"></div><div class="vk_spacer-display-mobile" style="height:4rem"></div></div>
		<!-- /wp:vk-blocks/spacer -->
		
		<!-- wp:vk-blocks/heading {"align":"center","titleStyle":"plain","outerMarginBottom":3,"titleMarginBottom":0} -->
		<div class="wp-block-vk-blocks-heading" id="vk-htags--1"><div class="vk_heading vk_heading-style-plain" style="margin-bottom:3rem"><h2 style="color:#000000;font-size:2rem;margin-bottom:0rem;text-align:center" class="vk_heading_title vk_heading_title-style-plain" placeholder="タイトルを入力">サービスの特徴など</h2><p style="color:#000000;font-size:1.2rem;text-align:center" class="vk_heading_subtext vk_heading_subtext-style-plain" placeholder="サブテキストを入力">提供しているサービスの特徴などを画像つきで紹介します</p></div></div>
		<!-- /wp:vk-blocks/heading -->
		
		<!-- wp:vk-blocks/card {"name":"vk-blocks/card"} -->
		<div class="vk_posts"><!-- wp:vk-blocks/card-item {"url":"/"} -->
		<div class="vk_post card card-post vk_card_item vk_post-col-xs-12 vk_post-col-sm-6 vk_post-col-md-4 vk_post-col-lg-4 vk_post-col-xl-4 vk_post-btn-display"><div class="vk_post_imgOuter"><a href="/"><div class="card-img-overlay"></div></a></div><div class="vk_post_body card-body"><a href="/"><h5 class="vk_post_title card-title text-left">サービスの特徴</h5></a><p class="vk_post_excerpt card-text text-left">サービスの特徴についての紹介文などが入りますサービスの特徴についての紹介文などが入ります。</p><div class="vk_post_btnOuter text-right"><a class="btn btn-primary vk_post_btn" href="/">Read more</a></div></div></div>
		<!-- /wp:vk-blocks/card-item -->
		
		<!-- wp:vk-blocks/card-item {"url":"/"} -->
		<div class="vk_post card card-post vk_card_item vk_post-col-xs-12 vk_post-col-sm-6 vk_post-col-md-4 vk_post-col-lg-4 vk_post-col-xl-4 vk_post-btn-display"><div class="vk_post_imgOuter"><a href="/"><div class="card-img-overlay"></div></a></div><div class="vk_post_body card-body"><a href="/"><h5 class="vk_post_title card-title text-left">サービスの特徴</h5></a><p class="vk_post_excerpt card-text text-left">サービスの特徴についての紹介文などが入りますサービスの特徴についての紹介文などが入ります。</p><div class="vk_post_btnOuter text-right"><a class="btn btn-primary vk_post_btn" href="/">Read more</a></div></div></div>
		<!-- /wp:vk-blocks/card-item -->
		
		<!-- wp:vk-blocks/card-item {"url":"/"} -->
		<div class="vk_post card card-post vk_card_item vk_post-col-xs-12 vk_post-col-sm-6 vk_post-col-md-4 vk_post-col-lg-4 vk_post-col-xl-4 vk_post-btn-display"><div class="vk_post_imgOuter"><a href="/"><div class="card-img-overlay"></div></a></div><div class="vk_post_body card-body"><a href="/"><h5 class="vk_post_title card-title text-left">サービスの特徴</h5></a><p class="vk_post_excerpt card-text text-left">サービスの特徴についての紹介文などが入りますサービスの特徴についての紹介文などが入ります。</p><div class="vk_post_btnOuter text-right"><a class="btn btn-primary vk_post_btn" href="/">Read more</a></div></div></div>
		<!-- /wp:vk-blocks/card-item --></div>
		<!-- /wp:vk-blocks/card -->
		
		<!-- wp:vk-blocks/spacer {"unit":"rem","pc":2,"tablet":2,"mobile":2} -->
		<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:2rem"></div><div class="vk_spacer-display-tablet" style="height:2rem"></div><div class="vk_spacer-display-mobile" style="height:2rem"></div></div>
		<!-- /wp:vk-blocks/spacer --></div></div>
		<!-- /wp:vk-blocks/outer -->
		`
	},
  {
    name: "About",
    icon: "",
    content: `
	<!-- wp:vk-blocks/outer {"outerWidth":"full","padding_top_and_bottom":"0","upper_level":-60} -->
	<div id="vk-htags-4" class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-none vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(243, 244, 245, 0.5), rgba(243, 244, 245, 0.5));border:none;border-radius:0px"><div class="vk_outer_separator vk_outer_separator-position-upper vk_outer_separator-type-tilt" style="padding-bottom:60px"><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 100 100" preserveaspectratio="none"><path d="m100,40 L0,100 L100,100 z" strokewidth="0" fill="#fff"></path></svg></div><div class="vk_outer_container"><!-- wp:vk-blocks/spacer {"unit":"rem","pc":4,"tablet":4,"mobile":4} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:4rem"></div><div class="vk_spacer-display-tablet" style="height:4rem"></div><div class="vk_spacer-display-mobile" style="height:4rem"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	<!-- wp:vk-blocks/pr-content {"url":"https://example.com","buttonColorCustom":"#cf2e2e","Image":"https://www.vektor-inc.co.jp/vk-blocks-tmpl-images/pr-img.png","layout":"right"} -->
	<div class="wp-block-vk-blocks-pr-content vk_prContent vk_prContent-layout-imageRight"><div class="col-sm-6 vk_prContent_colImg"><img class="vk_prContent_colImg_image" src="https://www.vektor-inc.co.jp/vk-blocks-tmpl-images/pr-img.png" alt="画像をアップロード" style="border:none"/></div><div class="col-sm-6 vk_prContent_colTxt"><h3 class="vk_prContent_colTxt_title">自社のコンセプトやキャッチコピーが入ります。</h3><p class="vk_prContent_colTxt_text">この部分には、自社について説明が入ります。<br>自社のコンセプトや理念など、大切にしていることについて説明しましょう。お客様に一番伝えたいことを書くことをおススメします。</p><div class="vk_button vk_button-color-custom"><a href="https://example.com" class="btn btn-block vk_button_link vk_prContent_colTxt_btn btn-primary" style="background-color:#cf2e2e;border:1px solid #cf2e2e" rel="noopener noreferrer"><span class="vk_button_link_txt">さらに詳しく</span></a></div></div></div>
	<!-- /wp:vk-blocks/pr-content -->
	<!-- wp:vk-blocks/spacer {"unit":"rem","pc":4,"tablet":4,"mobile":4} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:4rem"></div><div class="vk_spacer-display-tablet" style="height:4rem"></div><div class="vk_spacer-display-mobile" style="height:4rem"></div></div>
	<!-- /wp:vk-blocks/spacer -->

	</div></div><!-- /wp:vk-blocks/outer -->
	`
  },
  {
    name: "PR Blocks Set",
    icon: "",
    content: `<!-- wp:vk-blocks/outer {"bgColor":"#ffffff","outerWidth":"full","opacity":1} -->
	<div class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-use vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1));border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/pr-blocks {"url1":"/service/","icon1":"far fa-file-alt","color1":"#337ab7","bgType1":"1","url2":"/company/","icon2":"far fa-building","color2":"#337ab7","bgType2":"1","url3":"/recruit/","icon3":"fas fa-users","color3":"#337ab7","bgType3":"1"} -->
	<div class="wp-block-vk-blocks-pr-blocks vk_prBlocks row"><div class="vk_prBlocks_item col-sm-4"><a href="/service/" class="vk_prBlocks_item_link" target="_self" rel="noopener noreferrer"><div class="vk_prBlocks_item_icon_outer" style="background-color:transparent;border:1px solid #337ab7"><i class="far fa-file-alt vk_prBlocks_item_icon" style="color:#337ab7"></i></div><h3 class="vk_prBlocks_item_title vk_prBlocks_item_title-1"> サービス案内</h3><p class="vk_prBlocks_item_summary vk_prBlocks_item_summary-1">弊社が提供するサービス＆ソリューションについてご紹介しています。経験豊富なスタッフがこだわりを持って取り組んでいます。</p></a></div><div class="vk_prBlocks_item col-sm-4"><a href="/company/" class="vk_prBlocks_item_link" target="_self" rel="noopener noreferrer"><div class="vk_prBlocks_item_icon_outer" style="background-color:transparent;border:1px solid #337ab7"><i class="far fa-building vk_prBlocks_item_icon" style="color:#337ab7"></i></div><h3 class="vk_prBlocks_item_title vk_prBlocks_item_title-2">会社案内</h3><p class="vk_prBlocks_item_summary vk_prBlocks_item_summary-2">弊社代表挨拶や会社の基本情報について記載しています。また、弊社の歴史なども紹介していますので是非ご覧ください。</p></a></div><div class="vk_prBlocks_item col-sm-4"><a href="/recruit/" class="vk_prBlocks_item_link" target="_self" rel="noopener noreferrer"><div class="vk_prBlocks_item_icon_outer" style="background-color:transparent;border:1px solid #337ab7"><i class="fas fa-users vk_prBlocks_item_icon" style="color:#337ab7"></i></div><h3 class="vk_prBlocks_item_title vk_prBlocks_item_title-3">採用情報</h3><p class="vk_prBlocks_item_summary vk_prBlocks_item_summary-3">株式会社サンプルでは一緒に働く仲間を募集しています。自分で考えていろいろな事にチャレンジできるやりがいのある仕事です。</p></a></div></div>
	<!-- /wp:vk-blocks/pr-blocks --></div></div>
	<!-- /wp:vk-blocks/outer -->`
  },
{
    name: "Information ( Text )",
    icon: "",
	content: `
	<!-- wp:vk-blocks/outer {"outerWidth":"full"} -->
	<div class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-use vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(243, 244, 245, 0.5), rgba(243, 244, 245, 0.5));border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/heading {"align":"center","titleStyle":"plain","outerMarginBottom":3,"titleMarginBottom":0} -->
	<div class="wp-block-vk-blocks-heading vk_heading vk_heading-style-plain" style="margin-bottom:3rem"><h2 style="color:#000000;font-size:2rem;margin-bottom:0rem;text-align:center" class="vk_heading_title vk_heading_title-style-plain" placeholder="タイトルを入力"><strong>お知らせ</strong></h2><p style="color:#000000;font-size:1.2rem;text-align:center" class="vk_heading_subtext vk_heading_subtext-style-plain" placeholder="サブテキストを入力">Information</p></div>
	<!-- /wp:vk-blocks/heading -->
	
	<!-- wp:latest-posts {"displayPostDate":true} /-->
	
	<!-- wp:vk-blocks/spacer {"unit":"rem","pc":1,"tablet":1,"mobile":1} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:1rem"></div><div class="vk_spacer-display-tablet" style="height:1rem"></div><div class="vk_spacer-display-mobile" style="height:1rem"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	
	<!-- wp:vk-blocks/button {"buttonUrl":"https://example.com/","buttonColorCustom":"#cf2e2e","buttonAlign":"right","fontAwesomeIconBefore":"fas fa-arrow-circle-right"} -->
	<div class="wp-block-vk-blocks-button vk_button vk_button-color-custom vk_button-align-right"><a href="https://example.com/" id="vk_button_link" style="background-color:#cf2e2e;border:1px solid #cf2e2e" class="btn vk_button_link btn-primary btn-md" role="button" aria-pressed="true" rel="noopener noreferrer"><i class="fas fa-arrow-circle-right vk_button_link_before"></i><span class="vk_button_link_txt">一覧を見る</span></a></div>
	<!-- /wp:vk-blocks/button --></div></div>
	<!-- /wp:vk-blocks/outer -->
	`
},
{
    name: "Information ( Card )",
    icon: "",
	content: `
	<!-- wp:vk-blocks/outer {"bgColor":"#ffffff","outerWidth":"full","opacity":0.9} -->
	<div id="vk-htags-9" class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-use vk_outer-bgPosition-normal" style="background:linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9));border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/heading {"align":"center","titleStyle":"plain","outerMarginBottom":3,"titleMarginBottom":0} -->
	<div class="wp-block-vk-blocks-heading vk_heading vk_heading-style-plain" style="margin-bottom:3rem"><h2 style="color:#000000;font-size:2rem;margin-bottom:0rem;text-align:center" class="vk_heading_title vk_heading_title-style-plain" placeholder="タイトルを入力"><strong>お知らせ</strong></h2><p style="color:#000000;font-size:1.2rem;text-align:center" class="vk_heading_subtext vk_heading_subtext-style-plain" placeholder="サブテキストを入力">Information</p></div>
	<!-- /wp:vk-blocks/heading -->
	
	<!-- wp:vk-blocks/post-list {"name":"vk-blocks/post-list"} /-->
	
	<!-- wp:vk-blocks/button {"buttonUrl":"https://example.com/","buttonColorCustom":"#cf2e2e","buttonAlign":"right","fontAwesomeIconBefore":"fas fa-arrow-circle-right"} -->
	<div class="wp-block-vk-blocks-button vk_button vk_button-color-custom vk_button-align-right"><a href="https://example.com/" id="vk_button_link" style="background-color:#cf2e2e;border:1px solid #cf2e2e" class="btn vk_button_link btn-primary btn-md" role="button" aria-pressed="true" rel="noopener noreferrer"><i class="fas fa-arrow-circle-right vk_button_link_before"></i><span class="vk_button_link_txt">一覧を見る</span></a></div>
	<!-- /wp:vk-blocks/button --></div></div>
	<!-- /wp:vk-blocks/outer -->
	`
},
{
	name: "Call To Action",
    icon: "",
	content: `
	<!-- wp:vk-blocks/outer {"bgColor":"#000000","bgImage":"https://www.vektor-inc.co.jp/vk-blocks-tmpl-images/programming-942487_1920.jpg","bgPosition":"fixed","padding_left_and_right":"1","padding_top_and_bottom":"0","opacity":0.7,"borderRadius":8} -->
	<div id="vk-htags-15" class="wp-block-vk-blocks-outer vk_outer vk_outer-width-normal vk_outer-paddingLR-use vk_outer-paddingVertical-none vk_outer-bgPosition-fixed" style="background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://www.vektor-inc.co.jp/vk-blocks-tmpl-images/programming-942487_1920.jpg);border:0px none #000;border-radius:8px"><div class="vk_outer_container"><!-- wp:vk-blocks/spacer {"unit":"rem","pc":4,"tablet":4,"mobile":4} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:4rem"></div><div class="vk_spacer-display-tablet" style="height:4rem"></div><div class="vk_spacer-display-mobile" style="height:4rem"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	
	<!-- wp:vk-blocks/pr-content {"titleColor":"#eeeeee","contentColor":"#eeeeee","url":"https://example.com","buttonColorCustom":"#cf2e2e","Image":"https://www.vektor-inc.co.jp/vk-blocks-tmpl-images/device_01.png","layout":"right","fontAwesomeIconBefore":"fas fa-arrow-circle-right","fontAwesomeIconAfter":""} -->
	<div class="wp-block-vk-blocks-pr-content vk_prContent vk_prContent-layout-imageRight"><div class="col-sm-6 vk_prContent_colImg"><img class="vk_prContent_colImg_image" src="https://www.vektor-inc.co.jp/vk-blocks-tmpl-images/device_01.png" alt="画像をアップロード" style="border:none"/></div><div class="col-sm-6 vk_prContent_colTxt"><h3 class="vk_prContent_colTxt_title" style="color:#eeeeee">Call To Action Title</h3><p class="vk_prContent_colTxt_text" style="color:#eeeeee">この部分には、自社について説明が入ります。<br>自社のコンセプトや理念など、大切にしていることについて説明しましょう。お客様に一番伝えたいことを書くことをおススメします。</p><div class="vk_button vk_button-color-custom"><a href="https://example.com" class="btn btn-block vk_button_link vk_prContent_colTxt_btn btn-primary" style="background-color:#cf2e2e;border:1px solid #cf2e2e" rel="noopener noreferrer"><i class="fas fa-arrow-circle-right vk_button_link_before"></i><span class="vk_button_link_txt">さらに詳しく</span></a></div></div></div>
	<!-- /wp:vk-blocks/pr-content -->
	
	<!-- wp:vk-blocks/spacer {"unit":"rem","pc":4.5,"tablet":4,"mobile":4} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:4.5rem"></div><div class="vk_spacer-display-tablet" style="height:4rem"></div><div class="vk_spacer-display-mobile" style="height:4rem"></div></div>
	<!-- /wp:vk-blocks/spacer --></div></div>
	<!-- /wp:vk-blocks/outer -->
	
	<!-- wp:vk-blocks/spacer {"unit":"rem","pc":4,"tablet":4,"mobile":4} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:4rem"></div><div class="vk_spacer-display-tablet" style="height:4rem"></div><div class="vk_spacer-display-mobile" style="height:4rem"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	`
},
{
	name: "Contact",
    icon: "",
    content: `
	<!-- wp:vk-blocks/outer {"bgColor":"#313131","bgImage":"https://www.vektor-inc.co.jp/vk-blocks-tmpl-images/home-office-336373_1920-e1513588377670.jpg","outerWidth":"full","bgPosition":"fixed","padding_top_and_bottom":"0","opacity":0.7} -->
<div id="vk-htags-17" class="wp-block-vk-blocks-outer vk_outer vk_outer-width-full vk_outer-paddingLR-none vk_outer-paddingVertical-none vk_outer-bgPosition-fixed" style="background:linear-gradient(rgba(49, 49, 49, 0.7), rgba(49, 49, 49, 0.7)), url(https://www.vektor-inc.co.jp/vk-blocks-tmpl-images/home-office-336373_1920-e1513588377670.jpg);border:0px none #000;border-radius:0px"><div class="vk_outer_container"><!-- wp:vk-blocks/spacer {"unit":"rem","pc":3,"tablet":3,"mobile":3} -->
<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:3rem"></div><div class="vk_spacer-display-tablet" style="height:3rem"></div><div class="vk_spacer-display-mobile" style="height:3rem"></div></div>
<!-- /wp:vk-blocks/spacer -->

<!-- wp:vk-blocks/heading {"align":"center","titleStyle":"plain","outerMarginBottom":0,"titleColor":"#eeeeee","titleMarginBottom":0,"subTextColor":"#eeeeee"} -->
<div class="wp-block-vk-blocks-heading vk_heading vk_heading-style-plain" style="margin-bottom:0rem"><h2 style="color:#eeeeee;font-size:2rem;margin-bottom:0rem;text-align:center" class="vk_heading_title vk_heading_title-style-plain" placeholder="タイトルを入力">無料体験実施中！</h2><p style="color:#eeeeee;font-size:1.2rem;text-align:center" class="vk_heading_subtext vk_heading_subtext-style-plain" placeholder="サブテキストを入力">体験入会大歓迎です。お気軽にご連絡ください。</p></div>
<!-- /wp:vk-blocks/heading -->

<!-- wp:vk-blocks/spacer {"unit":"rem","pc":1.5,"tablet":1.5,"mobile":1.5} -->
<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:1.5rem"></div><div class="vk_spacer-display-tablet" style="height:1.5rem"></div><div class="vk_spacer-display-mobile" style="height:1.5rem"></div></div>
<!-- /wp:vk-blocks/spacer -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:vk-blocks/button {"subCaption":"お気軽にお問い合わせください","buttonUrl":"/contact/","buttonColor":"success","buttonColorCustom":null,"buttonAlign":"block","fontAwesomeIconBefore":"far fa-envelope"} -->
<div class="wp-block-vk-blocks-button vk_button vk_button-align-block"><a href="/contact/" id="vk_button_link" class="btn vk_button_link btn-md btn-success btn-block" role="button" aria-pressed="true" rel="noopener noreferrer"><i class="far fa-envelope vk_button_link_before"></i><span class="vk_button_link_txt">メールでのお問い合わせ</span><p class="vk_button_link_subCaption">お気軽にお問い合わせください</p></a></div>
<!-- /wp:vk-blocks/button -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:vk-blocks/button {"subCaption":"電話でのお問い合わせはこちら","buttonUrl":"tel:000-000-0000","buttonColor":"danger","buttonColorCustom":null,"buttonAlign":"block","fontAwesomeIconBefore":"fas fa-phone-square-alt"} -->
<div class="wp-block-vk-blocks-button vk_button vk_button-align-block"><a href="tel:000-000-0000" id="vk_button_link" class="btn vk_button_link btn-md btn-danger btn-block" role="button" aria-pressed="true" rel="noopener noreferrer"><i class="fas fa-phone-square-alt vk_button_link_before"></i><span class="vk_button_link_txt">000-000-0000</span><p class="vk_button_link_subCaption">電話でのお問い合わせはこちら</p></a></div>
<!-- /wp:vk-blocks/button -->
</div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:vk-blocks/spacer {"unit":"rem","pc":1,"tablet":1,"mobile":1} -->
<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:1rem"></div><div class="vk_spacer-display-tablet" style="height:1rem"></div><div class="vk_spacer-display-mobile" style="height:1rem"></div></div>
<!-- /wp:vk-blocks/spacer --></div></div>
<!-- /wp:vk-blocks/outer -->`
},
{
	name: "Step set",
    icon: "",
	content: `
	<!-- wp:group {"className":"is-style-default","color":"#eeeeee"} -->
	<div class="wp-block-group is-style-default"><div class="wp-block-group__inner-container"><!-- wp:vk-blocks/spacer {"unit":"rem","pc":2,"tablet":32,"mobile":2} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:2rem"></div><div class="vk_spacer-display-tablet" style="height:32rem"></div><div class="vk_spacer-display-mobile" style="height:2rem"></div></div>
	<!-- /wp:vk-blocks/spacer -->
	
	<!-- wp:vk-blocks/step -->
	<div class="wp-block-vk-blocks-step vk_step"><!-- wp:vk-blocks/step-item -->
	<div class="wp-block-vk-blocks-step-item vk_step_item vk_step_item_lineStyle-default"><div class="vk_step_item_content"><!-- wp:heading {"level":4} -->
	<h4 id="vk-htags--1"><strong>お問い合わせ</strong></h4>
	<!-- /wp:heading -->
	
	<!-- wp:paragraph -->
	<p>まずは<a>お問い合わせフォーム</a>または電話にてご連絡ください。</p>
	<!-- /wp:paragraph --></div><div class="vk_step_item_dot vk_step_item_style-default" style="background-color:#337ab7;color:#ffffff"><div class="vk_step_item_dot_caption">STEP</div><div class="vk_step_item_dot_num">1</div></div></div>
	<!-- /wp:vk-blocks/step-item -->
	
	<!-- wp:vk-blocks/step-item {"dotNum":2} -->
	<div class="wp-block-vk-blocks-step-item vk_step_item vk_step_item_lineStyle-default"><div class="vk_step_item_content"><!-- wp:heading {"level":4} -->
	<h4 id="vk-htags--1"><strong>サービスのご提供</strong></h4>
	<!-- /wp:heading -->
	
	<!-- wp:paragraph -->
	<p>ご提案させていただいた内容にて業務を実施いたします。</p>
	<!-- /wp:paragraph --></div><div class="vk_step_item_dot vk_step_item_style-default" style="background-color:#337ab7;color:#ffffff"><div class="vk_step_item_dot_caption">STEP</div><div class="vk_step_item_dot_num">2</div></div></div>
	<!-- /wp:vk-blocks/step-item -->
	
	<!-- wp:vk-blocks/step-item {"styleLine":"none","dotNum":3} -->
	<div class="wp-block-vk-blocks-step-item vk_step_item vk_step_item_lineStyle-none"><div class="vk_step_item_content"><!-- wp:heading {"level":4} -->
	<h4 id="vk-htags--1"><strong>ご入金</strong></h4>
	<!-- /wp:heading -->
	
	<!-- wp:paragraph -->
	<p>納品月の末締めで請求書を発行させていただきますので、翌月末にてご入金願います。</p>
	<!-- /wp:paragraph --></div><div class="vk_step_item_dot vk_step_item_style-default" style="background-color:#337ab7;color:#ffffff"><div class="vk_step_item_dot_caption">STEP</div><div class="vk_step_item_dot_num">3</div></div></div>
	<!-- /wp:vk-blocks/step-item --></div>
	<!-- /wp:vk-blocks/step -->
	
	<!-- wp:vk-blocks/spacer {"unit":"rem","pc":4,"tablet":4,"mobile":4} -->
	<div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:4rem"></div><div class="vk_spacer-display-tablet" style="height:4rem"></div><div class="vk_spacer-display-mobile" style="height:4rem"></div></div>
	<!-- /wp:vk-blocks/spacer --></div></div>
	<!-- /wp:group -->
	`
},
{
    name: "List box",
    icon: "",
    content: `
  <!-- wp:group {"customBackgroundColor":"#fffbee","className":"is-style-vk-group-solid-roundcorner vk-has-luminous-vivid-amber-color","color":"#fcb900"} -->
  <div class="wp-block-group has-background is-style-vk-group-solid-roundcorner vk-has-luminous-vivid-amber-color" style="background-color:#fffbee"><div class="wp-block-group__inner-container"><!-- wp:heading {"level":5,"className":"is-style-vk-heading-plain"} -->
  <h5 class="is-style-vk-heading-plain">List Title Sample</h5>
  <!-- /wp:heading -->
  
  <!-- wp:list {"className":"is-style-vk-check-mark vk-has-luminous-vivid-amber-color","color":"#fcb900"} -->
  <ul class="is-style-vk-check-mark vk-has-luminous-vivid-amber-color"><li>There is list style sample there is list style sample.</li><li>There is list style sample there is list style sample.</li><li>There is list style sample there is list style sample.</li></ul>
  <!-- /wp:list --></div></div>
  <!-- /wp:group -->
  
  <!-- wp:vk-blocks/spacer {"unit":"rem","pc":2,"tablet":2,"mobile":2} -->
  <div class="vk_spacer"><div class="vk_spacer-display-pc" style="height:2rem"></div><div class="vk_spacer-display-tablet" style="height:2rem"></div><div class="vk_spacer-display-mobile" style="height:2rem"></div></div>
  <!-- /wp:vk-blocks/spacer -->`
}

];

const parsedTemplates = memoize(() =>
  defaultTemplates.map(template => ({
    ...template,
    blocks: parse(template.content)
  }))
);

export default parsedTemplates;
