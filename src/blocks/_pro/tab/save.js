import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save(props) {
	const { attributes } = props;
	const {
		tabListArray,
		tabSizeSp,
		tabSizeTab,
		tabSizePc,
		firstActive,
		blockId,
	} = attributes;

	const tabOption = JSON.parse(tabListArray);
	let tabList = '';
	let tabListInner = '';
	if (tabOption) {
		tabListInner = tabOption.map((tab, index) => {
			let activeLabelClass = '';
			if (firstActive === index) {
				activeLabelClass = 'vk_tab_labels_label-state-active';
			}
			let tabColorClass = '';
			let tabColorStyle = {};
			if (tab.tabColor !== '') {
				tabColorClass = 'has-background';
				if (!isHexColor(tab.tabColor)) {
					tabColorClass += ` has-${tab.tabColor}-background-color`;
				} else {
					tabColorStyle = {
						backGroundColor: tab.tabColor,
					};
				}
			}
			return (
				<li
					id={`vk_tab_labels_label-${tab.tabId}`}
					className={`vk_tab_labels_label ${activeLabelClass} ${tabColorClass}`}
					style={tabColorStyle}
					key={index}
				>
					{tab.tabLabel}
				</li>
			);
		});
	}

	const tabSizePrefix = 'vk_tab_labels-tabSize';

	const tabSizes = [
		{
			name: 'sp',
			attribute: tabSizeSp,
		},
		{
			name: 'tab',
			attribute: tabSizeTab,
		},
		{
			name: 'pc',
			attribute: tabSizePc,
		},
	];

	let tabListClassName = `vk_tab_labels`;
	tabSizes.forEach((tabSize) => {
		if (tabSize.attribute !== null && tabSize.attribute !== undefined) {
			tabListClassName += ` ${tabSizePrefix}--${tabSize.name}-${tabSize.attribute}`;
		}
	});

	tabList = <ul className={tabListClassName}>{tabListInner}</ul>;

	const blockProps = useBlockProps.save({
		className: `vk_tab`,
		id: `vk-tab-id-${blockId}`,
	});

	return (
		<div {...blockProps}>
			{tabList}
			<div className="vk_tab_bodys">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
