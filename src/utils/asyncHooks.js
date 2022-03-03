import { useSelect } from '@wordpress/data';

export const asyncGetInnerBlocks = ( clientId ) =>
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useSelect( ( select ) => {
		const { getBlocks } = select( 'core/block-editor' );
		//getBlocks(clientId)で、innerBlocksを取得
		return getBlocks( clientId );
	}, [] );
