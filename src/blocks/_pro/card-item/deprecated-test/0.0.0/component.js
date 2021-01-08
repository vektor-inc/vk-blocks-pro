import { __ } from '@wordpress/i18n';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';
import React from 'react';

export class DepComponent extends React.Component {
	render() {
		const { setAttributes, attributes, clientId } = this.props.value;
		let {
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

		const align = JSON.parse(fixBrokenUnicode(activeControl));
		const for_ = this.props.for_;

		const isEdit = () => {
			if (for_ === 'edit') {
				return true;
			} else if ('save') {
				return false;
			}
		};

		let imgContainerClass;
		if (layout === 'card-horizontal') {
		} else if (layout === 'media') {
			imgContainerClass = 'vk_post_imgOuter media-img';
		} else if (layout === 'card') {
			layout = layout + ' card-post';
			imgContainerClass = 'vk_post_imgOuter';
		} else if (layout === 'card-noborder') {
			layout = 'card ' + layout + ' card-post';
			imgContainerClass = 'vk_post_imgOuter';
		}

		const deleteImgBtn = () => {
			dispatch('core/editor').updateBlockAttributes(clientId, {
				image: null,
			});
		};

		// eslint-disable-next-line no-shadow
		const uploadImgBtn = (image) => {
			const imageParsed = JSON.parse(fixBrokenUnicode(image));
			return (
				<MediaUpload
					onSelect={(value) =>
						setAttributes({ image: JSON.stringify(value) })
					}
					type="image"
					className={'vk_post_imgOuter_img card-img-top'}
					value={image}
					render={({ open }) => (
						<Fragment>
							{!imageParsed ? (
								<Button
									onClick={open}
									className={'button button-large'}
								>
									{__('Select image', 'vk-blocks')}
								</Button>
							) : (
								<Fragment>
									<img
										className={
											'vk_post_imgOuter_img card-img-top'
										}
										src={imageParsed.sizes.full.url}
										alt={imageParsed.alt}
									/>
									<Button
										onClick={deleteImgBtn}
										className={
											'image-button button button-delete'
										}
									>
										{__('Delete Image', 'vk-blocks')}
									</Button>
								</Fragment>
							)}
						</Fragment>
					)}
				/>
			);
		};

		// eslint-disable-next-line camelcase,no-shadow
		const renderImage = (display_image) => {
			// eslint-disable-next-line camelcase,
			if (display_image) {
				if (isEdit(for_)) {
					return (
						<Fragment>
							<div
								className={imgContainerClass}
								style={imageStyle}
							>
								<div className="card-img-overlay"></div>
								{uploadImgBtn(image)}
							</div>
						</Fragment>
					);
				}
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

		// eslint-disable-next-line no-shadow
		const renderExcerpt = (align) => {
			const titleTag = 'p';
			const titleClass = `vk_post_excerpt card-text text-${align.text}`;
			if (isEdit(for_)) {
				return (
					<RichText
						tagName={titleTag}
						className={titleClass}
						// eslint-disable-next-line camelcase,
						value={excerpt_text}
						onChange={(value) =>
							setAttributes({ excerpt_text: value })
						}
						placeholder={__(
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
							'vk-blocks'
						)}
					/>
				);
			}
			return (
				<RichText.Content
					tagName={titleTag}
					className={titleClass}
					// eslint-disable-next-line camelcase,
					value={excerpt_text}
				/>
			);
		};

		// eslint-disable-next-line camelcase,no-shadow
		const renderButton = (display_btn, align) => {
			// eslint-disable-next-line camelcase,
			if (display_btn) {
				return (
					<div className={`vk_post_btnOuter text-${align.button}`}>
						<a
							className={`btn btn-primary vk_post_btn`}
							href={url}
							target={linkTarget}
							rel={rel}
						>
							{/* eslint-disable-next-line camelcase*/}
							{btn_text}
						</a>
					</div>
				);
			}
		};

		// eslint-disable-next-line no-shadow
		const renderTitle = (align) => {
			const titleTag = 'h5';
			const titleClass = `vk_post_title card-title text-${align.title}`;
			if (isEdit(for_)) {
				return (
					<RichText
						tagName={titleTag}
						className={titleClass}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('Title', 'vk-blocks')}
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

		// eslint-disable-next-line camelcase,
		const btnClass = display_btn ? 'vk_post-btn-display' : '';

		return (
			<div
				className={`vk_post ${layout} vk_card_item vk_post-col-xs-${convertToGrid(
					col_xs
				)} vk_post-col-sm-${convertToGrid(
					col_sm
				)} vk_post-col-md-${convertToGrid(
					col_md
				)} vk_post-col-lg-${convertToGrid(
					col_lg
				)} vk_post-col-xl-${convertToGrid(col_xl)} ${btnClass}`}
			>
				{renderImage(display_image)}
				<div className="vk_post_body card-body">
					{renderTitle(align)}
					{renderExcerpt(align)}
					{renderButton(display_btn, align)}
				</div>
			</div>
		);
	}
}
