/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	ToggleControl,
	TextControl,
	ToolbarGroup,
	PanelBody,
} from '@wordpress/components';
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	useBlockProps,
	HeadingLevelDropdown,
} from '@wordpress/block-editor';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import useRemoteUrlData from '../blog-card/api/use-rich-url-data';
import { isLargerThanWp63 } from '../blog-card/utils';

export default function BlogCardTitleEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { level, textAlign, isLink, rel, linkTarget } = attributes;
	const { richData } = useRemoteUrlData(context['vk-blocks/blog-card-url']);
	const title = richData?.data.title;

	const TagName = level === 0 ? 'p' : `h${level}`;
	const blockProps = useBlockProps({
		className: classnames({
			[`has-text-align-${textAlign}`]: textAlign,
		}),
	});

	return (
		<>
			<BlockControls group="block">
				{isLargerThanWp63() && (
					<ToolbarGroup>
						<HeadingLevelDropdown
							value={level}
							onChange={(newLevel) =>
								setAttributes({ level: newLevel })
							}
						/>
					</ToolbarGroup>
				)}
				<AlignmentControl
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Link to URL', 'vk-blocks-pro')}
						onChange={() => setAttributes({ isLink: !isLink })}
						checked={isLink}
					/>
					{isLink && (
						<>
							<ToggleControl
								__nextHasNoMarginBottom
								label={__('Open in new tab')}
								onChange={(value) =>
									setAttributes({
										linkTarget: value ? '_blank' : '_self',
									})
								}
								checked={linkTarget === '_blank'}
							/>
							<TextControl
								__nextHasNoMarginBottom
								label={__('Link rel')}
								value={rel}
								onChange={(newRel) =>
									setAttributes({ rel: newRel })
								}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>
			<TagName {...blockProps}>
				{isLink ? (
					<a
						href="#blog-card-title-pseudo-link"
						onClick={(event) => event.preventDefault()}
					>
						{title && decodeEntities(title)}
					</a>
				) : (
					title && decodeEntities(title)
				)}
			</TagName>
		</>
	);
}
