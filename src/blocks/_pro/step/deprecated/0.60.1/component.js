import { InnerBlocks } from '@wordpress/block-editor';
import React from 'react';

export class Component extends React.Component {
	render() {
		const for_ = this.props.for_;
		const className = this.props.className;
		const containerClass = ' vk_step';
		let elm;
		const ALLOWED_BLOCKS = ['vk-blocks/step-item'];
		const TEMPLATE = [ALLOWED_BLOCKS];

		//編集画面とサイト上の切り替え
		if (for_ === 'edit') {
			elm = (
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
				/>
			);
		} else if ('save') {
			elm = <InnerBlocks.Content />;
		}
		return <div className={className + containerClass}>{elm}</div>;
	}
}
