/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import {
	CheckboxControl,
	BaseControl,
	PanelBody,
	FontSizePicker,
	ToggleControl,
	ColorPalette,
	TextControl,
} from '@wordpress/components';
import { getColorObjectByColorValue } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';
import { TextStylePreview } from '@vkblocks/admin/text-style/preview';
import { vkColorPalette } from '@vkblocks/admin/utils/settings';
import { colorSlugToColorCode } from '@vkblocks/admin/utils/color-slug-to-color-code';
import { AddItemButton } from '@vkblocks/admin/text-style/add-item';
import { DeleteItemButton } from '@vkblocks/admin/text-style/delete-item-button';
/*globals vkBlocksObject */

export default function AdminTextStyle() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	const fontSizes = [...vkBlocksObject.fontSizes];

	const getTextStyleValue = (key, textStyleIndex) => {
		return vkBlocksOption.text_style_lists[textStyleIndex][key];
	};

	const onChange = (key, value, textStyleIndex) => {
		const newItems = vkBlocksOption.text_style_lists;
		newItems[textStyleIndex] = {
			...vkBlocksOption.text_style_lists[textStyleIndex],
			[key]: value,
		};
		setVkBlocksOption({
			...vkBlocksOption,
			text_style_lists: [...newItems],
		});
	};

	return (
		<>
			<section>
				<h3 id="text-style-setting">
					{__(
						'書式設定',
						// 'Text Style Setting',
						'vk-blocks'
					)}
				</h3>
				<p>
					{__(
						'ブロックツールバーで追加書式を適用することができます。',
						// 'Additional formatting can be applied with the block toolbar.',
						'vk-blocks'
					)}
				</p>
				{(() => {
					const lists = [];
					for (
						let textStyleIndex = 0;
						textStyleIndex < vkBlocksOption.text_style_lists.length;
						textStyleIndex++
					) {
						lists.push(
							<div
								className="text_style_item"
								key={textStyleIndex}
							>
								<TextStylePreview
									textStyleIndex={textStyleIndex}
								/>
								<div className="text_style_item_control">
									<PanelBody
										title={__(
											'書式設定',
											// 'Text Style',
											'vk-blocks'
										)}
									>
										<BaseControl id="custom-text-style">
											<TextControl
												className="text_style_item_name"
												name={`vk_blocks_options[text_style_lists][${textStyleIndex}][title]`}
												id={`vk_blocks_text_style_${textStyleIndex}_title`}
												label={__(
													'ツールバー タイトル',
													// 'Toolbar title',
													'vk-blocks'
												)}
												onChange={(value) =>
													onChange(
														'title',
														value,
														textStyleIndex
													)
												}
												value={
													!!getTextStyleValue(
														'title',
														textStyleIndex
													)
														? getTextStyleValue(
																'title',
																textStyleIndex
														  )
														: ''
												}
											/>
											{!getTextStyleValue(
												'title',
												textStyleIndex
											) && (
												<p className="text_style_item_name_warning">
													{__(
														'※ タイトルが入力されていない場合、ツールバーには表示されません。',
														// '※ Required If no title is entered, it will not appear on the toolbar.',
														'vk-blocks'
													)}
												</p>
											)}
											<DeleteItemButton
												textStyleIndex={textStyleIndex}
											/>
										</BaseControl>
									</PanelBody>
									<PanelBody
										title={__(
											'フォーマット設定',
											// 'Format Setting',
											'vk-blocks'
										)}
										initialOpen={false}
									>
										<BaseControl id="format-setting">
											<CheckboxControl
												name={`vk_blocks_options[text_style_lists][${textStyleIndex}][font_weight_bold]`}
												label={__('Bold', 'vk-blocks')}
												checked={getTextStyleValue(
													'font_weight_bold',
													textStyleIndex
												)}
												onChange={(value) =>
													onChange(
														'font_weight_bold',
														value,
														textStyleIndex
													)
												}
											/>
											<CheckboxControl
												name={`vk_blocks_options[text_style_lists][${textStyleIndex}][font_italic]`}
												label={__(
													'Italic',
													'vk-blocks'
												)}
												checked={getTextStyleValue(
													'font_italic',
													textStyleIndex
												)}
												onChange={(value) =>
													onChange(
														'font_italic',
														value,
														textStyleIndex
													)
												}
											/>
											<CheckboxControl
												name={`vk_blocks_options[text_style_lists][${textStyleIndex}][font_strikethrough]`}
												label={__(
													'Strikethrough',
													'vk-blocks'
												)}
												checked={getTextStyleValue(
													'font_strikethrough',
													textStyleIndex
												)}
												onChange={(value) =>
													onChange(
														'font_strikethrough',
														value,
														textStyleIndex
													)
												}
											/>
											<CheckboxControl
												name={`vk_blocks_options[text_style_lists][${textStyleIndex}][nowrap]`}
												label={__(
													'Nowrap',
													'vk-blocks'
												)}
												checked={getTextStyleValue(
													'nowrap',
													textStyleIndex
												)}
												onChange={(value) =>
													onChange(
														'nowrap',
														value,
														textStyleIndex
													)
												}
											/>
											<FontSizePicker
												fontSizes={fontSizes}
												onChange={(value) =>
													onChange(
														'font_size',
														value,
														textStyleIndex
													)
												}
												value={getTextStyleValue(
													'font_size',
													textStyleIndex
												)}
											/>
										</BaseControl>
									</PanelBody>
									<PanelBody
										title={__('Color', 'vk-blocks')}
										initialOpen={false}
									>
										<BaseControl
											id="text-color"
											label={__(
												'Text Color',
												'vk-blocks'
											)}
										>
											<ColorPalette
												clearable
												colors={vkColorPalette}
												value={colorSlugToColorCode(
													getTextStyleValue(
														'color',
														textStyleIndex
													)
												)}
												onChange={(value) => {
													const ColorValue =
														getColorObjectByColorValue(
															vkColorPalette,
															value
														);
													const newValue =
														ColorValue !== undefined
															? ColorValue.slug
															: value;
													onChange(
														'color',
														newValue,
														textStyleIndex
													);
												}}
											/>
										</BaseControl>
										<BaseControl
											id="background-color"
											label={__(
												'Background Color',
												'vk-blocks'
											)}
										>
											<ColorPalette
												clearable
												colors={vkColorPalette}
												value={colorSlugToColorCode(
													getTextStyleValue(
														'background_color',
														textStyleIndex
													)
												)}
												onChange={(value) => {
													const ColorValue =
														getColorObjectByColorValue(
															vkColorPalette,
															value
														);
													const newValue =
														ColorValue !== undefined
															? ColorValue.slug
															: value;
													onChange(
														'background_color',
														newValue,
														textStyleIndex
													);
												}}
											/>
										</BaseControl>
										<BaseControl
											id="highlighter"
											label={__(
												'蛍光マーカー',
												// 'Highlighter Color',
												'vk-blocks'
											)}
										>
											<ToggleControl
												name={`vk_blocks_options[text_style_lists][${textStyleIndex}][is_active_highlighter]`}
												id={`vk_blocks_text_style_lists_${textStyleIndex}_is_active_highlighter`}
												label={__(
													'蛍光マーカーを有効化',
													// 'Activate Highlighter',
													'vk-blocks'
												)}
												checked={getTextStyleValue(
													'is_active_highlighter',
													textStyleIndex
												)}
												onChange={(value) =>
													onChange(
														'is_active_highlighter',
														value,
														textStyleIndex
													)
												}
											/>
											{getTextStyleValue(
												'is_active_highlighter',
												textStyleIndex
											) && (
												<ColorPalette
													colors={vkColorPalette}
													onChange={(value) => {
														// clearボタンを押した時
														if (
															value === undefined
														) {
															value =
																vkBlocksObject.highlighterColor;
														}
														onChange(
															'highlighter',
															value,
															textStyleIndex
														);
													}}
													value={getTextStyleValue(
														'highlighter',
														textStyleIndex
													)}
												/>
											)}
										</BaseControl>
									</PanelBody>
									<PanelBody
										title={__('Advanced')}
										initialOpen={false}
									>
										<BaseControl id="class-name-setting">
											<span>
												{__(
													'CSSクラス',
													// 'CSS class',
													'vk-blocks'
												)}
												:
												<code>
													.
													{getTextStyleValue(
														'class_name',
														textStyleIndex
													)}
												</code>
											</span>
										</BaseControl>
									</PanelBody>
								</div>
							</div>
						);
					}
					return lists;
				})()}
				<AddItemButton />
			</section>
		</>
	);
}
