import { __ } from '@wordpress/i18n';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { RichText } from '@wordpress/block-editor';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';

export const DepPRcarditem = (props) => {
	const { attributes, setAttributes, for_, className } = props;
	const {
		color,
		heading,
		content,
		icon,
		url,
		urlOpenType,
		bgType,
		col_xs,
		col_sm,
		col_md,
		col_lg,
		col_xl,
		activeControl,
	} = attributes;
	const align = JSON.parse(fixBrokenUnicode(activeControl));

	let style;
	let iconStyle;
	if (bgType === '0') {
		style = { backgroundColor: `${color}`, border: `1px solid ${color}` };
		iconStyle = { color: `##fff` };
	} else {
		style = {
			backgroundColor: `transparent`,
			border: `1px solid ${color}`,
		};
		iconStyle = { color: `${color}` };
	}

	let contents;
	if (for_ === 'edit') {
		contents = (
			<>
				<div className="vk_icon-card_item_icon_outer" style={style}>
					<i
						className={`${icon} vk_icon-card_item_icon`}
						style={iconStyle}
					/>
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
					<i
						className={`${icon} vk_icon-card_item_icon`}
						style={iconStyle}
					/>
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
			)} vk_post-col-xl-${convertToGrid(col_xl)}`}
		>
			{contents}
		</div>
	);
};
