import { VKBHeading } from './component';

export default function save({ attributes, className }) {
	return (
		<div className={className} id="vk-htags--1">
			<VKBHeading attributes={attributes} for_={'save'} />
		</div>
	);
}
