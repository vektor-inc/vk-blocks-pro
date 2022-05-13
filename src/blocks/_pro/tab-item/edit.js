import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';
import {
	PanelBody,
	BaseControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { select, dispatch } from '@wordpress/data';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';

export default function TabItemEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { tabBodyActive, tabBodyPadding, tabColor, blockId } = attributes;

	const { updateBlockAttributes } = dispatch('core/block-editor');

	useEffect(() => {
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	let tabBodyPaddingControl = '';

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
			const tabListArray = parentTabBlock.attributes.tabListArray;
			const childBlocks = parentTabBlock.innerBlocks;

			if (tabListArray && childBlocks && tabColor) {
				const optionTemp = JSON.parse(tabListArray);
				if (optionTemp !== []) {
					let childIndex = -1;
					childBlocks.forEach((chiildBlock, index) => {
						if (chiildBlock.clientId === clientId) {
							childIndex = index;
						}
					});
					if (childIndex !== -1) {
						optionTemp[childIndex].tabColor = tabColor;
						updateBlockAttributes(parentTabBlock.clientId, {
							tabListArray: optionTemp,
						});
					}
				}
			}
		}
	}, [tabColor]);

	if (
		parentTabBlock &&
		parentTabBlock.attributes &&
		parentTabBlock.attributes.tabBodyPaddingMode &&
		parentTabBlock.attributes.tabBodyPaddingMode === 'separate'
	) {
		tabBodyPaddingControl = (
			<PanelBody
				title={__('Body Layout Setting', 'vk-blocks')}
				initialOpen={true}
			>
				<BoxControl
					values={tabBodyPadding}
					onChange={(value) => {
						setAttributes({ tabBodyPadding: value });
					}}
					label={__('Padding of Tab Body', 'vk-blocks')}
				/>
			</PanelBody>
		);
	}
	let activeBodyClass = '';
	if (tabBodyActive === true) {
		activeBodyClass = 'vk_tab_bodys_body-state-active';
	}

	const blockProps = useBlockProps({
		className: `vk_tab_bodys_body ${activeBodyClass}`,
		id: `vk_tab_bodys_body-${blockId}`,
		style: {
			padding: `${tabBodyPadding.top} ${tabBodyPadding.right} ${tabBodyPadding.bottom} ${tabBodyPadding.left}`,
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Tab Color Setting', 'vk-blocks')}>
					<BaseControl
						id={`vk_block_button_custom_background_color`}
						label={__('Tab Color', 'vk-blocks')}
					>
						<AdvancedColorPalette schema={'tabColor'} {...props} />
					</BaseControl>
				</PanelBody>
				{tabBodyPaddingControl}
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks
					templateLock={false}
					template={[['core/paragraph']]}
				/>
			</div>
		</>
	);
}
