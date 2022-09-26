/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, Icon, Button } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent, useInstanceId } from '@wordpress/compose';
import { hasBlockSupport } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';

/**
 * External dependencies
 */
import classnames from 'classnames';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { EditorView } from '@codemirror/view';

/**
 * Internal dependencies
 */
import { ReactComponent as IconSVG } from './icon.svg';
/*globals vk_blocks_params */

export const inString = (str, keyword) => {
	return str.indexOf(keyword) !== -1;
};

export const isAddBlockCss = (blockName) => {
	const allowed = ['core', 'vk-blocks'];
	let returnBool =
		allowed.find((item) => inString(blockName, item)) !== undefined;

	const excludeBlocks = [
		// ExUnitに入っているvk blocksブロック
		'vk-blocks/share-button',
		'vk-blocks/child-page-index',
		'vk-blocks/contact-section',
		'vk-blocks/page-list-ancestor',
		'vk-blocks/sitemap',
		'vk-blocks/cta',
	];
	const excludeBlock =
		excludeBlocks.find((excludeName) =>
			inString(blockName, excludeName)
		) !== undefined;
	if (excludeBlock) {
		returnBool = false;
	}
	return returnBool;
};

export const customCssRegex = /vk_custom_css/;
export const customCssSelectorRegex = /selector/;

/**
 * edit.js
 */
addFilter(
	'editor.BlockEdit',
	'vk-blocks/custom-css',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { name, attributes, setAttributes, isSelected } = props;
			const { vkbCustomCss, className } = attributes;
			const hasCustomClassName = hasBlockSupport(
				name,
				'customClassName',
				true
			);
			// 追加CSSを半角文字列で分けて配列化
			const nowClassArray = className ? className.split(' ') : [];

			// vkbCustomCssが変更されたとき
			useEffect(() => {
				// カスタムCSS用クラスが無いかつselectorがあればカスタムCSS用クラスを追加
				if (
					nowClassArray.indexOf('vk_custom_css') === -1 &&
					customCssSelectorRegex.test(vkbCustomCss)
				) {
					setAttributes({
						className: classnames(nowClassArray, `vk_custom_css`),
					});
				}

				// カスタムCSS用クラスがあるかつselectorがなければカスタムCSS用クラスを削除
				if (
					nowClassArray.indexOf('vk_custom_css') !== -1 &&
					!customCssSelectorRegex.test(vkbCustomCss)
				) {
					const deleteClass = nowClassArray.indexOf('vk_custom_css');
					nowClassArray.splice(deleteClass, 1);
					setAttributes({ className: classnames(nowClassArray) });
				}
			}, [vkbCustomCss]);

			// classNameが変更されたときに
			useEffect(() => {
				// カスタムCSS用クラスが無いかつselectorがあればカスタムCSS用クラスを追加
				if (
					nowClassArray.indexOf('vk_custom_css') === -1 &&
					customCssSelectorRegex.test(vkbCustomCss)
				) {
					setAttributes({
						className: classnames(nowClassArray, `vk_custom_css`),
					});
				}
			}, [className]);

			// アイコンのスタイル
			let iconStyle = {
				width: '24px',
				height: '24px',
			};
			// vkbCustomCssが存在するかつ空白文字のみではない
			if (vkbCustomCss && vkbCustomCss.match(/\S/g)) {
				iconStyle = {
					...iconStyle,
					color: '#fff',
					background: '#1e1e1e',
				};
			}

			if (isAddBlockCss(name) && hasCustomClassName && isSelected) {
				return (
					<>
						<BlockEdit {...props} />
						<InspectorControls>
							<PanelBody
								className={'vk_custom_css_panel'}
								icon={<Icon icon={IconSVG} style={iconStyle} />}
								title={__('Custom CSS', 'vk-blocks')}
								initialOpen={false}
							>
								<CodeMirror
									id="vk-custom-css-code-mirror"
									className="custom-css-editor"
									height="200px"
									// https://uiwjs.github.io/react-codemirror/#/extensions/color
									extensions={[
										css(),
										EditorView.lineWrapping,
									]}
									value={vkbCustomCss ? vkbCustomCss : ''}
									onChange={(value) => {
										setAttributes({ vkbCustomCss: value });
									}}
								/>
								<p>
									{__(
										'selector を指定した場合、ブロック固有の CSS クラスに置き換わります。',
										'vk-blocks'
									)}
								</p>
								<p>
									{__(
										'"selector"以外のCSSセレクターは、ページ全体に影響する可能性があります。',
										'vk-blocks'
									)}
								</p>
								{/* <p>
									{__(
										'If selector is set to "selector", it will be replaced with a block-specific CSS class. CSS selectors other than "selector" may affect the entire page.',
										'vk-blocks'
									)}
								</p> */}
								<p>{__('Example:', 'vk-blocks')}</p>
								<pre
									style={{
										whiteSpace: 'pre-wrap',
										padding: '16px',
										display: 'block',
										background: '#f5f5f5',
									}}
								>
									{'selector {\n    background: #f5f5f5;\n}'}
								</pre>
								<p>
									{__(
										'編集画面をできるだけ公開画面に近づけたい場合や、自作のCSSが識別表示用のCSSと干渉して編集画面で意図した通りに表示されない場合は、非表示にすることをお勧めします。',
										'vk-blocks'
									)}
								</p>
								{/* <p>
									{__(
										'If you want the edit screen to be as close to the public screen as possible, or if your own CSS interferes with the CSS for the identification display and does not display as intended on the edit screen, please hide it.',
										'vk-blocks'
									)}
								</p> */}
								<Button
									href={addQueryArgs(
										'options-general.php?page=vk_blocks_options#custom-css-setting'
									)}
									target="_blank"
									rel="noreferrer"
									variant="secondary"
									isSmall
								>
									{__('Custom CSS Setting', 'vk-blocks')}
								</Button>
							</PanelBody>
						</InspectorControls>
					</>
				);
			}
			return <BlockEdit {...props} />;
		};
	}, 'vkbCustomCssSection')
);

