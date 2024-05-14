/**
 * columns-style block type
 *
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, ToggleControl } from '@wordpress/components';
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
	let isReverse = false;

	return (props) => {
		if (isValidBlockType(props.name) && props.isSelected) {
			if (props.attributes.color) {
				isReverse = props.attributes.reverse;
			}

			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__('カラムの向き', 'vk-blocks-pro')}
							initialOpen={true}
							className="columns-row-reverse"
						>
							<ToggleControl
								label="Reverse"
								checked={ isReverse }
								onChange={(checked) =>
									props.setAttributes({ reverse: checked })
								}
            				/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		}
		return <BlockEdit {...props} />;
	};
}, 'addMyCustomBlockControls');

addFilter('editor.BlockEdit', 'vk-blocks/columns-style', addBlockControl);
