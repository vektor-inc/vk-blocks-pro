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
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { select, dispatch } from '@wordpress/data';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';

export default function TabItemEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		tabBodyActive,
		tabColor,
		tabBodyBorderTop,
		iconSizeBefore,
		iconSizeAfter,
		blockId,
	} = attributes;

	const { updateBlockAttributes } = dispatch('core/block-editor');

	const innerBlocksTemplate = [
		[
			'core/group',
			{
				style: {
					border: {
						style: 'solid',
						color: '#0000001f',
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
				className:
					'vk_block-margin-0--margin-top vk_block-margin-0--margin-bottom',
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

			if (tabOptionJSON && childBlocks) {
				const tabOption = JSON.parse(tabOptionJSON);
				if (
					Object.keys(tabOption).length !== 0 &&
					Array.isArray(tabOption.listArray) &&
					tabOption.listArray.length !== 0
				) {
					let childIndex = -1;
					childBlocks.forEach((childBlock, index) => {
						if (childBlock.clientId === clientId) {
							childIndex = index;
						}
					});
					if (childIndex !== -1) {
						if (tabOption.listArray[childIndex].tabColor !== tabColor) {
							tabOption.listArray[childIndex].tabColor = tabColor || '';
							updateBlockAttributes(parentTabBlock.clientId, {
								tabOptionJSON: JSON.stringify(tabOption),
							});
						}
					}
				}
			}
		}
	}, [tabColor, clientId, parentTabBlock, updateBlockAttributes]);

	// Add vk_block-margin-0 class to existing tab group blocks
	useEffect(() => {
		const currentBlock = select('core/block-editor').getBlock(clientId);
		const innerBlocks = currentBlock.innerBlocks;
		innerBlocks.forEach((block) => {
			let newClassName = block.attributes.className || '';
			if (!/vk_block-margin-.*--margin-top/.test(newClassName)) {
				newClassName += ' vk_block-margin-0--margin-top';
			}
			if (!/vk_block-margin-.*--margin-bottom/.test(newClassName)) {
				newClassName += ' vk_block-margin-0--margin-bottom';
			}
			updateBlockAttributes(block.clientId, {
				className: newClassName.trim(),
			});
		});
	}, [clientId]);

	let activeBodyClass = '';
	if (tabBodyActive) {
		activeBodyClass = ' vk_tab_bodys_body-state-active';
	}
	let tabBodyClass = '';
	let tabBodyStyle = {};
	if (tabBodyBorderTop) {
		tabBodyClass = ' has-border-top';
		if (!isHexColor(tabColor)) {
			tabBodyClass += ` has-${sanitizeSlug(tabColor)}-border-color`;
		} else {
			tabBodyStyle = {
				borderTopColor: tabColor,
			};
		}
	}

	// eslint-disable-next-line no-undef
	const iconFamily = vkFontAwesome.iconFamily;

	const blockProps = useBlockProps({
		className: `vk_tab_bodys_body${activeBodyClass}${tabBodyClass}`,
		id: `vk_tab_bodys_body-${blockId}`,
		style: {
			...tabBodyStyle,
		},
		role: 'tabpanel',
		'aria-labelledby': `vk_tab_labels_label-${blockId}`,
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
				<PanelBody title={__('Tab Icon Setting', 'vk-blocks-pro')}>
					<BaseControl>
						<h4 className={`mt-0 mb-2`}>
							{__('Icon', 'vk-blocks-pro') +
								' ( ' +
								iconFamily +
								' )'}
						</h4>
						<BaseControl
							id={`vk_block_tab_fa_before_text`}
							label={__('Before text', 'vk-blocks-pro')}
						>
							<FontAwesome
								attributeName={'iconBefore'}
								modeClass={true}
								{...props}
							/>
							<UnitControl
								label={__('Size', 'vk-blocks-pro')}
								value={iconSizeBefore}
								units={[
									{ value: 'px', label: 'px', default: 16 },
									{ value: 'em', label: 'em', default: 1 },
									{ value: 'rem', label: 'rem', default: 1 },
								]}
								onChange={(value) => {
									setAttributes({
										iconSizeBefore: value || null,
									});
								}}
							/>
						</BaseControl>
						<hr />
						<BaseControl
							id={`vk_block_tab_fa_after_text`}
							label={__('After text', 'vk-blocks-pro')}
						>
							<FontAwesome
								attributeName={'iconAfter'}
								modeClass={true}
								{...props}
							/>
							<UnitControl
								label={__('Size', 'vk-blocks-pro')}
								value={iconSizeAfter}
								units={[
									{ value: 'px', label: 'px', default: 16 },
									{ value: 'em', label: 'em', default: 1 },
									{ value: 'rem', label: 'rem', default: 1 },
								]}
								onChange={(value) => {
									setAttributes({
										iconSizeAfter: value || null,
									});
								}}
							/>
						</BaseControl>
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
