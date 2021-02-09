import { StepItem } from './component';

export default function save(props) {
	const { attributes, className } = props;
	return (
		<StepItem attributes={attributes} className={className} for_={'save'} />
	);
}
