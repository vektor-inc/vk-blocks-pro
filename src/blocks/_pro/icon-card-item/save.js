import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import parse from 'html-react-parser';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save(props) {
	const { attributes } = props;
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
				iconOuterClass = `has-background has-${color}-background-color`;
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
				iconOuterClass = `has-text-color has-${color}-color`;
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

	const blockProps = useBlockProps.save({
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

	const blockContent = (
		<>
			<div
				className={`vk_icon-card_item_icon_outer ${iconOutlineClass} ${iconOuterClass}`}
				style={style}
			>
				{parse(faIconTag)}
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
		</>
	);

	let blockContentWrapper = '';
	if (url !== null && url !== undefined && url !== '') {
		blockContentWrapper = (
			/*
			 target=_blankで指定すると、WordPressが自動でnoopener noreferrerを付与する。
			 ブロックでもrelを付与しないとブロックが壊れる。
			 */
			<a
				href={url}
				className="vk_icon-card_item_link"
				target={urlOpenType && '_blank'}
				rel={urlOpenType && 'noopener noreferrer'}
			>
				{blockContent}
			</a>
		);
	} else {
		blockContentWrapper = blockContent;
	}

	return <div {...blockProps}>{blockContentWrapper}</div>;
}
