import { OuterBlock } from './component';

export default function save(props) {
	const { attributes } = props;
	return (
		<OuterBlock
			clientId={attributes.clientId}
			attributes={attributes}
			for_={'save'}
		/>
	);
}
