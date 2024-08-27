/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import {
	PanelBody,
	Icon,
	BaseControl,
	ToggleControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { hasBlockSupport } from '@wordpress/blocks';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { emptyStringToUndefined } from '@vkblocks/utils/empty-string-to-undefined';
import { ReactComponent as IconSVG } from './icon.svg';

// Check the keyword including str or not
// eslint-disable-next-line camelcase
export const in_string = (str, keyword) => {
	// If keyword was included that return ( true or false )
	return str.indexOf(keyword) !== -1;
};

// The checking block is hidden function target or not
// eslint-disable-next-line camelcase
export const is_hidden = (blockName) => {
	// Target of hidden function active
	const allowed = ['core', 'vk-blocks'];
	// name には allowed の項目が一つずつ入る
	// 判断中のブロック名の中にname( core or vk-blocks )がある（ undefinedじゃない ）場合
	// true を返す
	let hiddenReturn =
		allowed.find((name) => in_string(blockName, name)) !== undefined;

	const excludes = [
		'vk-blocks/card-item',
		'vk-blocks/icon-card-item',
		'vk-blocks/select-post-list-item',
	];
	const excludeBlock =
		excludes.find((excludeName) => in_string(blockName, excludeName)) !==
		undefined;

	if (excludeBlock) {
		hiddenReturn = false;
	}

	// classNameをサポートしているか
	const hasCustomClassName = hasBlockSupport(
		blockName,
		'customClassName',
		true
	);
	if (!hasCustomClassName) {
		hiddenReturn = false;
	}
	return hiddenReturn;
};

// deprecated用 非表示設定を使用している可能性があるdynamic block
const mayUsedDynamicBlock = [
	'vk-blocks/breadcrumb',
	'vk-blocks/child-page',
	'vk-blocks/post-list',
	'vk-blocks/page-content',
	'vk-blocks/ancestor-page-list',
	// ExUnitに入っているvk blocksブロック,
	'vk-blocks/share-button',
	'vk-blocks/child-page-index',
	'vk-blocks/contact-section',
	'vk-blocks/page-list-ancestor',
	'vk-blocks/sitemap',
];

/* Filter of editor.BlockEdit
	/*-----------------------------------*/
addFilter(
	'editor.BlockEdit',
	'vk-blocks/hidden-extension',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			if (is_hidden(props.name)) {
				//xxl用、deprecated追加
				if (
					props.attributes.vkb_hidden_xl &&
					!props.attributes.vkb_hidden_xxl
				) {
					props.attributes.vkb_hidden_xxl = true;
					props.attributes.vkb_hidden_xl_v2 = true;
					props.attributes.vkb_hidden_xl = false;
				}
				const { name, attributes, setAttributes } = props;
				const {
					vkb_hidden,
					vkb_hidden_xxl,
					vkb_hidden_xl_v2,
					vkb_hidden_xl,
					vkb_hidden_lg,
					vkb_hidden_md,
					vkb_hidden_sm,
					vkb_hidden_xs,
					className,
				} = attributes;

				/**
				 * dynamic block deprecated
				 * 非表示用のattributeが使用されていたらclassNameに入れ,過去のattributeをundefinedにする
				 * dynamic block以外はコアの仕様で追加 CSS クラスに自動的に追加される
				 */
				useEffect(() => {
					if (mayUsedDynamicBlock.includes(name)) {
						if (
							vkb_hidden ||
							vkb_hidden_xxl ||
							vkb_hidden_xl_v2 ||
							vkb_hidden_xl ||
							vkb_hidden_lg ||
							vkb_hidden_md ||
							vkb_hidden_sm ||
							vkb_hidden_xs
						) {
							setAttributes({
								className: classnames({
									[className]: className,
									[`vk_hidden`]: vkb_hidden,
									[`vk_hidden-xxl`]: vkb_hidden_xxl,
									[`vk_hidden-xl-v2`]: vkb_hidden_xl_v2,
									[`vk_hidden-xl`]: vkb_hidden_xl,
									[`vk_hidden-lg`]: vkb_hidden_lg,
									[`vk_hidden-md`]: vkb_hidden_md,
									[`vk_hidden-sm`]: vkb_hidden_sm,
									[`vk_hidden-xs`]: vkb_hidden_xs,
								}),
								vkb_hidden: undefined,
								vkb_hidden_xxl: undefined,
								vkb_hidden_xl_v2: undefined,
								vkb_hidden_xl: undefined,
								vkb_hidden_lg: undefined,
								vkb_hidden_md: undefined,
								vkb_hidden_sm: undefined,
								vkb_hidden_xs: undefined,
							});
						}
					}
					// vk_hidden-xl_v2をvk_hidden-xl-v2にする
					if (/vk_hidden-xl_v2/.test(className)) {
						setAttributes({
							className: className.replace(
								/vk_hidden-xl_v2/,
								'vk_hidden-xl-v2'
							),
						});
					}
				}, []);

				// 追加CSSクラスを半角文字列で分けて配列化
				const nowClassArray = className ? className.split(' ') : [];

				// アクティブなクラスかどうか
				const isActiveClass = (targetClass) => {
					const activeClassArray = [];
					nowClassArray.forEach((item) => {
						if (item === targetClass) {
							activeClassArray.push(targetClass);
						}
					});
					return activeClassArray[0] === targetClass ? true : false;
				};

				// classNameをセット
				const setNewClass = (checked, targetClass) => {
					if (checked) {
						nowClassArray.push(targetClass);
					} else {
						const clickIndex = nowClassArray.indexOf(targetClass);
						nowClassArray.splice(clickIndex, 1);
					}
					setAttributes({
						className: emptyStringToUndefined(
							nowClassArray.join(' ')
						),
					});
				};
				// アイコンのスタイル
				let iconStyle = {
					width: '24px',
					height: '24px',
				};

				if (
					isActiveClass('vk_hidden') ||
					isActiveClass('vk_hidden-xxl') ||
					isActiveClass('vk_hidden-xl-v2') ||
					isActiveClass('vk_hidden-xl') ||
					isActiveClass('vk_hidden-lg') ||
					isActiveClass('vk_hidden-md') ||
					isActiveClass('vk_hidden-sm') ||
					isActiveClass('vk_hidden-xs')
				) {
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
								title={__('Hidden Settings', 'vk-blocks-pro')}
								icon={<Icon icon={IconSVG} style={iconStyle} />}
								initialOpen={false}
							>
								<BaseControl
									label={__(
										'Hidden at screen size',
										'vk-blocks-pro'
									)}
									id={`vk_hiddenControl-hiddenScreenSize`}
								>
									<p>
										{__(
											"Note : This function is display hidden only. Actually Block is output to HTML. Please don't use you must not visible item. Don't use it for blocks you really don't want to display.",
											'vk-blocks-pro'
										)}
									</p>
									<ToggleControl
										label={__(
											'Hidden ( Screen size : all )',
											'vk-blocks-pro'
										)}
										checked={isActiveClass('vk_hidden')}
										onChange={(checked) => {
											setNewClass(checked, 'vk_hidden');
										}}
									/>
									<ToggleControl
										label={__(
											'Hidden ( Screen size : xs )',
											'vk-blocks-pro'
										)}
										checked={isActiveClass('vk_hidden-xs')}
										onChange={(checked) => {
											setNewClass(
												checked,
												'vk_hidden-xs'
											);
										}}
									/>
									<ToggleControl
										label={__(
											'Hidden ( Screen size : sm )',
											'vk-blocks-pro'
										)}
										checked={isActiveClass('vk_hidden-sm')}
										onChange={(checked) => {
											setNewClass(
												checked,
												'vk_hidden-sm'
											);
										}}
									/>
									<ToggleControl
										label={__(
											'Hidden ( Screen size : md )',
											'vk-blocks-pro'
										)}
										checked={isActiveClass('vk_hidden-md')}
										onChange={(checked) => {
											setNewClass(
												checked,
												'vk_hidden-md'
											);
										}}
									/>
									<ToggleControl
										label={__(
											'Hidden ( Screen size : lg )',
											'vk-blocks-pro'
										)}
										checked={isActiveClass('vk_hidden-lg')}
										onChange={(checked) => {
											setNewClass(
												checked,
												'vk_hidden-lg'
											);
										}}
									/>
									<ToggleControl
										label={__(
											'Hidden ( Screen size : xl )',
											'vk-blocks-pro'
										)}
										checked={isActiveClass(
											'vk_hidden-xl-v2'
										)}
										onChange={(checked) => {
											setNewClass(
												checked,
												'vk_hidden-xl-v2'
											);
										}}
									/>
									<ToggleControl
										label={__(
											'Hidden ( Screen size : xxl )',
											'vk-blocks-pro'
										)}
										checked={isActiveClass('vk_hidden-xxl')}
										onChange={(checked) => {
											setNewClass(
												checked,
												'vk_hidden-xxl'
											);
										}}
									/>
									<p>
										{__(
											'If you want to hide multiple blocks, that first you set to group block and the next, hide for the that group block.',
											'vk-blocks-pro'
										)}
									</p>
								</BaseControl>
							</PanelBody>
						</InspectorControls>
					</>
				);
			}
			// IF not hidden function target block that return original BlockEdit
			return <BlockEdit {...props} />;
		};
	}, 'addHiddenSection')
);

/* Filter of editor.BlockListBlock
	/*-----------------------------------*/
addFilter(
	'editor.BlockListBlock',
	'vk-blocks/hidden-extension',
	createHigherOrderComponent((BlockListBlock) => {
		return (props) => {
			const { attributes } = props;
			const { className } = attributes;

			// 追加CSSクラスを半角文字列で分けて配列化
			const nowClassArray = className ? className.split(' ') : [];

			// Add hidden common class
			const hiddenSomething = /vk_hidden/.test(nowClassArray)
				? 'vk_edit_hidden_warning'
				: '';

			// Add hidden all class
			const hiddenClassName =
				nowClassArray.indexOf('vk_hidden') !== -1
					? hiddenSomething + ' vk_edit_hidden_all'
					: hiddenSomething;

			// Add default class too.
			const attachedClass = classnames(hiddenClassName, props.className);

			return <BlockListBlock {...props} className={attachedClass} />;
		};
	}, 'addHiddenWarning')
);
