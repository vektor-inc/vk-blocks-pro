=== VK Dynamic If Block ===
Contributors: vektor-inc,kurudrive,doshimaf
Tags: dynamic block, if, Conditional branch, Conditional Display, Custom Field, Full Site Editing
Requires at least: 6.0
Tested up to: 6.2
Requires PHP: 7.4
Stable tag: 0.8.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

VK Dynamic If Block displays its Inner Blocks based on specified conditions, such as whether the current page is the front page or a single post, the post type, or the value of a Custom Field.

== Description ==

VK Dynamic If Block is a custom WordPress block, primarily designed for FSE, that allows users to display Innder Block based on specified conditions. With this block, you can show or hide Innder Block depending on various conditions, such as whether the current page is the front page or a single post, the post type, or the value of a Custom Field.

== Installation ==

1. Upload the plugin files to the '/wp-content/plugins/vk-dynamic-if-block' directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Use the block editor to add a "Dynamic If" block to your post or page.

== Frequently Asked Questions ==

= Can I use multiple conditions? =

You cannot specify too many conditions.
However, by nesting Dynamic If Blocks, various conditional branching can be handled.

== Screenshots ==

1. Block settings in the editor sidebar.
2. Dynamic If block in the site editor.
3. Dynamic If block in the site editor.

== Changelog ==

= 0.8.0 =
[ Add Function ] Add a conditional branching function based on language.

= 0.7.0 =
[ Add Function ] Added condition to display only to login user.
[ Specification Change ] Fix WordPress 6.3 transforms settings.

= 0.6.3 =
[ Fix ] Fixed a bug related to the period setting when referencing a custom field.

= 0.6.2 =
[ Fix ] Fix the bug in conditional branching based on user roles.

= 0.6.1 =
[ Fix ] Correct the translation

= 0.6.0 =
[ Add Function ] Added user roles condition
[ Add Function ] Added date condition
[ Fix ] Added UserRole label to block.

= 0.5.0 =
[ Add Function ]Added transforms settings to wrap and unwrap.

= 0.4.3 =
* [ Bug fix ] Fixed bug in conditional branching based on custom field values

= 0.4.1 =
* Update descriptions

= 0.4.0 =
* Add custom field conditions

= 0.3.1 =
* Fix translate

= 0.3.0 =
* Add exclusion setting

= 0.2.7 =
* Set text domain for translations

= 0.2.6 =
* Set text domain for translations

= 0.2.4 =
* Fix readme

= 0.2.3 =
* Add fallback for vendor files failed to deliver or load.

= 0.2.1 =
* Add default paragraph block

= 0.2.0 =
* Add conditions

= 0.1.0 =
* Initial release

== Upgrade Notice ==

= 0.1.0 =
* Initial release
