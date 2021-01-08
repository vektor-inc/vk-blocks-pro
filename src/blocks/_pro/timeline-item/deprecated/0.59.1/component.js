import { InnerBlocks } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';

export class TimlineItem extends Component {
	render() {
		const { label, color, style, styleLine } = this.props.attributes;
		const for_ = this.props.for_;
		const className = this.props.className;
		const containerClass = ' vk_timeline_item';
		let elm;
		let styleClass;
		let styleLineClass;
		let inlineStyle;
		const TEMPLATE = [['core/heading', { level: 4 }]];

		//編集画面とサイト上の切り替え
		if (for_ === 'edit') {
			elm = <InnerBlocks template={TEMPLATE} />;
		} else if ('save') {
			elm = <InnerBlocks.Content />;
		}

		if (style === 'solid') {
			styleClass = ' vk_timeline_item_style-default';
			inlineStyle = { backgroundColor: `${color}` };
		} else if (style === 'outlined') {
			styleClass = ' vk_timeline_item_style-outlined';
			inlineStyle = { border: `3px solid ${color}` };
		}

		if (styleLine === 'default') {
			styleLineClass = ' vk_timeline_item_lineStyle-default';
		} else if (styleLine === 'none') {
			styleLineClass = ' vk_timeline_item_lineStyle-none';
		}

		return (
			<div className={className + containerClass + styleLineClass}>
				<div className={'vk_timeline_item_caption'}>{label}</div>
				<div className={'vk_timeline_item_contentnpm'}>{elm}</div>
				<div
					className={'vk_timeline_item_style' + styleClass}
					style={inlineStyle}
				/>
			</div>
		);
	}
}
