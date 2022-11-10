=== VK Blocks ===
Contributors: vektor-inc,kurudrive,naoki0h,nc30,una9,kaorock72,rickaddison7634,mimitips,mthaichi,shimotomoki,sysbird
Donate link:
Tags: Gutenberg,FAQ,alert
Requires at least: 5.9
Tested up to: 6.1.0
Stable tag: 1.44.0.1
Requires PHP: 7.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

This is a plugin that extends Gutenberg's blocks.

== Description ==

This is a plugin that extends Gutenberg's blocks.

[ Blocks ]

* Staff
* Outer
* Alert
* FAQ
* Balloon
* Flow
* Button
* PR Blocks
* PR Content
* Border box
* Title（with sub text）
* Responsive Spacer
* Page Content
* Post List [ Pro ]
* Step [ Pro ]
* Timeline [ Pro ]
* Card [ Pro ]
* Grid Column [ Pro ]
* Animation [ Pro ]
* Slider [ Pro ]

[ Editing and correction ]

The source code of this plug-in is below.
https://github.com/vektor-inc/vk-blocks

== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload `plugin-name.php` to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress


== Frequently Asked Questions ==


== Screenshots ==

1. VK Blocks can be selected from the VK Blocks Panel.
1. VK Blocks examples.


== Changelog ==

[ Other ] Update the required WordPress version
[ Add Function ][ Custom CSS ( Pro ) ] Add custom css extension in inspector controls.
[ Specification Change ][ Grid Column ( Pro ) ] Changed margin setting from 1 to 0.1 separator.
[ Bug fix ][ Step(Pro) / Time line(Pro) ] Fix margin of WordPress 6.1 
[ Bug fix ][ GridColumn(Pro) ] Fix bg color overflow bug on edit screen.

= 1.45.0 =
[ Other ] Cope with WordPress 6.1
[ Specification Change ] Color palette manager use wp_theme_json_data_default filter.
[ Bug fix ][ Button ] Delete non intentional underline.
[ Other ] color palette manager added warning that --vk-color-custom-${number} is deprecated and replaced with --wp--preset--color--vk-color-custom-${number}.

= 1.44.0 =
[ Add Function ][ Post List ( Pro ) ] Add post filter taxonomy relation
[ Add Function ][ Button ] Add Button Effect option in Solid color button.
[ Specification Change ][ Post List ( Pro ) ] Change to don't display unpublic posttype and terms list.
[ Bug Fix ][ Grid Column Card( Pro ) ] Fixed a bug that css for editor was displayed in front.
[ Bug Fix ][ Select Post List Item ( Pro ) ] Fixed a bug where additional CSS classes were not attached.

= 1.43.0 =
[ Add Function ][ Spacer ][ Common mergin ] Add size option xl/xs.
[ Improvement ][ Admin screen ] Display the SaveButton sticky.
[ Bug Fix ] Fix PHP 8.X Error

= 1.42.1 =
[ Other ] Update VK Component Posts 1.3.1

= 1.42.0 =
[ Specification Change ] Update VK Component Posts ( Can use input tag on filter  )
[ Improvement ] Delete vk_blocks_get_options() function and change to VK_Blocks_Options::get_options().

= 1.41.2 =
[ Improvement ][ Page list from ancestor ] Fix behavior site editor.
[ Other ] Add PHPUnit test on Several PHP and WordPress versions
[ Bug Fix ] Fatal error in WordPress 5.8
[ Bug Fix ][ highlighter ] cope with color palette with alpha.
[ Bug Fix ][ button ] buttonColorCustom clear convert to primary.

= 1.41.1 =
[ Bug Fix ] Fix don't display Admin screen in case of spacific option value

= 1.41.0 =
[ Add Function ][ Balloon ] Add width option.
[ Bug Fix ][ Outer (Pro) ] Fixed the border color of the Outer block within the Outer block was not attached.
[ Specification Change ][ Breadcrumb(Pro) ] Hidden front page breadcrumb.

= 1.40.1 =
[ Specification Change ][Step(Pro)/Timeline(Pro)] Change lineStyle ui.
[ Bug Fix ][ hidden extension ] fix hidden extension class when Screen size xl.
[ Bug Fix ][ FAQ ] fix faq block js error when load separation mode.

= 1.40.0 =
[ Improvement ][ hidden extension ] Changed to add common hidden class names to additional CSS classes.
[ Add Block ][ Page list from ancestors ]
[ Add Function ][ Button ] Enable inline font size and add icon size option.
[ Specification Change ] Change the style of the options page to Gutenberg components.
[ Bug Fix ] fix editor style in Inline font size and Highlighter.
[ Bug Fix ] Fixed a bug that CSS for edit screen is not loaded in iframe.
[ Bug Fix ][ Breadcrumb ] Fix duplicate Additional CSS classes.

= 1.39.2 =
[ Bug Fix ][ Breadcrumb ] Fix in case of filter search result category & keyword
[ Bug Fix ][ Table style ] Delete border left and right specified vk-table-border-top-bottom 
[ Specification Change ][ icon ] enable float value at icon size and margin

= 1.39.1 =
[ Bug Fix ][ Grid Column Card ] fix bug when aspect retio is empty.
[ Other ] Change the script loaded on the options page to a script file.

= 1.39.0 =
[ Improvement ] License key remove space.
[ Bug Fix ][ Common mergin ] cope with table margin bottom 0,margin top 0
[ Bug fix ][ GridColCard ( Pro ) ] cope with custom color palette
[ Other ] VK Compo ( mini-content ) Update ( Fix slider align ) 

= 1.38.0 =
[ Bug fix ][ Post List (Pro) ] cope with pagenation hook

= 1.37.0 =
[ Specification Change ][ Step Item(Pro) / Timeline Item()Pro ] Change padding-bottom to inner-item last-child margin-bottom
[ Specification Change ][ Timeline ] If no label, the outer html will not be displayed.
[ Specification Change ][ Outer ] Move width control to block toolbar.
[ Specification Change ] Change the style loaded on the options page to a css file.
[ Bug fix ][ Tree Shaking ] cope with not(***,***)
[ Bug fix ][ Heading design ] Fix text-align

