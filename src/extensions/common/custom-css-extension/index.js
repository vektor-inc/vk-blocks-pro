/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, Icon } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { hasBlockSupport } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

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
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';
import { ReactComponent as IconSVG } from './icon.svg';

export const inString = (str, keyword) => {
	return str.indexOf(keyword) !== -1;
};

export const isAddBlockCss = (blockName) => {
	const allowed = ['core', 'vk-blocks'];
	const returnBool =
		allowed.find((item) => inString(blockName, item)) !== undefined;
	return returnBool;
};

export const customCssRegex = /vk_custom_css-(.+)/;
export const customCssSelectorRegex = /selector/;

/**
 * edit.js
 */
addFilter(
	'editor.BlockEdit',
	'vk-blocks/custom-css',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { name, attributes, setAttributes, isSelected, clientId } =
				props;
			const { vkbCustomCss, className } = attributes;
			const hasCustomClassName = hasBlockSupport(
				name,
				'customClassName',
				true
			);
			// 追加CSSを半角文字列で分けて配列化
			const nowClassArray = className ? className.split(' ') : [];

			// 追加CSSにUniqueクラスを追加したクラス名を取得する
			const getUniqueClassName = (_nowClassArray, _clientId) => {
				return classnames(_nowClassArray, `vk_custom_css-${_clientId}`);
			};

			// vkbCustomCssが変更されたときにclassNameにUniqueクラスが無いかつvkbCustomCssにselectorがあったらクラス名を追加
			useEffect(() => {
				// Uniqueクラスが無いかつselectorがあればユニーククラスを追加
				if (
					!customCssRegex.test(className) &&
					customCssSelectorRegex.test(vkbCustomCss)
				) {
					setAttributes({
						className: getUniqueClassName(nowClassArray, clientId),
					});
				}

				// selectorがなければユニーククラスを削除
				if (!customCssSelectorRegex.test(vkbCustomCss)) {
					const deleteClass = nowClassArray.indexOf(customCssRegex);
					nowClassArray.splice(deleteClass, 1);
					setAttributes({ className: classnames(nowClassArray) });
				}
			}, [vkbCustomCss]);

			// classNameが変更されたときにvkbCustomCssにselectorがあるかつclassNameにUniqueクラスが無かったらクラス名を追加
			useEffect(() => {
				if (
					customCssSelectorRegex.test(vkbCustomCss) &&
					!customCssRegex.test(className)
				) {
					setAttributes({
						className: getUniqueClassName(nowClassArray, clientId),
					});
				}
			}, [className]);

			// 複製されたときにclassNameにUniqueクラスがあるかつ再利用ブロックではない時はUniqueクラスを振り直す
			useEffect(() => {
				if (
					customCssRegex.test(className) &&
					isParentReusableBlock(clientId) === false
				) {
					// 前のクラス名を削除する
					const deleteClass = nowClassArray.indexOf(customCssRegex);
					nowClassArray.splice(deleteClass, 1);
					setAttributes({
						className: getUniqueClassName(nowClassArray, clientId),
					});
				}
			}, [clientId]);

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
										'If selector is set to "selector", it will be replaced with a block-specific CSS class.',
										'vk-blocks'
									)}
								</p>
								<pre style={{ whiteSpace: 'pre-wrap',padding: '16px', display: 'block',background: '#f5f5f5' }}>
									{'selector {\n    background: #f5f5f5;\n}'}
								</pre>
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
			const { vkbCustomCss, className } = attributes;
			// 追加CSSを半角文字列で分けて配列化
			const nowClassArray = className ? className.split(' ') : [];

			// editor用のクラス名
			const customCssClass = classnames(props.className, {
				// vkbCustomCssが存在するかつ空白文字のみではない
				[`vk_edit_custom_css`]:
					vkbCustomCss && vkbCustomCss.match(/\S/g),
			});

			// selectorをUniqueクラスに変換する
			let cssTag;
			const uniqueClass = customCssRegex.test(className)
				? nowClassArray.find((i) => i.includes('vk_custom_css'))
				: null;
			if (vkbCustomCss && uniqueClass) {
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