/**
 * edit.js
 */
addFilter(
	'editor.BlockListBlock',
	'vk-blocks/custom-css',
	createHigherOrderComponent((BlockListBlock) => {
		return (props) => {
			const { name, attributes } = props;
			const hasCustomClassName = hasBlockSupport(
				name,
				'customClassName',
				true
			);
			const { vkbCustomCss } = attributes;
			// 編集画面で使用出来る Unique id
			// @see https://github.com/WordPress/gutenberg/blob/086b77ed409a70a6c6a6e74dee704851eff812f2/packages/compose/src/hooks/use-instance-id/README.md
			const id = useInstanceId(BlockListBlock);
			const uniqueClass = `vk_custom_css_${id}`;

			// editor用のクラス名を追加
			const customCssClass = classnames(props.className, {
				// vkbCustomCssが存在するかつ空白文字のみではない
				[uniqueClass]: vkbCustomCss && vkbCustomCss.match(/\S/g),
				[`vk_edit_custom_css`]:
					vk_blocks_params.show_custom_css_editor_flag === 'true' &&
					vkbCustomCss &&
					vkbCustomCss.match(/\S/g),
			});

			// selectorをUniqueクラスに変換する
			let cssTag = vkbCustomCss ? vkbCustomCss : '';
			if (cssTag && uniqueClass) {
				cssTag = vkbCustomCss.replace('selector', '.' + uniqueClass);
			}

			if (isAddBlockCss(name) && hasCustomClassName) {
				return (
					<>
						{(() => {
							if (cssTag) {
								return <style>{cssTag}</style>;
							}
						})()}
						<BlockListBlock {...props} className={customCssClass} />
					</>
				);
			}
			return <BlockListBlock {...props} />;
		};
	}, 'vkbCustomCss')
);