= 1.36.2 =
[ Specification Change ] allow iframe on post list filter 
[ Bug Fix ][ Slider ( Pro ) ] Add compatibility process.
[ Bug fix ][ Heading design ] Fix plain design text-align

= 1.36.1 =
[ Bug fix ] Fix active pro version

= 1.36.0 =
[ Add Function ][ Button outer(Pro) ] Add gap option.
[ Bug fix ][ Accordion(Pro) ] Fix margin bottom on Accordion close.

= 1.35.0 =
[ Specification Change ][ Animation(Pro) ] Corresponds reuse block & duplicate
[ Specification Change ][ Grid Column Card(Pro) ]  Corresponds reuse block & duplicate automatically
[ Specification Change ][ Card(Pro) ] Corresponds reuse block & duplicate automatically
[ Specification Change ][ Slider(Pro) ] Corresponds reuse block & duplicate automatically
[ Specification Change ][ Slider(Pro) ] Changed slider breakpoints to match specified breakpoints in VK Blocks
[ Specification Change ][ Slider(Pro) ] Change width class name
[ Bug Fix ][ List ] cope with custom color palette
[ Bug Fix ][ Slider(Pro) ] Fixed not to output empty CSS tags
[ Bug Fix ][ Outer (Pro) ] Fix WordPress 6.0 border color class.
[ Bug Fix ][ Spacer ][ Animation (Pro) ][ Slider (Pro) ] height and border style on Full Site Editor

= 1.34.1 =
[ Bug Fix ] Fix term color library ( since 1.34.0 )

= 1.34.0 =
[ Improvement ][ Button ] Support for transformation of paragraph block to VK button block.
[ Other ] add term color composer library
[ Bug Fix ][ Grid Col Card(Pro) ] Fix bocome narrow width in case of innner block on edit screen

= 1.33.2 =
[ Bug Fix ][ Button ] Fix horizontal padding for X-T9 
[ Bug Fix ][ Common mergin ] cope with table bottom
[ Bug Fix ][ Breadcrumb(Pro) ] Fix front page breadcrumb
[ Bug Fix ][ Grid Column(Pro) ] fix row block layout in Grid Column Block
[ Improvement ][ Button ] Delete block id UI.

= 1.33.1 =
[ Bug Fix ] Fix PHP notice ( Pro version only )
[ Fix ] Translation ( Pro version only )

= 1.33.0 =
[ Specification Change ] Required license key entry.
[ Bug Fix ][ Slider(Pro) ] Cope with auto height.
[ Bug Fix ][ Heading ] Heading-Adjusted padding when there is a background.

= 1.32.0 =
[ Add Function ][ GridColCard ( Pro ) ] add column min-width setting for tablet and pc.
[ Add Function ][ Button outer(Pro) ] Add button width option for mobile or tablet.
[ Improvement ][ margin extension ] Enable margin settings in Grid column(Pro).
[ Bug Fix ] Fix FAQ option array error for free.
[ Bug Fix ] Fix load Font Awesome Files on WordPress.com
[ Bug Fix ][ Button ] Fix icon inner classes.

= 1.31.0 =
[ Add Function ][ GridColCard(Pro) ] Add link URL in toolbar and sidebar.
[ Add function ] [ Breadcrumb(Pro) ] Add support fontSize and spacing.
[ Improvement ][ margin extension ] Changed to add common margin class names to additional CSS classes.
[ Bug fix ][ Accordion(Pro) ] Fix do not intend margin bottom 0 added to p tag.

= 1.30.0 =
[ Add Function ][ Border Box ] Add body align control in toolbar.
[ Add Function ][ Button outer(Pro) ] Add button width option.
[ Update ][ Font Awesome ] Add version chenge setting on block-editor screen.
[ Specification Change ][ Button ] Move url interface to block toolbar.
[ Specification Change ] Change default --vk-margin-md size 2rem -> 2.4rem
[ Specification Change ][ icon ] fix icon margin bottom

= 1.29.2 =
[ Bug fix ][ margin extension ] Exclude grid column blocks because they are covered by the setting values.
[ Bug fix ][ margin extension ] Optimize excludes core block list.
[ Bug Fix ] fix editor style of button-outer & icon-outer in page-content

= 1.29.1 =
[ Bug fix ][ margin extension ] Optimize excludes block list.

= 1.29.0 =
[ Add Function ] Add margin extension in toolbar.
[ Add Block ] GridColCard(Pro)
[ Fix ] [ Breadcrumb(Pro) ] Add inserter Pro label.
[ Other ] Update Font Awesome 6 -> 6.1

= 1.28.0 =
[ Add Block ] Breadcrumb(Pro)
[ Specification Change ][ Spacer ] Change break point
[ Bug fix ][ Outer (Pro) ] Border radius range above 0.
[ Bug fix ][ Outer (Pro) ] background position fix

= 1.27.9 =
[ Bug fix ][ Slider(Pro) ] Fixed a bug that the background was not transparent when the transparency setting was set to 0.

= 1.27.8 =
[ Bug fix ][ Outer (Pro) ] Fixed a bug where css was hitting inner content

= 1.27.7 =
[ Bug fix ][ Post list an so on (Pro) ] Fixed number of days to display the new post mark was not saved.
[ Bug fix ][ Post list an so on (Pro) ] Fixed no post message php notice.

= 1.27.6 =
[ Other ] Fix deploy flow

= 1.27.5 =
[ Bug fix ][ Outer(Pro) ] Compatibility support
[ Bug fix ][ Post List(Pro) ] Fix no post message

= 1.27.1 - 1.27.4  =
[ Other ] Deploy Free Version.

= 1.27.0 =
[ Add function ][ Font Awesome ] Cope with Font Awesome 6
[ Add function ][ Post-List (Pro) ] Add no-post message filter hook
[ Bug fix ][ Outer(Pro) ] cope with custom color palette

= 1.26.2 =
[ Other ] Rerelease

[ Bug Fix ][ Spacer ] fix spacer

