import { DeprecatedComponent } from './component';

export default function save({ attributes, className }) {
	return (
		<DeprecatedComponent
			attributes={attributes}
			className={className}
			for_={'save'}
		/>
	);
}
