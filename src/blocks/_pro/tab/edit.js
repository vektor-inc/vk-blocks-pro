import {
	InnerBlocks,
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	BaseControl,
	RadioControl,
	ButtonGroup,
	Button,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';
import { renderToString } from 'react-dom/server';

export default function TabEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		tabSizeSp,
		tabSizeTab,
		tabSizePc,
		tabBodyPaddingMode,
		tabBodyPaddingAll,
		firstActive,
		blockId,
	} = attributes;

	const ALLOWED_BLOCKS = ['vk-blocks/tab-item'];
	const TEMPLATE = [
		[
			'vk-blocks/tab-item',
			{ tabLabel: __('Tab 01', 'vk-blocks'), tabBodyActive: true },
		],
		[
			'vk-blocks/tab-item',
			{ tabLabel: __('Tab 02', 'vk-blocks'), tabBodyActive: false },
		],
	];

	const { updateBlockAttributes } = dispatch('core/block-editor');

	useEffect(() => {
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	const parentBlock =
		select('core/block-editor').getBlocksByClientId(clientId);
	const childBlocks =
		parentBlock && parentBlock[0] && parentBlock[0].innerBlocks
			? parentBlock[0].innerBlocks
			: [];

	useEffect(() => {
		if (childBlocks !== []) {
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
	}, [firstActive]);

	useEffect(() => {
		if (childBlocks !== []) {
			if (tabBodyPaddingMode === 'bundle') {
				childBlocks.forEach((childBlock) => {
					updateBlockAttributes(childBlock.clientId, {
						tabBodyPadding: tabBodyPaddingAll,
					});
				});
			}
		}
	}, [tabBodyPaddingAll]);

	const liOnClick = (e) => {
		if (childBlocks !== []) {
			const vkTab = e.target.closest('.vk_tab');
			const vkTabLabels = vkTab.querySelector('.vk_tab_labels');

			// ブロック ID を抽出
			const TabLabelId = e.target.id;
			const TabId = TabLabelId.replace('vk_tab_labels_label-', '');

			/* ラベルの処理 */
			// カレントを探して全て外す
			const activeLabels = vkTabLabels.querySelectorAll(
				'.vk_tab_labels_label-state-active'
			);
			activeLabels.forEach((activeLabel) => {
				activeLabel.classList.remove(
					'vk_tab_labels_label-state-active'
				);
			});

			// クリックされた要素にアクティブを追加
			vkTabLabels
				.querySelector(`#vk_tab_labels_label-${TabId}`)
				.classList.add('vk_tab_labels_label-state-active');

			/* 本体の処理 */
			childBlocks.forEach((childBlock, index) => {
				if (TabId === childBlock.clientId) {
					setAttributes({ firstActive: parseInt(index, 10) });
				}
			});
		}
	};

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

	let tablabelsEditList = '';
	let tablabelsEdit = '';
	if (childBlocks !== []) {
		tablabelsEditList = childBlocks.map((childBlock, index) => {
			let activeLabelClass = '';
			if (firstActive === index) {
				activeLabelClass = 'vk_tab_labels_label-state-active';
			}
			let tabColorClass = '';
			let tabColorStyle = {};
			if (childBlock.attributes.tabColor !== '') {
				tabColorClass = 'has-background';
				if (!isHexColor(childBlock.attributes.tabColor)) {
					tabColorClass += ` has-${childBlock.attributes.tabColor}-background-color`;
				} else {
					tabColorStyle = {
						backgroundColor: childBlock.attributes.tabColor,
					};
				}
			}

			return (
				<RichText
					tagName="li"
					id={`vk_tab_labels_label-${childBlock.attributes.blockId}`}
					className={`vk_tab_labels_label ${activeLabelClass} ${tabColorClass}`}
					style={tabColorStyle}
					key={index}
					value={childBlock.attributes.tabLabel}
					onChange={(content) => {
						updateBlockAttributes(childBlock.clientId, {
							tabLabel: content,
						});
					}}
					placeholder={
						// translators: Tab label [i]
						sprintf(__('Tab Label [ %s ]', 'vk-Blocks'), index + 1)
					}
					onClick={(e) => {
						liOnClick(e);
					}}
				/>
			);
		});
		tablabelsEdit = (
			<ul className={tabListClassName}>{tablabelsEditList}</ul>
		);
	}

	useEffect(() => {
		let tablabelsList = '';
		let tablabels = '';
		if (childBlocks !== []) {
			tablabelsList = childBlocks.map((childBlock, index) => {
				let activeLabelClass = '';
				if (firstActive === index) {
					activeLabelClass = 'vk_tab_labels_label-state-active';
				}
				let tabColorClass = '';
				let tabColorStyle = {};
				if (childBlock.attributes.tabColor !== '') {
					tabColorClass = 'has-background';
					if (!isHexColor(childBlock.attributes.tabColor)) {
						tabColorClass += ` has-${childBlock.attributes.tabColor}-background-color`;
					} else {
						tabColorStyle = {
							backgroundColor: childBlock.attributes.tabColor,
						};
					}
				}

				return (
					<li
						id={`vk_tab_labels_label-${childBlock.attributes.blockId}`}
						className={`vk_tab_labels_label ${activeLabelClass} ${tabColorClass}`}
						style={tabColorStyle}
						key={index}
					>
						{childBlock.attributes.tabLabel}
					</li>
				);
			});
			tablabels = <ul className={tabListClassName}>{tablabelsList}</ul>;
		}
		setAttributes({ tabLabelHtml: renderToString(tablabels) });
	}, [childBlocks]);

	const blockProps = useBlockProps({
		className: `vk_tab`,
		id: `vk-tab-id-${clientId}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Tab size Setting', 'vk-blocks')}>
					<RadioControl
						label={__('Tab Size ( Smart Phone )', 'vk-blocks')}
						selected={tabSizeSp}
						options={[
							{
								label: __('Fit to the text', 'vk-blocks'),
								value: 'fitText',
							},
							{
								label: __('Monospaced', 'vk-blocks'),
								value: 'monospaced',
							},
						]}
						onChange={(value) => {
							setAttributes({ tabSizeSp: value });
						}}
					/>
					<RadioControl
						label={__('Tab Size ( Tablet )', 'vk-blocks')}
						selected={tabSizeTab}
						options={[
							{
								label: __('Fit to the text', 'vk-blocks'),
								value: 'fitText',
							},
							{
								label: __('Monospaced', 'vk-blocks'),
								value: 'monospaced',
							},
						]}
						onChange={(value) => {
							setAttributes({ tabSizeTab: value });
						}}
					/>
					<RadioControl
						label={__('Tab Size ( PC )', 'vk-blocks')}
						selected={tabSizePc}
						options={[
							{
								label: __('Fit to the text', 'vk-blocks'),
								value: 'fitText',
							},
							{
								label: __('Monospaced', 'vk-blocks'),
								value: 'monospaced',
							},
						]}
						onChange={(value) => {
							setAttributes({ tabSizePc: value });
						}}
					/>
				</PanelBody>
				<PanelBody
					title={__('Body Layout Setting', 'vk-blocks')}
					initialOpen={true}
				>
					<BaseControl
						id={`vk_block_button_custom_background_color`}
						label={__('Tab Color', 'vk-blocks')}
					>
						<ButtonGroup className={`mb-2`}>
							<Button
								isSmall
								isPrimary={tabBodyPaddingMode === 'separate'}
								isSecondary={tabBodyPaddingMode !== 'separate'}
								onClick={() => {
									setAttributes({
										tabBodyPaddingMode: 'separate',
									});
								}}
							>
								{__('Separate', 'vk-blocks')}
							</Button>
							<Button
								isSmall
								isPrimary={tabBodyPaddingMode === 'bundle'}
								isSecondary={tabBodyPaddingMode !== 'bundle'}
								onClick={() => {
									setAttributes({
										tabBodyPaddingMode: 'bundle',
									});
								}}
							>
								{__('Bundle', 'vk-blocks')}
							</Button>
						</ButtonGroup>
					</BaseControl>
					{tabBodyPaddingMode === 'bundle' && (
						<BoxControl
							values={tabBodyPaddingAll}
							onChange={(value) => {
								setAttributes({ tabBodyPaddingAll: value });
							}}
							label={__('Padding of Tab Body', 'vk-blocks')}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{tablabelsEdit}
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
