/**
 * columns-style block type
 *
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';

const isValidBlockType = (name) => {
	const validBlockTypes = ['core/columns'];
	return validBlockTypes.includes(name);
};

export const addAttribute = (settings) => {
	if (isValidBlockType(settings.name)) {
		settings.attributes = {
			...settings.attributes,
			reverse: {
				type: 'boolean',
			},
		};
	}
	return settings;
};
addFilter('blocks.registerBlockType', 'vk-blocks/columns-style', addAttribute);

export const addBlockControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (isValidBlockType(props.name) && props.isSelected) {
			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__('カラムの向き', 'vk-blocks-pro')}
							initialOpen={false}
							className="columns-row-reverse"
						></PanelBody>
					</InspectorControls>
				</>
			);
		}
		return <BlockEdit {...props} />;
	};
}, 'addMyCustomBlockControls');

addFilter('editor.BlockEdit', 'vk-blocks/columns-style', addBlockControl);
