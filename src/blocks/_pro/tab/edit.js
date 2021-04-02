import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';

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

	const parentBlock = select('core/editor').getBlocksByClientId(clientId)[0];
	const childBlocks = parentBlock.innerBlocks;

	let tabList = '';
	let tablabels = '';
	if (childBlocks) {
		tablabels = childBlocks.map((block, index) => (
			<li
				id={`vk_tab_labels_label-${block.attributes.clientId}`}
				className={`vk_tab_labels_label`}
				key={index}
			>
				{block.attributes.tabLabel}
			</li>
		));
		tabList = <ul className="vk_tab_labels">{tablabels}</ul>;
	}

	const blockProps = useBlockProps({
		className: `vk_tab`,
		id: `vk-tab-id-${clientId}`,
	});

	return (
		<>
			<div {...blockProps}>
				{tabList}
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
