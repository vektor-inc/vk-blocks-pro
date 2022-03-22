import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalUnitControl as UnitControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';
import CommonItemControl from './edit-common.js';

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;

	// このブロックで直接使う「カラムの最小幅」と「ギャップ」
	const { colWidthMin, gap, gapRow } = attributes;

	// ブロック全体のアウタークラス名
	const containerClass = 'vk_gridcolcard';

	const { updateBlockAttributes } = dispatch('core/block-editor');

	useEffect(() => {
		if (clientId) {
			updateBlockAttributes(clientId, { clientId });
		}
	}, [clientId]);

	// このブロックの情報を取得するメソッドを取得
	const { getBlocksByClientId } = select('core/block-editor');

	// このブロックの情報を取得
	const thisBlock = getBlocksByClientId(clientId);

	useEffect(() => {
		if (thisBlock && thisBlock[0] && thisBlock[0].innerBlocks) {
			// インナーブロックの情報を取得
			const thisInnerBlocks = thisBlock[0].innerBlocks;

			// インナーブロックをループ
			thisInnerBlocks.forEach(function (thisInnerBlock) {
				// 編集ロックがかかっていないものだけ上書きする
				if (thisInnerBlock.attributes.editLock === false) {
					// 子ブロックのattributeをアップデート
					updateBlockAttributes(thisInnerBlock.clientId, {
						// 子ブロックの編集モードを変更
						// selfになってないと親を書き換えに帰ってくるので無限ループになる
						editMode: 'self',

						containerSpace: attributes.containerSpace,
						headerImageAspectRatio:
							attributes.headerImageAspectRatio,
						headerImageFit: attributes.headerImageFit,
						headerDisplay: attributes.headerDisplay,
						footerDisplay: attributes.footerDisplay,
						borderRadius: attributes.borderRadius,
						border: attributes.border,
						borderColor: attributes.borderColor,
						textColor: attributes.textColor,
						backgroundColor: attributes.backgroundColor,
					});
				}
			});
		}
	}, [thisBlock, attributes]);

	// 初期配置のブロック
	const MY_TEMPLATE = [
		['vk-blocks/gridcolcard-item'],
		['vk-blocks/gridcolcard-item'],
	];
	// 配置可能なブロック
	const ALLOWED_BLOCKS = ['vk-blocks/gridcolcard-item'];

	// 編集画面側は grid 指定は .block-editor-block-list__layout に対して付与するので、
	// blockProps には付与しなくて良い
	const blockProps = useBlockProps({
		className: `${containerClass} block-${clientId}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Column Setting', 'vk-blocks')}
					initialOpen={true}
				>
					<UnitControl
						label={__('Column min width', 'vk-blocks')}
						value={colWidthMin}
						onChange={(value) =>
							setAttributes({ colWidthMin: value })
						}
					/>
					<br />
					<UnitControl
						label={__('Column gap size', 'vk-blocks')}
						value={gap}
						onChange={(value) => setAttributes({ gap: value })}
					/>
					<br />
					<UnitControl
						label={__(
							'Column row-gap size (optional)',
							'vk-blocks'
						)}
						value={gapRow}
						onChange={(value) => setAttributes({ gapRow: value })}
					/>
				</PanelBody>
				<PanelBody
					title={__('Specify all columns at once', 'vk-blocks')}
					initialOpen={true}
				>
					<CommonItemControl {...props} />
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<style>
					{`
					.block-${clientId} > .block-editor-inner-blocks > .block-editor-block-list__layout{
					grid-template-columns:repeat(auto-fit, minmax(${colWidthMin}, 1fr));
					gap:`}
					{(() => {
						if (gapRow) {
							return gapRow + ' ' + gap;
						}
						return gap;
					})()}
					{`;}`}
				</style>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={MY_TEMPLATE}
					orientation="horizontal"
				/>
			</div>
		</>
	);
}
