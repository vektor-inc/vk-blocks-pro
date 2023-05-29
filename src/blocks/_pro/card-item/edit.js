import { __ } from '@wordpress/i18n';
import { LinkControl } from '@vkblocks/components/link-control';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import {
	RichText,
	MediaUpload,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	BaseControl,
	TextControl,
} from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';

/* eslint no-shadow: 0 */
export default function CardItemEdit(props) {
	const { setAttributes, attributes, clientId } = props;
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

	const deleteImgBtn = () => {
		dispatch('core/block-editor').updateBlockAttributes(clientId, {
			image: null,
		});
	};

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
					<>
						{!imageParsed ? (
							<Button
								onClick={open}
								className={'button button-large'}
							>
								{__('Select image', 'vk-blocks-pro')}
							</Button>
						) : (
							<>
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
									{__('Delete Image', 'vk-blocks-pro')}
								</Button>
							</>
						)}
					</>
				)}
			/>
		);
	};
	//eslint-disable-next-line camelcase
	const renderImage = (display_image) => {
		//eslint-disable-next-line camelcase
		if (display_image) {
			return (
				<>
					<div className={imgContainerClass} style={imageStyle}>
						<div className="card-img-overlay"></div>
						{uploadImgBtn(image)}
					</div>
				</>
			);
		}
	};
	//eslint-disable-next-line camelcase
	const renderExcerpt = (align, display_excerpt) => {
		//eslint-disable-next-line camelcase
		if (display_excerpt) {
			const titleTag = 'p';
			const titleClass = `vk_post_excerpt card-text has-text-align-${align.text}`;
			return (
				<RichText
					tagName={titleTag}
					className={titleClass}
					value={excerpt_text} //eslint-disable-line camelcase
					onChange={(value) => setAttributes({ excerpt_text: value })}
					placeholder={__(
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
						'vk-blocks-pro'
					)}
				/>
			);
		}
	};
	//eslint-disable-next-line camelcase
	const renderButton = (display_btn, align) => {
		//eslint-disable-next-line camelcase
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
						{
							btn_text //eslint-disable-line camelcase
						}
					</a>
				</div>
			);
		}
	};
	//eslint-disable-next-line camelcase
	const renderTitle = (align, display_title) => {
		//eslint-disable-next-line camelcase
		if (display_title) {
			const titleTag = 'h5';
			const titleClass = `vk_post_title card-title has-text-align-${align.title}`;
			return (
				<RichText
					tagName={titleTag}
					className={titleClass}
					value={title}
					onChange={(value) => setAttributes({ title: value })}
					placeholder={__('Title', 'vk-blocks-pro')}
				/>
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
	const btnClass = display_btn ? 'vk_post-btn-display' : ''; //eslint-disable-line camelcase

	const blockProps = useBlockProps({
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
		<>
			<InspectorControls>
				<PanelBody title={__('URL', 'vk-blocks-pro')}>
					<BaseControl id="sidebar-card-block-url">
						<TextControl
							value={url}
							onChange={(value) => setAttributes({ url: value })}
							placeholder={__(
								'https://example.com',
								'vk-blocks-pro'
							)}
						/>
					</BaseControl>
					<LinkControl blockName={'card'} {...props} />
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{renderImage(display_image)}
				<div className="vk_post_body card-body">
					{renderTitle(align, display_title)}
					{renderExcerpt(align, display_excerpt)}
					<InnerBlocks />
					{renderButton(display_btn, align)}
				</div>
			</div>
		</>
	);
}
