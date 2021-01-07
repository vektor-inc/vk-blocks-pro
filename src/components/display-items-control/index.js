import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	TextControl,
	SelectControl,
	CheckboxControl,
} from '@wordpress/components';

export const DisplayItemsControl = (props) => {
	const { setAttributes, attributes } = props;
	const {
		// eslint-disable-next-line camelcase
		display_image,
		// eslint-disable-next-line camelcase
		display_image_overlay_term,
		// eslint-disable-next-line camelcase
		display_excerpt,
		// eslint-disable-next-line camelcase
		display_author,
		// eslint-disable-next-line camelcase
		display_date,
		// eslint-disable-next-line camelcase
		display_new,
		// eslint-disable-next-line camelcase
		display_taxonomies,
		// eslint-disable-next-line camelcase
		display_btn,
		// eslint-disable-next-line camelcase
		new_date,
		// eslint-disable-next-line camelcase
		new_text,
		// eslint-disable-next-line camelcase
		btn_text,
		// eslint-disable-next-line camelcase
		btn_align,
	} = attributes;

	return (
		<PanelBody title={__('Display item', 'vk-blocks')} initialOpen={false}>
			<CheckboxControl
				label={__('Image', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				checked={display_image}
				onChange={(checked) =>
					setAttributes({ display_image: checked })
				}
			/>
			<CheckboxControl
				label={__('Term name', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				checked={display_image_overlay_term}
				onChange={(checked) =>
					setAttributes({ display_image_overlay_term: checked })
				}
			/>
			<CheckboxControl
				label={__('Excerpt', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				checked={display_excerpt}
				onChange={(checked) =>
					setAttributes({ display_excerpt: checked })
				}
			/>
			<CheckboxControl
				label={__('Author', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				checked={display_author}
				onChange={(checked) =>
					setAttributes({ display_author: checked })
				}
			/>
			<CheckboxControl
				label={__('Date', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				checked={display_date}
				onChange={(checked) => setAttributes({ display_date: checked })}
			/>

			<CheckboxControl
				label={__('New mark', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				checked={display_new}
				onChange={(checked) => setAttributes({ display_new: checked })}
			/>

			<CheckboxControl
				label={__('Taxonomies', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				checked={display_taxonomies}
				onChange={(checked) =>
					setAttributes({ display_taxonomies: checked })
				}
			/>

			<CheckboxControl
				label={__('Button', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				checked={display_btn}
				onChange={(checked) => setAttributes({ display_btn: checked })}
			/>
			<h4>{__('New mark option', 'vk-blocks')}</h4>
			<TextControl
				label={__(
					'Number of days to display the new post mark',
					'vk-blocks'
				)}
				// eslint-disable-next-line camelcase
				value={new_date}
				onChange={(value) => setAttributes({ new_date: value })}
				type={'number'}
			/>
			<TextControl
				label={__('New post mark', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				value={new_text}
				onChange={(value) => setAttributes({ new_text: value })}
			/>
			<h4 className={'postList_itemCard_button-option'}>
				{__('Button option', 'vk-blocks')}
			</h4>
			<p>
				{__(
					"Click each card block to set the target url. You can find the url form at it's sidebar.",
					'vk-blocks'
				)}
			</p>
			<TextControl
				label={__('Button text', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				value={btn_text}
				onChange={(value) => setAttributes({ btn_text: value })}
			/>
			<BaseControl
				label={__('Button align', 'vk-blocks')}
				id={'vk_displayItem-buttonAlign'}
			>
				<SelectControl
					// eslint-disable-next-line camelcase
					value={btn_align}
					onChange={(value) => setAttributes({ btn_align: value })}
					options={[
						{
							value: 'text-left',
							label: __('Left', 'vk-blocks'),
						},
						{
							value: 'text-center',
							label: __('Center', 'vk-blocks'),
						},
						{
							value: 'text-right',
							label: __('Right', 'vk-blocks'),
						},
					]}
				/>
			</BaseControl>
		</PanelBody>
	);
};
