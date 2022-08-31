/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { PanelBody, Icon } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { hasBlockSupport } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { assign } from 'lodash';
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

/**
 * Block.json
 *
 * @param {string} settings
 */
addFilter('blocks.registerBlockType', 'vk-blocks/custom-css', (settings) => {
	if (
		isAddBlockCss(settings.name) &&
		hasBlockSupport(settings.name, 'customClassName', true)
	) {
		settings.attributes = assign(settings.attributes, {
			vkbCustomCss: {
				type: 'string',
				default: null,
			},
		});
	}
	return settings;
});

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
			// 追加CSSクラスを半角文字列で分けて配列化
			const nowClassArray = className ? className.split(' ') : [];
			// clientId サンプル7cdd8cf7-7645-4cf5-9d73-1181f8734cfb
			const customCssRegex = /vk_custom_css-(|)/;
			const customCssSelectorRegex = /selector/;

			// vkbCustomCssが変わった時にclassNameに追加CSSが無いかつ、selectorがあったら追加cssクラスにクラス名を追加する
			useEffect(() => {
				// vk_custom_css-${clientId}が無いかつselectorがあればユニーククラスを追加
				if (
					!customCssRegex.test(className) &&
					customCssSelectorRegex.test(vkbCustomCss)
				) {
					const newClassName = classnames(
						className,
						`vk_custom_css-${clientId}`
					);
					setAttributes({ className: newClassName });
				}

				// selectorがなければユニーククラスを削除
				if (!customCssSelectorRegex.test(vkbCustomCss)) {
					const deleteClass =
						nowClassArray.indexOf(/vk_custom_css-(.+)/);
					nowClassArray.splice(deleteClass, 1);
					const newClassName = classnames(nowClassArray);
					setAttributes({ className: newClassName });
				}
			}, [vkbCustomCss]);

			// 複製されたら再利用ブロック以外の時は以前付いていたクラス名vk-custom_css-${clientId}は削除する
			useEffect(() => {
				if (
					customCssSelectorRegex.test(vkbCustomCss) &&
					isParentReusableBlock(clientId) === false
				) {
					// 前のクラス名を削除する
					// const deleteClass = nowClassArray.find(/vk_custom_css-(|)/);
					const deleteClass =
						nowClassArray.indexOf(/vk_custom_css-(.+)/);
					nowClassArray.splice(deleteClass, 1);
					const newClassName = classnames(
						nowClassArray,
						`vk_custom_css-${clientId}`
					);
					setAttributes({ className: newClassName });
				}
			}, [clientId]);

			let iconStyle = {
				width: '24px',
				height: '24px',
			};
			if (vkbCustomCss) {
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
								<pre style={{ whiteSpace: 'pre-wrap' }}>
									{'selector {\n    background: black;\n}'}
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

			// editor class
			const attachedClass = classnames(className, {
				[`vk_edit_custom_css`]: vkbCustomCss,
			});

			// selectorをvk_custom_css-${clientId}に変換する
			let cssTag;
			const classes =
				vkbCustomCss && className?.includes('vk_custom_css-')
					? className
							.split(' ')
							.find((i) => i.includes('vk_custom_css'))
					: null;
			if (vkbCustomCss) {
				cssTag = vkbCustomCss.replace('selector', '.' + classes);
			}

			if (isAddBlockCss(name) && hasCustomClassName) {
				return (
					<>
						<BlockListBlock {...props} className={attachedClass} />
						{(() => {
							if (cssTag) {
								return <style type="text/css">{cssTag}</style>;
							}
						})()}
					</>
				);
			}
			return <BlockListBlock {...props} />;
		};
	}, 'vkbCustomCss')
);

/**
 * save.js
 * attributeの内容を変更するのでsave.jsの内容とedit.js
 * フロントエンドの出力はrender_blockする？
 */
// addFilter(
// 	'blocks.getSaveElement',
// 	'vk-blocks/custom-css',
// 	(el, type, attributes) => {
// 		const cssTag = attributes.vkbCustomCss;
// 		if (!cssTag) {
// 			return el;
// 		}
// 		// selectorというクラス名をvk_custom_css-${clientId}に変更する

// 		// NOTE: useBlockProps + style要素を挿入する場合、useBlockPropsを使った要素が最初（上）にこないと、
// 		// カスタムクラスを追加する処理が失敗する
// 		return (
// 			<>
// 				{el}
// 				<style type="text/css">{cssTag}</style>
// 			</>
// 		);
// 	}
// );
