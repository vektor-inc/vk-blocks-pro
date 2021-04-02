import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';

export default function save(props) {
	const { attributes } = props;
	const { clientId, tabListHtml } = attributes;

	let tablist = '';
	if (tabListHtml) {
		tablist = ReactHtmlParser(tabListHtml);
	}

	const blockProps = useBlockProps.save({
		className: `vk_tab`,
		id: `vk-tab-id-${clientId}`,
	});

	return (
		<div {...blockProps}>
			{tablist}
			<div className="vk_tab_bodys">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
