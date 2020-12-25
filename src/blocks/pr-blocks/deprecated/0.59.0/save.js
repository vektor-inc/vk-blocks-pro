import { ComponentBlock } from './component';

export default function save(props) {
	const { attributes, className } = props;
	let containerClass;
	if (className) {
		containerClass = `${className} vk_prBlocks row`;
	} else {
		containerClass = `vk_prBlocks row`;
	}

	return (
		<div className={containerClass}>
			<ComponentBlock
				attributes={attributes}
				blockNum={1}
				for_={'save'}
			/>
			<ComponentBlock
				attributes={attributes}
				blockNum={2}
				for_={'save'}
			/>
			<ComponentBlock
				attributes={attributes}
				blockNum={3}
				for_={'save'}
			/>
		</div>
	);
}
