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

const extendCoverBlock = (settings, name) => {
	if (!isCoverBlock(name)) {
		return settings;
	}

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
				default: '_self',
			},
		},
		edit: enhanceCoverBlock(settings.edit),
		save: (props) => {
			const { attributes } = props;
			const { linkUrl, linkTarget } = attributes;
			const saveElement = settings.save(props);

			if (!linkUrl) {
				return saveElement;
			}

			const existingClassName = saveElement.props.className || '';
			const classNameWithLink = `${existingClassName} ${linkUrl ? 'has-link' : ''}`.trim();
			const existingStyle = saveElement.props.style || {};
			const relAttribute = linkTarget === '_blank' ? 'noopener noreferrer' : 'noopener';

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
	};
};

addFilter(
	'blocks.registerBlockType',
	'custom/extend-cover-block',
	extendCoverBlock
);
