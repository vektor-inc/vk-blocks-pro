import { componentV2 } from './component.js';

export default function save(props) {
	const { attributes, className } = props;
	return (
		<componentV2
			clientId={attributes.clientId}
			attributes={attributes}
			className={className}
			for_={'save'}
		/>
	);
}
