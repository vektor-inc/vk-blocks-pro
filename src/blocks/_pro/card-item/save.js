import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';

// タイトルタグを表示
const renderTitleTag = (align, title) => {
	return (
		<RichText.Content
			tagName={'h5'}
			className={`vk_post_title card-title has-text-align-${align.title}`}
			value={title}
		/>
	);
};
// タイトルタグをリンク付きか否かで出し分ける
//eslint-disable-next-line camelcase
const renderTitle = ({ align, title, display_title, url, linkTarget, rel }) => {
	//eslint-disable-next-line camelcase
	if (display_title) {
		if (!url) {
			return <renderTitleTag align={(align, title)} />;
		}
		return (
			<a href={url} target={linkTarget} rel={rel}>
				<renderTitleTag align={(align, title)} />
			</a>
		);
	}
};

export default function save(props) {
	const { attributes } = props;
	const {
		layout,
		col_xs, //eslint-disable-line camelcase
		col_sm, //eslint-disable-line camelcase
		col_md, //eslint-disable-line camelcase
		col_lg, //eslint-disable-line camelcase
		col_xl, //eslint-disable-line camelcase
		col_xxl, //eslint-disable-line camelcase
		display_title, //eslint-disable-line camelcase
		display_excerpt, //eslint-disable-line camelcase
		display_image, //eslint-disable-line camelcase
		display_btn, //eslint-disable-line camelcase
		btn_text, //eslint-disable-line camelcase
		title,
		excerpt_text, //eslint-disable-line camelcase
		image,
		url,
		activeControl,
		linkTarget,
		rel,
	} = attributes;

	//ユニコード文字がエスケープされている対策
	const align = JSON.parse(fixBrokenUnicode(activeControl));

	let imgContainerClass;
	let layoutClass;
	if (layout === 'card-horizontal') {
	} else if (layout === 'media') {
		layoutClass = 'media';
		imgContainerClass = 'vk_post_imgOuter media-img';
	} else if (layout === 'card') {
		layoutClass = 'card card-post';
		imgContainerClass = 'vk_post_imgOuter';
	} else if (layout === 'card-noborder') {
		layoutClass = 'card card-noborder card-post';
		imgContainerClass = 'vk_post_imgOuter';
	} else if (layout === 'card-imageRound') {
		layoutClass = 'card card-noborder card-imageRound card-post';
		imgContainerClass = 'vk_post_imgOuter';
	}

	let imageStyle;
	if (image) {
		const imageParsed = JSON.parse(fixBrokenUnicode(image));
		imageStyle = {
			backgroundImage: `url(${imageParsed.sizes.full.url})`,
		};
	} else {
		imageStyle = {};
	}
	const btnClass = display_btn ? 'vk_post-btn-display' : ''; //eslint-disable-line camelcase

	const blockProps = useBlockProps.save({
		className: `vk_post ${layoutClass} vk_card_item vk_post-col-xs-${convertToGrid(
			col_xs
		)} vk_post-col-sm-${convertToGrid(
			col_sm
		)} vk_post-col-md-${convertToGrid(
			col_md
		)} vk_post-col-lg-${convertToGrid(
			col_lg
		)} vk_post-col-xl-${convertToGrid(
			col_xl
		)} vk_post-col-xxl-${convertToGrid(col_xxl)}
${btnClass}`,
	});
	return (
		<div {...blockProps}>
			{display_image && ( //eslint-disable-line camelcase
				<div className={imgContainerClass} style={imageStyle}>
					{url && (
						<a href={url} target={linkTarget} rel={rel}>
							<div className="card-img-overlay"></div>
						</a>
					)}
				</div>
			)}
			<div className="vk_post_body card-body">
				{renderTitle({
					align,
					title,
					display_title,
					url,
					linkTarget,
					rel,
				})}
				{display_excerpt && ( //eslint-disable-line camelcase
					<RichText.Content
						tagName={'p'}
						className={`vk_post_excerpt card-text has-text-align-${align.text}`}
						value={excerpt_text} //eslint-disable-line camelcase
					/>
				)}
				<InnerBlocks.Content />
				{display_btn && ( //eslint-disable-line camelcase
					<div
						className={`vk_post_btnOuter has-text-align-${align.button}`}
					>
						<a
							className={`btn btn-primary vk_post_btn`}
							href={url}
							target={linkTarget}
							rel={rel}
						>
							{
								btn_text //eslint-disable-line camelcase
							}
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
