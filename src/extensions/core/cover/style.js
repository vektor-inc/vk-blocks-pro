import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { ToolbarGroup } from '@wordpress/components';
import {
	BlockControls,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import LinkToolbar from '@vkblocks/components/link-toolbar';
import { assign } from 'lodash';

const isValidBlockType = (name) => {
	const validBlockTypes = ['core/cover'];
	return validBlockTypes.includes(name);
};

export const addAttribute = (settings) => {
	if (isValidBlockType(settings.name)) {
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
		};
	}
	return settings;
};
addFilter('blocks.registerBlockType', 'vk-blocks/cover-style', addAttribute);

export const addBlockControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (isValidBlockType(props.name) && props.isSelected) {
			return (
				<>
					<BlockEdit {...props} />
					<BlockControls>
						<ToolbarGroup>
							<LinkToolbar
								linkUrl={props.attributes.linkUrl}
								setLinkUrl={(url) =>
									props.setAttributes({ linkUrl: url })
								}
								linkTarget={props.attributes.linkTarget}
								setLinkTarget={(target) =>
									props.setAttributes({ linkTarget: target })
								}
							/>
						</ToolbarGroup>
					</BlockControls>
				</>
			);
		}
		return <BlockEdit {...props} />;
	};
}, 'addMyCustomBlockControls');

addFilter('editor.BlockEdit', 'vk-blocks/cover-style', addBlockControl);

const save = (props) => {
	const { attributes } = props;
	const { linkUrl, linkTarget, url, dimRatio, minHeight, id } =
		attributes;

	const blockProps = useBlockProps.save({
		className: `is-light`,
		style: {
			minHeight,
		},
	});

	const relAttribute =
		linkTarget === '_blank' ? 'noopener noreferrer' : 'noopener';

	return (
		<div {...blockProps}>
			{linkUrl && (
				<a
					href={linkUrl}
					target={linkTarget}
					rel={relAttribute}
					aria-label={__('Cover link', 'vk-blocks-pro')}
					className="wp-block-cover-vk-link"
				></a>
			)}
			<span
				aria-hidden="true"
				className={`wp-block-cover__background has-background-dim-${dimRatio} has-black-background-color has-background-dim`}
			></span>
			{url && (
				<img
					className={`wp-block-cover__image-background wp-image-${id}`}
					alt=""
					src={url}
					data-object-fit="cover"
				/>
			)}
			<div className="wp-block-cover__inner-container">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

const overrideBlockSettings = (settings, name) => {
	if (name === 'core/cover') {
		const newSettings = assign({}, settings, {
			save,
		});
		if (!newSettings.attributes.linkUrl) {
			newSettings.attributes.linkUrl = {
				type: 'string',
				default: '',
			};
		}
		if (!newSettings.attributes.linkTarget) {
			newSettings.attributes.linkTarget = {
				type: 'string',
				default: '',
			};
		}
		return newSettings;
	}
	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'vk-blocks/cover-save',
	overrideBlockSettings
);