= 1.26.0 =
[ fix ] fix plugin settings links.
[ Add function ][ Spacer ] Add margin-top mode

= 1.25.1 =
Change stable version

= 1.25.0 =
[ Improvement ] Change to always load bootstrap when the theme is not Lightning,Lightning Pro,Katawara.
[ fix ] Fix load FontAwesome when the theme is not Lightning,Lightning Pro,Katawara.
[ fix ] color palette manager support border color

= 1.24.5 =
[ fix ][ Button ] Fix button alignment
[ fix ][ Card(Pro) ] fix unify breakpoints.

= 1.24.4 =
[ Specification Change ][ Heading Design ] Strengthen selector on editor screen 

= 1.24.3 =
[ Bug fix ][ FAQ ] Fix list block last item can't edit.
[ Bug fix ][ Slider(Pro) ] Fix Slider in Image block caption can't edit.
[ Bug fix ] Bug fix Color palette not working in widget

= 1.24.2 =
[ Deploy ] Deploy Free Version 1.24.0

= 1.24.1 =
[ Specification Change ][ Dev ] fix deploy free script

= 1.24.0 =
[ fix ][ Icon outer ] add orientation horizontal & fix appender
[ fix ][ Card(Pro) ] add orientation horizontal & fix appender
[ fix ][ selected post list(Pro) ] add orientation horizontal & fix appender
[ fix ][ Button outer(Pro) ] add orientation horizontal & fix appender
[ fix ][ Icon Card(Pro) ] add orientation horizontal & fix appender
[ fix ][ Grid column(Pro) ] add orientation horizontal & fix appender
[ Specification Change ][ Dev ] change build script

= 1.23.0 =
[ Specification Change ][ Flow ] Release Image float on xs screen
[ Specification Change ] Change required WordPress version to 5.8

= 1.22.4 =
[ Other ] Update the required WordPress version
[ Bug fix ][ Heading ] Fix bug the color does not change when the style setting is no decoration.
[ Bug fix ][ Slider(Pro) ] cope with custom color palette
[ Bug fix ][ Icon Card(Pro) ] fix text align
[ Bug fix ][ TOC(Pro) ] fix css corruption of block load separation mode

= 1.22.3 =
[ Bug fix ][ core/heading ] fix width

= 1.22.2 =
[ Bug fix ][ selected post list(Pro) ] fix post id

= 1.22.1 =
Cope with WordPress 5.9
[ Add function ] load separate block setting from setting > vk blocks 
[ fix ][ Heading ] Make text size not auto-include when changing heading level
[ fix ][ Grid Column ] fix translate
[ fix ][ Heading ] vertical heading levels for wp-5.9
[ fix ][ Border Box ] cope with custom color palette
[ Bug fix ] fix block style enqueue point
[ Bug fix ][ button ] fix block-block size

= 1.21.0 =
[ Add Function ][ Post-List (Pro) ] add date filtering
[ Bug fix ][ Balloon ] Balloon icon background color when custom color is selected
[ Bug fix ][ Group ] fix alert style custom color

= 1.20.7 =
[ Bug fix ][ Heading ] cope with custom color palette
[ Bug fix ][ Heading ] Fix recovery

= 1.20.6 =
[ Bug fix ][ Heading ] Fix recovery
[ Bug fix ][ Heading ] cope with custom color palette
[ Bug fix ][ Button ] change option order in panel
[ Bug fix ][ Grid Column(Pro) ] cope with custom color palette
[ Bug fix ][ Balloon ] cope with custom color palette

= 1.20.5 =
[ Bug fix ] cope with Old PHP.
[ Bug fix ][ Timeline(Pro) ] cope with custom color palette

= 1.20.4 =
[ Other ] Only change stable version ( Deploy free version )

= 1.20.3 =
[ Bug fix ][ Post Media Layout ] Cope with not vektor theme
[ Bug fix ][ PR Blocks ] cope with custom color palette
[ Bug fix ][ Step(Pro) ] cope with custom color palette
[ Bug fix ][ Icon Card(Pro) ] cope with custom color palette
[ Other ] Change TGM & Plugin Update Checker load from composer

= 1.20.2 =
[ Bug fix ] Color palette manager in case of other theme

= 1.20.1 =
[ Bug fix ] Fix -wp5.7 error

= 1.20.0 =
[ Other ][ All ] Refactoring all blocks.
[ Bug fix ] Color palette manager in case of other theme

= 1.19.1 =
[ Bug fix ][ Button ] Fix bootstrap color crash

= 1.19.0 =
[ Add Function ][ Button ] Set the text color with palette
[ Bug fix ][ Button ] Add primary color css variable in case of other theme 

= 1.18.6 =
[ Bug fix ][ Button ] Custom color value don't refrect reopen

= 1.18.5 =
[ Other ] Change stable version only.

= 1.18.4 =
[ Bug fix ] 1.18.0 update ( Add color palette manager in plugin )
[ Bug fix ][ Button ] Fix bug in case of used button block for reusable block.

= 1.18.3 =
[ Bug fix ] Revert 1.17.0

= 1.18.2 =
[ Bug fix ] Revert 1.17.0

= 1.18.1 =
[ Bug fix ] Revert 1.17.0

= 1.18.0 =
[ Add Function ] Add color palette manager in plugin

= 1.17.0 =
[ Add Block ][ Button Outer(Pro) ]

= 1.16.11 =
[ Bug fix ][ Button ] Fix color on katawara

= 1.16.10 =
[ Bug fix ][ border box ] Fix border box title confrict by title design function

= 1.16.9 =
[ Bug fix ][ icon ] Fix css bug from 1.16.0

= 1.16.8 =
[ Bug fix ][ Button ] cope with custom color palette

= 1.16.7 =
[ Bug fix ][ Button ] Fix primary bg color first aid

= 1.16.6 =
[ Bug fix ][ Button ] Fix primary bg color first aid

= 1.16.5 =
[ Bug fix ][ Button ] Fix wide size

= 1.16.4 =
[ Bug fix ][ Button ] Fix outline color

= 1.16.3 =
[ Bug fix ] Cope with excerpt br

= 1.16.2 =
[ Other ] Cope with old ssl error

