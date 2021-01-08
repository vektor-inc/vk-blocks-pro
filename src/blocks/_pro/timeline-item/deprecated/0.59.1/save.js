import { TimlineItem } from './component';

export default function save({ attributes, className }) {
	return (
		<TimlineItem
			attributes={attributes}
			className={className}
			for_={'save'}
		/>
	);
}
