/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useContext, createInterpolateElement } from '@wordpress/element';
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
import { vkColorPalette } from '@vkblocks/admin/utils/settings';
import { colorSlugToColorCode } from '@vkblocks/admin/utils/color-slug-to-color-code';
import { TextStylePreview } from '@vkblocks/admin/custom-format/preview';
import { AddItemButton } from '@vkblocks/admin/custom-format/add-item';
import { DeleteItemButton } from '@vkblocks/admin/custom-format/delete-item-button';
import { CodeMirrorCss } from '@vkblocks/components/code-mirror-css';

/*globals vkBlocksObject */
const FONT_SIZES = [...vkBlocksObject.fontSizes];

export default function AdminCustomFormat() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	const onChange = (key, value, index) => {
		const newItems = vkBlocksOption.custom_format_lists;
		newItems[index] = {
			...vkBlocksOption.custom_format_lists[index],
			[key]: value,
		};
		setVkBlocksOption({
			...vkBlocksOption,
			custom_format_lists: [...newItems],
		});
	};

	return (
		<>
			<section>
				<h3 id="custom-format-setting">
					{__('Custom Format Setting', 'vk-blocks-pro')}
				</h3>
				<p>
					{__(
						'You can apply commonly used formatting on the block toolbar.',
						'vk-blocks-pro'
					)}
				</p>
				{Object.keys(vkBlocksOption.custom_format_lists).map(
					(key, index) => {
						const textStyleListObj =
							vkBlocksOption.custom_format_lists[key];
						return (
							<div className="custom_format_item" key={index}>
								<TextStylePreview
									textStyleListObj={textStyleListObj}
								/>
								<div className="custom_format_item_control">
									<PanelBody
										title={__(
											'Custom Format',
											'vk-blocks-pro'
										)}
									>
										<BaseControl id="custom-format">
											<TextControl
												className="custom_format_item_name"
												name={`vk_blocks_options[custom_format_lists][${index}][title]`}
												id={`vk_blocks_custom_format_${index}_title`}
												label={__(
													'Toolbar title',
													'vk-blocks-pro'
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
												<p className="custom_format_item_name_warning">
													{__(
														'※ Required If no title is entered, it will not appear on the toolbar.',
														'vk-blocks-pro'
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
											'Format Setting',
											'vk-blocks-pro'
										)}
										initialOpen={false}
									>
										<BaseControl id="format-setting">
											<CheckboxControl
												name={`vk_blocks_options[custom_format_lists][${index}][font_weight_bold]`}
												label={__(
													'Bold',
													'vk-blocks-pro'
												)}
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
												name={`vk_blocks_options[custom_format_lists][${index}][font_italic]`}
												label={__(
													'Italic',
													'vk-blocks-pro'
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
												name={`vk_blocks_options[custom_format_lists][${index}][font_strikethrough]`}
												label={__(
													'Strikethrough',
													'vk-blocks-pro'
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
												name={`vk_blocks_options[custom_format_lists][${index}][nowrap]`}
												label={__(
													'Nowrap',
													'vk-blocks-pro'
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
										title={__('Color', 'vk-blocks-pro')}
										initialOpen={false}
									>
										<BaseControl
											id="text-color"
											label={__(
												'Text Color',
												'vk-blocks-pro'
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
												'vk-blocks-pro'
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
												'Highlighter Color',
												'vk-blocks-pro'
											)}
										>
											<ToggleControl
												name={`vk_blocks_options[custom_format_lists][${index}][is_active_highlighter]`}
												id={`vk_blocks_custom_format_lists_${index}_is_active_highlighter`}
												label={__(
													'Activate Highlighter',
													'vk-blocks-pro'
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
										title={__(
											'Custom CSS',
											'vk-blocks-pro'
										)}
										initialOpen={false}
									>
										<BaseControl id="class-name-setting">
											<span>
												{__(
													'CSS class',
													'vk-blocks-pro'
												)}
												:
												<code>
													.
													{
														textStyleListObj.class_name
													}
												</code>
											</span>
											<CodeMirrorCss
												className="vk-codemirror-block-editor"
												value={
													textStyleListObj.custom_css
														? textStyleListObj.custom_css
														: ''
												}
												onChange={(value) =>
													onChange(
														'custom_css',
														value,
														index
													)
												}
											/>
											<p>
												{createInterpolateElement(
													sprintf(
														/* translators: If selector is specified, it will be replaced by a unique CSS class (<code>.%s</code>); CSS selectors other than selector may affect the entire page. */
														__(
															'If selector is specified, it will be replaced by a unique CSS class (<code>.%s</code>); CSS selectors other than selector may affect the entire page.',
															'vk-blocks-pro'
														),
														textStyleListObj.class_name
													),
													{
														code: <code />,
													}
												)}
											</p>
											<p>
												{__(
													'Example:',
													'vk-blocks-pro'
												)}
											</p>
											<pre
												className="vk-custom-css-sample-code"
												style={{
													whiteSpace: 'pre-wrap',
													padding: '16px',
													display: 'block',
													background: '#f5f5f5',
												}}
											>
												{
													'selector {\n    background: #f5f5f5;\n}'
												}
											</pre>
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
