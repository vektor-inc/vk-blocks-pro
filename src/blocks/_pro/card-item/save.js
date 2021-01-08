import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';
import React from 'react';

export default function save(props) {
	const { attributes } = props;
	const {
		layout,
		// eslint-disable-next-line camelcase
		col_xs,
		// eslint-disable-next-line camelcase
		col_sm,
		// eslint-disable-next-line camelcase
		col_md,
		// eslint-disable-next-line camelcase
		col_lg,
		// eslint-disable-next-line camelcase
		col_xl,
		// eslint-disable-next-line camelcase
		col_xxl,
		// eslint-disable-next-line camelcase
		display_title,
		// eslint-disable-next-line camelcase
		display_excerpt,
		// eslint-disable-next-line camelcase
		display_image,
		// eslint-disable-next-line camelcase
		display_btn,
		// eslint-disable-next-line camelcase
		btn_text,
		title,
		// eslint-disable-next-line camelcase
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

	// eslint-disable-next-line camelcase,no-shadow
	const renderImage = (display_image) => {
		// eslint-disable-next-line camelcase
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

	// eslint-disable-next-line camelcase,no-shadow
	const renderExcerpt = (align, display_excerpt) => {
		// eslint-disable-next-line camelcase
		if (display_excerpt) {
			const titleTag = 'p';
			const titleClass = `vk_post_excerpt card-text has-text-align-${align.text}`;
			return (
				<RichText.Content
					tagName={titleTag}
					className={titleClass}
					// eslint-disable-next-line camelcase
					value={excerpt_text}
				/>
			);
		}
	};

	// eslint-disable-next-line camelcase,no-shadow
	const renderButton = (display_btn, align) => {
		// eslint-disable-next-line camelcase
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

	// eslint-disable-next-line camelcase,no-shadow
	const renderTitle = (align, display_title) => {
		// eslint-disable-next-line camelcase
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

	// eslint-disable-next-line camelcase
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
