import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function FAQ2Edit() {
	const blockProps = useBlockProps( {
		className: 'vk_faq',
	} );

	const ALLOWED_BLOCKS = [ 'vk-blocks/faq2-q', 'vk-blocks/faq2-a' ];

	const TEMPLATE = [ [ 'vk-blocks/faq2-q' ], [ 'vk-blocks/faq2-a' ] ];

	let massage;
	// eslint-disable-next-line no-undef
	if ( vk_blocks_check.is_pro ) {
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
				<PanelBody title={ __( 'Accordion Setting', 'vk-blocks' ) }>
					<PanelRow>{ massage }</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="vk_faq-header"></div>
				<dl className="vk_faq-body">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock="all"
					/>
				</dl>
				<div className="vk_faq-footer"></div>
			</div>
		</>
	);
}
