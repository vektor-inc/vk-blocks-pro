import { InnerBlocks } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';

export class DeprecatedComponent extends Component {
	render() {
		const for_ = this.props.for_;
		const attributes = this.props.attributes;
		let innerClass = '';
		let elm;
		const ALLOWED_BLOCKS = ['vk-blocks/card-item'];
		const TEMPLATE = [ALLOWED_BLOCKS];

		//編集画面とサイト上の切り替え
		if (for_ === 'edit') {
			innerClass = 'editting';
			innerClass = innerClass + ' vk_posts-edit';
			innerClass =
				innerClass +
				' vk_posts-edit-col-xs-' +
				convertToGrid(attributes.col_xs);
			innerClass =
				innerClass +
				' vk_posts-edit-col-sm-' +
				convertToGrid(attributes.col_sm);
			innerClass =
				innerClass +
				' vk_posts-edit-col-md-' +
				convertToGrid(attributes.col_md);
			innerClass =
				innerClass +
				' vk_posts-edit-col-lg-' +
				convertToGrid(attributes.col_lg);
			innerClass =
				innerClass +
				' vk_posts-edit-col-xl-' +
				convertToGrid(attributes.col_xl);

			elm = (
				<div className={innerClass}>
					<InnerBlocks
						template={TEMPLATE}
						allowedBlocks={ALLOWED_BLOCKS}
					/>
				</div>
			);
		} else if ('save') {
			elm = <InnerBlocks.Content />;
		}
		return <div className={'vk_posts'}>{elm}</div>;
	}
}
