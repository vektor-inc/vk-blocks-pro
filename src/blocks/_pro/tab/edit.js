import {
	InnerBlocks,
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RadioControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';
import { renderToStaticMarkup } from 'react-dom/server';
import { __, sprintf } from '@wordpress/i18n';

export default function TabEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		firstActive,
		tabSizeSp,
		tabSizeTab,
		tabSizePc,
	} = attributes;
	attributes.clientId = clientId;

	const ALLOWED_BLOCKS = ['vk-blocks/tab-item'];
	const TEMPLATE = [
		['vk-blocks/tab-item', { tabBodyActive: true }],
		['vk-blocks/tab-item', { tabBodyActive: false }],
	];

	const { updateBlockAttributes } = dispatch('core/block-editor');

	useEffect(() => {
		if (clientId) {
			updateBlockAttributes(clientId, { clientId });
		}
	}, [clientId]);

	const parentBlock =
		select('core/block-editor').getBlocksByClientId(clientId);

	useEffect(() => {
		if (parentBlock && parentBlock[0] && parentBlock[0].innerBlocks) {
			const childBlocks = parentBlock[0].innerBlocks;
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
	}, [parentBlock, firstActive]);

	const liOnClick = (e) => {
		if (parentBlock && parentBlock[0] && parentBlock[0].innerBlocks) {
			const childBlocks = parentBlock[0].innerBlocks;
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
			Array.prototype.forEach.call(activeLabels, (activeLabel) => {
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
					updateBlockAttributes(clientId, {
						firstActive: parseInt(index, 10),
					});
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

	let tabList = '';
	let tablabelsEditList = '';
	let tablabelsEdit = '';
	let tablabels = '';
	if (parentBlock && parentBlock[0] && parentBlock[0].innerBlocks) {
		const childBlocks = parentBlock[0].innerBlocks;
		tablabelsEditList = childBlocks.map((childBlock, index) => {
			let activeLabelClass = '';
			if (firstActive === index) {
				activeLabelClass = 'vk_tab_labels_label-state-active';
			}

			return (
				<RichText
					tagName="li"
					id={`vk_tab_labels_label-${childBlock.attributes.clientId}`}
					className={`vk_tab_labels_label ${activeLabelClass}`}
					key={index}
					value={childBlock.attributes.tabLabel}
					onChange={(content) => {
						updateBlockAttributes(childBlock.clientId, {
							tabLabel: content,
						});
					}}
					placeholder={
						// translators: Tab label [i]
						sprintf(__('Tab Label [ %s ]'), index + 1)
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

		tabList = <ul className={tabListClassName}>{tablabels}</ul>;
	}

	useEffect(() => {
		setAttributes({ tabListHtml: renderToStaticMarkup(tabList) });
	}, [parentBlock, tabList]);

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
						onChange={(value) =>
							setAttributes({ tabSizeSp: value })
						}
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
						onChange={(value) =>
							setAttributes({ tabSizeTab: value })
						}
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
						onChange={(value) =>
							setAttributes({ tabSizePc: value })
						}
					/>
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
