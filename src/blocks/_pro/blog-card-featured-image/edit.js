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
import DimensionControls from './dimension-controls';

export default function BlogCardFeaturedImageEdit(props) {
	const { attributes, setAttributes, context, clientId } = props;
	const { isLink, aspectRatio, height, width, scale, rel, linkTarget } =
		attributes;
	const { richData } = useRemoteUrlData(context['vk-blocks/blog-card-url']);
	const featuredImage = richData?.data.featured_image;

	const blockProps = useBlockProps({
		style: { width, height, aspectRatio },
	});
	const borderProps = useBorderProps(attributes);

	const imageStyles = {
		...borderProps.style,
		height: aspectRatio ? '100%' : height,
		width: !!aspectRatio && '100%',
		objectFit: !!(height || aspectRatio) && scale,
	};

	return (
		<>
			<DimensionControls
				clientId={clientId}
				attributes={attributes}
				setAttributes={setAttributes}
			/>
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
