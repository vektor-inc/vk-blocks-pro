/* eslint-disable */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	ButtonGroup,
	Button,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';

import classnames from 'classnames';

export default function LayoutColumnItemEdit(props) {
	const { attributes, setAttributes } = props;
	const { layoutType, customMinWidth } = attributes;

	const classes = classnames(`vk_layoutColumnItem`, {
		[`vk_layoutColumnItem-layout-${layoutType}`]:
			'custom' !== layoutType && undefined !== layoutType,
	});

	const cStyle =
		layoutType === 'custom' && customMinWidth
			? { flexBasis: customMinWidth }
			: {};

	const blockProps = useBlockProps({
		className: classes,
		style: cStyle,
	});

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks />
			</div>
			<InspectorControls>
				<PanelBody title={__('レイアウト属性', 'vk-blocks')}>
					<ButtonGroup className="mb-3">
						<Button
							isSmall
							isPrimary={layoutType === 'main'}
							isSecondary={layoutType !== 'main'}
							onClick={() =>
								setAttributes({ layoutType: 'main' })
							}
						>
							{__('メイン', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={layoutType === 'sub'}
							isSecondary={layoutType !== 'sub'}
							onClick={() => setAttributes({ layoutType: 'sub' })}
						>
							{__('サイドバー', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={layoutType === 'custom'}
							isSecondary={layoutType !== 'custom'}
							onClick={() =>
								setAttributes({ layoutType: 'custom' })
							}
						>
							{__('カスタム', 'vk-blocks')}
						</Button>
						{layoutType === 'custom' && (
							<UnitControl
								className={blockProps.className + '-boxcontrol'}
								value={customMinWidth}
								label={__('最小幅')}
								onChange={(nextValues) =>
									setAttributes({
										customMinWidth: nextValues,
									})
								}
							/>
						)}
					</ButtonGroup>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
