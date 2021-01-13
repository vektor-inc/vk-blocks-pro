import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';

/* eslint camelcase: 0 */
/* eslint no-shadow: 0 */
export default function save(props) {
	const { attributes } = props;
	const {
		layout,
		col_xs,
		col_sm,
		col_md,
		col_lg,
		col_xl,
		col_xxl,
		display_title,
		display_excerpt,
		display_image,
		display_btn,
		btn_text,
		title,
		excerpt_text,
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
	const renderImage = (display_image) => {
		if (display_image) {
			return (
				<div className={imgContainerClass} style={imageStyle}>
					{switchAddUrltoImage(url)}
				</div>
			);
		}
	};

	// eslint-disable-next-line no-shadow
	const switchAddUrltoImage = (url) => {
		const overlay = <div className="card-img-overlay"></div>;
		if (url) {
			return (
				<a href={url} target={linkTarget} rel={rel}>
					{overlay}
				</a>
			);
		}
		return overlay;
	};
	const renderExcerpt = (align, display_excerpt) => {
		if (display_excerpt) {
			const titleTag = 'p';
			const titleClass = `vk_post_excerpt card-text has-text-align-${align.text}`;
			return (
				<RichText.Content
					tagName={titleTag}
					className={titleClass}
					value={excerpt_text}
				/>
			);
		}
	};
	const renderButton = (display_btn, align) => {
		if (display_btn) {
			return (
				<div
					className={`vk_post_btnOuter has-text-align-${align.button}`}
				>
					<a
						className={`btn btn-primary vk_post_btn`}
						href={url}
						target={linkTarget}
						rel={rel}
					>
						{/* eslint-disable-next-line camelcase */}
						{btn_text}
					</a>
				</div>
			);
		}
	};
	const renderTitle = (align, display_title) => {
		if (display_title) {
			const titleTag = 'h5';
			const titleClass = `vk_post_title card-title has-text-align-${align.title}`;
			if (!url) {
				return (
					<RichText.Content
						tagName={titleTag}
						className={titleClass}
						value={title}
					/>
				);
			}
			return (
				<a href={url} target={linkTarget} rel={rel}>
					<RichText.Content
						tagName={titleTag}
						className={titleClass}
						value={title}
					/>
				</a>
			);
		}
	};

	let imageStyle;
	if (image) {
		const imageParsed = JSON.parse(fixBrokenUnicode(image));
		imageStyle = {
			backgroundImage: `url(${imageParsed.sizes.full.url})`,
		};
	} else {
		imageStyle = {};
	}
	const btnClass = display_btn ? 'vk_post-btn-display' : '';

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
			{renderImage(display_image)}
			<div className="vk_post_body card-body">
				{renderTitle(align, display_title)}
				{renderExcerpt(align, display_excerpt)}
				<InnerBlocks.Content />
				{renderButton(display_btn, align)}
			</div>
		</div>
	);
}
