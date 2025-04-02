/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import AdvancedViewportControl from '@vkblocks/components/advanced-viewport-control';
import AdvancedUnitControl from '@vkblocks/components/advanced-unit-control';
import AdvancedSpacerControl from './advanced-spacer-control';
import Spacers from './spacers';
import { useEffect } from '@wordpress/element';

export default function SpacerEdit({
	attributes,
	setAttributes,
	className,
	clientId,
	anchor,
}) {
	const { spaceType, unit, pc, tablet, mobile, spaceSize } = attributes;

	let containerClass = `vk_spacer`;
	if ('custom' !== spaceSize) {
		containerClass += ` vk_spacer-type-${spaceType}`;
	}

	useEffect(() => {
		if (spaceSize === undefined) {
			setAttributes({ spaceSize: 'custom' });
		}
	}, [clientId]);

	const blockProps = useBlockProps({
		className: containerClass,
		id: anchor,
	});

	const numberSetting =
		spaceSize === 'custom' ? (
			<>
				<AdvancedUnitControl
					attributes={attributes}
					setAttributes={setAttributes}
					className={className}
				/>
				<BaseControl
					label={__('Height for each device.', 'vk-blocks-pro')}
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
			</>
		) : (
			''
		);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Spacer Settings', 'vk-blocks-pro')}>
					<ToggleGroupControl
						value={spaceSize}
						onChange={(value) =>
							setAttributes({ spaceSize: value })
						}
						className="vk-spacer-size-control"
						isBlock
					>
						<ToggleGroupControlOption
							value="xxs"
							label={__('XXS', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="xs"
							label={__('XS', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="small"
							label={__('S', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="medium"
							label={__('M', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="large"
							label={__('L', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="xl"
							label={__('XL', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="xxl"
							label={__('XXL', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="custom"
							label={__('Custom', 'vk-blocks-pro')}
						/>
					</ToggleGroupControl>
					<style>
						{`
							.vk-spacer-size-control .components-toggle-group-control-option-base {
								padding: 0;
							}
						`}
					</style>
					<p>
						{__(
							'You can change each common margin size from Setting > VK Blocks',
							'vk-blocks-pro'
						)}
					</p>
					<AdvancedSpacerControl
						attributes={attributes}
						setAttributes={setAttributes}
						className={className}
					/>
					{numberSetting}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<Spacers
					spaceSize={spaceSize}
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
