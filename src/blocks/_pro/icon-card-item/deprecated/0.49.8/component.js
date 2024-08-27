import { __ } from '@wordpress/i18n';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { RichText } from '@wordpress/block-editor';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';
import parse from 'html-react-parser';

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
					{parse(faIconTag)}
				</div>
				<RichText
					className={`vk_icon-card_item_title vk_icon-card_item_title has-text-align-${align.title}`}
					tagName={'h3'}
					onChange={(value) =>
						props.setAttributes({ heading: value })
					}
					value={heading}
					placeholder={__('Input Title', 'vk-blocks-pro')}
				/>
				<RichText
					className={`vk_icon_card_item_summary vk_icon_card_item_summary has-text-align-${align.text}`}
					tagName={'p'}
					onChange={(value) => setAttributes({ content: value })}
					value={content}
					placeholder={__('Input Content', 'vk-blocks-pro')}
				/>
			</>
		);
	} else if (for_ === 'save') {
		contents = (
			<a
				href={url}
				className="vk_icon-card_item_link"
				target={urlOpenType ? '_blank' : '_self'}
				rel="noopener noreferrer"
			>
				<div className="vk_icon-card_item_icon_outer" style={style}>
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
			</a>
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
