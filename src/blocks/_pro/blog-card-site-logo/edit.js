/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl, PanelBody, TextControl } from '@wordpress/components';
import {
	InspectorControls,
	useBlockProps,
	__experimentalUseBorderProps as useBorderProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import useRemoteUrlData from '../blog-card/api/use-rich-url-data';

export default function BlogCardSiteLogoEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { isLink, rel, linkTarget } = attributes;

	const blockProps = useBlockProps();
	const borderProps = useBorderProps(attributes);
	const { richData } = useRemoteUrlData(context['vk-blocks/blog-card-url']);
	const favicon = richData?.data.site_logo ?? '';

	const imageStyles = {
		...borderProps.style,
	};

	return (
		<>
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
			<figure {...blockProps}>
				{favicon && (
					<img
						className={borderProps.className}
						src={favicon}
						alt=""
						style={imageStyles}
					/>
				)}
			</figure>
		</>
	);
}
