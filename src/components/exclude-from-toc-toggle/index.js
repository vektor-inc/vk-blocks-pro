import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

export const ExcludeFromTocToggle = ({ attributes, setAttributes }) => (
	<InspectorControls>
		<PanelBody title={__('目次設定', 'vk-blocks-pro')}>
			<ToggleControl
				label={__('この見出しを目次に含めない', 'vk-blocks-pro')}
				checked={attributes.excludeFromToc}
				onChange={(value) => setAttributes({ excludeFromToc: value })}
			/>
		</PanelBody>
	</InspectorControls>
); 