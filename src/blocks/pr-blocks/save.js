import { ComponentBlockSave } from './component';
import { useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const containerClass = `vk_prBlocks row`;

	const blockProps = useBlockProps.save({
		className: containerClass,
	});

	return (
		<div {...blockProps}>
			<ComponentBlockSave attributes={attributes} blockNum={1} />
			<ComponentBlockSave attributes={attributes} blockNum={2} />
			<ComponentBlockSave attributes={attributes} blockNum={3} />
		</div>
	);
}
