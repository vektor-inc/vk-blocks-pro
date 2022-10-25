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
const FONT_SIZES = [...vkBlocksObject.fontSizes];

export default function AdminTextStyle() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	const onChange = (key, value, index) => {
		const newItems = vkBlocksOption.text_style_lists;
		newItems[index] = {
			...vkBlocksOption.text_style_lists[index],
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
						'ブロックツールバーでよく使う書式設定を適用することができます。',
						// 'You can apply commonly used formatting on the block toolbar.',
						'vk-blocks'
					)}
				</p>
				{Object.keys(vkBlocksOption.text_style_lists).map(
					(key, index) => {
						const textStyleListObj =
							vkBlocksOption.text_style_lists[key];
						return (
							<div className="text_style_item" key={index}>
								<TextStylePreview
									textStyleListObj={textStyleListObj}
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
												value={
													textStyleListObj.title ?? ''
												}
											/>
											{!textStyleListObj.title && (
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
												textStyleListObj={
													textStyleListObj
												}
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
												label={__('Bold', 'vk-blocks')}
												checked={
													textStyleListObj.font_weight_bold
												}
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
												checked={
													textStyleListObj.font_italic
												}
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
												checked={
													textStyleListObj.font_strikethrough
												}
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
												checked={
													textStyleListObj.nowrap
												}
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
												fontSizes={FONT_SIZES}
												onChange={(value) =>
													onChange(
														'font_size',
														value,
														index
													)
												}
												value={
													textStyleListObj.font_size
												}
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
													textStyleListObj.color
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
												value={colorSlugToColorCode(
													textStyleListObj.background_color
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
													textStyleListObj.is_active_highlighter
												}
												onChange={(value) =>
													onChange(
														'is_active_highlighter',
														value,
														index
													)
												}
											/>
											{textStyleListObj.is_active_highlighter && (
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
															index
														);
													}}
													value={
														textStyleListObj.highlighter
													}
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
													{textStyleListObj.class_name}
												</code>
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
