import { createBlock, getBlockType } from '@wordpress/blocks';

/**
 * ブロック登録済みチェック
 * @param {string} blockName - チェックするブロックの名前
 * @return {boolean} - ブロックが登録されているかどうか
 */
const isRegisteredBlock = (blockName) => {
	return !!getBlockType(blockName);
};

/**
 * 汎用的なwrap-unwrapコンポーネント
 *
 * @param {string} blockName - ブロックの名前
 * @return {Object} transformsオブジェクト - ブロックの変換設定
 */
const createWrapUnwrapTransforms = (blockName) => {
	if (!blockName) {
		throw new Error(
			'blockName is required for createWrapUnwrapTransforms.'
		);
	}

	return {
		from: [
			{
				type: 'block',
				isMultiBlock: true,
				blocks: ['*'],
				__experimentalConvert(blocks) {
					if (!isRegisteredBlock(blockName)) {
						throw new Error(
							`Block "${blockName}" is not registered.`
						);
					}

					const groupInnerBlocks = blocks.map((block) =>
						createBlock(
							block.name,
							block.attributes,
							block.innerBlocks
						)
					);

					return createBlock(blockName, {}, groupInnerBlocks);
				},
			},
		],
		ungroup: (attributes, innerBlocks) => {
			if (!isRegisteredBlock(blockName)) {
				throw new Error(`Block "${blockName}" is not registered.`);
			}
			return innerBlocks;
		},
	};
};

export default createWrapUnwrapTransforms;
