import { ComponentBlock } from './component';

export default function save({ attributes }) {
	return (
		<div className="vk_prBlocks row">
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
