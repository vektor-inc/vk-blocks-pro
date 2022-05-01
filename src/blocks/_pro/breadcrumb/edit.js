import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';

export default function BreadcrumbEdit() {
	const blockProps = useBlockProps();

	return (
		<>
			<div {...blockProps}>
				<ServerSideRender block="vk-blocks/breadcrumb" />
			</div>
		</>
	);
}
