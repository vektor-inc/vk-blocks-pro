import { PRCard } from './component';

export default function save({ attributes, className }) {
	return (
		<PRCard attributes={attributes} className={className} for_={'save'} />
	);
}
