import { useSelect } from '@wordpress/data';
import { getAllHeadingBlocks } from './toc-utils';

// 現在のブロックを取得するカスタムフック
export const useCurrentBlocks = () => {
	return useSelect(
		(select) => select('core/block-editor').getBlocks(),
		[]
	);
};

// 指定された名前のブロックを取得するカスタムフック
export const useBlocksByName = (blockName) => {
	return useSelect(
		(select) => {
			const { getBlocks } = select('core/block-editor');
			return getBlocks().filter((block) => block.name === blockName);
		},
		[blockName]
	);
};

// 見出しブロックを再帰的に取得するカスタムフック
export const useAllHeadingBlocks = () => {
	return useSelect((select) => {
		const { getBlocks } = select('core/block-editor');
		return getAllHeadingBlocks(getBlocks());
	}, []);
};

// 設定の変更を監視するカスタムフック
export const useTocSettings = () => {
	return useSelect((select) => {
		const { getEntityRecord } = select('core');
		const settings = getEntityRecord('root', 'site');
		return (
			settings?.vk_blocks_options?.toc_heading_levels || [
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
			]
		);
	}, []);
}; 