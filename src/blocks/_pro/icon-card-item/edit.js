import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import { __ } from '@wordpress/i18n';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import {
	RichText,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import parse from 'html-react-parser';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import {
	PanelBody,
	BaseControl,
	TextControl,
	CheckboxControl,
	RadioControl,
} from '@wordpress/components';
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';

export default function IconCardItemedit(props) {
	const { setAttributes, attributes } = props;
	let {
		color,
		heading,
		content,
		faIcon,
		url,
		icon,
		urlOpenType,
		bgType,
		col_xs, //eslint-disable-line camelcase
		col_sm, //eslint-disable-line camelcase
		col_md, //eslint-disable-line camelcase
		col_lg, //eslint-disable-line camelcase
		col_xl, //eslint-disable-line camelcase
		col_xxl, //eslint-disable-line camelcase
		activeControl,
	} = attributes;
	const align = JSON.parse(fixBrokenUnicode(activeControl));
	// eslint-disable-next-line no-undef
	const iconFamily = vkFontAwesome.iconFamily;
	let style = {};
	let iconOuterClass = '';
	let iconColor = '';

	if (color !== undefined) {
		//アイコン背景:ベタ塗り
		if (bgType === '0') {
			//カスタムカラーの時
			if (isHexColor(color)) {
				iconOuterClass = `has-background `;
				style = {
					backgroundColor: `${color}`,
				};
				//カラーパレットの時
			} else {
				iconOuterClass = `has-background has-${sanitizeSlug(color)}-background-color`;
			}
			//アイコン背景:背景なし
		} else if (bgType === '1') {
			//カスタムカラーの時
			if (isHexColor(color)) {
				iconOuterClass = `has-text-color `;
				style = {
					border: `1px solid ${color}`,
				};
				iconColor = `${color}`;
				//カラーパレットの時
			} else {
				iconOuterClass = `has-text-color has-${sanitizeSlug(color)}-color`;
			}
		}
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
	if (iconColor !== '') {
		faIconFragment[0] = faIconFragment[0] + ` style="color:${iconColor}" `;
	} else {
		faIconFragment[0] = faIconFragment[0] + ` `;
	}
	faIconFragment[1] = faIconFragment[1] + ` vk_icon-card_item_icon `;
	const faIconTag = faIconFragment.join('');

	// アイコン背景:背景なし
	let iconOutlineClass = '';
	if (bgType === '1') {
		iconOutlineClass = 'is-style-outline';
	}

	const blockProps = useBlockProps({
		className: `vk_post vk_icon-card_item vk_post-col-xs-${convertToGrid(
			col_xs
		)} vk_post-col-sm-${convertToGrid(
			col_sm
		)} vk_post-col-md-${convertToGrid(
			col_md
		)} vk_post-col-lg-${convertToGrid(
			col_lg
		)} vk_post-col-xl-${convertToGrid(
			col_xl
		)} vk_post-col-xxl-${convertToGrid(col_xxl)}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Icon Card Setting', 'vk-blocks-pro')}>
					<BaseControl
						label={__('Link URL:', 'vk-blocks-pro')}
						id={`vk_iconCardItem-url`}
					>
						<TextControl
							value={url}
							onChange={(value) => setAttributes({ url: value })}
						/>
						<CheckboxControl
							label={__('Open link new tab.', 'vk-blocks-pro')}
							checked={urlOpenType}
							onChange={(checked) =>
								setAttributes({ urlOpenType: checked })
							}
						/>
					</BaseControl>
					<BaseControl
						label={
							__('Icon', 'vk-blocks-pro') +
							' ( ' +
							iconFamily +
							' )'
						}
						id={`vk_iconCardItem-icon`}
					>
						<FontAwesome attributeName={'faIcon'} {...props} />
					</BaseControl>
					<BaseControl>
						<AdvancedColorPalette schema={'color'} {...props} />
						<RadioControl
							label={__('Icon Background:', 'vk-blocks-pro')}
							selected={bgType}
							options={[
								{
									label: __('Solid color', 'vk-blocks-pro'),
									value: '0',
								},
								{
									label: __('No background', 'vk-blocks-pro'),
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

			<div {...blockProps}>
				<div
					className={`vk_icon-card_item_icon_outer ${iconOutlineClass} ${iconOuterClass}`}
					style={style}
				>
					{parse(faIconTag)}
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
					placeholder={__('Input Title', 'vk-blocks-pro')}
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
						'vk-blocks/nowrap', // nowrap
					]}
					placeholder={__('Input Content', 'vk-blocks-pro')}
				/>
			</div>
		</>
	);
}
