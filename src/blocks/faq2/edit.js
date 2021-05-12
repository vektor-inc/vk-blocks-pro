import {
	__experimentalUseInnerBlocksProps as useInnerBlocksProps, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function FAQ2Edit() {
	const blockProps = useBlockProps({
		className: 'vk_faq',
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: [['vk-blocks/faq2-q'], ['vk-blocks/faq2-a']],
		template: [['vk-blocks/faq2-q'], ['vk-blocks/faq2-a']],
		templateLock: 'all',
	});

	let massage;
	// eslint-disable-next-line no-undef
	if (vk_blocks_check.is_pro) {
		massage = __(
			'If you want to be collapsing this block, you can set it at Setting > VK Blocks',
			'vk-blocks'
		);
	} else {
		massage = __(
			'You can be collapsing this block at VK Blocks Pro',
			'vk-blocks'
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Accordion Setting', 'vk-blocks')}>
					<PanelRow>{massage}</PanelRow>
				</PanelBody>
			</InspectorControls>
			<dl {...innerBlocksProps} />
		</>
	);
}
