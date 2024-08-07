/**
 * core-style block type
 *
 * @package
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import LinkToolbar from '@vkblocks/components/link-toolbar';

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
	if (!isCoverBlock(blockType.name)) {
		return element;
	}

	const { linkUrl, linkTarget } = attributes;

	if (!linkUrl) {
		return element;
	}

	// アンカータグにスクリーンリーダー向けのラベルを追加
	return (
		<div {...element.props}>
			<a
				href={linkUrl}
				target={linkTarget}
				rel={linkTarget === '_blank' ? 'noopener noreferrer' : ''}
				className="wp-block-cover-vk-link"
			>
				<span className="screen-reader-text">Cover link</span>
			</a>
			{element.props.children}
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
