/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	ButtonGroup,
	Button,
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
					<ButtonGroup className="mb-3">
						<Button
							isSmall
							isPrimary={spaceSize === 'xxs'}
							isSecondary={spaceSize !== 'xxs'}
							onClick={() => setAttributes({ spaceSize: 'xxs' })}
							style={{ padding: '0px 7px' }}
						>
							{__('XXS', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall
							isPrimary={spaceSize === 'xs'}
							isSecondary={spaceSize !== 'xs'}
							onClick={() => setAttributes({ spaceSize: 'xs' })}
							style={{ padding: '0px 7px' }}
						>
							{__('XS', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall
							isPrimary={spaceSize === 'small'}
							isSecondary={spaceSize !== 'small'}
							onClick={() =>
								setAttributes({ spaceSize: 'small' })
							}
							style={{ padding: '0px 7px' }}
						>
							{__('S', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall
							isPrimary={spaceSize === 'medium'}
							isSecondary={spaceSize !== 'medium'}
							onClick={() =>
								setAttributes({ spaceSize: 'medium' })
							}
							style={{ padding: '0px 7px' }}
						>
							{__('M', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall
							isPrimary={spaceSize === 'large'}
							isSecondary={spaceSize !== 'large'}
							onClick={() =>
								setAttributes({ spaceSize: 'large' })
							}
							style={{ padding: '0px 7px' }}
						>
							{__('L', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall
							isPrimary={spaceSize === 'xl'}
							isSecondary={spaceSize !== 'xl'}
							onClick={() => setAttributes({ spaceSize: 'xl' })}
							style={{ padding: '0px 7px' }}
						>
							{__('XL', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall
							isPrimary={spaceSize === 'xxl'}
							isSecondary={spaceSize !== 'xxl'}
							onClick={() => setAttributes({ spaceSize: 'xxl' })}
							style={{ padding: '0px 7px' }}
						>
							{__('XXL', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall
							isPrimary={spaceSize === 'custom'}
							isSecondary={spaceSize !== 'custom'}
							onClick={() =>
								setAttributes({ spaceSize: 'custom' })
							}
							style={{ padding: '0px 7px' }}
						>
							{__('Custom', 'vk-blocks-pro')}
						</Button>
					</ButtonGroup>
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
