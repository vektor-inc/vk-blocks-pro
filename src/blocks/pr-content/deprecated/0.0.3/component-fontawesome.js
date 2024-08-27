import parse from 'html-react-parser';
import { Component } from '@wordpress/element';

export class Fontawesome extends Component {
	render() {
		let {
			buttonText,
			fontAwesomeIconAfter,
		} = this.props.attributes;

		let iconAfter = '';
		let faIconFragmentAfter;

		//過去バージョンをリカバリーした時にiconを正常に表示する
		if (fontAwesomeIconAfter && !fontAwesomeIconAfter.match(/<i/)) {
			fontAwesomeIconAfter = `<i class="${fontAwesomeIconAfter}"></i>`;
		}

		if (fontAwesomeIconAfter) {
			//add class and inline css
			faIconFragmentAfter = fontAwesomeIconAfter.split(' ');
			faIconFragmentAfter[1] =
				' ' + faIconFragmentAfter[1] + ` vk_button_link_after `;
			iconAfter = faIconFragmentAfter.join('');
		}

		return (
			<>
				<span className="vk_button_link_txt">{buttonText}</span>
				{parse(iconAfter)}
			</>
		);
	}
}
