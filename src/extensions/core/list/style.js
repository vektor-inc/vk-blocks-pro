/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { registerBlockStyle } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';
import {
	InspectorControls,
	ColorPalette,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';
import { select } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';

const isValidBlockType = (name) => {
	const validBlockTypes = ['core/list'];
	return validBlockTypes.includes(name);
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

export const addBlockControl = createHigherOrderComponent((BlockEdit) => {
	let activeColor = '';

	return (props) => {
		const colorSet = select('core/block-editor').getSettings().colors;
		if (
			isVKColorPaletteManager(colorSet) &&
			isValidBlockType(props.name) &&
			props.isSelected
		) {
			if (props.attributes.color) {
				activeColor = props.attributes.color;
			} else {
				activeColor = '#fffd6b';
			}
			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__('List Icon Color', 'vk-blocks')}
							initialOpen={false}
							className="list-color-controle"
						>
							<ColorPalette
								value={activeColor}
								disableCustomColors={true}
								onChange={(newColor) => {
									// 色コードを colorSet から探して色データを取得
									const ColorValue =
										getColorObjectByColorValue(
											colorSet,
											newColor
										);

									// 現在のクラス名を配列化
									const nowClassArray =
										props.attributes.className &&
										props.attributes.className.split(' ');

									// 新しいクラス名の配列
									let newClassNameArray = nowClassArray
										? nowClassArray
										: [];

									// 設定されていたクラス名vk-has-〇〇-colorを削除する
									if (nowClassArray) {
										newClassNameArray =
											nowClassArray.filter((name) => {
												return !name.match(
													/vk-has-(.*)-color/
												);
											});
									}

									// newColorがあれば新しいクラス名を追加する
									if (newColor !== undefined) {
										// コアのテキストカラーと被らないようにvk-has-〇〇-colorを追加する
										newClassNameArray.push(
											`vk-has-${ColorValue.slug}-color`
										);
									}

									const newClassName =
										newClassNameArray.join(' ');

									activeColor = newColor;
									props.setAttributes({
										className: newClassName,
										color: newColor,
									});
								}}
							/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		}
		return <BlockEdit {...props} />;
	};
}, 'addMyCustomBlockControls');

addFilter('editor.BlockEdit', 'vk-blocks/list-style', addBlockControl);

registerBlockStyle('core/list', [
	{
		name: 'vk-default',
		label: __('Default', 'vk-blocks'),
		isDefault: true,
	},
	{
		name: 'vk-arrow-mark',
		label: __('Arrow', 'vk-blocks'),
	},
	{
		name: 'vk-triangle-mark',
		label: __('Triangle', 'vk-blocks'),
	},
	{
		name: 'vk-check-mark',
		label: __('Check', 'vk-blocks'),
	},
	{
		name: 'vk-check-square-mark',
		label: __('Check Square', 'vk-blocks'),
	},
	{
		name: 'vk-check-circle-mark',
		label: __('Check Circle', 'vk-blocks'),
	},
	{
		name: 'vk-handpoint-mark',
		label: __('Handpoint', 'vk-blocks'),
	},
	{
		name: 'vk-pencil-mark',
		label: __('Pencil', 'vk-blocks'),
	},
	{
		name: 'vk-smile-mark',
		label: __('Smile', 'vk-blocks'),
	},
	{
		name: 'vk-frown-mark',
		label: __('Frown', 'vk-blocks'),
	},
	{
		name: 'vk-numbered-circle-mark',
		label: __('Numbered Circle', 'vk-blocks'),
	},
	{
		name: 'vk-numbered-square-mark',
		label: __('Numbered Square', 'vk-blocks'),
	},
]);
