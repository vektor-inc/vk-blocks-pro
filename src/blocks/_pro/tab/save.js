import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import parse from 'html-react-parser';

export default function save(props) {
	const { attributes } = props;
	const { tabLabelHtml, blockId } = attributes;

	const blockProps = useBlockProps.save({
		className: `vk_tab`,
		id: `vk-tab-id-${blockId}`,
	});

	return (
		<div {...blockProps}>
			{parse(tabLabelHtml)}
			<div className="vk_tab_bodys">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
