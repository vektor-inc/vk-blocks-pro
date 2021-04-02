import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes, innerBlocks } = props;
	const { clientId } = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_tab`,
		id: `vk-tab-id-${clientId}`,
	});

	let tabList = '';
	let tablabels = '';
	if (innerBlocks) {
		tablabels = innerBlocks.map((block, index) => (
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

	return (
		<div {...blockProps}>
			{tabList}
			<div className="vk_tab_bodys">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
