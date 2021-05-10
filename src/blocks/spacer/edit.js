/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, BaseControl, ButtonGroup, Button } from '@wordpress/components';
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
	anchor,
}) {
	const { spaceType, unit, pc, tablet, mobile, settingType } = attributes;

	const blockProps = useBlockProps({
		className: classnames('vk_spacer'),
		id: anchor,
	});

	if (settingType === undefined) {
		setAttributes( {settingType: '_number'} );
	}

	const numberSetting = (settingType == '_number') ?
		(
		<Fragment>
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
		</Fragment>
	) : '';
	






	return (
		<>
			<InspectorControls>
			<PanelBody
					title={__('Spacer Setting', 'vk-blocks')}>
				<ButtonGroup className="mb-3">
					<Button
						isSmall
						isPrimary={settingType === 'vk_block-margin-sm'}
						isSecondary={settingType !== 'vk_block-margin-sm'}
						onClick={() =>
							setAttributes({ settingType: 'vk_block-margin-sm' })
						}
					>{__('Small', 'vk-blocks')}</Button>
					<Button
						isSmall
						isPrimary={settingType === 'vk_block-margin-mv'}
						isSecondary={settingType !== 'vk_block-margin-mv'}
						onClick={() =>
							setAttributes({ settingType: 'vk_block-margin-mv' })
						}
					>{__('Middle', 'vk-blocks')}</Button>
					<Button
						isSmall
						isPrimary={settingType === 'vk_block-margin-lg'}
						isSecondary={settingType !== 'vk_block-margin-lg'}
						onClick={() =>
							setAttributes({ settingType: 'vk_block-margin-lg' })
						}
					>{__('Large', 'vk-blocks')}</Button>
					<Button
						isSmall
						isPrimary={settingType === '_number'}
						isSecondary={settingType !== '_number'}
						onClick={() =>
							setAttributes({ settingType: '_number' })
						}
					>{__('Number', 'vk-blocks')}</Button>
				</ButtonGroup>
				{numberSetting}
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
