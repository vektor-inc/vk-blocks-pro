/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, BaseControl } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import AdvancedViewportControl from '@vkblocks/components/advanced-viewport-control';
import AdvancedUnitControl from '@vkblocks/components/advanced-unit-control';
import AdvancedSpacerControl from './advanced-spacer-control';
import Spacers from './spacers';

export default function SpacerEdit({
	attributes,
	setAttributes,
	className,
	clientId,
	anchor
}) {
	const { spaceType, unit, pc, tablet, mobile } = attributes;

	const blockProps = useBlockProps({ className: classnames('vk_spacer'), id: anchor });

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<AdvancedSpacerControl
						attributes={attributes}
						setAttributes={setAttributes}
						className={className}
					/>
					<AdvancedUnitControl
						attributes={attributes}
						setAttributes={setAttributes}
						className={className}
					/>
					<BaseControl
						label={__('Height for each device.', 'vk-blocks')}
						id={`vk_spacer-viewPort-${clientId}`}
					>
						<AdvancedViewportControl
							attributes={attributes}
							setAttributes={setAttributes}
							className={className}
							initial={{ iPc: 40, iTablet: 30, iMobile: 20 }}
							id={`vk_spacer-viewPort-${clientId}`}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<Spacers
					type={spaceType}
					pcSize={pc}
					tabletSize={tablet}
					mobileSize={mobile}
					unit={unit}
				/>
			</div>
		</>
	);
}
