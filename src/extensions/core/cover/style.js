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

const isCoverBlock = (name) => name === 'core/cover';

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

const addLinkAttributesToCoverBlock = (settings, name) => {
	if (!isCoverBlock(name)) {
		return settings;
	}

	settings.attributes = {
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
	};

	return settings;
};

const insertLinkIntoCoverBlock = (element, blockType, attributes) => {
	if (blockType.name !== 'core/cover') {
		return element;
	}

	const { linkUrl, linkTarget, relAttribute, linkDescription } = attributes;

	if (!linkUrl) {
		return element;
	}

	// `element` から既存のクラスを取得し、リンクがある場合にのみ `has-link` を追加
	const existingClassName = element.props.className || '';
	const classNameWithLink =
		`${existingClassName} ${linkUrl ? 'has-link' : ''}`.trim();
	const existingStyle = element.props.style || {};

	// rel 属性の設定

	return (
		<div className={classNameWithLink} style={existingStyle}>
			{element.props.children}
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

addFilter('editor.BlockEdit', 'custom/enhance-cover-block', enhanceCoverBlock);
addFilter(
	'blocks.registerBlockType',
	'custom/add-link-attributes',
	addLinkAttributesToCoverBlock
);
addFilter(
	'blocks.getSaveElement',
	'custom/insert-link-into-cover-block',
	insertLinkIntoCoverBlock
);
