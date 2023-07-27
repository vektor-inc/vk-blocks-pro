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

export default function BlogCardFeaturedImageEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { isLink, rel, linkTarget } = attributes;
	const { richData } = useRemoteUrlData(context['vk-blocks/blog-card-url']);
	const featuredImage = richData?.data.featured_image;

	const blockProps = useBlockProps();
	const borderProps = useBorderProps(attributes);

	const imageStyles = {
		...borderProps.style,
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('URLへのリンクにする', 'vk-blocks-pro')}
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
				{featuredImage && (
					<img
						className={borderProps.className}
						src={featuredImage}
						alt=""
						style={imageStyles}
					/>
				)}
			</figure>
		</>
	);
}
