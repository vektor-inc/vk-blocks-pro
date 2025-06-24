/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, Notice } from '@wordpress/components';
import {
	InspectorControls,
	ColorPalette,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
} from '@wordpress/block-editor';
import { select } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import React, { useEffect } from 'react';

/**
 * Internal dependencies
 */
import { colorSlugToColorCode } from '@vkblocks/utils/color-slug-to-color-code';

/**
 * External dependencies
 */
import { compareVersions } from 'compare-versions';

const isValidBlockType = (name) => {
	const validBlockTypes = ['core/list'];
	return validBlockTypes.includes(name);
};

// WP6.2以上か NOTE: WP6.1以下をサポートしなくなったら削除すること
const isLagerThanWp62 = () => {
	if (
		window.wpVersion !== undefined &&
		window.wpVersion !== null &&
		compareVersions(window.wpVersion, '6.2') < 0
	) {
		return false;
	}
	return true;
};

// サポートしているクラス名かどうか
const isVKColorPaletteManager = (colorSet) => {
	// 設定されているカラーパレットのスラッグ配列
	const colorSetSlugArray = [];
	colorSet.forEach((item) => {
		colorSetSlugArray.push(item.slug);
	});

	const supportColorSlugArray = [
		'black',
		'cyan-bluish-gray',
		'white',
		'pale-pink',
		'vivid-red',
		'luminous-vivid-orange',
		'luminous-vivid-amber',
		'light-green-cyan',
		'pale-cyan-blue',
		'vivid-cyan-blue',
		'vivid-purple',
	];
	if (
		supportColorSlugArray.every(
			(element) => colorSetSlugArray.indexOf(element) !== -1
		)
	) {
		return true;
	}
	return false;
};

export const addAttribute = (settings) => {
	if (isValidBlockType(settings.name)) {
		settings.attributes = {
			...settings.attributes,
			color: {
				type: 'string',
			},
		};
	}
	return settings;
};
addFilter('blocks.registerBlockType', 'vk-blocks/list-style', addAttribute);

