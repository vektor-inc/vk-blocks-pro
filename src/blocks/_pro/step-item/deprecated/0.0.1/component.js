import { InnerBlocks } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';

export class StepItem extends Component {
	render() {
		const {
			label,
			color,
			style,
			styleLine,
			dotCaption,
			dotNum,
			faIcon,
		} = this.props.attributes;
		const for_ = this.props.for_;
		const className = this.props.className;
		const containerClass = ' vk_step_item';
		let elm;
		let styleClass;
		let inlineStyle;
		let styleLineClass;
		const TEMPLATE = [['core/heading', { level: 4 }]];

		//編集画面とサイト上の切り替え
		if (for_ === 'edit') {
			elm = <InnerBlocks template={TEMPLATE} />;
		} else if ('save') {
			elm = <InnerBlocks.Content />;
		}

		if (style === 'solid') {
			styleClass = ' vk_step_item_style-default';
			inlineStyle = { backgroundColor: `${color}`, color: '#ffffff' };
		} else if (style === 'outlined') {
			styleClass = ' vk_step_item_style-outlined';
			inlineStyle = { border: `2px solid ${color}`, color: `${color}` };
		}

		if (styleLine === 'default') {
			styleLineClass = ' vk_step_item_lineStyle-default';
		} else if (styleLine === 'none') {
			styleLineClass = ' vk_step_item_lineStyle-none';
		}

		return (
			<div className={className + containerClass + styleLineClass}>
				<div className={'vk_step_item_caption'}>{label}</div>
				<div className={'vk_step_item_content'}>{elm}</div>
				<div
					className={'vk_step_item_dot' + styleClass}
					style={inlineStyle}
				>
					<div className={'vk_step_item_dot_caption'}>
						{dotCaption}
					</div>
					{(() => {
						if (faIcon) {
							return <i className={faIcon} />;
						} else if (dotNum) {
							return (
								<div className={'vk_step_item_dot_num'}>
									{dotNum}
								</div>
							);
						}
					})()}
				</div>
			</div>
		);
	}
}
