import { Fragment } from '@wordpress/element';
import { PanelBody, PanelRow } from '@wordpress/components';
import { RichText, InnerBlocks, InspectorControls } from '@wordpress/block-editor';

export default function edit({ attributes, setAttributes, className }) {
	let massage;
	if ( vk_blocks_check.is_pro ) {
		massage = __( 'If you want to be collapsing this block, you can set it at Setting > VK Blocks', 'vk-blocks' );
	} else {
		massage = __( 'You can be collapsing this block at VK Blocks Pro', 'vk-blocks' );
	}
	const { heading, content } = attributes;
	const TEMPLATE = [
		[ 'core/paragraph', { content } ],
	];

	const blockProps = useBlockProps( {
		className: `vk_faq`,
	} );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __('Accordion Setting', 'vk-blocks') }>
					<PanelRow>{ massage }</PanelRow>
				</PanelBody>
			</InspectorControls>
			<dl className={ ...blockProps }>
				<RichText
					tagName="dt"
					className={ "vk_faq_title" }
					onChange={ value => setAttributes({ heading: value }) }
					value={ heading }
					placeholder={ __("Please enter a question.", "vk-blocks") }
				/>
				<dd className={ `vk_faq_content` }>
					<InnerBlocks
						template={ TEMPLATE }
					/>
				</dd>
			</dl>
		</Fragment>
	);
}
