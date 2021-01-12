/**
 * pr-card-item block type
 *
 */
import { deprecated } from './deprecated';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import { ReactComponent as Icon } from './icon.svg';

import { __ } from '@wordpress/i18n';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { RichText } from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';


import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	PanelBody,
	BaseControl,
	TextControl,
	CheckboxControl,
	RadioControl,
} from '@wordpress/components';
import { InspectorControls, ColorPalette } from '@wordpress/block-editor';

registerBlockType('vk-blocks/icon-card-item', {
	title: __('Icon Card Item', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat',
	attributes: {
		col_xs: {
			type: 'number',
			default: 1,
		},
		col_sm: {
			type: 'number',
			default: 2,
		},
		col_md: {
			type: 'number',
			default: 3,
		},
		col_lg: {
			type: 'number',
			default: 3,
		},
		col_xl: {
			type: 'number',
			default: 3,
		},
		col_xxl: {
			type: 'number',
			default: 3,
		},
		url: {
			type: 'string',
			default: '',
		},
		activeControl: {
			type: 'string',
			default: '{"title":"center","text":"center"}',
		},
		urlOpenType: {
			type: 'Boolean',
			default: false,
		},
		color: {
			type: 'string',
			default: '#0693e3',
		},
		bgType: {
			type: 'string',
			default: '1',
		},
		heading: {
			type: 'string',
			source: 'html',
			selector: '.vk_icon-card_item_title',
		},
		content: {
			type: 'string',
			source: 'html',
			selector: '.vk_icon_card_item_summary',
		},
		faIcon: {
			type: 'string',
			default: '<i class="fas fa-user"></i>',
		},
		//This attribute is deprecated.
		icon: {
			type: 'string',
			default: 'fas fa-file',
		},
	},
	parent: ['vk-blocks/icon-card'],
	supports: {
		className: true,
	},
	/* eslint camelcase: 0 */
	edit(props) {
		const { setAttributes, attributes, className } = props;
		let {
			color,
			heading,
			content,
			faIcon,
			url,
			icon,
			urlOpenType,
			bgType,
			col_xs,
			col_sm,
			col_md,
			col_lg,
			col_xl,
			col_xxl,
			activeControl,
		} = attributes;
		const align = JSON.parse(fixBrokenUnicode(activeControl));

		let style;
		let iconColor;

		if (bgType === '0') {
			style = {
				backgroundColor: `${color}`,
				border: `1px solid ${color}`,
			};
			iconColor = `#ffffff`;
		} else {
			style = {
				backgroundColor: `transparent`,
				border: `1px solid ${color}`,
			};
			iconColor = `${color}`;
		}

		//過去バージョンをリカバリーした時にiconを正常に表示する
		if (faIcon && !faIcon.match(/<i/)) {
			faIcon = `<i class="${faIcon}"></i>`;

			//過去のicon attribuet用 deprecated処理
		} else if (!faIcon && icon && !icon.match(/<i/)) {
			faIcon = `<i class="${icon}"></i>`;
		}

		//add class and inline css
		const faIconFragment = faIcon.split(' ');
		faIconFragment[0] = faIconFragment[0] + ` style="color:${iconColor}" `;
		faIconFragment[1] = faIconFragment[1] + ` vk_icon-card_item_icon `;
		const faIconTag = faIconFragment.join('');

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('PR Block Setting', 'vk-blocks')}>
						<BaseControl
							label={__('Link URL:', 'vk-blocks')}
							id={`vk_iconCardItem-url`}
						>
							<TextControl
								value={url}
								onChange={(value) =>
									setAttributes({ url: value })
								}
							/>
							<CheckboxControl
								label={__('Open link new tab.', 'vk-blocks')}
								checked={urlOpenType}
								onChange={(checked) =>
									setAttributes({ urlOpenType: checked })
								}
							/>
						</BaseControl>
						<BaseControl
							label={__('Icon ( Font Awesome )', 'vk-blocks')}
							id={`vk_iconCardItem-icon`}
						>
							<FontAwesome attributeName={'faIcon'} {...props} />
						</BaseControl>
						<BaseControl>
							<ColorPalette
								value={color}
								onChange={(value) => {
									if (value) {
										setAttributes({ color: value });
									} else {
										setAttributes({ color: '#0693e3' });
										setAttributes({ bgType: '0' });
									}
								}}
							/>
							<RadioControl
								label={__('Icon Background:', 'vk-blocks')}
								selected={bgType}
								options={[
									{
										label: __('Solid color', 'vk-blocks'),
										value: '0',
									},
									{
										label: __('No background', 'vk-blocks'),
										value: '1',
									},
								]}
								onChange={(value) =>
									setAttributes({ bgType: value })
								}
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div
					className={`${className} vk_post vk_icon-card_item vk_post-col-xs-${convertToGrid(
						col_xs
					)} vk_post-col-sm-${convertToGrid(
						col_sm
					)} vk_post-col-md-${convertToGrid(
						col_md
					)} vk_post-col-lg-${convertToGrid(
						col_lg
					)} vk_post-col-xl-${convertToGrid(
						col_xl
					)} vk_post-col-xxl-${convertToGrid(col_xxl)}`}
				>
					<div className="vk_icon-card_item_icon_outer" style={style}>
						{ReactHtmlParser(faIconTag)}
					</div>
					<RichText
						className={`vk_icon-card_item_title vk_icon-card_item_title has-text-align-${align.title}`}
						tagName={'h3'}
						onChange={(value) =>
							props.setAttributes({ heading: value })
						}
						value={heading}
						allowedFormats={[
							'core/bold', // 太字
							'core/code', // インラインコード
							'core/image', // インライン画像
							'core/italic', // イタリック
							// 'core/link', // リンク
							'core/strikethrough', // 取り消し線
							'core/underline', // 下線（未実装？）
							'core/text-color', // 文字色
							'core/superscript', // 上付き
							'core/subscript', // 下付き
							'vk-blocks/highlighter', // 蛍光マーカー
							'vk-blocks/responsive-br', // Select a direction (レスポンシブ改行)
						]}
						placeholder={__('Input Title', 'vk-blocks')}
					/>
					<RichText
						className={`vk_icon_card_item_summary vk_icon_card_item_summary has-text-align-${align.text}`}
						tagName={'p'}
						onChange={(value) => setAttributes({ content: value })}
						value={content}
						allowedFormats={[
							'core/bold', // 太字
							'core/code', // インラインコード
							'core/image', // インライン画像
							'core/italic', // イタリック
							// 'core/link', // リンク
							'core/strikethrough', // 取り消し線
							'core/underline', // 下線（未実装？）
							'core/text-color', // 文字色
							'core/superscript', // 上付き
							'core/subscript', // 下付き
							'vk-blocks/highlighter', // 蛍光マーカー
							'vk-blocks/responsive-br', // Select a direction (レスポンシブ改行)
						]}
						placeholder={__('Input Content', 'vk-blocks')}
					/>
				</div>
			</>
		);
	},

	save(props) {
		const { attributes, className } = props;
		let {
			color,
			heading,
			content,
			faIcon,
			url,
			icon,
			urlOpenType,
			bgType,
			col_xs,
			col_sm,
			col_md,
			col_lg,
			col_xl,
			col_xxl,
			activeControl,
		} = attributes;
		const align = JSON.parse(fixBrokenUnicode(activeControl));

		let style;
		let iconColor;

		if (bgType === '0') {
			style = { backgroundColor: `${color}`, border: `1px solid ${color}` };
			iconColor = `#ffffff`;
		} else {
			style = {
				backgroundColor: `transparent`,
				border: `1px solid ${color}`,
			};
			iconColor = `${color}`;
		}

		//過去バージョンをリカバリーした時にiconを正常に表示する
		if (faIcon && !faIcon.match(/<i/)) {
			faIcon = `<i class="${faIcon}"></i>`;

			//過去のicon attribuet用 deprecated処理
		} else if (!faIcon && icon && !icon.match(/<i/)) {
			faIcon = `<i class="${icon}"></i>`;
		}

		//add class and inline css
		const faIconFragment = faIcon.split(' ');
		faIconFragment[0] = faIconFragment[0] + ` style="color:${iconColor}" `;
		faIconFragment[1] = faIconFragment[1] + ` vk_icon-card_item_icon `;
		const faIconTag = faIconFragment.join('');
		return (
			<div
				className={`${className} vk_post vk_icon-card_item vk_post-col-xs-${convertToGrid(
					col_xs
				)} vk_post-col-sm-${convertToGrid(
					col_sm
				)} vk_post-col-md-${convertToGrid(
					col_md
				)} vk_post-col-lg-${convertToGrid(
					col_lg
				)} vk_post-col-xl-${convertToGrid(
					col_xl
				)} vk_post-col-xxl-${convertToGrid(col_xxl)}`}
			>
								{/*
				 target=_blankで指定すると、WordPressが自動でnoopener noreferrerを付与する。
				 ブロックでもrelを付与しないとブロックが壊れる。
				 */}
				<a
					href={url}
					className="vk_icon-card_item_link"
					target={urlOpenType && '_blank'}
					rel={urlOpenType && 'noopener noreferrer'}
				>
					<div className="vk_icon-card_item_icon_outer" style={style}>
						{ReactHtmlParser(faIconTag)}
					</div>
					<RichText.Content
						className={`vk_icon-card_item_title vk_icon-card_item_title has-text-align-${align.title}`}
						tagName={'h3'}
						value={heading}
					/>
					<RichText.Content
						className={`vk_icon_card_item_summary vk_icon_card_item_summary has-text-align-${align.text}`}
						tagName={'p'}
						value={content}
					/>
				</a>
			</div>
		);
	},

	deprecated,
});
