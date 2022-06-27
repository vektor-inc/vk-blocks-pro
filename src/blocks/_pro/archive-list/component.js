import { Component } from '@wordpress/element';

export class VKBArchiveList extends Component {
	render() {
		const title = this.props.lbTitle;
		const postType = this.props.lbPostType;
		const archiveType = this.props.lbArchiveType;
		const displayDesign = this.props.lbDisplayDesign;

		return (
			<>
				<div>{title}</div>
				<div>{postType}</div>
				<div>{archiveType}</div>
				<div>{displayDesign}</div>
			</>
		);
	}
}
