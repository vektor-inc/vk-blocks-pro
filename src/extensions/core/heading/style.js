import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';

const addExcludeFromTOCAttribute = (settings, name) => {
	if (name === 'core/heading') {
		settings.attributes = {
			...settings.attributes,
			excludeFromTOC: {
				type: 'boolean',
				default: false,
			},
		};
	}
	return settings;
};
addFilter(
	'blocks.registerBlockType',
	'vk-blocks/heading-exclude-toc',
	addExcludeFromTOCAttribute
);

const withExcludeFromTOCControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { attributes, setAttributes, name } = props;
		const { excludeFromTOC } = attributes;

		if (name !== 'core/heading') {
			return <BlockEdit {...props} />;
		}

		// Check if 'table-of-contents-new' block is present
		const hasTOCBlock = useSelect((select) => {
			const { getBlocks } = select('core/block-editor');
			return getBlocks().some(
				(block) => block.name === 'vk-blocks/table-of-contents-new'
			);
		}, []);

		// Only show the toggle if the TOC block is present
		if (!hasTOCBlock) {
			return <BlockEdit {...props} />;
		}

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title="Table of Contents">
						<ToggleControl
							label="Exclude from VK Blocks Table of Contents"
							checked={excludeFromTOC}
							onChange={(value) =>
								setAttributes({ excludeFromTOC: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withExcludeFromTOCControl');
addFilter(
	'editor.BlockEdit',
	'vk-blocks/heading-exclude-toc-control',
	withExcludeFromTOCControl
);
