import { VKBArchiveList } from './component';
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	let {
		title,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_archive_list`,
	});

	return (
		<div {...blockProps}>
			<VKBArchiveList
				lbTitle={title}
			/>
		</div>
	);
}
