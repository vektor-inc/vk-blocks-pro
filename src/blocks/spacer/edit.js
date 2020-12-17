import { __ } from '@wordpress/i18n';
import { PanelBody, BaseControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import AdvancedViewportControl from '@vkblocks/components/advanced-viewport-control';
import AdvancedUnitControl from '@vkblocks/components/advanced-unit-control';

import { SpacerComponent } from './component';
import AdvancedSpacerControl from './advanced-spacer-control';

export default function SpacerEdit(attributes, className, clientId) {
	return (
		<>
			<InspectorControls>
				<PanelBody>
					<AdvancedSpacerControl
						attributes={attributes}
						className={className}
					/>
					<AdvancedUnitControl
						attributes={attributes}
						className={className}
					/>
					<BaseControl
						label={__('Height for each device.', 'vk-blocks')}
						id={`vk_spacer-viewPort-${clientId}`}
					>
						<AdvancedViewportControl
							attributes={attributes}
							className={className}
							initial={{ iPc: 40, iTablet: 30, iMobile: 20 }}
							id={`vk_spacer-viewPort-${clientId}`}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<SpacerComponent attributes={attributes} className={className} />
		</>
	);
}
