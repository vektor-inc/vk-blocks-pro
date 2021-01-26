import { VKBHeading2 } from './component';

export default function save(props) {
	const { attributes } = props;
	return (
		<div id={attributes.anchor}>
			<VKBHeading2 attributes={attributes} for_={'save'} />
		</div>
	);
}
