import { __ } from '@wordpress/i18n';
import { PanelBody, TextareaControl } from '@wordpress/components';
import {
	InspectorControls,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';

export default function GoogleMapEdit({ attributes, setAttributes }) {
	const { iframeCode } = attributes;

	const blockProps = useBlockProps({
		className: 'vk-visual-embed',
	});

	return (
		<div {...blockProps}>
			<BlockControls></BlockControls>
			<InspectorControls>
				<PanelBody title={__('Google Map Embed Code', 'vk-blocks-pro')}>
					<TextareaControl
						label={__('Embed Code', 'vk-blocks-pro')}
						value={iframeCode}
						onChange={(newCode) =>
							setAttributes({ iframeCode: newCode })
						}
						help={__(
							'Please paste the iframe embed code directly. (e.g., Google Maps)',
							'vk-blocks-pro'
						)}
					/>
				</PanelBody>
			</InspectorControls>
			<div style={{ position: 'relative' }}>
				{iframeCode && (
					<div
						className="vk-visual-embed-preview"
						dangerouslySetInnerHTML={{ __html: iframeCode }}
						style={{ pointerEvents: 'none' }}
					/>
				)}
			</div>
		</div>
	);
}
