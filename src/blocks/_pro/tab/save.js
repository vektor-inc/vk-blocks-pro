import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes, innerBlocks } = props;
	const { clientId } = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_tab`,
		id: `vk-tab-id-${clientId}`,
	});

	const tablabels = '';

	return (
		<div {...blockProps}>
			<ul className="vk_tab_labels">{tablabels}</ul>
			<div className="vk_tab_bodys">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
