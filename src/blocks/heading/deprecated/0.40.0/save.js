import { VKBHeading_0_40_0 } from './component';
/* eslint camelcase: 0 */
export default function save(props) {
	const { attributes } = props;
	return (
		<div id={attributes.anchor}>
			<VKBHeading_0_40_0 {...props} for_={'save'} />
		</div>
	);
}
