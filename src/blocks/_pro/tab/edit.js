import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';
import { renderToStaticMarkup } from 'react-dom/server';

export default function TabEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { firstActive } = attributes;
	attributes.clientId = clientId;

	const ALLOWED_BLOCKS = ['vk-blocks/tab-item'];
	const TEMPLATE = [ALLOWED_BLOCKS];

	const { updateBlockAttributes } = dispatch('core/block-editor');

	if (firstActive === undefined) {
		setAttributes({ firstActive: 0 });
	}

	useEffect(() => {
		if (clientId) {
			updateBlockAttributes(clientId, { clientId });
		}
	}, [clientId]);

	const parentBlock = select('core/editor').getBlocksByClientId(clientId)[0];
	const childBlocks = parentBlock.innerBlocks;

	useEffect(() => {
		if (childBlocks) {
			childBlocks.forEach((childBlock, index) => {
				if (firstActive === index) {
					updateBlockAttributes(childBlock.clientId, {
						tabBodyActive: true,
					});
				} else {
					updateBlockAttributes(childBlock.clientId, {
						tabBodyActive: false,
					});
				}
			});
		}
	}, [childBlocks]);

	let tabList = '';
	let tablabels = '';
	if (childBlocks) {
		tablabels = childBlocks.map((childBlock, index) => {
			let activeLabelClass = '';
			if (firstActive === index) {
				activeLabelClass = 'vk_tab_labels_label-state-active';
			}
			return (
				<li
					id={`vk_tab_labels_label-${childBlock.attributes.clientId}`}
					className={`vk_tab_labels_label ${activeLabelClass}`}
					key={index}
				>
					{childBlock.attributes.tabLabel}
				</li>
			);
		});
		if (tablabels) {
			tabList = <ul className="vk_tab_labels">{tablabels}</ul>;
		}
	}

	useEffect(() => {
		if (tabList) {
			setAttributes({ tabListHtml: renderToStaticMarkup(tabList) });
		}
	}, [tabList]);

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
