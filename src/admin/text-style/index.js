/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
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
import TextStylePreview from '@vkblocks/admin/text-style/preview';
import { SaveButton } from '@vkblocks/admin/save-button';
import { colorPalette } from '@vkblocks/admin/utils/settings';
import { colorSlugToColorCode } from '@vkblocks/admin/utils/color-slug-to-color-code';
/*globals vkBlocksObject */

export default function AdminTextStyle() {
	const { vkBlocksOption, setVkBlocksOption, vkBlocksBalloonMeta } =
		useContext(AdminContext);

	const fontSizes = [
		{
			name: __('Small', 'vk-blocks'),
			slug: 'small',
			size: '12px',
		},
		{
			name: __('Normal', 'vk-blocks'),
			slug: 'normal',
			size: '16px',
		},
		{
			name: __('Big', 'vk-blocks'),
			slug: 'big',
			size: '18px',
		},
		{
			name: __('Extra big', 'vk-blocks'),
			slug: 'extra-big',
			size: '21px',
		},
	];

	return (
		<>
			<section>
				<h3 id="text-style-setting">
					{__('Text Style Setting', 'vk-blocks')}
				</h3>
				{(() => {
					const items = [];
					for (let i = 1; i <= vkBlocksObject.textStyleNumber; i++) {
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
												label={sprintf(
													/* translators: %s: number of i. */
													__(
														'Activate text style %s'
													),
													i
												)}
												checked={
													!!vkBlocksOption.text_style[
														i
													].active &&
													vkBlocksOption.text_style[i]
														.active
												}
												onChange={(newValue) => {
													setVkBlocksOption({
														...vkBlocksOption,
														text_style: {
															...vkBlocksOption.text_style,
															[i]: {
																...vkBlocksOption
																	.text_style[
																	i
																],
																active: newValue,
															},
														},
													});
												}}
											/>
											<TextControl
												className="text_style_item_name"
												name={`vk_blocks_options[text_style][${i}][title]`}
												id={`vk_blocks_text_style_${i}_title`}
												label={__(
													'Toolbar title',
													'vk-blocks'
												)}
												onChange={(newValue) => {
													setVkBlocksOption({
														...vkBlocksOption,
														text_style: {
															...vkBlocksOption.text_style,
															[i]: {
																...vkBlocksOption
																	.text_style[
																	i
																],
																title: newValue,
															},
														},
													});
												}}
												value={
													vkBlocksOption.text_style[i]
														.title === '' ||
													vkBlocksOption.text_style[i]
														.title === undefined ||
													vkBlocksOption.text_style[i]
														.title === null
														? ''
														: vkBlocksOption
																.text_style[i]
																.title
												}
											/>
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
													!!vkBlocksOption.text_style[
														i
													].font_weight_bold &&
													vkBlocksOption.text_style[i]
														.font_weight_bold
												}
												onChange={(newValue) => {
													setVkBlocksOption({
														...vkBlocksOption,
														text_style: {
															...vkBlocksOption.text_style,
															[i]: {
																...vkBlocksOption
																	.text_style[
																	i
																],
																font_weight_bold:
																	newValue,
															},
														},
													});
												}}
											/>
											<CheckboxControl
												name={`vk_blocks_options[text_style][${i}][font_italic]`}
												label={__(
													'Italic',
													'vk-blocks'
												)}
												checked={
													!!vkBlocksOption.text_style[
														i
													].font_italic &&
													vkBlocksOption.text_style[i]
														.font_italic
												}
												onChange={(newValue) => {
													setVkBlocksOption({
														...vkBlocksOption,
														text_style: {
															...vkBlocksOption.text_style,
															[i]: {
																...vkBlocksOption
																	.text_style[
																	i
																],
																font_italic:
																	newValue,
															},
														},
													});
												}}
											/>
											<CheckboxControl
												name={`vk_blocks_options[text_style][${i}][font_strikethrough]`}
												label={__(
													'Strikethrough',
													'vk-blocks'
												)}
												checked={
													!!vkBlocksOption.text_style[
														i
													].font_strikethrough &&
													vkBlocksOption.text_style[i]
														.font_strikethrough
												}
												onChange={(newValue) => {
													setVkBlocksOption({
														...vkBlocksOption,
														text_style: {
															...vkBlocksOption.text_style,
															[i]: {
																...vkBlocksOption
																	.text_style[
																	i
																],
																font_strikethrough:
																	newValue,
															},
														},
													});
												}}
											/>
											<CheckboxControl
												name={`vk_blocks_options[text_style][${i}][nowrap]`}
												label={__(
													'Nowrap',
													'vk-blocks'
												)}
												checked={
													!!vkBlocksOption.text_style[
														i
													].nowrap &&
													vkBlocksOption.text_style[i]
														.nowrap
												}
												onChange={(newValue) => {
													setVkBlocksOption({
														...vkBlocksOption,
														text_style: {
															...vkBlocksOption.text_style,
															[i]: {
																...vkBlocksOption
																	.text_style[
																	i
																],
																nowrap: newValue,
															},
														},
													});
												}}
											/>
											<FontSizePicker
												fontSizes={fontSizes}
												onChange={(newValue) => {
													setVkBlocksOption({
														...vkBlocksOption,
														text_style: {
															...vkBlocksOption.text_style,
															[i]: {
																...vkBlocksOption
																	.text_style[
																	i
																],
																font_size:
																	newValue,
															},
														},
													});
												}}
												value={
													vkBlocksOption.text_style[i]
														.font_size === '' ||
													vkBlocksOption.text_style[i]
														.font_size ===
														undefined ||
													vkBlocksOption.text_style[i]
														.font_size === null
														? ''
														: vkBlocksOption
																.text_style[i]
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
													setVkBlocksOption({
														...vkBlocksOption,
														text_style: {
															...vkBlocksOption.text_style,
															[i]: {
																...vkBlocksOption
																	.text_style[
																	i
																],
																color:
																	ColorValue !==
																	undefined
																		? ColorValue.slug
																		: value,
															},
														},
													});
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
													setVkBlocksOption({
														...vkBlocksOption,
														text_style: {
															...vkBlocksOption.text_style,
															[i]: {
																...vkBlocksOption
																	.text_style[
																	i
																],
																background_color:
																	ColorValue !==
																	undefined
																		? ColorValue.slug
																		: value,
															},
														},
													});
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
													!!vkBlocksOption.text_style[
														i
													].active_highlighter &&
													vkBlocksOption.text_style[i]
														.active_highlighter
												}
												onChange={(newValue) => {
													setVkBlocksOption({
														...vkBlocksOption,
														text_style: {
															...vkBlocksOption.text_style,
															[i]: {
																...vkBlocksOption
																	.text_style[
																	i
																],
																active_highlighter:
																	newValue,
															},
														},
													});
												}}
											/>
											{vkBlocksOption.text_style[i]
												.active_highlighter && (
												<ColorPalette
													colors={colorPalette}
													onChange={(newValue) => {
														setVkBlocksOption({
															...vkBlocksOption,
															text_style: {
																...vkBlocksOption.text_style,
																[i]: {
																	...vkBlocksOption
																		.text_style[
																		i
																	],
																	highlighter:
																		newValue,
																},
															},
														});
													}}
													value={
														vkBlocksOption
															.text_style[i]
															.highlighter ===
															'' ||
														vkBlocksOption
															.text_style[i]
															.highlighter ===
															undefined ||
														vkBlocksOption
															.text_style[i]
															.highlighter ===
															null
															? '#fffd6b'
															: vkBlocksOption
																	.text_style[
																	i
															  ].highlighter
													}
												/>
											)}
										</BaseControl>
									</PanelBody>
								</div>
							</div>
						);
					}
					return items;
				})()}
			</section>
			<SaveButton
				vkBlocksOption={vkBlocksOption}
				vkBlocksBalloonMeta={vkBlocksBalloonMeta}
			/>
		</>
	);
}
