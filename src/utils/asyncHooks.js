import { useSelect } from '@wordpress/data';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const AsyncGetInnerBlocks = (clientId) =>
	useSelect((select) => {
		const { getBlocks } = select('core/block-editor');
		//getBlocks(clientId)で、innerBlocksを取得
		return getBlocks(clientId);
	}, []);