= 1.16.1 =
[ Bug fix ][ Card ] Fix broke layout on edit screen

= 1.16.0 =
[ Add New Block ] Icon Outer
[ Bug fix ][ icon ] Fixed a bug the style was reset when the icon color clear
[ Bug fix ][ Ordered List ] Fixed a bug in standard style

= 1.15.1 =
[ Bug fix ][ Spacer ] Fix common margin setting in case of unspecified

= 1.15.0 =
[ Add Function ][ Grid Column Item ] Add color and padding setting

= 1.14.1 =
[ Bug fix ][ Spacer ] Fix common setting input

= 1.14.0 =
[ Add Function ][ Spacer ] Add common spacer type and common spacer responsive size
[ Bug fix ] Fix Lightning G3 Pro text size not work

= 1.13.2 =
[ Bug fix ][ Slider ]Fixed bug would break put a class in additional CSS class

= 1.13.1 =
[ Other ] version only

= 1.13.0 =
[ Specification Change ][ Post list ( Pro ) ] Cope with ruby tag

= 1.12.0 =
[ Add New Block ] Icon Block
[ Improvement ][ Slider(Pro) ] add navigation position
[ Specification Change ] VK Components Update ( can be customize title by hook )
[ Specification Change ][ Slider(Pro) ] If set slide type fade that disable slide step number
[ Bug fix ][ Slider(Pro) ] Fix bug that to be same id under case of copy slide item 
[ Bug fix ][ Social icon ] Fix css in grid block

= 1.11.4 =
[ Bug Fix ][ Step(Pro) ] Fixed icon position

= 1.11.3 =
[ Bug Fix ][ Step(Pro) ] Fixed icon position at G3

= 1.11.2 =
[ Improvement ] add block description
[ Bug Fix ] Fixed widget screen warning
[ Bug Fix ][ Slider(Pro) ] Change id when copy slider & slider-item.

= 1.11.1 =
[ Bug Fix ][ Table style ] add botder top and bottom style

= 1.11.0 =
[ Specification Change ][ Button ] Change margin getready to core button block.

= 1.10.0 =
[ Specification Change ][ Slider(Pro) ] Add no height setting.
[ Bug Fix ][ Slider(Pro) ]Fix bug where pagination design would change when tree shake was enabled.

= 1.9.2 =
[ Bug Fix ] Fix for 5.8
[ Specification Change ][ Slider(Pro) ] add Pagination Setting
[ Specification Change ][ Heading ] Font size of title & sub text can set null.

= 1.9.1 =
[ Bug fix ] Fix AllowedBlocks of InnerBlocks.

= 1.9.0 =
[ Improvement ][ Inline Font Size ] setting font size in toolbar
[ Bug fix ][ Icon card ] Fix css bug

= 1.8.2 =
[ Bug fix ][ FAQ ] Fixed CSS of answer part when closing in the initial state
[ Bug fix ][ Responsive BR ] Fixed Console Warning

= 1.8.1 =
[ Bug fix ][ Flow ] Fixed to reflect alt of image

= 1.8.0 =
[ Improvement ][ Spacer ] Add common space size setting
[ Bug fix ] PR Content button after icon position

= 1.7.1 =
[ Bug Fix ][ Heading ] Fix Color Palette default setting.

= 1.7.0 =
[ Improvement ][ Spacer ] Add common space size style

= 1.6.0 =
[ Improvement ][ Grid Column(Pro) ] enable setting margin bottom
[ Bug Fix ][ Heading ] Fix Heading design when using Lightning Heading Setting

= 1.5.0 =
[ Improvement ][ highlighter ] setting color in toolbar
[ Specification Change ][ Table of Contents ] Add notice about copying heading.

= 1.4.6 =
[ Specification Change ] Update VK Admin Library.

= 1.4.5 =
[ Specification Change ] Update VK Admin Library.

= 1.4.4 =
[ Specification Change ] Change Version Only.

= 1.4.3 =
[ Specification Change ] Update VK Admin Library.

= 1.4.2 =
[ Bug fix ][ Title ] Fix color code reset

= 1.4.1 =
[ Specification Change ] Stop exclude CSS Var by Tree shaking

= 1.4.0 =
[ Improvement ][ title ] Convert to VK Blocks Title from core title block 
[ Improvement ][ Select Post List Item ]setting from toolbar and enable search URL
[ Bug fix ][ translate ] in Select Post List Item
[ Bug fix ][ New FAQ ] Fix multiple select
[ Bug fix ][ Accordion ] Fix multiple select
[ Specification Change ][ Border Box ] Delete margin-top from first element / delete margin-bottom from last element

= 1.3.9 =
[ Bug fix ][ page ] To be use private page

= 1.3.8 =
[ Bug fix ][ border-box ] Fix not being able to drag and drop other blocks.

= 1.3.7 =
[ Bug fix ][ image ] fix image/photo-frame

= 1.3.6 =
[ Bug fix ][ table ] fix border/stripe

= 1.3.5 =
[ Bug fix ] Fix translattion

= 1.3.4 =
[ Design bug fix ][ flow ] fix dd bug on Lightning G3 and so on
[ Add style ][ table ] border table / border/stripe
[ Bug fix ][ Slider ] fix css bug under active css optimize

= 1.3.3 =
*[ Design bug fix ][ Image ] fix style vk-image-rounded bug for core/image block.

= 1.3.2 =
[ Bug fix ][ Card ] Fix sentence of align control.
[ Bug fix ][ Heading Extention ] Fix editor css is not reflected.
[ Bug fix ][ Button ] Fix Button width of 'Wide' on editor.
[ Bug fix / Specification Change ][ Staff ] Add font selector of heading, mintyo or not.

= 1.3.1 =
[ Bug fix ][ Accordion ] Supports Tree Shaking and add Pro Icon
[ Bug fix ] Fix relative path to full path

= 1.3.0 =
[ Add New Block ][ Accordion ] Add New Accordion Block
[ Translation ][ Post List ] Corrected the notation of the classification name
[ Specification Change ][ Card ] Remove link tag from title

