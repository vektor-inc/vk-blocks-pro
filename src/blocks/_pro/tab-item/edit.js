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
import { select } from '@wordpress/data';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';

export default function TabItemEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { tabBodyActive, tabBodyPadding, blockId } = attributes;

	useEffect(() => {
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	let tabBodyPaddingControl = '';

	const parentTabBlockList = select(
		'core/block-editor'
	).getBlockParentsByBlockName(clientId, ['vk-blocks/tab']);

	if (parentTabBlockList) {
		const parentTabBlock = select('core/block-editor').getBlocksByClientId(
			parentTabBlockList[0]
		);
		if (
			parentTabBlock &&
			parentTabBlock[0] &&
			parentTabBlock[0].attributes &&
			parentTabBlock[0].attributes.tabBodyPaddingMode === 'separate'
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
