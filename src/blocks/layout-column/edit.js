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

import { useMediaQuery } from '@wordpress/compose';
//import { useState } from 'react';
import { select, dispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

export default function LayoutColumnEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { totalWidth, breakPoint, blockId } = attributes;

	const { getBlocksByClientId } = select('core/block-editor');
	const { updateBlockAttributes } = dispatch('core/block-editor');
	const thisBlock = getBlocksByClientId(clientId);

	let displayWidth = totalWidth;
	let isGrid = true;

	// サイドバーがひらいているかどうか
	const isSidebarOpened = select('core/edit-post').isEditorSidebarOpened();

	// エディタ用のbreakpointは設定されたもの＋280px
	const editorBreakPoint = isSidebarOpened ? breakPoint + 280 : breakPoint;

	// コンテナブロックのクラス名
	let className = 'vk_layoutColumn';

	// エディタ用breakpointで min-widthにマッチするかどうか
	const matches = useMediaQuery('(min-width:' + editorBreakPoint + 'px)');

	// min-widthにマッチする場合は Grid(Flex)レイアウト
	if (matches) {
		className += ' vk_layoutColumn_grid';

		// それ以外は 通常のdisplay: block で幅100%
	} else {
		isGrid = false;
		displayWidth = '100%';
	}

	useEffect(() => {
		if (blockId === undefined) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	// 内包するLayoutItemの is_gridに状態を保存する。
	useEffect(() => {
		if (thisBlock && thisBlock[0] && thisBlock[0].innerBlocks) {
			const thisInnerBlocks = thisBlock[0].innerBlocks;
			thisInnerBlocks.forEach(function (thisInnerBlock) {
				updateBlockAttributes(thisInnerBlock.clientId, {
					is_grid: isGrid,
				});
			});
		}
	}, [isGrid]);

	// 内包するLayoutItemの個数を取得する。
	const innerBlockCount = useSelect(
		(s) => s('core/block-editor').getBlock(clientId).innerBlocks
	);

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
					renderAppender={() =>
						innerBlockCount.length < 3 && (
							<InnerBlocks.ButtonBlockAppender />
						)
					}
				/>
			</div>
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
