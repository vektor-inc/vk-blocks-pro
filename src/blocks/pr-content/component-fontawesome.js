import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export class Fontawesome extends React.Component {

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

        if (fontAwesomeIconBefore) {
			//add class and inline css
			faIconFragmentBefore= fontAwesomeIconBefore.split(' ');
			faIconFragmentBefore[1] = ' ' + faIconFragmentBefore[1] + ` vk_button_link_before `
			iconBefore = faIconFragmentBefore.join('')
        }
        if (fontAwesomeIconAfter) {
			//add class and inline css
			faIconFragmentAfter = fontAwesomeIconAfter.split(' ');
			faIconFragmentAfter[1] = ' ' + faIconFragmentAfter[1] + ` vk_button_link_after `
			iconAfter = faIconFragmentAfter.join('')
		}

        return (
			<React.Fragment>
				{ReactHtmlParser(iconBefore)}
				<span className="vk_button_link_txt">{buttonText}</span>
				{ReactHtmlParser(iconAfter)}
          </React.Fragment>
        );
    }
}
