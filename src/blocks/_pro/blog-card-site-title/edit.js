/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	ToolbarGroup,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	useBlockProps,
	HeadingLevelDropdown,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import useRemoteUrlData from '../blog-card/api/use-rich-url-data';
import { isLargerThanWp63 } from '../blog-card/utils';

const HEADING_LEVELS = [0, 1, 2, 3, 4, 5, 6];

export default function BlogCardSiteTitleEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { level, textAlign, isLink, rel, linkTarget } = attributes;
	const { richData } = useRemoteUrlData(context['vk-blocks/blog-card-url']);
	const siteName = richData?.data.site_title ?? '';

	const TagName = level === 0 ? 'p' : `h${level}`;
	const blockProps = useBlockProps({
		className: classnames({
			[`has-text-align-${textAlign}`]: textAlign,
		}),
	});

	return (
		<>
			<BlockControls>
				{isLargerThanWp63() && (
					<ToolbarGroup>
						<HeadingLevelDropdown
							options={HEADING_LEVELS}
							value={level}
							onChange={(newLevel) =>
								setAttributes({ level: newLevel })
							}
						/>
					</ToolbarGroup>
				)}
				<AlignmentToolbar
					value={textAlign}
					onChange={(newAlign) =>
						setAttributes({ textAlign: newAlign })
					}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Link to home page', 'vk-blocks-pro')}
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
						href="#blog-card-site-title-pseudo-link"
						onClick={(event) => event.preventDefault()}
					>
						{siteName && siteName}
					</a>
				) : (
					siteName && siteName
				)}
			</TagName>
		</>
	);
}
