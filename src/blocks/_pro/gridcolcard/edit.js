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
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;

	// このブロックで直接使う「カラムの最小幅」と「ギャップ」
	const {
		colWidthMin,
		colWidthMinTablet,
		colWidthMinPC,
		gap,
		gapRow,
		blockId,
		old_1_31_0,
	} = attributes;

	// ブロック全体のアウタークラス名
	const containerClass = 'vk_gridcolcard';

	const { updateBlockAttributes } = dispatch('core/block-editor');

	useEffect(() => {
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}
		if (old_1_31_0 === undefined) {
			if (colWidthMinTablet === undefined) {
				setAttributes({ colWidthMinTablet: colWidthMin });
			}
			if (colWidthMinPC === undefined) {
				setAttributes({ colWidthMinPC: colWidthMin });
			}
			setAttributes({ old_1_31_0: true });
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
						borderWidth: attributes.borderWidth,
						textColor: attributes.textColor,
						backgroundColor: attributes.backgroundColor,
						backgroundGradient: attributes.backgroundGradient,
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
		className: `${containerClass} vk_gridcolcard-${blockId}`,
	});

	let blockGap = '';
	if (gapRow) {
		blockGap = gapRow + ' ' + gap;
	} else {
		blockGap = gap;
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Column Width Setting', 'vk-blocks-pro')}
					initialOpen={true}
				>
					<p>
						{__(
							'If you specify the minimum column size on a tablet or PC with %, it will be easier to align the number of columns in the upper and lower rows according to the screen size.',
							'vk-blocks-pro'
						)}
					</p>
					<UnitControl
						label={__('Column min width (Mobile)', 'vk-blocks-pro')}
						value={colWidthMin}
						onChange={(value) =>
							setAttributes({ colWidthMin: value })
						}
					/>
					<br />
					<UnitControl
						label={__(
							'Column min width (Tablet / Optional)',
							'vk-blocks-pro'
						)}
						value={colWidthMinTablet}
						onChange={(value) =>
							setAttributes({ colWidthMinTablet: value })
						}
					/>
					<br />
					<UnitControl
						label={__(
							'Column min width (PC / Optional)',
							'vk-blocks-pro'
						)}
						value={colWidthMinPC}
						onChange={(value) =>
							setAttributes({ colWidthMinPC: value })
						}
					/>
				</PanelBody>
				<PanelBody
					title={__('Column Gap Setting', 'vk-blocks-pro')}
					initialOpen={true}
				>
					<UnitControl
						label={__('Column gap size', 'vk-blocks-pro')}
						value={gap}
						onChange={(value) => setAttributes({ gap: value })}
					/>
					<br />
					<UnitControl
						label={__(
							'Column row-gap size (optional)',
							'vk-blocks-pro'
						)}
						value={gapRow}
						onChange={(value) => setAttributes({ gapRow: value })}
					/>
				</PanelBody>
				<PanelBody
					title={__('Specify all columns at once', 'vk-blocks-pro')}
					initialOpen={true}
				>
					<CommonItemControl {...props} />
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={MY_TEMPLATE}
					orientation="horizontal"
				/>
				<style>
					{`
					.vk_gridcolcard-${blockId} > .block-editor-inner-blocks > .block-editor-block-list__layout{
						grid-template-columns:repeat(auto-fit, minmax(${colWidthMin}, 1fr));
						gap:${blockGap};
					}
					@media (min-width: 576px) {
						.vk_gridcolcard-${blockId} > .block-editor-inner-blocks > .block-editor-block-list__layout{
							grid-template-columns:repeat(auto-fit, minmax(${colWidthMinTablet}, 1fr));
						}
					}
					@media (min-width: 992px) {
						.vk_gridcolcard-${blockId} > .block-editor-inner-blocks > .block-editor-block-list__layout{
							grid-template-columns:repeat(auto-fit, minmax(${colWidthMinPC}, 1fr));
						}
					}
					`}
				</style>
			</div>
		</>
	);
}
