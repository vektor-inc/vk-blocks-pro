import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	JustifyContentControl,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalUnitControl as UnitControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';

export default function ButtonOuterEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { buttonsJustify, gap } = attributes;

	// インナーブロックに gap を反映
	// このブロックの情報を取得するメソッドを取得
	const { updateBlockAttributes } = dispatch('core/block-editor');
	const { getBlocksByClientId } = select('core/block-editor');

	// このブロックの情報を取得
	const thisBlock = getBlocksByClientId(clientId);

	useEffect(() => {
		if (thisBlock && thisBlock[0] && thisBlock[0].innerBlocks) {
			// インナーブロックの情報を取得
			const thisInnerBlocks = thisBlock[0].innerBlocks;

			// インナーブロックをループ
			thisInnerBlocks.forEach(function (thisInnerBlock) {
				// 子ブロックのattributeをアップデート
				updateBlockAttributes(thisInnerBlock.clientId, {
					outerGap: gap,
				});
			});
		}
	}, [thisBlock, attributes]);

	// blocksProps を予め定義
	const blockProps = useBlockProps({
		className: `vk_buttons`,
	});

	const ALLOWED_BLOCKS = ['vk-blocks/button'];

	const TEMPLATE = [['vk-blocks/button'], ['vk-blocks/button']];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Button Common Setting', 'vk-blocks-pro')}
					initialOpen={true}
				>
					<UnitControl
						label={__('Button gap size', 'vk-blocks-pro')}
						value={gap}
						onChange={(value) =>
							setAttributes({ gap: value ? value : null })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls group="block">
				<JustifyContentControl
					allowedControls={[
						'left',
						'center',
						'right',
						'space-between',
					]}
					value={buttonsJustify}
					onChange={(value) =>
						setAttributes({ buttonsJustify: value })
					}
					popoverProps={{
						position: 'bottom right',
						variant: 'toolbar',
					}}
				/>
			</BlockControls>
			<div {...blockProps}>
				<div
					className={`vk_buttons_col vk_buttons_col-justify-${buttonsJustify}  vk_buttonouter-${clientId}`}
				>
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
						templateLock={false}
						orientation="horizontal"
					/>
					<style>
						{`
						.vk_buttonouter-${clientId} > .block-editor-inner-blocks > .block-editor-block-list__layout{
							gap:${gap};
						}
						`}
					</style>
				</div>
			</div>
		</>
	);
}
