import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';
export default function TabItemEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { tabBodyActive, blockId } = attributes;
	attributes.clientId = clientId;

	useEffect(() => {
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	let activeBodyClass = '';
	if (tabBodyActive === true) {
		activeBodyClass = 'vk_tab_bodys_body-state-active';
	}

	const blockProps = useBlockProps({
		className: `vk_tab_bodys_body ${activeBodyClass}`,
		id: `vk_tab_bodys_body-${blockId}`,
	});

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks
					templateLock={false}
					template={[['core/paragraph']]}
				/>
			</div>
		</>
	);
}
