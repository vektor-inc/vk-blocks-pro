/**
 * WordPress dependencies
 */
import { __, getLocaleData } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, Icon, Button, ExternalLink } from '@wordpress/components';
import { InspectorControls, transformStyles } from '@wordpress/block-editor';
import { createHigherOrderComponent, useInstanceId } from '@wordpress/compose';
import { hasBlockSupport } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { CodeMirrorCss } from '@vkblocks/components/code-mirror-css';
import { emptyStringToUndefined } from '@vkblocks/utils/empty-string-to-undefined';
import { ReactComponent as IconSVG } from './icon.svg';
/*globals vk_blocks_params */

export const inString = (str, keyword) => {
	return str.indexOf(keyword) !== -1;
};

export const hasCustomCssSupport = (blockName) => {
	// 追加CSSクラスを許可していない場合はfalse
	if (!hasBlockSupport(blockName, 'customClassName', true)) {
		return false;
	}

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

export const existsCss = (css) => {
	// cssが存在するかつ空白文字のみではない
	return css && css.match(/\S/g);
};

export const customCssSelectorRegex = /selector/g;

/**
 * Filters registered block settings.
 *
 * @param {Object} settings
 */
export function addAttribute(settings) {
	if (!hasCustomCssSupport(settings.name)) {
		return settings;
	}
	settings.attributes = {
		...settings.attributes,
		vkbCustomCss: {
			type: 'string',
		},
	};
	return settings;
}

/**
 * Override the default edit UI to include layout controls
 */
export const withInspectorControls = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		const { name, attributes, setAttributes } = props;
		if (!hasCustomCssSupport(name)) {
			return <BlockEdit {...props} />;
		}

		const { vkbCustomCss, className } = attributes;
		// 追加CSSを半角文字列で分けて配列化
		const nowClassArray = className ? className.split(' ') : [];

		// 追加 CSS クラスにvk_custom_cssがあるか
		const existsCustomCssClass = (_nowClassArray) => {
			return _nowClassArray.indexOf('vk_custom_css') !== -1
				? true
				: false;
		};

		// カスタムCSSにselectorがあるか
		const existsCustomCssSelector = (_vkbCustomCss) => {
			return customCssSelectorRegex.test(_vkbCustomCss);
		};

		// vkbCustomCssが変更されたとき
		useEffect(() => {
			if (
				!existsCustomCssClass(nowClassArray) &&
				existsCustomCssSelector(vkbCustomCss)
			) {
				// カスタムCSS用クラスを追加
				setAttributes({
					className: emptyStringToUndefined(
						classnames(nowClassArray, `vk_custom_css`)
					),
				});
			}

			if (
				existsCustomCssClass(nowClassArray) &&
				!existsCustomCssSelector(vkbCustomCss)
			) {
				// カスタムCSS用クラスを削除
				const deleteClass = nowClassArray.indexOf('vk_custom_css');
				nowClassArray.splice(deleteClass, 1);
				setAttributes({
					className: emptyStringToUndefined(
						classnames(nowClassArray)
					),
				});
			}
		}, [vkbCustomCss]);

		// classNameが変更されたときに
		useEffect(() => {
			if (
				!existsCustomCssClass(nowClassArray) &&
				existsCustomCssSelector(vkbCustomCss)
			) {
				// カスタムCSS用クラスを追加
				setAttributes({
					className: emptyStringToUndefined(
						classnames(`vk_custom_css`, nowClassArray)
					),
				});
			}
		}, [className]);

		// アイコンのスタイル
		let iconStyle = {
			width: '24px',
			height: '24px',
		};
		if (existsCss(vkbCustomCss)) {
			iconStyle = {
				...iconStyle,
				color: '#fff',
				background: '#1e1e1e',
			};
		}

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						className={'vk_custom_css_panel'}
						icon={<Icon icon={IconSVG} style={iconStyle} />}
						title={__('Custom CSS', 'vk-blocks-pro')}
						initialOpen={false}
					>
						<CodeMirrorCss
							className="vk-codemirror-block-editor"
							value={vkbCustomCss ? vkbCustomCss : ''}
							onChange={(value) => {
								setAttributes({
									vkbCustomCss: emptyStringToUndefined(value),
								});
							}}
						/>
						<p>
							{__(
								'If selector is specified, it is replaced by a block-specific CSS class. If selector is set to "selector", it will be replaced with a block-specific CSS class. CSS selectors other than "selector" may affect the entire page.',
								'vk-blocks-pro'
							)}
							{(() => {
								const lang = getLocaleData()[''].lang;
								if (lang === 'ja_JP') {
									return (
										<ExternalLink
											href="https://www.vektor-inc.co.jp/service/wordpress-plugins/vk-blocks/vk-custom-css/"
											target="_blank"
											rel="noreferrer"
										>
											詳しくはこちら
										</ExternalLink>
									);
								}
							})()}
						</p>
						<p>{__('Example:', 'vk-blocks-pro')}</p>
						<pre className="vk-custom-css-sample-code">
							{'selector {\n    background: #f5f5f5;\n}'}
						</pre>
						<p>
							{__(
								'If you want the edit screen to be as close to the public screen as possible, or if your own CSS interferes with the CSS for the identification display and does not display as intended on the edit screen, please hide it.',
								'vk-blocks-pro'
							)}
						</p>
						<Button
							href={addQueryArgs(
								'options-general.php?page=vk_blocks_options#custom-css-setting'
							)}
							target="_blank"
							rel="noreferrer"
							variant="secondary"
							isSmall
						>
							{__('Custom CSS Setting', 'vk-blocks-pro')}
						</Button>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	'withInspectorControls'
);

/**
 * Override the default block element to include elements styles.
 */
const withElementsStyles = createHigherOrderComponent(
	(BlockListBlock) => (props) => {
		const { name, attributes } = props;
		if (!hasCustomCssSupport(name)) {
			return <BlockListBlock {...props} />;
		}
		// 編集画面で使用出来る Unique id
		// @see https://github.com/WordPress/gutenberg/blob/086b77ed409a70a6c6a6e74dee704851eff812f2/packages/compose/src/hooks/use-instance-id/README.md
		const id = useInstanceId(BlockListBlock);
		const uniqueClass = `vk_custom_css_${id}`;

		const { vkbCustomCss } = attributes;
		// editor用のクラス名を追加
		const customCssClass = classnames(props.className, {
			[uniqueClass]: existsCss(vkbCustomCss),
			[`vk_edit_custom_css`]:
				vk_blocks_params.show_custom_css_editor_flag === 'show' &&
				existsCss(vkbCustomCss),
		});

		// selectorをUniqueクラスに変換する
		let cssTag = vkbCustomCss ? vkbCustomCss : '';
		if (cssTag && uniqueClass) {
			cssTag = vkbCustomCss.replace(
				customCssSelectorRegex,
				'.' + uniqueClass
			);
		}

		// cssに.editor-styles-wrapperをwrapする
		if (cssTag !== '') {
			cssTag = transformStyles(
				[{ css: cssTag }],
				'.editor-styles-wrapper'
			);
		}

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
);

addFilter(
	'blocks.registerBlockType',
	'vk-blocks/custom-css/addAttribute',
	addAttribute
);
addFilter(
	'editor.BlockEdit',
	'vk-blocks/editor/custom-css/with-inspector-controls',
	withInspectorControls
);
addFilter(
	'editor.BlockListBlock',
	'vk-blocks/style/with-block-controls',
	withElementsStyles
);
