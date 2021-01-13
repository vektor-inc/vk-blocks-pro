import { VKBHeadingV0_24_1 } from './component';
/* eslint camelcase: 0 */
export default function save({ attributes, className }) {
	return (
		<div className={className}>
			<VKBHeadingV0_24_1 attributes={attributes} for_={'save'} />
		</div>
	);
}
