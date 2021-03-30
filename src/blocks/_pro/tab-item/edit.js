import { InspectorControls,InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
import {	
	PanelBody,
	BaseControl,
	TextControl,
} from '@wordpress/components';

export default function TabItemEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { tabLabel } = attributes;
	attributes.clientId = clientId;

	const { updateBlockAttributes } = dispatch('core/block-editor');

	useEffect(() => {
		if (clientId) {
			updateBlockAttributes(clientId, { clientId });
		}
	}, [clientId]);

	const blockProps = useBlockProps({
		className: `vk_tab_bodys_body`,
		id: `vk_tab_bodys_body-${clientId}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Tab item setting', 'vk-blocks')}>
					<BaseControl
						id="vkb-tabLabel"
						label="Tab label of this block"
					>
						<TextControl
							value={tabLabel}
							onChange={(value) =>
								setAttributes({ tabLabel: value })
							}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks />
			</div>
		</>
	);
}
