import { InnerBlocks } from '@wordpress/block-editor';

export const ColumnResponsive0574 = (props) => {
	const for_ = props.for_;
	const containerClass = ' vk_grid-column';
	let elm;

	const ALLOWED_BLOCKS = [['vk-blocks/grid-column-item']];
	const TEMPLATE = ALLOWED_BLOCKS;

	//編集画面とサイト上の切り替え
	if (for_ === 'edit') {
		elm = (
			<div className={`${containerClass}`}>
				<InnerBlocks
					//編集画面の追加タグ用に2回目のClassを挿入
					template={TEMPLATE}
					allowedBlocks={ALLOWED_BLOCKS}
				/>
			</div>
		);
	} else if ('save') {
		elm = (
			<div className={'row'}>
				<InnerBlocks.Content />
			</div>
		);
	}
	return elm;
};
