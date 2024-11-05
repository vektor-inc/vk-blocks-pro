/**
 * cover-style block type
 *
 * @package
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
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
			attributes: { linkUrl, linkTarget },
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
			default: '_self',
		},
	};

	return settings;
};

const insertLinkIntoCoverBlock = (element, blockType, attributes) => {
	if (blockType.name !== 'core/cover') {
		return element;
	}

	const { linkUrl, linkTarget } = attributes;

	if (!linkUrl) {
		return element;
	}

	// `element` から既存のクラスを取得し、リンクがある場合にのみ `has-link` を追加
	const existingClassName = element.props.className || '';
	const classNameWithLink = `${existingClassName} ${linkUrl ? 'has-link' : ''}`.trim();

	// rel 属性の設定
	const relAttribute =
		linkTarget === '_blank' ? 'noopener noreferrer' : 'noopener';

	return (
		<div className={classNameWithLink}>
			{element.props.children}
			<a
				href={linkUrl}
				target={linkTarget}
				rel={relAttribute}
				aria-label={__('Cover link', 'vk-blocks-pro')}
				className="wp-block-cover-vk-link"
			></a>
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
