import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	RangeControl,
	// eslint-disable-next-line
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';

import { select } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

export default function LayoutColumnEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { totalWidth, breakPoint, blockId } = attributes;

	const displayWidth = totalWidth;

	// サイドバーがひらいているかどうか
	const isSidebarOpened = select('core/edit-post').isEditorSidebarOpened();

	// エディタ用のbreakpointは設定されたもの＋280px
	const editorBreakPoint = isSidebarOpened ? breakPoint + 280 : breakPoint;

	// コンテナブロックのクラス名
	const className = `vk_layoutColumn vk-layoutColumn-${clientId}`;

	useEffect(() => {
		if (blockId === undefined) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	const style = `@media (min-width: ${editorBreakPoint}px) {
		.vk-layoutColumn-${clientId} > .block-editor-inner-blocks > .block-editor-block-list__layout {
			flex-wrap: nowrap;
		}
	}
	@media (max-width: ${editorBreakPoint - 0.02}px) {
		.vk-layoutColumn-${clientId} > .block-editor-inner-blocks > .block-editor-block-list__layout {
			flex-wrap: wrap;
		}		
		.vk-layoutColumn-${clientId} .vk_layoutColumnItem {
			flex-basis:100% !important;
		}
	}
	`;

	const ALLOWED_BLOCKS = ['vk-blocks/layout-column-item'];
	const TEMPLATE = [
		['vk-blocks/layout-column-item', {}],
		['vk-blocks/layout-column-item', {}],
	];
	const blockProps = useBlockProps({
		className,
	});

	return (
		<>
			<div {...blockProps} style={{ width: displayWidth }}>
				<InnerBlocks
					template={TEMPLATE}
					allowedBlocks={ALLOWED_BLOCKS}
				/>
			</div>
			<style>{style}</style>
			<InspectorControls>
				<PanelBody title={__('Layout Column Setting', 'vk-blocks')}>
					<UnitControl
						onChange={(value) =>
							setAttributes({ totalWidth: value })
						}
						label={__('Block width', 'vk-blocks')}
						value={totalWidth}
					/>
					<div style={{ marginTop: '10px' }}>
						<RangeControl
							value={breakPoint}
							onChange={(value) =>
								setAttributes({
									breakPoint: value,
								})
							}
							min={0}
							max={2000}
							allowReset={true}
							resetFallbackValue={900}
							label={__('BreakPoint(px)', 'vk-blocks')}
						/>
					</div>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
