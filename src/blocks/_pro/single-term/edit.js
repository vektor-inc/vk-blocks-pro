import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';

export default function SingleTermEdit() {
	const blockProps = useBlockProps();

	return (
		<>
			<div {...blockProps}>
				<ServerSideRender block="vk-blocks/single-term" />
			</div>
		</>
	);
}
