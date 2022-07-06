import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	ButtonGroup,
	Button,
	// eslint-disable-next-line
	__experimentalUnitControl as UnitControl,
	//__experimentalBoxControl as BoxControl
} from '@wordpress/components';

import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';

import classnames from 'classnames';

export default function LayoutColumnEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { marginType, customMargin } = attributes;

	// コンテナブロックのクラス名
	const classes = classnames(`vk_layoutColumn vk_layoutColumn-${clientId}`);

	const ALLOWED_BLOCKS = ['vk-blocks/layout-column-item'];
	const TEMPLATE = [
		['vk-blocks/layout-column-item', {}],
		['vk-blocks/layout-column-item', {}],
	];
	const blockProps = useBlockProps({
		className: classes,
	});

	const style =
		'custom' === marginType && !!customMargin
			? `
		.editor-styles-wrapper .vk_layoutColumn-${clientId} > .block-editor-inner-blocks > .block-editor-block-list__layout {
			gap: ${customMargin};
		}
	`
			: '';

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks
					template={TEMPLATE}
					allowedBlocks={ALLOWED_BLOCKS}
				/>
			</div>
			<style>{style}</style>
			<InspectorControls>
				<PanelBody title={__('カラム間余白設定', 'vk-blocks')}>
					<ButtonGroup className="mb-3">
						<Button
							isSmall
							isPrimary={marginType === 'site-setting'}
							isSecondary={marginType !== 'site-setting'}
							onClick={() =>
								setAttributes({ marginType: 'site-setting' })
							}
						>
							{__('サイトレイアウト余白', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={marginType === 'custom'}
							isSecondary={marginType !== ''}
							onClick={() =>
								setAttributes({ marginType: 'custom' })
							}
						>
							{__('カスタム', 'vk-blocks')}
						</Button>
					</ButtonGroup>
					{marginType === 'custom' && (
						<UnitControl
							value={customMargin}
							label={__('カスタム余白サイズ')}
							onChange={(nextValues) =>
								setAttributes({ customMargin: nextValues })
							}
						/>
					)}
					<p>
						{__(
							'※ サイトレイアウト余白は「レイアウトカラム共通設定」より指定できます。この値はサイト内共通です。',
							'vk-blocks'
						)}
					</p>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
