const { useSelect } = wp.data;

export const asyncGetInnerBlocks = (clientId) =>
	useSelect((select) => {
		const { getBlocks } = select('core/block-editor');
		//getBlocks(clientId)で、innerBlocksを取得
		return getBlocks(clientId);
	}, []);
