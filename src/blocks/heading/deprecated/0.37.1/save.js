import { VKBHeading } from './component';

export default function save(props) {
	return (
		<div id={props.attributes.anchor}>
			<VKBHeading {...props} for_={"save"}/>
		</div>
	);
}
