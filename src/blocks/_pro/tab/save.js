import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
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
		className = '',
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
	if (Object.keys(tabOption).length !== 0 && tabOption.listArray.length !== 0) {
		tabListInner = tabOption.listArray.map((option, index) => {
			let activeLabelClass = '';
			if (firstActive === index) {
				activeLabelClass = ' vk_tab_labels_label-state-active';
			} else {
				activeLabelClass = ' vk_tab_labels_label-state-inactive';
			}
			let tabColorClass = '';
			const tabColorStyle = {};
			let tabSpanColorClass = '';
			const tabSpanColorStyle = {};

			if (option.tabColor !== '') {
				if (tabOption.tabLabelBackground) {
					tabColorClass = ' has-background';
					if (!isHexColor(option.tabColor)) {
						tabColorClass += ` has-${option.tabColor}-background-color`;
					} else {
						tabColorStyle.backgroundColor = option.tabColor;
					}
				} else if (tabOption.tabLabelBorderTop) {
					tabSpanColorClass = ' has-border-top';
					if (!isHexColor(option.tabColor)) {
						tabSpanColorClass += ` has-${option.tabColor}-border-color`;
					} else {
						tabSpanColorStyle.borderTopColor = option.tabColor;
					}
					// Only set color if the label is active
					if (firstActive === index) {
						tabColorStyle.color = option.tabColor;
						const borderColorClassMatch = tabSpanColorClass.match(/has-(.*)-border-color/);
						if (borderColorClassMatch) {
							tabSpanColorClass += ` has-${borderColorClassMatch[1]}-color`;
						}
					}
				}
			}

			if (activeLabelClass.includes('vk_tab_labels_label-state-inactive')) {
				delete tabColorStyle.color;
			}

			if (
				className.includes('is-style-vk_tab_labels-line') &&
				activeLabelClass.includes('vk_tab_labels_label-state-active') &&
				tabSpanColorClass.includes('has-border-top') &&
				tabSpanColorStyle.borderTopColor
			) {
				tabColorStyle.color = tabSpanColorStyle.borderTopColor;
			}

			return (
				<li
					id={`vk_tab_labels_label-${option.blockId}`}
					className={`vk_tab_labels_label${activeLabelClass}${tabColorClass}`}
					key={index}
					style={Object.keys(tabColorStyle).length > 0 ? tabColorStyle : undefined}
				>
					<RichText.Content
						tagName="div"
						className={tabSpanColorClass}
						style={tabSpanColorStyle}
						value={option.tabLabel}
					/>
				</li>
			);
		});
		tabList = (
			<ul className={tabListClassName} role="tablist">
				{tabListInner}
			</ul>
		);
	}

	const blockProps = useBlockProps.save({
		className: `vk_tab ${className || ''}`,
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
