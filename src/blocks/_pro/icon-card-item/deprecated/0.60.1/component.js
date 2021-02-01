import { __ } from '@wordpress/i18n';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { RichText } from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';

/* eslint camelcase: 0 */
export const PRcarditem = (props) => {
	const { attributes, setAttributes, for_, className } = props;
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

	let contents;
	if (for_ === 'edit') {
		contents = (
			<>
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
			</>
		);
	} else if (for_ === 'save') {
		contents = (
			<>
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
			</>
		);
	}

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
			{contents}
		</div>
	);
};
