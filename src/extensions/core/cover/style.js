/**
 * cover-style block type
 *
 * @package
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import LinkToolbar from '@vkblocks/components/link-toolbar';
import { __ } from '@wordpress/i18n';

// コアの Cover ブロックかどうかを判定
const isCoverBlock = (name) => name === 'core/cover';

// Cover ブロックを拡張する HOC
const enhanceCoverBlock = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (!isCoverBlock(props.name)) {
			return <BlockEdit {...props} />;
		}

		const {
			attributes: { linkUrl, linkTarget, relAttribute, linkDescription },
			setAttributes,
		} = props;

		return (
			<Fragment>
				<BlockEdit {...props} />
				<BlockControls>
					<ToolbarGroup>
						<LinkToolbar
							linkUrl={linkUrl}
							setLinkUrl={(url) =>
								setAttributes({ linkUrl: url })
							}
							linkTarget={linkTarget}
							setLinkTarget={(target) =>
								setAttributes({ linkTarget: target })
							}
							relAttribute={relAttribute}
							setRelAttribute={(rel) =>
								setAttributes({ relAttribute: rel })
							}
							linkDescription={linkDescription}
							setLinkDescription={(description) =>
								setAttributes({ linkDescription: description })
							}
						/>
					</ToolbarGroup>
				</BlockControls>
			</Fragment>
		);
	};
}, 'enhanceCoverBlock');

const extendCoverBlock = (settings, name, currentDeprecated) => {
	if (!isCoverBlock(name) || currentDeprecated !== null) {
		return settings;
	}

	const save = (props) => {
		const { attributes } = props;
		const { linkUrl, linkTarget, relAttribute, linkDescription } =
			attributes;

		// 元のブロックの `save` を取得
		const saveElement = settings.save(props);

		if (!saveElement || !linkUrl) {
			return saveElement;
		}

		const existingClassName = saveElement.props.className || '';
		const classNameWithLink = `${existingClassName} has-link`.trim();
		const existingStyle = saveElement.props.style || {};

		return (
			<div className={classNameWithLink} style={existingStyle}>
				{saveElement.props.children}
				<a
					href={linkUrl}
					{...(linkTarget ? { target: linkTarget } : {})}
					{...(relAttribute ? { rel: relAttribute } : {})}
					className="wp-block-cover-vk-link"
				>
					<span className="screen-reader-text">
						{linkDescription
							? linkDescription
							: __('Cover link', 'vk-blocks-pro')}
					</span>
				</a>
			</div>
		);
	};

	// 以前のバージョンの `save` を `deprecated` として登録
	const deprecated = [
		{
			attributes: {
				linkUrl: {
					type: 'string',
					default: '',
				},
				linkTarget: {
					type: 'string',
					default: '_self',
				},
				tagName: {
					type: 'string',
					default: 'div'
				},
			},

			save: (props) => {
				const { attributes } = props;
				const { linkUrl, linkTarget } =
					attributes;

				// 元のブロックの `save` を取得
				const saveElement = settings.save(props);

				if (!saveElement || !linkUrl) {
					return saveElement;
				}

				const existingClassName = saveElement.props.className || '';
				const classNameWithLink =
					`${existingClassName} ${linkUrl ? 'has-link' : ''}`.trim();
				const existingStyle = saveElement.props.style || {};
				const relAttribute =
					linkTarget === '_blank' ? 'noopener noreferrer' : 'noopener';

				return (
					<div className={classNameWithLink} style={existingStyle}>
						{saveElement.props.children}
						<a
							href={linkUrl}
							target={linkTarget}
							rel={relAttribute}
							aria-label={__('Cover link', 'vk-blocks-pro')}
							className="wp-block-cover-vk-link"
						></a>
					</div>
				);
			},
		},
	];

	return {
		...settings,
		attributes: {
			...settings.attributes,
			linkUrl: {
				type: 'string',
				default: '',
			},
			linkTarget: {
				type: 'string',
				default: '',
			},
			relAttribute: {
				type: 'string',
				default: '',
			},
			linkDescription: {
				type: 'string',
				default: '',
			},
		},
		edit: enhanceCoverBlock(settings.edit),
		save, // 修正した `save` を適用
		deprecated, // 修正した `deprecated` を適用
	};
};

addFilter(
	'blocks.registerBlockType',
	'custom/extend-cover-block',
	extendCoverBlock
);
