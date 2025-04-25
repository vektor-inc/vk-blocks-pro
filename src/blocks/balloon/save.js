import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';

export default function save({ attributes }) {
	const {
		balloonName,
		balloonType,
		balloonBorder,
		balloonFullWidth,
		balloonIconDisplay,
		balloonImageBorder,
		balloonBorderColor,
		balloonBgColor,
		balloonAlign,
		IconImage,
		balloonImageType,
		balloonAnimation,
	} = attributes;

	let contentBorderClass = '';
	let iconImageBorderClass = '';
	let contentBackgroundClass = '';
	let iconImageColorStyle = {};
	let contentColorStyle = {};
	let triangleBorderColorBeforeClass = '';
	let triangleBorderColorAfterClass = '';
	let triangleBorderColorBeforeStyle = {};
	let triangleBorderColorAfterStyle = {};

	// 後方互換 (カスタムカラー選択時 インラインcssをcontentとiconに分ける)
	const colorStyle = {};
	if (colorStyle) {
		contentColorStyle = colorStyle;
		iconImageColorStyle = colorStyle;
	}
	if ('background' in iconImageColorStyle) {
		delete iconImageColorStyle.background;
	}

	// eslint-disable-next-line camelcase,no-undef
	const defaultAvatar =
		typeof img_path !== 'undefined' && !!img_path.full_path // eslint-disable-line no-undef
			? img_path.full_path // eslint-disable-line no-undef
			: '';

	//吹き出しに枠線を追加オン
	if (balloonBorder === true) {
		contentBorderClass += 'vk_balloon_content-border-true';

		if (balloonImageBorder === true) {
			iconImageBorderClass += 'vk_balloon_icon_image-border-true';
		} else {
			iconImageBorderClass = '';
		}

		//iconImageBorderClass
		//contentBorderClass
		if (balloonBorderColor !== undefined) {
			iconImageBorderClass += ` has-text-color`;
			contentBorderClass += ` has-text-color`;
			//カラーパレットの時
			if (!isHexColor(balloonBorderColor)) {
				iconImageBorderClass += ` has-${sanitizeSlug(balloonBorderColor)}-color`;
				contentBorderClass += ` has-${sanitizeSlug(balloonBorderColor)}-color`;
			}
		}

		//colorStyle
		//カスタム*パレット
		if (isHexColor(balloonBorderColor) && !isHexColor(balloonBgColor)) {
			contentColorStyle = {
				borderColor: `${balloonBorderColor}`,
			};
			iconImageColorStyle = {
				borderColor: `${balloonBorderColor}`,
			};
			//パレット*カスタム
		} else if (
			!isHexColor(balloonBorderColor) &&
			isHexColor(balloonBgColor)
		) {
			contentColorStyle = {
				background: `${balloonBgColor}`,
			};
			//カスタム*カスタム
		} else if (
			isHexColor(balloonBorderColor) &&
			isHexColor(balloonBgColor)
		) {
			contentColorStyle = {
				borderColor: `${balloonBorderColor}`,
				background: `${balloonBgColor}`,
			};
			iconImageColorStyle = {
				borderColor: `${balloonBorderColor}`,
			};
		}

		// 吹き出しの配置 左
		if (balloonAlign === 'position-left') {
			// 吹き出しの矢印 Class
			// カラーパレットの時
			// 吹き出しの時
			if ('type-speech' === balloonType) {
				if (balloonBgColor !== undefined) {
					triangleBorderColorBeforeClass += ` has-text-color`;
					if (!isHexColor(balloonBgColor)) {
						triangleBorderColorBeforeClass += ` has-${balloonBgColor}-color`;
					}
				}
				if (balloonBorderColor !== undefined) {
					triangleBorderColorAfterClass += ` has-text-color`;
					if (!isHexColor(balloonBorderColor)) {
						triangleBorderColorAfterClass += ` has-${balloonBorderColor}-color`;
					}
				}
				//もくもくの時
			} else if ('type-think' === balloonType) {
				if (balloonBorderColor !== undefined) {
					triangleBorderColorBeforeClass += ` has-text-color`;
					if (!isHexColor(balloonBorderColor)) {
						triangleBorderColorBeforeClass += ` has-${balloonBorderColor}-color`;
					}
				}
				if (balloonBorderColor !== undefined) {
					triangleBorderColorAfterClass += ` has-text-color`;
					if (!isHexColor(balloonBorderColor)) {
						triangleBorderColorAfterClass += ` has-${balloonBorderColor}-color`;
					}
				}
			}

			//吹き出しの矢印 Style
			//カスタムカラーの時
			if (isHexColor(balloonBorderColor)) {
				triangleBorderColorAfterStyle = {
					borderColor: `transparent transparent transparent ${balloonBgColor}`,
				};
			}
			if (isHexColor(balloonBgColor)) {
				triangleBorderColorBeforeStyle = {
					borderColor: `transparent ${balloonBgColor} transparent transparent`,
				};
			}

			// 吹き出しの配置 右
		} else if (balloonAlign === 'position-right') {
			// 吹き出しの時
			// カラーパレットの時
			if ('type-speech' === balloonType) {
				if (balloonBgColor !== undefined) {
					triangleBorderColorBeforeClass += ` has-text-color`;
					if (!isHexColor(balloonBgColor)) {
						triangleBorderColorBeforeClass += ` has-${balloonBgColor}-color`;
					}
				}
				if (balloonBorderColor !== undefined) {
					triangleBorderColorAfterClass += ` has-text-color`;
					if (!isHexColor(balloonBorderColor)) {
						triangleBorderColorAfterClass += ` has-${balloonBorderColor}-color`;
					}
				}
				// もくもくの時
				// カラーパレットの時
			} else if ('type-think' === balloonType) {
				if (balloonBorderColor !== undefined) {
					triangleBorderColorBeforeClass += ` has-text-color`;
					triangleBorderColorAfterClass += ` has-text-color`;
					if (!isHexColor(balloonBorderColor)) {
						triangleBorderColorBeforeClass += ` has-${balloonBorderColor}-color`;
						triangleBorderColorAfterClass += ` has-${balloonBorderColor}-color`;
					}
				}
			}

			//吹き出しの矢印 Style
			//カスタムカラーの時
			if (isHexColor(balloonBorderColor)) {
				triangleBorderColorAfterStyle = {
					borderColor: `transparent ${balloonBorderColor} transparent transparent`,
				};
			}
			if (isHexColor(balloonBgColor)) {
				triangleBorderColorBeforeStyle = {
					borderColor: `transparent transparent transparent ${balloonBgColor}`,
				};
			}
		}

		//吹き出しに枠線を追加オフ
	} else if (balloonBgColor !== undefined) {
		iconImageBorderClass = '';

		// 吹き出しの背景色 Style
		if (balloonBgColor !== undefined) {
			//カスタムカラーの時
			if (isHexColor(balloonBgColor)) {
				contentColorStyle = {
					background: `${balloonBgColor}`,
				};
			}
		}

		if (balloonAlign === 'position-left') {
			// 吹き出しの矢印 Class
			// カラーパレットの時
			// 吹き出しの時
			if ('type-speech' === balloonType) {
				if (balloonBgColor !== undefined) {
					triangleBorderColorBeforeClass += ` has-text-color`;
					if (!isHexColor(balloonBgColor)) {
						triangleBorderColorBeforeClass += ` has-${balloonBgColor}-color`;
					}
				}
			}

			//吹き出しの矢印 Style
			//カスタムカラーの時
			if (isHexColor(balloonBorderColor)) {
				triangleBorderColorAfterStyle = {
					borderColor: `transparent transparent transparent ${balloonBgColor}`,
				};
			}
			if (isHexColor(balloonBgColor)) {
				triangleBorderColorBeforeStyle = {
					borderColor: `transparent ${balloonBgColor} transparent transparent`,
				};
			}
		} else if (balloonAlign === 'position-right') {
			// 吹き出しの矢印 Class
			// カラーパレットの時
			// 吹き出しの時
			if ('type-speech' === balloonType) {
				if (balloonBgColor !== undefined) {
					triangleBorderColorBeforeClass += ` has-text-color`;
					if (!isHexColor(balloonBgColor)) {
						triangleBorderColorBeforeClass += ` has-${balloonBgColor}-color`;
					}
				}
			}

			//吹き出しの矢印 Style
			//カスタムカラーの時
			if (isHexColor(balloonBgColor)) {
				triangleBorderColorBeforeStyle = {
					borderColor: `transparent transparent transparent ${balloonBgColor}`,
				};
			}
		}
	}

	// 吹き出しの背景色 Class
	if (balloonBgColor !== undefined) {
		contentBackgroundClass += ` has-background-color`;
		//カラーパレットの時
		if (!isHexColor(balloonBgColor)) {
			contentBackgroundClass += ` has-${sanitizeSlug(balloonBgColor)}-background-color`;
		}
	}

	// 吹き出しの幅 Class
	if (!!balloonFullWidth) {
		contentBorderClass += ` vk_balloon_content_fullwidth`;
	}

	const blockProps = useBlockProps.save({
		className: `vk_balloon vk_balloon-${balloonAlign} vk_balloon-${balloonType} vk_balloon-animation-${balloonAnimation}`,
	});

	return (
		<div {...blockProps}>
			<div className={`vk_balloon_icon`}>
				{balloonIconDisplay ||
				(balloonIconDisplay === 'undefined' && IconImage) ? (
					<figure>
						<img
							className={`vk_balloon_icon_image vk_balloon_icon_image-type-${balloonImageType} ${iconImageBorderClass}`}
							style={iconImageColorStyle}
							src={IconImage ? IconImage : defaultAvatar}
							alt=""
						/>
						<RichText.Content
							tagName="figcaption"
							className={'vk_balloon_icon_name'}
							value={balloonName}
						/>
					</figure>
				) : (
					''
				)}
			</div>
			<div className={`vk_balloon_content_outer`}>
				<div
					className={`vk_balloon_content ${contentBackgroundClass} ${contentBorderClass}`}
					style={contentColorStyle}
				>
					<span
						className={`vk_balloon_content_before ${triangleBorderColorBeforeClass}`}
						style={triangleBorderColorBeforeStyle}
					></span>
					<span
						className={`vk_balloon_content_after ${triangleBorderColorAfterClass}`}
						style={triangleBorderColorAfterStyle}
					></span>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
