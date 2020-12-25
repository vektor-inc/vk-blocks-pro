import { ComponentBlock } from './component';
import { useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const containerClass = `vk_prBlocks row`;

	const blockProps = useBlockProps.save({
		className: containerClass,
	});

	return (
		<div {...blockProps}>
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
