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
		display_image, //eslint-disable-line camelcase
		display_image_overlay_term, //eslint-disable-line camelcase
		display_excerpt, //eslint-disable-line camelcase
		display_author, //eslint-disable-line camelcase
		display_date, //eslint-disable-line camelcase
		display_new, //eslint-disable-line camelcase
		display_taxonomies, //eslint-disable-line camelcase
		display_btn, //eslint-disable-line camelcase
		new_date, //eslint-disable-line camelcase
		new_text, //eslint-disable-line camelcase
		btn_text, //eslint-disable-line camelcase
		btn_align, //eslint-disable-line camelcase
	} = attributes;

	// 「子ページリスト」ブロックかどうかをチェック
	const isChildPageList = props.name === 'vk-blocks/child-page';

	return (
		<PanelBody
			title={__('Display item', 'vk-blocks-pro')}
			initialOpen={false}
		>
			<CheckboxControl
				label={__('Image', 'vk-blocks-pro')}
				checked={display_image} //eslint-disable-line camelcase
				onChange={(checked) =>
					setAttributes({ display_image: checked })
				}
			/>
			{/*  「子ページリスト」ブロックの場合、画像右上分類名を表示しない */}
			{!isChildPageList && (
				<CheckboxControl
					label={__("Term's name on Image", 'vk-blocks-pro')}
					checked={display_image_overlay_term} //eslint-disable-line camelcase
					onChange={(checked) =>
						setAttributes({ display_image_overlay_term: checked })
					}
				/>
			)}
			<CheckboxControl
				label={__('Excerpt', 'vk-blocks-pro')}
				checked={display_excerpt} //eslint-disable-line camelcase
				onChange={(checked) =>
					setAttributes({ display_excerpt: checked })
				}
			/>
			<CheckboxControl
				label={__('Author', 'vk-blocks-pro')}
				checked={display_author} //eslint-disable-line camelcase
				onChange={(checked) =>
					setAttributes({ display_author: checked })
				}
			/>
			<CheckboxControl
				label={__('Date', 'vk-blocks-pro')}
				checked={display_date} //eslint-disable-line camelcase
				onChange={(checked) => setAttributes({ display_date: checked })}
			/>
			<CheckboxControl
				label={__('New mark', 'vk-blocks-pro')}
				checked={display_new} //eslint-disable-line camelcase
				onChange={(checked) => setAttributes({ display_new: checked })}
			/>
			{/*  「子ページリスト」ブロックの場合、分類（全項目）を表示しない */}
			{!isChildPageList && (
				<CheckboxControl
					label={__('Taxonomies (all)', 'vk-blocks-pro')}
					checked={display_taxonomies} //eslint-disable-line camelcase
					onChange={(checked) =>
						setAttributes({ display_taxonomies: checked })
					}
				/>
			)}
			<CheckboxControl
				label={__('Button', 'vk-blocks-pro')}
				checked={display_btn} //eslint-disable-line camelcase
				onChange={(checked) => setAttributes({ display_btn: checked })}
			/>
			<h4>{__('New mark option', 'vk-blocks-pro')}</h4>
			<TextControl
				label={__(
					'Number of days to display the new post mark',
					'vk-blocks-pro'
				)}
				value={new_date} //eslint-disable-line camelcase
				onChange={(value) =>
					setAttributes({ new_date: parseInt(value) || 0 })
				}
				type={'number'}
			/>
			<TextControl
				label={__('New post mark', 'vk-blocks-pro')}
				value={new_text} //eslint-disable-line camelcase
				onChange={(value) => setAttributes({ new_text: value })}
			/>
			<h4 className={'postList_itemCard_button-option'}>
				{__('Button option', 'vk-blocks-pro')}
			</h4>
			<p>
				{__(
					"Click each card block to set the target url. You can find the url form at it's sidebar.",
					'vk-blocks-pro'
				)}
			</p>
			<TextControl
				label={__('Button text', 'vk-blocks-pro')}
				value={btn_text} //eslint-disable-line camelcase
				onChange={(value) => setAttributes({ btn_text: value })}
			/>
			<BaseControl
				label={__('Button align', 'vk-blocks-pro')}
				id={'vk_displayItem-buttonAlign'}
			>
				<SelectControl
					value={btn_align} //eslint-disable-line camelcase
					onChange={(value) => setAttributes({ btn_align: value })}
					options={[
						{
							value: 'text-left',
							label: __('Left', 'vk-blocks-pro'),
						},
						{
							value: 'text-center',
							label: __('Center', 'vk-blocks-pro'),
						},
						{
							value: 'text-right',
							label: __('Right', 'vk-blocks-pro'),
						},
					]}
				/>
			</BaseControl>
		</PanelBody>
	);
};
