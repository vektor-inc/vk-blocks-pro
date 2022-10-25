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
				{Object.keys(vkBlocksOption.text_style_lists).map(
					(key, index) => {
						const title =
							vkBlocksOption.text_style_lists[key].title ?? '';
						const fontWeightBold =
							vkBlocksOption.text_style_lists[key]
								.font_weight_bold;
						const fontItalic =
							vkBlocksOption.text_style_lists[key].font_italic;
						const fontStrikethrough =
							vkBlocksOption.text_style_lists[key]
								.font_strikethrough;
						const nowrap =
							vkBlocksOption.text_style_lists[key].nowrap;
						const fontSize =
							vkBlocksOption.text_style_lists[key].font_size;
						const color =
							vkBlocksOption.text_style_lists[key].color;
						const backgroundColor =
							vkBlocksOption.text_style_lists[key]
								.background_color;
						const isActiveHighlighter =
							vkBlocksOption.text_style_lists[key]
								.is_active_highlighter;
						const highlighter =
							vkBlocksOption.text_style_lists[key].highlighter;
						const className =
							vkBlocksOption.text_style_lists[key].class_name;

						return (
							<div className="text_style_item" key={index}>
								<TextStylePreview index={index} />
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
												name={`vk_blocks_options[text_style_lists][${index}][title]`}
												id={`vk_blocks_text_style_${index}_title`}
												label={__(
													'ツールバー タイトル',
													// 'Toolbar title',
													'vk-blocks'
												)}
												onChange={(value) =>
													onChange(
														'title',
														value,
														index
													)
												}
												value={title}
											/>
											{!title && (
												<p className="text_style_item_name_warning">
													{__(
														'※ タイトルが入力されていない場合、ツールバーには表示されません。',
														// '※ Required If no title is entered, it will not appear on the toolbar.',
														'vk-blocks'
													)}
												</p>
											)}
											<DeleteItemButton
												index={index}
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
												name={`vk_blocks_options[text_style_lists][${index}][font_weight_bold]`}
												label={__(
													'Bold',
													'vk-blocks'
												)}
												checked={fontWeightBold}
												onChange={(value) =>
													onChange(
														'font_weight_bold',
														value,
														index
													)
												}
											/>
											<CheckboxControl
												name={`vk_blocks_options[text_style_lists][${index}][font_italic]`}
												label={__(
													'Italic',
													'vk-blocks'
												)}
												checked={fontItalic}
												onChange={(value) =>
													onChange(
														'font_italic',
														value,
														index
													)
												}
											/>
											<CheckboxControl
												name={`vk_blocks_options[text_style_lists][${index}][font_strikethrough]`}
												label={__(
													'Strikethrough',
													'vk-blocks'
												)}
												checked={fontStrikethrough}
												onChange={(value) =>
													onChange(
														'font_strikethrough',
														value,
														index
													)
												}
											/>
											<CheckboxControl
												name={`vk_blocks_options[text_style_lists][${index}][nowrap]`}
												label={__(
													'Nowrap',
													'vk-blocks'
												)}
												checked={nowrap}
												onChange={(value) =>
													onChange(
														'nowrap',
														value,
														index
													)
												}
											/>
											<FontSizePicker
												__nextHasNoMarginBottom
												fontSizes={fontSizes}
												onChange={(value) =>
													onChange(
														'font_size',
														value,
														index
													)
												}
												value={fontSize}
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
												value={colorSlugToColorCode(color)}
												onChange={(value) => {
													const ColorValue =
														getColorObjectByColorValue(
															vkColorPalette,
															value
														);
													const newValue =
														ColorValue !==
														undefined
															? ColorValue.slug
															: value;
													onChange(
														'color',
														newValue,
														index
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
												value={colorSlugToColorCode(backgroundColor)}
												onChange={(value) => {
													const ColorValue =
														getColorObjectByColorValue(
															vkColorPalette,
															value
														);
													const newValue =
														ColorValue !==
														undefined
															? ColorValue.slug
															: value;
													onChange(
														'background_color',
														newValue,
														index
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
												name={`vk_blocks_options[text_style_lists][${index}][is_active_highlighter]`}
												id={`vk_blocks_text_style_lists_${index}_is_active_highlighter`}
												label={__(
													'蛍光マーカーを有効化',
													// 'Activate Highlighter',
													'vk-blocks'
												)}
												checked={
													isActiveHighlighter
												}
												onChange={(value) =>
													onChange(
														'is_active_highlighter',
														value,
														index
													)
												}
											/>
											{isActiveHighlighter && (
												<ColorPalette
													colors={vkColorPalette}
													onChange={(value) => {
														// clearボタンを押した時
														if (
															value ===
															undefined
														) {
															value =
																vkBlocksObject.highlighterColor;
														}
														onChange(
															'highlighter',
															value,
															index
														);
													}}
													value={highlighter}
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
												:<code>.{className}</code>
											</span>
										</BaseControl>
									</PanelBody>
								</div>
							</div>
						);
					}
				)}
				<AddItemButton />
			</section>
		</>
	);
}
