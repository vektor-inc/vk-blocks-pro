import { PanelBody, PanelRow } from '@wordpress/components';
import {
	RichText,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function FAQEdit({ attributes, setAttributes }) {
	let massage;
	// eslint-disable-next-line no-undef
	if (vk_blocks_check.is_pro) {
		massage = __(
			'If you want to be collapsing this block, you can set it at Setting > VK Blocks',
			'vk-blocks-pro'
		);
	} else {
		massage = __(
			'You can be collapsing this block at VK Blocks Pro',
			'vk-blocks-pro'
		);
	}
	const { heading, content } = attributes;
	const TEMPLATE = [['core/paragraph', { content }]];

	const blockProps = useBlockProps({
		className: `vk_faq [accordion_trigger_switch]`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Accordion Setting', 'vk-blocks-pro')}>
					<PanelRow>{massage}</PanelRow>
				</PanelBody>
			</InspectorControls>
			<dl {...blockProps}>
				<RichText
					tagName="dt"
					className={'vk_faq_title'}
					onChange={(value) => setAttributes({ heading: value })}
					value={heading}
					placeholder={__(
						'Please enter a question.',
						'vk-blocks-pro'
					)}
				/>
				<dd className={`vk_faq_content`}>
					<InnerBlocks template={TEMPLATE} />
				</dd>
			</dl>
		</>
	);
}
