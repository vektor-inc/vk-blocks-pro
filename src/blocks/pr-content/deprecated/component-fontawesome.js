import parse from 'html-react-parser';
import { Component } from '@wordpress/element';

export class Fontawesome extends Component {
	render() {
		let {
			buttonText,
			fontAwesomeIconBefore,
			fontAwesomeIconAfter,
		} = this.props.attributes;

		let iconBefore = '';
		let faIconFragmentBefore;
		let iconAfter = '';
		let faIconFragmentAfter;

		//過去バージョンをリカバリーした時にiconを正常に表示する
		if (fontAwesomeIconBefore && !fontAwesomeIconBefore.match(/<i/)) {
			fontAwesomeIconBefore = `<i class="${fontAwesomeIconBefore}"></i>`;
		}
		if (fontAwesomeIconAfter && !fontAwesomeIconAfter.match(/<i/)) {
			fontAwesomeIconAfter = `<i class="${fontAwesomeIconAfter}"></i>`;
		}

		if (fontAwesomeIconBefore) {
			//add class and inline css
			faIconFragmentBefore = fontAwesomeIconBefore.split(' ');
			faIconFragmentBefore[1] =
				' ' + faIconFragmentBefore[1] + ` vk_button_link_before `;
			iconBefore = faIconFragmentBefore.join('');
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
				{parse(iconBefore)}
				<span className="vk_button_link_txt">{buttonText}</span>
				{parse(iconAfter)}
			</>
		);
	}
}