export const addBlockControl = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		const { name, attributes, setAttributes } = props;
		const { color, className, ordered, reversed, start } = attributes;
		if (!isValidBlockType(name)) {
			return <BlockEdit {...props} />;
		}

		const colorSet = select('core/block-editor').getSettings().colors;

		// 6.2未満かつサポートしているクラス名以外のカラーパレットの時
		if (!isLagerThanWp62() && !isVKColorPaletteManager(colorSet)) {
			return <BlockEdit {...props} />;
		}

		// 順序なしリストに切り替えた時にreversedとstartをリセット
		useEffect(() => {
			if (!ordered && (reversed || (start && start !== 1))) {
				setAttributes({
					reversed: false,
					start: 1
				});
			}
		}, [ordered, reversed, start, setAttributes]);

	// 順序付きリストで番号付きスタイルが適用されているかチェック
	const hasNumberedStyle = className && (
		className.includes('is-style-vk-numbered-square-mark') ||
		className.includes('is-style-vk-numbered-circle-mark')
	);

	return (
		<>
			<BlockEdit {...props} />
			<InspectorControls>
				<PanelBody
					title={__('List Icon Color', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<ColorPalette
						value={colorSlugToColorCode(color)}
						disableCustomColors={
							isLagerThanWp62() ? false : true
						}
						onChange={(newColor) => {
							// 色コードを colorSet から探して色データを取得
							const ColorValue = getColorObjectByColorValue(
								colorSet,
								newColor
							);

							// 現在のクラス名を配列化
							const nowClassArray =
								className && className.split(' ');

							// 新しいクラス名の配列
							let newClassNameArray = nowClassArray
								? nowClassArray
								: [];

							// 互換処理:設定されていたクラス名vk-has-〇〇-colorを削除する
							if (nowClassArray) {
								newClassNameArray = nowClassArray.filter(
									(item) => {
										return !item.match(
											/vk-has-(.*)-color/
										);
									}
								);
							}

							// 6.2未満の場合
							if (!isLagerThanWp62()) {
								// newColorがあれば新しいクラス名を追加する
								if (newColor !== undefined) {
									// コアのテキストカラーと被らないようにvk-has-〇〇-colorを追加する
									newClassNameArray.push(
										`vk-has-${ColorValue.slug}-color`
									);
								}
							}

							const newClassName =
								newClassNameArray.join(' ');

							setAttributes({
								className: newClassName,
								color: ColorValue?.slug
									? ColorValue?.slug
									: newColor,
							});
						}}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
},
'addMyCustomBlockControls'
);
addFilter('editor.BlockEdit', 'vk-blocks/list-style', addBlockControl);

/**
 * Override the default block element to include elements styles.
 */
const withElementsStyles = createHigherOrderComponent(
	(BlockListBlock) => (props) => {
		const { name, attributes, clientId } = props;
		const { color, className, ordered, reversed, start } = attributes;
		if (!isValidBlockType(name)) {
			return <BlockListBlock {...props} />;
		}

		const nowClassArray = className ? className.split(' ') : [];

		// 以前の形式 vk-has-(.*)-colorで保存されている場合
		const hasDeprecatedClassName = nowClassArray.find((item) =>
			item.match(/vk-has-(.*)-color/)
		);
		if (hasDeprecatedClassName) {
			return <BlockListBlock {...props} />;
		}

		// 6.2未満の場合
		if (!isLagerThanWp62()) {
			return <BlockListBlock {...props} />;
		}

		// 番号付きスタイル＆順序付きリストの場合、liにdata-vk-numberを付与
		const hasNumberedStyle = nowClassArray.some((item) =>
			item === 'is-style-vk-numbered-square-mark' || item === 'is-style-vk-numbered-circle-mark'
		);
		useEffect(() => {
			if (hasNumberedStyle) {
				const block = document.getElementById(`block-${clientId}`);
				if (!block) return;

				function setNumbersRecursive(listEl) {
					const isOrdered = listEl.tagName === 'OL';
					const isReversed = isOrdered && listEl.hasAttribute('reversed');
					const start = isOrdered && listEl.hasAttribute('start') ? parseInt(listEl.getAttribute('start'), 10) : 1;
					const lis = Array.from(listEl.children).filter(child => child.tagName === 'LI');
					let li_number = isReversed ? lis.length + start - 1 : start;
					lis.forEach(li => {
						li.setAttribute('data-vk-number', li_number);
						// 子リストがあれば再帰
						Array.from(li.children).forEach(child => {
							if (child.tagName === 'OL' || child.tagName === 'UL') {
								setNumbersRecursive(child);
							}
						});
						if (isReversed) {
							li_number--;
						} else {
							li_number++;
						}
					});
				}

				setNumbersRecursive(block);

				const observer = new MutationObserver(() => {
					setNumbersRecursive(block);
				});
				observer.observe(block, { childList: true, subtree: true });

				return () => {
					observer.disconnect();
				};
			}
		}, [ordered, hasNumberedStyle, reversed, start, clientId, color]);

		if (!color) {
			return <BlockListBlock {...props} />;
		}

		const colorSet = select('core/block-editor').getSettings().colors;
		const ColorValue = getColorObjectByAttributeValues(colorSet, color);
		let colorValue;
		if (ColorValue.slug !== undefined) {
			colorValue = `var(--wp--preset--color--${ColorValue.slug})`;
		} else {
			colorValue = color;
		}

		const bgStyle = nowClassArray.find((item) =>
			item.match(/is-style-vk-numbered-(circle|square)-mark/)
		);
		let cssTag = '';
		if (bgStyle) {
			cssTag = `#block-${clientId} li::before {
				color: #fff;
				background-color: ${colorValue};
			}`;
		} else {
			cssTag = `#block-${clientId} li::marker, #block-${clientId} li::before {
				color: ${colorValue};
			}`;
		}

		return (
			<>
				{(() => {
					if (cssTag) {
						return <style>{cssTag}</style>;
					}
				})()}
				<BlockListBlock {...props} />
			</>
		);
	}
);
addFilter(
	'editor.BlockListBlock',
	'vk-blocks/list-style/with-block-controls',
	withElementsStyles
);
