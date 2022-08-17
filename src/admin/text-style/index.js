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
import { colorPalette } from '@vkblocks/admin/utils/settings';
import { colorSlugToColorCode } from '@vkblocks/admin/utils/color-slug-to-color-code';
import { SaveButton } from '@vkblocks/admin/save-button';
import { AddItemButton } from '@vkblocks/admin/text-style/add-item';
import { DeleteItemButton } from '@vkblocks/admin/text-style/delete-item-button';
import { ClassNameControl } from '@vkblocks/admin/text-style/class-name-control';
/*globals vkBlocksObject */

export default function AdminTextStyle() {
	const { vkBlocksOption, setVkBlocksOption, vkBlocksBalloonMeta } =
		useContext(AdminContext);

	const fontSizes = [ ...vkBlocksObject.fontSizes ];

	const onChange = (key, value, i) => {
		const newItems = vkBlocksOption.text_style;
		newItems[i] = {
			...vkBlocksOption.text_style[i],
			[key]: value,
		};
		setVkBlocksOption({
			...vkBlocksOption,
			text_style: [...newItems],
		});
	};

	return (
		<>
			<section>
				<h3 id="text-style-setting">
					{__('Text Style Setting', 'vk-blocks')}
				</h3>
				<p>
					{__(
						'Additional formatting can be applied with the block toolbar.',
						'vk-blocks'
					)}
				</p>
				{(() => {
					const items = [];
					for (let i = 0; i < vkBlocksOption.text_style.length; i++) {
						items.push(
							<div className="text_style_item" key={i}>
								<TextStylePreview i={i} />
								<div className="text_style_item_control">
									<PanelBody
										title={__('Text Style', 'vk-blocks')}
									>
										<BaseControl id="custom-text-style">
											<ToggleControl
												name={`vk_blocks_options[text_style][${i}][active]`}
												id={`vk_blocks_text_style_${i}_active`}
												label={__(
													'Activate text style',
													'vk-blocks'
												)}
												checked={
													vkBlocksOption.text_style[i]
														.active
												}
												onChange={(value) =>
													onChange('active', value, i)
												}
											/>
											<TextControl
												className="text_style_item_name"
												name={`vk_blocks_options[text_style][${i}][title]`}
												id={`vk_blocks_text_style_${i}_title`}
												help={__(
													'※ Required',
													'vk-blocks'
												)}
												label={__(
													'Toolbar title',
													'vk-blocks'
												)}
												onChange={(value) =>
													onChange('title', value, i)
												}
												value={
													!!vkBlocksOption.text_style[
														i
													].title
														? vkBlocksOption
																.text_style[i]
																.title
														: ''
												}
											/>
											<DeleteItemButton i={i} />
										</BaseControl>
									</PanelBody>
									<PanelBody
										title={__(
											'Format Setting',
											'vk-blocks'
										)}
										initialOpen={false}
									>
										<BaseControl id="format-setting">
											<CheckboxControl
												name={`vk_blocks_options[text_style][${i}][font_weight_bold]`}
												label={__(
													'Font Weight Bold',
													'vk-blocks'
												)}
												checked={
													vkBlocksOption.text_style[i]
														.font_weight_bold
												}
												onChange={(value) =>
													onChange(
														'font_weight_bold',
														value,
														i
													)
												}
											/>
											<CheckboxControl
												name={`vk_blocks_options[text_style][${i}][font_italic]`}
												label={__(
													'Italic',
													'vk-blocks'
												)}
												checked={
													vkBlocksOption.text_style[i]
														.font_italic
												}
												onChange={(value) =>
													onChange(
														'font_italic',
														value,
														i
													)
												}
											/>
											<CheckboxControl
												name={`vk_blocks_options[text_style][${i}][font_strikethrough]`}
												label={__(
													'Strikethrough',
													'vk-blocks'
												)}
												checked={
													vkBlocksOption.text_style[i]
														.font_strikethrough
												}
												onChange={(value) =>
													onChange(
														'font_strikethrough',
														value,
														i
													)
												}
											/>
											<CheckboxControl
												name={`vk_blocks_options[text_style][${i}][nowrap]`}
												label={__(
													'Nowrap',
													'vk-blocks'
												)}
												checked={
													vkBlocksOption.text_style[i]
														.nowrap
												}
												onChange={(value) =>
													onChange('nowrap', value, i)
												}
											/>
											<FontSizePicker
												fontSizes={fontSizes}
												onChange={(value) =>
													onChange(
														'font_size',
														value,
														i
													)
												}
												value={
													vkBlocksOption.text_style[i]
														.font_size
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
												colors={colorPalette}
												value={colorSlugToColorCode(
													vkBlocksOption.text_style[i]
														.color
												)}
												onChange={(value) => {
													const ColorValue =
														getColorObjectByColorValue(
															colorPalette,
															value
														);
													const newValue =
														ColorValue !== undefined
															? ColorValue.slug
															: value;
													onChange(
														'color',
														newValue,
														i
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
												colors={colorPalette}
												value={colorSlugToColorCode(
													vkBlocksOption.text_style[i]
														.background_color
												)}
												onChange={(value) => {
													const ColorValue =
														getColorObjectByColorValue(
															colorPalette,
															value
														);
													const newValue =
														ColorValue !== undefined
															? ColorValue.slug
															: value;
													onChange(
														'background_color',
														newValue,
														i
													);
												}}
											/>
										</BaseControl>
										<BaseControl
											id="highlighter"
											label={__(
												'Highlighter Color',
												'vk-blocks'
											)}
										>
											<ToggleControl
												name={`vk_blocks_options[text_style][${i}][active_highlighter]`}
												id={`vk_blocks_text_style_${i}_active_highlighter`}
												label={__(
													'Activate Highlighter',
													'vk-blocks'
												)}
												checked={
													vkBlocksOption.text_style[i]
														.active_highlighter
												}
												onChange={(value) =>
													onChange(
														'active_highlighter',
														value,
														i
													)
												}
											/>
											{vkBlocksOption.text_style[i]
												.active_highlighter && (
												<ColorPalette
													colors={colorPalette}
													onChange={(value) => {
														// clearボタンを押した時
														if (
															value === undefined
														) {
															value = vkBlocksObject.highlighterColor;
														}
														onChange(
															'highlighter',
															value,
															i
														);
													}}
													value={
														vkBlocksOption
															.text_style[i]
															.highlighter
													}
												/>
											)}
										</BaseControl>
									</PanelBody>
									<PanelBody
										title={__('Advanced', 'vk-blocks')}
										initialOpen={false}
									>
										<BaseControl id="class-name-setting">
											<ClassNameControl i={i} />
										</BaseControl>
									</PanelBody>
								</div>
							</div>
						);
					}
					return items;
				})()}
				<AddItemButton />
			</section>
			<SaveButton
				vkBlocksOption={vkBlocksOption}
				vkBlocksBalloonMeta={vkBlocksBalloonMeta}
			/>
		</>
	);
}
