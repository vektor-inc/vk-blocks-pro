import { Component } from '@wordpress/element';

export class Fontawesome extends Component {
	render() {
		const {
			buttonText,
			fontAwesomeIconBefore,
			fontAwesomeIconAfter,
		} = this.props.attributes;

		let iconBefore = '';
		let iconAfter = '';

		if (fontAwesomeIconBefore) {
			iconBefore = (
				<i
					className={`${fontAwesomeIconBefore} vk_button_link_before`}
				></i>
			);
		}
		if (fontAwesomeIconAfter) {
			iconAfter = (
				<i
					className={`${fontAwesomeIconAfter} vk_button_link_after`}
				></i>
			);
		}

		return (
			<>
				{iconBefore}
				<span className="vk_button_link_txt">{buttonText}</span>
				{iconAfter}
			</>
		);
	}
}
