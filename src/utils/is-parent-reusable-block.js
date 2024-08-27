import { select } from '@wordpress/data';

export const isParentReusableBlock = (clientId) => {
	const parentReusableBlock = select(
		'core/block-editor'
	).getBlockParentsByBlockName(clientId, ['core/block']);
	return parentReusableBlock.length ? true : false;
};