= 1.2.4 =
[ Bug fix / Specification Change ][ Post List ] Fix too many tags and change tag UI
[ Bug fix ][ Slider ] Bug fix under css optimize

= 1.2.3 =
[ Bug fix ][ FAQ2 ] Fix PHP notices.

= 1.2.2 =
[ Specification Change ][ Slider ] Fix default slide speed and use cubic-bezier.
[ Bug fix ] Fix FontAwsome Popup in case of WP5.7

= 1.2.1 =
[ Bug fix ] Fix translate of VK Blocks Setting

= 1.2.0 =
[ Specification Change ] Cope with swiper load tree shaking (improvement of load speed)
[ Bug fix ] toolbar icon display

= 1.1.0 =
[ Specification Change ][ Slider Block ] Display multiple images on one slide.

= 1.0.16 =
[ Specification Change ] Update VK-Admin Library

= 1.0.15 =
[ Bug fix ][ Outer ] Fixed a bug where hiding doesn't work.

= 1.0.14 =
[ Specification Change ][ PostList ] Filter terms by taxonomy in sidebar.
[ Translation ] Fix translation in balloon settings.

= 1.0.13 =
[ Bug fix ][ Editor ] Fix editor CSS of Grid Column, Card, Icon Card, Select Post.

= 1.0.12 =
[ Bug fix ][Table Of Contents] fix table of contents order bug.

= 1.0.11 =
[ Bug fix ][PageContent] fix bug can not use newline.

= 1.0.10 =
[ Translation ] Fix translation.

= 1.0.9 =
[ Other ] version only

= 1.0.8 =
[ Fix Translation System ] fix command to generate pot file.

= 1.0.7 =
[ Fix deprecated ][ Card ] fix decprecated.
[ Design bug fix ][ Image ] fix style bug for core/image block.

= 1.0.6 =
[ Design bug fix ][ Slider ] [ Staff ][ PR Blocks ][ PR Content ] fix style bug for katawara.

= 1.0.5 =
[ Bug fix ][ Animation ] [ Balloon ][ Heading ][ PR Content ][ Icon Card ] Fix data by old versoin needs recovery.
[ Design bug fix ][ QA Block ] Fix style in editor.
[ Design bug fix ][ Button ] Fix style of sub caption.

[ Add Block ] Add Page Content Block
[ Add Function ] Add nowrap
[ Add Function ][ Balloon ] Add border function

= 1.0.4 =
[ Bug fix ][Table of Contents] fix bug for deprecated.

= 1.0.3 =
[ Bug fix ][Spacer] fix bug for deprecated.

= 1.0.2 =
[ Bug fix ] fix bug when instert block.

= 1.0.1 =

= 1.0.0 =
[ Other ][All] Refactoring all blocks.

= 0.57.4 =
[ Specification Change ] Load Term Color on init

= 0.57.3 =
[ Bug fix ][ nowrap ] fix can not work not bootstrap themes.

= 0.57.2 =
[ Other ] Cope with block sample preview

= 0.57.1 =
[ Bug fix ][ Slider ] Fix block need recovery bug in case of filled in custom css class.

= 0.57.0 =
[ Specification Change ] Change icons ( include vk icon )

= 0.56.3 =
[ Bug fix ][ Balloon ] fix border bug

= 0.56.2 =
[ Bug fix ][ Balloon ] fix border bug

= 0.56.1 =

= 0.56.0 =
[ Add Block ] Add Page Content Block
[ Add Function ] Add nowrap
[ Add Function ][ Balloon ] Add border function

= 0.55.0 =
[ Add function ][ Outer ] Background image repeat
[ Bug fix ] fix can not save on some plugin using enviroment
[ Specification Change ][ Headding ] delete font weight specification from Plain style

= 0.54.2 =
[ Bug fix ][ Slider ] Fix slider broken in page.

= 0.54.1 =
[ Design bug fix ] Fix do not effect text align on theming by horizontal border

= 0.54.0 =
[ Add function ][ Post list ] Add Card (nonorder) layout and add display taxonomy
[ Bug fix ][ Animation ] fix deprecated

= 0.53.2 =
 [ Bug Fix ][ ToC ( Pro )] Fix id Adding System

= 0.53.1 =
 [ Bug Fix ][ Step ( Pro )] Fix Step Number Reset System

= 0.53.0 =
 [ Design Change ] VK Blocks Icon design change

= 0.52.2 =
[ Other ] version only

= 0.52.1 =
[ Bug fix ][ Grid Column(Pro) ] Fixed a bug that the hidden specification is removed when re-editing
[ Bug fix ][ Slider(Pro) ] Fix Can not stop loop
[ Bug fix ][ Outer(Pro) ] Fix cant edit outer block(cant save style tag) on Editor role user

= 0.52.0 =
[ Specification Change ][ CSS Optimize ] Delete package

= 0.51.0 =
[ Specification Change ][ CSS Optimize ] default off / exclude wooCommerce preload
[ Add function ][ CSS Optimize ] Add exclude handles

= 0.50.3 =
[ Other ] version only

= 0.50.2 =
[ Other ] version only

= 0.50.1 =
[ Other ] version only

= 0.50.0 =
[ Specification Change ][ CSS Optimize ] Common management of CSS optimization function
[ Bug fix ][ Icon Card ] Fix endless recovery

= 0.49.8 =
[ Bug fix ] fix edit screen white out

= 0.49.7 =
[ Bug fix ] fix edit screen white out
[ specification change ][ button ] allow some text style
[ design specification change ][ PR Content ] Change line height

= 0.49.6 =
[ digigin bug fix ][ balloon icon ] Fix the icon so that the rectangular image also fits in the square

= 0.49.5 =
[ editor digigin bug fix ][ balloon icon ] Round trimming of registered icons

= 0.49.4 =
Version change only

= 0.49.3 =
[ Bug fix ][ core/image ] Fix again wave style do not reflected

= 0.49.2 =
[ Bug fix ] fix edit screen white out

= 0.49.1 =
[ Bug fix ][ PR Content ] fix can not click button at textarea
[ Bug fix ][ core/image ] fix wave style do not reflected

