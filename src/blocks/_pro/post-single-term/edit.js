import { useBlockProps } from '@wordpress/block-editor';
export default function SingleTermEdit() {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<span>{'(ターム名)'}</span>
		</div>
	);
}
