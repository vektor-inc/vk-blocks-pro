import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';
import { PanelBody, BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { select, dispatch } from '@wordpress/data';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function TabItemEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { tabBodyActive, tabColor, tabBodyBorderTop, blockId } = attributes;

	const { updateBlockAttributes } = dispatch('core/block-editor');

	const innerBlocksTemplate = [
		[
			'core/group',
			{
				style: {
					border: {
						style: 'solid',
						color: '#cccccc',
						width: '1px',
						top: {
							width: '0px',
						},
					},
					spacing: {
						padding: {
							top: '20px',
							bottom: '20px',
							left: '20px',
							right: '20px',
						},
					},
					color: {
						background: '#ffffff',
					},
				},
			},
			[['core/paragraph']],
		],
	];

	useEffect(() => {
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	const parentTabBlockIdList = select(
		'core/block-editor'
	).getBlockParentsByBlockName(clientId, ['vk-blocks/tab']);

	const parentTabBlockList = parentTabBlockIdList[0]
		? select('core/block-editor').getBlocksByClientId(
				parentTabBlockIdList[0]
		  )
		: [];

	const parentTabBlock = parentTabBlockList[0] ? parentTabBlockList[0] : {};

	useEffect(() => {
		if (
			parentTabBlock &&
			parentTabBlock.attributes &&
			parentTabBlock.innerBlocks
		) {
			const tabOptionJSON = parentTabBlock.attributes.tabOptionJSON;
			const childBlocks = parentTabBlock.innerBlocks;

			if (tabOptionJSON && childBlocks && tabColor) {
				const tabOption = JSON.parse(tabOptionJSON);
				if (
					Object.keys(tabOption).length !== 0 &&
					Array.isArray(tabOption.listArray) &&
					tabOption.listArray.length !== 0
				) {
					let childIndex = -1;
					childBlocks.forEach((chiildBlock, index) => {
						if (chiildBlock.clientId === clientId) {
							childIndex = index;
						}
					});
					if (childIndex !== -1) {
						tabOption.listArray[childIndex].tabColor = tabColor;
						updateBlockAttributes(parentTabBlock.clientId, {
							tabOptionJSON: JSON.stringify(tabOption),
						});
					}
				}
			}
		}
	}, [tabColor]);

	let activeBodyClass = '';
	if (tabBodyActive === true) {
		activeBodyClass = ' vk_tab_bodys_body-state-active';
	}
	let tabBodyClass = '';
	let tabBodyStyle = {};
	if (tabBodyBorderTop === true) {
		tabBodyClass = ' has-border-top';
		if (!isHexColor(tabColor)) {
			tabBodyClass += ` has-${tabColor}-border-color`;
		} else {
			tabBodyStyle = {
				borderTopColor: tabColor,
			};
		}
	}

	const blockProps = useBlockProps({
		className: `vk_tab_bodys_body${activeBodyClass}${tabBodyClass}`,
		id: `vk_tab_bodys_body-${blockId}`,
		style: {
			...tabBodyStyle,
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Tab Color Setting', 'vk-blocks-pro')}>
					<BaseControl
						id={`vk_block_button_custom_background_color`}
						label={__('Tab Color', 'vk-blocks-pro')}
					>
						<AdvancedColorPalette schema={'tabColor'} {...props} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks
					templateLock={false}
					template={innerBlocksTemplate}
				/>
			</div>
		</>
	);
}
