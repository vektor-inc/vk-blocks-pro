import { VKBHeading_0_39_5 } from './component';

export default function save(props) {
	const { attributes } = props;
	return (
		<div id={attributes.anchor}>
			<VKBHeading_0_39_5 attributes={attributes} for_={'save'} />
		</div>
	);
}