= 0.49.0 =
[ Add Function ][ Responsive Spacer ] add space-type (can be select margin-top)
[ Add Function ][ Old FAQ ] Can be accordion (Pro version only)
[ Bug fix ][ Child page list ] Can be select "this page" ( In case of only one page that has children, can't select that page on other page's put child page list )

= 0.48.0 =
[ Bug Fix ][ Outer ] Fix bug of border-color clear button.
[ Add Style ][ Core/Image ] add extra style to core/image.

= 0.47.0 =
[ Add Function ][ Post List(Pro) ] add order by title / add order desc/asc

= 0.46.1 =
[ Bug Fix ][ New FAQ ] Fix accordion system on enable Tree Shaking

= 0.46.0 =
[ Add Function ][ New FAQ ] Add accordion(Pro)
[ Bug Fix ][ Grid Column(Pro) ] fix unexpected class name "undefined"

= 0.45.2 =
[ Bug Fix ] Fix bug in card block deparection.

= 0.45.1 =
[ Bug Fix ] Delete useless file

= 0.45.0 =
[ Add function ] Responsive BR

= 0.44.13 =
[ digigin bug fix ] vk_heading plain css adjustment 

= 0.44.12 =
[ digigin bug fix ] Block heading css adjustment 

= 0.44.11 =
version only

= 0.44.10 =
[ bug fix ][ Grid column(Pro) ] fix could choice 5 columns

= 0.44.9 =
* rebuild

= 0.44.8 =
[ bug fix ][ Grid column(Pro) ] Fix block wrap on xxl

= 0.44.7 =
[ bug fix ][ block pattern(Pro) ] Fix block pattern

= 0.44.6 =
[ bug fix ][ block pattern(Pro) ] Fix block pattern
[ bug fix ] Stop ExUnit VK Blocks 
[ bug fix ][ border box ] Cope with lightning pro headding design ( balloon )

= 0.44.5 =
[ digigin bug fix ] Block heading Digigin text align tuning 

= 0.44.4 =
version only

= 0.44.3 =
 [ Specification change ] abolish Preload
 [ digigin bug fix ] Block heading Digigin font color tuning 

= 0.44.2 =
[ digigin bug fix ] Block heading Digigin tuning 

= 0.44.1 =
[ Desigin tuning ] Tag change

= 0.44.0
[ Specification Change ] Re Cope with xxl size
[ bug fix ][ Card(Pro) ] fix critical error on card and recover to 0.43.0
[ bug fix ][ Child Page(Pro) ] fix use in vk page widget 
[ bug fix ][ Grid Column(Pro) ] New column drug bug fix

= 0.43.4(0.42.1) =
rebuild 0.42.1

= 0.43.3(0.42.1) =
revert to 0.42.1

= 0.43.2 =
Add translate

= 0.43.0 =
[ Specification Change ] Cope with xxl size
[ Specification Change ] Stop ExUnit VK Blcosk on VK Blocks Free
[ Bug fix ][ Flow block ] Arrow image don't display on using tree shaking

= 0.42.1 =
[ Specification Change ][ term color ] Add exclude taxonomy

= 0.42.0 =
[ Add Function ][ Block Template Setting ] Add Block pattern Display and Hide setting.

= 0.41.2 =
[ Bug fix ][ Button ] Fix static id of button again.

= 0.41.1 =
[ Bug fix ][ Button ] Fix static id of button.

= 0.41.0 =
[ Add Function ][ Animation(Pro) ] Add animation variation
[ Add New Block ][ New FAQ ] Add New FAQ Block

= 0.40.3 =
[ Bug fix ][ BorderBox ] Fix collapse under the tree shaking

= 0.40.2 =
[ Bug fix ][ Grid Column ] Fix collapse in edit screen

= 0.40.1 =
[ Bug Fix / Specification Change ][ Heading ] Fix margin of title below, and change default value of title below margin.

= 0.40.0 =
[ Add function ] CSS Optimize

= 0.39.5 =
[ Bug fix ][ slider ] Fix colaps of first view

= 0.39.4 =
[ Bug fix ][ border-box ] Fix btn-primary on editor side.

= 0.39.3 =
[ Bug fix ][ border-box ] Fix heading color.

= 0.39.2 =
[ Bug fix ] Fix button color of editor on WP 5.5

= 0.39.1 =
[ Bug fix ] Posts list date bug fix by WP5.5

= 0.39.0 =
[ Add function ] Add VK Block's Block patterns.

= 0.38.9 =
[ Bug Fix ][ Outer(Pro) ] Background cover become do not worked bug fix.

= 0.38.8 =
[ Bug Fix ] Rebuild

= 0.38.6 =
[ Bug Fix ] Fix button layout settings

= 0.38.5 =
[ Specification Change ] Delete button class in src/blocks/button/

= 0.38.4 =
[ Bug Fix ][ Card(Pro) ] Image height change bug fix

= 0.38.3 =
[ Bug Fix ][ Card(Pro) ] Image height change bug fix

= 0.38.2 =
[ Bug Fix / Specification Change ][ Balloon ] Change Balloon HTML structure

= 0.38.1 =
[ Add new block ][  Slider(Pro) ]
[ Add function ][ Card(Pro) ] Add Image height setting
[ Bug Fix / Specification Change ][ Balloon ] Change Balloon width 100%
[ Add function ][ Border box ] add fill background

= 0.37.4 =
[ Specification Change ] Admin directory change

= 0.37.3 =
[ Specification Change ] Admin lib link change

= 0.37.2 =
[ Bug Fix] PHP error

= 0.37.1 =
[ Bug Fix][ Title ] Setted text elesed 

= 0.37.0 =
[ Add function ][ Balloon ] Fixed the problem that the entered text disappears

= 0.36.0 =
[ Add function ][ FAQ ] The answer part has been changed to an inner block and it is now possible to place other than letters
[ Add function ][ FAQ ] You can now choose the design style
[ Add function ][ Title ] Icons can be used before and after letters
[ Add function ][ Balloon ] You can now choose the style of image
[ Add function ][ Animation(Pro) ] Addition of animation speed/distance specification function
[ Add function ][ Card(Pro) ] Add an inner block area to the text part You can add and arrange any blocks you like.
[ Add function ][ Child Page(Pro) ] Do not display pages without child pages in pulldown
[ Bug fix ][ Timeline(Pro) ] Fixed a bug that color cannot be reset

