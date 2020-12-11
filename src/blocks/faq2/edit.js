import { Fragment } from "@wordpress/element";
import { PanelBody, PanelRow } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const { InnerBlocks, InspectorControls } = vkbBlockEditor;

export default function edit( props ) {
	const { className } = props;

	let massage;
	if ( vk_blocks_check.is_pro ) {
		massage = __( 'If you want to be collapsing this block, you can set it at Setting > VK Blocks', 'vk-blocks' );
	} else {
		massage = __( 'You can be collapsing this block at VK Blocks Pro', 'vk-blocks' );
	}

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __('Accordion Setting', 'vk-blocks') }>
					<PanelRow>{ massage }</PanelRow>
				</PanelBody>
			</InspectorControls>
			<dl className={ classNames( className,"vk_faq" ) }>
				<InnerBlocks
					allowedBlocks={ [
						[ 'vk-blocks/faq2-q' ],
						[ 'vk-blocks/faq2-a' ],
					] }
					template={ [
						[ 'vk-blocks/faq2-q' ],
						[ 'vk-blocks/faq2-a' ],
					] }
					templateLock='all'
				/>
			</dl>
		</Fragment>

	);

  }
