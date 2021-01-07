import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	TextControl,
	SelectControl,
	CheckboxControl
} from '@wordpress/components';

export const DisplayItemsControl = props => {
	const { setAttributes, attributes } = props;
	const {
		display_image,
		display_image_overlay_term,
		display_excerpt,
		display_author,
		display_date,
		display_new,
		display_taxonomies,
		display_btn,
		new_date,
		new_text,
		btn_text,
		btn_align
	} = attributes;

	return (
		<PanelBody title={ __("Display item", "vk-blocks") } initialOpen={ false }>
			<CheckboxControl
				label={ __("Image", "vk-blocks") }
				checked={ display_image }
				onChange={ checked => setAttributes({ display_image: checked }) }
			/>
			<CheckboxControl
				label={ __("Term name", "vk-blocks") }
				checked={ display_image_overlay_term }
				onChange={ checked =>
					setAttributes({ display_image_overlay_term: checked })
				}
			/>
			<CheckboxControl
				label={ __("Excerpt", "vk-blocks") }
				checked={ display_excerpt }
				onChange={ checked => setAttributes({ display_excerpt: checked }) }
			/>
			<CheckboxControl
				label={ __("Author", "vk-blocks") }
				checked={ display_author }
				onChange={ checked => setAttributes({ display_author: checked }) }
			/>
			<CheckboxControl
				label={ __("Date", "vk-blocks") }
				checked={ display_date }
				onChange={ checked => setAttributes({ display_date: checked }) }
			/>

			<CheckboxControl
				label={ __("New mark", "vk-blocks") }
				checked={ display_new }
				onChange={ checked => setAttributes({ display_new: checked }) }
			/>

			<CheckboxControl
				label={ __("Taxonomies", "vk-blocks") }
				checked={ display_taxonomies }
				onChange={ checked => setAttributes({ display_taxonomies: checked }) }
			/>

			<CheckboxControl
				label={ __("Button", "vk-blocks") }
				checked={ display_btn }
				onChange={ checked => setAttributes({ display_btn: checked }) }
			/>
			<h4>{ __("New mark option", "vk-blocks") }</h4>
			<TextControl
				label={ __("Number of days to display the new post mark", "vk-blocks") }
				value={ new_date }
				onChange={ value => setAttributes({ new_date: value }) }
				type={ "number" }
			/>
			<TextControl
				label={ __("New post mark", "vk-blocks") }
				value={ new_text }
				onChange={ value => setAttributes({ new_text: value }) }
			/>
			<h4 className={ "postList_itemCard_button-option" }>
				{ __("Button option", "vk-blocks") }
			</h4>
			<p>
				{ __(
					"Click each card block to set the target url. You can find the url form at it's sidebar.",
					"vk-blocks"
				) }
			</p>
			<TextControl
				label={ __("Button text", "vk-blocks") }
				value={ btn_text }
				onChange={ value => setAttributes({ btn_text: value }) }
			/>
			<BaseControl label={ __("Button align", "vk-blocks") }>
				<SelectControl
					value={ btn_align }
					onChange={ value => setAttributes({ btn_align: value }) }
					options={ [
						{
							value: "text-left",
							label: __("Left", "vk-blocks")
						},
						{
							value: "text-center",
							label: __("Center", "vk-blocks")
						},
						{
							value: "text-right",
							label: __("Right", "vk-blocks")
						}
					] }
				/>
			</BaseControl>
		</PanelBody>
	);
};