= 0.35.5 =
[ Specification Change ][ Border Box ] icon list update

= 0.35.4 =
[ Bug fix ] [ BorderBox ] icon list layout bug fix

= 0.35.3 =
build only

= 0.35.2 =
build only

= 0.35.1 =
[ Bug fix ][ Step Block ] Can not edit bug fix

= 0.35.0 =
[ Add function ] Fontawesome icon selector update
[ Add Setting ][ Outer(Pro) ] Add LR no padding
[ Specification Change ][ Border Box ] Padding tuning ( Wide screen )

= 0.34.0 =
[ Add block ][ Animation(Pro) ] 
[ Add function ] Add fontawesome icon selector to Border box block

= 0.33.3 =
[ Bug fix ] reverse to 0.33.1

= 0.33.2 =
[ Bug fix ][ Card (pro) ] if url is null, no a tag of card title.

= 0.33.1 =
[ Bug fix ][ Table of content (pro) ] open close bug fix

= 0.33.0 =
[ Add function ][ Card (pro) ] Cope with card block Image round
[ Bug fix ][ Table of content (pro) ] open close bug fix

= 0.32.5 =
[ Other ] Update Block Template Pattern ( Pro )

= 0.32.4 =
[ bug fix ][ Outer ] Background fix bug.

= 0.32.3 =
[ bug fix ][ Outer ] Background fix bug.

= 0.32.2 =
[ bug fix ][ Icon Card ] Fix alignment of icon and card item.

= 0.32.1 =
[ bug fix ][ Border Box ] Fix title design is overwrited by theme.

= 0.32.0 =
[ Add new block ][ Icon Card (pro) ]
[ Specification Change ] Font Awesome Version 5.13.0
[ Specification Change ] Bootstrap Version 4.5.0

= 0.31.0 =
[ Add new block ][ Border Box ]
[ bug fix ][ Outer (pro) ] BG fix error on iPhone

= 0.30.0 =
[ Add Function ][ Post list (pro) / Card (pro) / Grid Column (pro) ] Cope with 6 column

= 0.29.7 =
[ bug fix ][ Outer (pro) ] fix outer block error

= 0.29.6 =
[ Delete function ][ Group block ] Delete border custom color

= 0.29.5 =
[ Design tuning ][ Group block style ] Add alert style

= 0.29.4 =
build only

= 0.29.3 =
[ bug fix ][ toc (pro) ] Cope with old type toc

= 0.29.2 =
build only

= 0.29.1 =
[ bug fix ][ toc (pro) ] Cope with deprecated

= 0.29.0 =
[ Add new block ][ Grid Column(pro) ]
[ Add function ][ Group ] Use custom border color
[ bug fix ][ toc (pro) ] Many title charactor number
[ bug fix ][ list ] 2digits number display bug fix

= 0.28.4 =
[ bug fix ] Drag and drop inserter bug fix

= 0.28.3 =
[ bug fix ][ toc (pro) ] Marker tag error fix

= 0.28.2 =
[ bug fix ][ toc (pro) ] Revert

= 0.28.1 =
[ bug fix ][ toc (pro) ] Marker tag error fix

= 0.28.0 =
[ bug fix ][ toc (pro) ] close toc block bug fix
[ Add function ][ Child Page List (pro) ] function of exclude this page.

= 0.27.5 =
[ bug fix ][ Step (pro) ] When add inner block that real time step number bug fix.

= 0.27.4 =
[ bug fix ][ Post List(pro) ] Additional class name not reflected bug fix

= 0.27.3 =
build only

= 0.27.2 =
[ bug fix ][ Outer(pro) ] when reset border that block breaks
[ bug fix ][ Table Of Content(pro) ] Can't all display title

= 0.27.1 =
[ bug fix ][ PR Content ] Layout bug fix on firefox
[ Design tuning ][ Table of content(pro) ] Padding tuning

= 0.27.0 =
[ Add function ][ Outer(pro) ] Responsible background image
[ Specification change ][ staff ] Change title size
[ Specification change ][ Responsible Spacer ] Display dottline in edit screen

= 0.26.9 =
[ bug fix ][ Card(pro) ] column bug fix at edit screen

= 0.26.8 =
[ bug fix ][ Card(pro) ] Disappear card url bug fix.

= 0.26.7 =
[ bug fix ][ Card(pro) ] column bug fix at edit screen

= 0.26.6 =
[ bug fix ] Dynamic attribute class error

= 0.26.4 =
[ bug fix ][ button ] Change Color bug fix.

= 0.26.3 =
[ bug fix ][ button ] outline style bug fix.

= 0.26.2 =
[ bug fix ] Auto stop function bug fix of Both(Free and Pro) used.

= 0.26.0 =
[ Add function ][ button ] Add text style
[ Add function ][ button ] Add wide style
[ bug fix ] Bug fix of when use hidden function and Posts column

= 0.25.4 =
[ bug fix ][ term color ] Fixed bug that gives arise from no custom taxonomy / term.

= 0.25.3 =
[ Bug Fix ][ Post list(Pro) ] Offset Bug Fix
[ Bug Fix ][ Card ] Block clash bug fix
[ Bug Fix ][ Hidden Function ] ReEnable


= 0.25.1 =
[ Specification change ][ Hidden Function ] Exclude Reuse block

= 0.25.0 =
[ Add function ][ Hidden Function ] Add
[ Add function ][ Post list(Pro) ] Add text list layout

= 0.24.2 =
[ Bug Fix ][ Table of Content(Pro) ] Title in Outer Block bug fix

= 0.24.1 =
[ bug Fix ] Cope with WordPress5.4
[ bug Fix ][ Block Template ( Pro ) ] indert bug fix

