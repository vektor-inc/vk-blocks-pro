const { RadioControl, TextControl } = wp.components;
const { Component,Fragment } = wp.element;
const { __ } = wp.i18n;
import AdvancedPopOverControl from "./../../components/advanced-popover-control"

export const faSchema = {
	faIcon: {
		type: 'string',
		default: '',
	},
};

export class FontAwesome extends Component {

	render() {
		const { faIcon } = this.props.attributes;
		const setAttributes = this.props.setAttributes;

		const render = (
			<Fragment>
				<label className={"components-base-control__label"}>{__('Icon Background:', 'vk-blocks')}</label>
				<RadioControl
					selected={faIcon}
					options={[
						{ label:<i className="fas fa-arrow-circle-right fa-lg"></i>, value: '<i class="fas fa-arrow-circle-right fa-lg">' },
						{ label:<i className="fas fa-address-book fa-lg"></i>, value: '<i class="fas fa-address-book fa-lg"></i>' },
						{ label:<i className="fas fa-address-book fa-lg"></i>, value: '<i class="fas fa-address-book fa-lg"></i>' }
					]}
					onChange={(value) => setAttributes({ faIcon: value })}
				/>
				<hr></hr>
				<p className="mt-1">{ __('If you want to use an icon other than the ones listed above, you can use any of the icons from Font Awesome\'s icon list Please select a tag and enter it.', 'vk-blocks') }<br />
					{ __('Ex) <i class="fas fa-arrow-circle-right"></i>', 'vk-blocks') }<br />
					<a href={ `https://fontawesome.com/icons?d=gallery&m=free` }
						target={ `_blank` }>{ __('Font Awesome icon list', 'vk-blocks') }</a></p>
			</Fragment>
		);

		return (
			<Fragment>
				<TextControl
					label={ __('Font Awesome', 'vk-blocks') }
					value={ faIcon }
					onChange={ (value) => setAttributes({ faIcon: value }) }
					placeholder={ '<i class="fas fa-arrow-circle-right"></i>' }
					className="mb-0"
				/>
				<AdvancedPopOverControl
					label={__("Select Icon", "vk-blocks")}
					renderComp={render}
					setAttributes={setAttributes}
				/>
			</Fragment>
		);
	}
}
