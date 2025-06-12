import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export const ExcludeFromTocToggle = ({ attributes, setAttributes }) => {
	const hasTocBlock = useSelect((select) => {
		const blocks = select('core/block-editor').getBlocks();
		return blocks.some(
			(block) => block.name === 'vk-blocks/table-of-contents-new'
		);
	}, []);

	// h1の場合は表示しない
	if (!hasTocBlock || attributes.level === 1) {
		return null;
	}

	return (
		<InspectorControls>
			<PanelBody
				title={__('Table of Contents Settings', 'vk-blocks-pro')}
			>
				<ToggleControl
					label={__(
						'Exclude this heading from Table of Contents',
						'vk-blocks-pro'
					)}
					checked={attributes.excludeFromToc}
					onChange={(value) =>
						setAttributes({ excludeFromToc: value })
					}
					help={__(
						'This setting only affects the VK Table of Contents block.',
						'vk-blocks-pro'
					)}
				/>
			</PanelBody>
		</InspectorControls>
	);
};
