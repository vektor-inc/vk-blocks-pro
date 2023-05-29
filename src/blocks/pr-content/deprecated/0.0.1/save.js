import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { MediaUpload, RichText } from '@wordpress/block-editor';
import { Fontawesome } from '../component-fontawesome-deprecated';

export class PRContent extends Component {
	render() {
		const attributes = this.props.attributes;
		const {
			title,
			titleColor,
			content,
			contentColor,
			url,
			buttonType,
			buttonColor,
			buttonColorCustom,
			buttonText,
			buttonTarget,
			Image,
			ImageBorderColor,
			layout,
			fontAwesomeIconBefore,
			fontAwesomeIconAfter,
		} = attributes;
		const setAttributes = this.props.setAttributes;
		const for_ = this.props.for_;
		let containerClass = 'vk_prContent';
		let btnClass = 'vk_button';
		let aClass = 'btn btn-block vk_button_link vk_prContent_colTxt_btn';
		let aStyle = {};

		if (layout === 'right') {
			containerClass = `${containerClass} vk_prContent-layout-imageRight`;
		} else {
			containerClass = `${containerClass} vk_prContent-layout-imageLeft`;
		}

		if (buttonColorCustom) {
			btnClass = `${btnClass} vk_button-color-custom`;
			aClass = `${aClass} btn-primary`;

			// 塗り
			if (buttonType === '0') {
				aStyle = {
					backgroundColor: buttonColorCustom,
					border: `1px solid ${buttonColorCustom}`,
				};
				// 塗りなし
			} else if (buttonType === '1') {
				aStyle = {
					backgroundColor: 'transparent',
					border: '1px solid ' + buttonColorCustom,
					color: buttonColorCustom,
				};
			}

			// カスタムカラーじゃない場合
		} else if (!buttonColorCustom) {
			// 塗り
			if (buttonType === '0') {
				aClass = `${aClass} btn-${buttonColor}`;
				aStyle = null;
				// 塗りなし
			} else if (buttonType === '1') {
				aClass = `${aClass} btn-outline-${buttonColor}`;
				aStyle = null;
			}
		}

		return (
			<div className={containerClass}>
				<div className="col-sm-6 vk_prContent_colImg">
					{for_ === 'edit' ? (
						<MediaUpload
							onSelect={(value) =>
								setAttributes({ Image: value.sizes.full.url })
							}
							type=" image"
							value={Image}
							render={({ open }) => (
								<Button
									onClick={open}
									className={
										Image
											? 'image-button'
											: 'button button-large'
									}
								>
									{!Image ? (
										__('Select image', 'vk-blocks-pro')
									) : (
										<img
											className={
												'vk_prContent_colImg_image'
											}
											src={Image}
											alt={__(
												'Upload image',
												'vk-blocks-pro'
											)}
											style={{
												border: `1px solid ${ImageBorderColor}`,
											}}
										/>
									)}
								</Button>
							)}
						/>
					) : !Image ? (
						__('Select image', 'vk-blocks-pro')
					) : (
						<img
							className={'vk_prContent_colImg_image'}
							src={Image}
							alt={__('Upload image', 'vk-blocks-pro')}
							style={{ border: `1px solid ${ImageBorderColor}` }}
						/>
					)}
				</div>
				<div className="col-sm-6 vk_prContent_colTxt">
					{(() => {
						if (for_ === 'edit') {
							return (
								<>
									<RichText
										tagName="h3"
										className={'vk_prContent_colTxt_title'}
										onChange={(value) =>
											setAttributes({ title: value })
										}
										value={title}
										placeholder={__(
											'Input title.',
											'vk-blocks-pro'
										)}
										style={{ color: titleColor }}
									/>
									<RichText
										tagName="p"
										className={'vk_prContent_colTxt_text'}
										onChange={(value) =>
											setAttributes({ content: value })
										}
										value={content}
										placeholder={__(
											'Input content.',
											'vk-blocks-pro'
										)}
										style={{ color: contentColor }}
									/>
								</>
							);
						}
						return (
							<>
								<RichText.Content
									tagName="h3"
									value={title}
									className={'vk_prContent_colTxt_title'}
									style={{ color: titleColor }}
								/>
								<RichText.Content
									tagName="p"
									className={'vk_prContent_colTxt_text'}
									value={content}
									style={{ color: contentColor }}
								/>
							</>
						);
					})()}
					{
						//ボタンテキストが入力されるとボタンを表示。
						(() => {
							if (buttonText !== '' && buttonText !== undefined) {
								return (
									<div className={btnClass}>
										<a
											href={url}
											className={aClass}
											target={
												buttonTarget ? '_blank' : null
											}
											style={aStyle}
											rel="noopener noreferrer"
										>
											<Fontawesome
												attributes={attributes}
											/>
										</a>
									</div>
								);
							}
						})()
					}
				</div>
			</div>
		);
	}
}

export default function save({ attributes, className }) {
	return <PRContent attributes={attributes} for_={'save'} />;
}
