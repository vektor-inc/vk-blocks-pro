import {
	RichText,
	InspectorControls,
	MediaUpload,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { RadioControl, PanelBody, Button } from '@wordpress/components';

export default function FlowEdit({ attributes, setAttributes, clientId }) {
	const { heading, content, insertImage, arrowFlag, insertImageAlt } =
		attributes;
	const blockProps = useBlockProps({
		className: `${arrowFlag} vk_flow`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Display of arrow', 'vk-blocks-pro')}>
					<RadioControl
						selected={arrowFlag}
						options={[
							{
								label: __('Arrow display', 'vk-blocks-pro'),
								value: 'vk_flow-arrow-on',
							},
							{
								label: __('Arrow hidden', 'vk-blocks-pro'),
								value: 'vk_flow-arrow-off',
							},
						]}
						onChange={(value) =>
							setAttributes({ arrowFlag: value })
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className={'vk_flow_frame'}>
					<dl className={'vk_flow_frame_text'}>
						<RichText
							key={`${clientId}2`}
							tagName="dt"
							className={'vk_flow_frame_text_title'}
							onChange={(value) =>
								setAttributes({ heading: value })
							}
							value={heading}
							placeholder={__('Input title', 'vk-blocks-pro')}
						/>
						<RichText
							key={`${clientId}3`}
							tagName="dd"
							className={'vk_flow_frame_text_content'}
							onChange={(value) =>
								setAttributes({ content: value })
							}
							value={content}
							placeholder={__('Input content', 'vk-blocks-pro')}
						/>
					</dl>
					<div className={'vk_flow_frame_image'}>
						<MediaUpload
							onSelect={(value) => {
								setAttributes({ insertImage: value.url });
								setAttributes({ insertImageAlt: value.alt });
							}}
							type="image"
							className={'vk_flow_frame_image'}
							value={insertImage}
							render={({ open }) => (
								<Button
									onClick={open}
									className={
										insertImage
											? 'image-button'
											: 'button button-large'
									}
								>
									{!insertImage ? (
										__('Select image', 'vk-blocks-pro')
									) : (
										<img
											className={'icon-image'}
											src={insertImage}
											alt={insertImageAlt}
										/>
									)}
								</Button>
							)}
						/>
					</div>
				</div>
				{arrowFlag === 'vk_flow-arrow-on' && (
					<div className={'vk_flow_frame_arrow'}></div>
				)}
			</div>
		</>
	);
}
