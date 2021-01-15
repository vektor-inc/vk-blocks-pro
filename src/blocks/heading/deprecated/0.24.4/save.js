import { NoAnchor } from './component';

export default function save({ attributes, className }) {
	return (
		<NoAnchor attributes={attributes} className={className} for_={'save'} />
	);
}
