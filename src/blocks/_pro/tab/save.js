import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save(props) {
	const { attributes } = props;
	const {
		tabOptionJSON,
		tabSizeSp,
		tabSizeTab,
		tabSizePc,
		firstActive,
		blockId,
	} = attributes;

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

	const tabOption = JSON.parse(tabOptionJSON);

	let tabList = '';
	let tabListInner = '';
	if (
		Object.keys(tabOption).length !== 0 &&
		tabOption.listArray.length !== 0
	) {
		tabListInner = tabOption.listArray.map((option, index) => {
			let activeLabelClass = '';
			if (firstActive === index) {
				activeLabelClass = ' vk_tab_labels_label-state-active';
			}
			let tabColorClass = '';
			let tabColorStyle = {};
			let tabSpanColorClass = '';
			let tabSpanColorStyle = {};
			if (option.tabColor !== '') {
				if (tabOption.tabLabelBackground) {
					tabColorClass = ' has-background';
					if (!isHexColor(option.tabColor)) {
						tabColorClass += ` has-${option.tabColor}-background-color`;
					} else {
						tabColorStyle = {
							backgroundColor: option.tabColor,
						};
					}
				} else if (tabOption.tabLabelBorderTop) {
					tabSpanColorClass = ' has-border-top';
					if (!isHexColor(option.tabColor)) {
						tabSpanColorClass += ` has-${option.tabColor}-border-color`;
					} else {
						tabSpanColorStyle = {
							borderTopColor: option.tabColor,
						};
					}
				}
			}

			return (
				<li
					id={`vk_tab_labels_label-${option.blockId}`}
					className={`vk_tab_labels_label${activeLabelClass}${tabColorClass}${
						!activeLabelClass
							? ' vk_tab_labels_label-state-inactive'
							: ''
					}`}
					style={tabColorStyle}
					key={index}
					role="tab"
					aria-selected={firstActive === index ? 'true' : 'false'}
					aria-controls={`vk_tab_bodys_body-${option.blockId}`}
					tabIndex={firstActive === index ? 0 : -1}
				>
					<div
						className={tabSpanColorClass}
						style={tabSpanColorStyle}
					>
						{option.tabLabel}
					</div>
				</li>
			);
		});
		tabList = <ul className={tabListClassName}>{tabListInner}</ul>;
	}

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