= 0.24.0 =
[ Add function ][ Template block(Pro) ] Add
[ Add function ][ Table of Content(Pro) ] Add Template block
[ Bug Fix ][ Table of Content(Pro) ] Link Target Point

= 0.23.0 =
[ Add function ][ post list(Pro) ] Add setting ( offset / order / exclude self )
[ Bug Fix ][ Outer(Pro) ] Can't remove background image fix

= 0.22.4 =
[ Bug Fix ] Editor style CSS not working

= 0.22.3 =
[ Bug Fix ][ PR Content ] Error fix
[ Specification change ] Add css load point hook
[ Specification change ][ YouTube ] Add 100% width

= 0.22.2 =
[ Specification change( Revert ) ] load css on header from footer

= 0.22.0 =
[ Specification change ] load font awesome on footer from header

= 0.21.0 =
[ Specification change ] load css on footer from header

= 0.20.4 =
[ bug fix ][ Card(Pro) ] reuse and group bug fix

= 0.20.3 =
[ bug fix ][ PR Content ] fix deparected

= 0.20.2 =
[ bug fix ][ Card(Pro) ] fix md size convert error

= 0.20.1 =
[ Specification change ][ Card(Pro) ] btn margine tuning

= 0.20.0 =
[ add block ][ Card block ] * Pro Version Only
[ Specification change ] Delete Lightning Pro Limited

= 0.19.2 =
[ Design tuning ][ Child Page List(Pro) ] Add margin top
[ Specification change ][ post-list(Pro) / child-page(Pro) ] Change Outer class name

= 0.19.1 =
[ Bug fix ] vk-components.css link
[ Specification change ] Exclude link to vk-components.css for lightning user

= 0.19.0 =
[ Add function ][ QA Block ] Add html anchor

= 0.18.2 =
[ bug Fix ][ Post list (Pro) ] Display item controll

= 0.18.0 =
[ bug Fix ][ Post list (Pro) ] item controll
[ Add function ][ Child Page (Pro) ] Can be set the parent page.

= 0.17.7 =
[ bug Fix ] Table of contents render bug fix
[ Design tuning ][ Step block / Timiline block ]

= 0.17.6 =
[ bug Fix ] headding style color bug fix

= 0.17.5 =
[ bug Fix ] viewHelpers.js Reregistration

= 0.17.4 =
[ deploy setting from GitHub ]

= 0.17.2 =
[ bug fix ][ Button ] Custom color palette.
[ bug fix ][ PR Block ] Fixed image alt

= 0.17.1 =
[ bug fix ][ Button ] Fixed input text bug on Safari
[ bug fix ][ Baloon / PR Content ] Fixed image alt

= 0.17.0 =
[ add block ][ child page list block ] * Pro Version Only
[ add style ][ group block ] border round
[ add id ][ Responsive spacer ] add specified id by user

= 0.16.4 =
[ bug fix ][ step block ] font size
[ bug fix ][ heading style ] add clear :before and :after

= 0.16.3 =
[ bug fix ] deactive free version function

= 0.16.2 =
[ bug fix ] function declare

= 0.16.0 =
[ Add Style ] Add title styles

= 0.15.1 =
[ design tuning ] Delete margin bottom of the last block in the group block.

= 0.15.0 =
[ Add Style ] Add Group styles
[ Add Style ] Add Image styles

= 0.14.0 =
[ Add Style ] Add list styles

= 0.13.3 =
[ Bug Fix ][ Step ] first block dont become H4 in second later item block bug fix.

= 0.13.2 =
[ Specification change ] Delete width specified of edit page width ( Change to the theme specify )

= 0.13.1 =
[ Specification change ][ Step Block ] Delete First Caption

= 0.13.0 =
[ Add Block ] Step Block
[ Add Block ] Timeline Block

= 0.12.7 =
[ Bug Fix ][ table of contents ] bug fix

= 0.12.6 =
[ Bug Fix ][ column ] WordPress 5.3 column bug fix

= 0.12.5 =
[ Bug Fix ][ post list ] WordPress 5.3 bug fix

= 0.12.4 =
[ Bug Fix ][ post list ] button display bug fix

= 0.12.3 =
[ Bug Fix ] updater

= 0.12.2 =
[ Bug Fix ][ post list ] taxonomy bug list
[ add function ] updater

= 0.12.1 =
[ Bug Fix ] common css html font size

= 0.12.0 =
[ Add New Block ] Post List Block

= 0.10.1 =
[ Bug Fix ] baloon css

= 0.10.0 =
[ Add Function ] Add marker

= 0.9.0 =
[Add New Block] Table Of Contents ( Pro Only )

= 0.8.3 =
[Specification change][ Staff ] CSS minor tuning

= 0.8.2 =
[Specification change][ Staff ] Change H tag and other.

= 0.8.1 =
[Bug fix] When title margin set that Title align not work.

= 0.8.0 =
[Add New Block] Staff

= 0.7.1 =
[Bug fix][ Title ] Part of margin bottom functions was not working.

= 0.7.0 =
[Bug fix][ PR Blocks ] When link url not set that no print a Tags
[Specification change][ PR Blocks ] Change outer tag article to div
[Specification change][ PR Blocks ] Change h1 tag to h3 tag

= 0.6.0 =
[Add New Block] Title
[Add New Block] Responsive Spacer
[Bug fix][ outer ] FireFox and Eddge design fix
[Add Function][ Outer ] Add link id setting

= 0.5.2 =
[Bug fix][ outer ] Lightning Pro theme（No child） no work bug fix

= 0.5.1 =
[Bug fix][ outer ] Child theme no work bug fix

= 0.5.0 =
[Add Function][ outer ] Add border

= 0.4.1 =
[Specification change][ PR Content ] markup change
[Add Function][ button ] Add caption

= 0.4.0 =
[Add New Block] Outer
[Add New Block] PR Content

= 0.3.0 =
[Add New Block] Button Block
[Add New Block] PR Blocks Block

= 0.2.2 =
[bug fix] Fixed bug that becomes unusable in WordPress 5.0

= 0.2.0 =
[Specification change] CSS Name rule Changed

= 0.1.0 =
First release

== Upgrade Notice ==

Nothing.