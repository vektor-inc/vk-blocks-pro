import { StepItem } from './component';

export default function save({ attributes, className }) {
	return (
		<StepItem
			attributes={attributes}
			className={className}
			for_={'save'}
		/>
	);
}
