/*globals vk_block_archve_list_post_type_params */
// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

export default function PostListEdit(props) {
	const { attributes, setAttributes, name } = props;
	const { hideGrandChild } = attributes;
	attributes.name = name;

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Ancestor Page List Setting', 'vk-blocks')}>
					<ToggleControl
						label={__('Dont\'t display under grand child pages', 'vk-blocks')}
						checked={hideGrandChild}
						onChange={(checked) =>
							setAttributes({ hideGrandChild: checked })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<ServerSideRender
					block="vk-blocks/ancestor-page-list"
					attributes={attributes}
				/>
			</div>
		</>
	);
}
