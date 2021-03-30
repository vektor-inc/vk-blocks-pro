import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { dispatch } from '@wordpress/data';

export default function TabEdit(props) {
	const { attributes, clientId } = props;
	attributes.clientId = clientId;

	const ALLOWED_BLOCKS = ['vk-blocks/tab-item'];
	const TEMPLATE = [ALLOWED_BLOCKS];

	const { updateBlockAttributes } = dispatch('core/block-editor');

	useEffect(() => {
		if (clientId) {
			updateBlockAttributes(clientId, { clientId });
		}
	}, [clientId]);

	const blockProps = useBlockProps({
		className: `vk_tab`,
		id: `vk-tab-id-${clientId}`,
	});

	const tablabels = '';

	return (
		<>
			<div {...blockProps}>
				<ul className="vk_tab_labels">{tablabels}</ul>
				<div className="vk_tab_bodys">
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
					/>
				</div>
			</div>
		</>
	);
}
