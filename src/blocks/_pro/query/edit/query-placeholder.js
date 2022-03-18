/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import {
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';
import BlockVariationPicker from './block-variation-picker';
import { getMatchingVariation } from '../utils';

//queryブロックを配置した時の初期画面を作る
// variations.jsで設定した値を取得
const QueryPlaceholder = ({ clientId, name, attributes, setAttributes }) => {
	const { blockType, defaultVariation, scopeVariations, allVariations } =
		useSelect(
			(select) => {
				const {
					getBlockVariations,
					getBlockType,
					getDefaultBlockVariation,
				} = select(blocksStore);

				return {
					blockType: getBlockType(name),
					defaultVariation: getDefaultBlockVariation(name, 'block'),
					scopeVariations: getBlockVariations(name, 'block'),
					allVariations: getBlockVariations(name),
				};
			},
			[name]
		);
	/**
	 * useDispatchはblockEditorStoreが変更されない限りreplaceInnerBlocksは更新されない
	 * blockEditorStoreの値をそのまま取得出来る？
	 * https://qiita.com/Ouvill/items/569384e5c8c7ce78f98e
	 */
	const { replaceInnerBlocks } = useDispatch(blockEditorStore);
	const blockProps = useBlockProps();
	const matchingVariation = getMatchingVariation(attributes, allVariations);
	const icon = matchingVariation?.icon || blockType?.icon?.src;
	const label = matchingVariation?.title || blockType?.title;
	return (
		<div {...blockProps}>
			<BlockVariationPicker
				icon={icon}
				label={label}
				variations={scopeVariations}
				onSelect={(nextVariation = defaultVariation) => {
					if (nextVariation.attributes) {
						setAttributes(nextVariation.attributes);
					}
					if (nextVariation.innerBlocks) {
						replaceInnerBlocks(
							clientId,
							createBlocksFromInnerBlocksTemplate(
								nextVariation.innerBlocks
							),
							false
						);
					}
				}}
			/>
		</div>
	);
};

export default QueryPlaceholder;
