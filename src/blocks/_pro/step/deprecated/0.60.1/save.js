import { Step } from './component';

export default function save({ attributes, className }) {
	return (
		<Step
			attributes={attributes}
			className={className}
			for_={'save'}
		/>
	);
}
