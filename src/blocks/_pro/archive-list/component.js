import { Component } from '@wordpress/element';

export class VKBArchiveList extends Component {
	render() {
		const title = this.props.lbTitle;

		return (
			<>
				<div>{title}</div>
			</>
		);
	}
}
