import {
	InnerBlocks,
	useBlockProps,
	RichText,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { PanelBody, RadioControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

export default function TabEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		tabOptionJSON,
		tabSizeSp,
		tabSizeTab,
		tabSizePc,
		tabBodyPaddingMode,
		tabBodyPaddingAll,
		firstActive,
		blockId,
		className,
	} = attributes;

	const ALLOWED_BLOCKS = ['vk-blocks/tab-item'];
	const TEMPLATE = [
		[
			'vk-blocks/tab-item',
			{ tabLabel: __('Tab 01', 'vk-blocks-pro'), tabBodyActive: true },
		],
		[
			'vk-blocks/tab-item',
			{ tabLabel: __('Tab 02', 'vk-blocks-pro'), tabBodyActive: false },
		],
	];

	const { updateBlockAttributes } = dispatch('core/block-editor');

	const tabOption = JSON.parse(tabOptionJSON);
	const classNames = className !== undefined ? className.split(' ') : [];

	useEffect(() => {
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	const childBlocks = useSelect(
		(select) => select(blockEditorStore).getBlock(clientId).innerBlocks
	);

	useEffect(() => {
		const tabOptionTemp = {
			listArray: [],
			tabLabelBackground: true,
			tabLabelBorderTop: false,
			tabBodyBorderTop: true,
		};
		if (childBlocks) {
			childBlocks.forEach((childBlock) => {
				tabOptionTemp.listArray.push({
					tabLabel: childBlock.attributes.tabLabel,
					tabColor: childBlock.attributes.tabColor,
					blockId: childBlock.attributes.blockId,
				});
			});
		}
		if (className !== undefined) {
			if (classNames.indexOf('is-style-vk_tab_labels-normal') !== -1) {
				tabOptionTemp.tabLabelBackground = true;
				tabOptionTemp.tabLabelBorderTop = false;
				tabOptionTemp.tabBodyBorderTop = true;
			} else if (
				classNames.indexOf('is-style-vk_tab_labels-normal-no-frame') !==
				-1
			) {
				tabOptionTemp.tabLabelBackground = true;
				tabOptionTemp.tabLabelBorderTop = false;
				tabOptionTemp.tabBodyBorderTop = false;
			} else if (
				classNames.indexOf('is-style-vk_tab_labels-line') !== -1
			) {
				tabOptionTemp.tabLabelBackground = false;
				tabOptionTemp.tabLabelBorderTop = true;
				tabOptionTemp.tabBodyBorderTop = false;
			} else if (
				classNames.indexOf('is-style-vk_tab_labels-line-no-frame') !==
				-1
			) {
				tabOptionTemp.tabLabelBackground = false;
				tabOptionTemp.tabLabelBorderTop = true;
				tabOptionTemp.tabBodyBorderTop = false;
			}
		}
		setAttributes({ tabOptionJSON: JSON.stringify(tabOptionTemp) });
	}, [childBlocks]);

	useEffect(() => {
		if (className !== undefined) {
			if (classNames.indexOf('is-style-vk_tab_labels-normal') !== -1) {
				tabOption.tabLabelBackground = true;
				tabOption.tabLabelBorderTop = false;
				tabOption.tabBodyBorderTop = true;
			} else if (
				classNames.indexOf('is-style-vk_tab_labels-normal-no-frame') !==
				-1
			) {
				tabOption.tabLabelBackground = true;
				tabOption.tabLabelBorderTop = false;
				tabOption.tabBodyBorderTop = false;
			} else if (
				classNames.indexOf('is-style-vk_tab_labels-line') !== -1
			) {
				tabOption.tabLabelBackground = false;
				tabOption.tabLabelBorderTop = true;
				tabOption.tabBodyBorderTop = false;
			} else if (
				classNames.indexOf('is-style-vk_tab_labels-line-no-frame') !==
				-1
			) {
				tabOption.tabLabelBackground = false;
				tabOption.tabLabelBorderTop = true;
				tabOption.tabBodyBorderTop = false;
			}
		}
		setAttributes({ tabOptionJSON: JSON.stringify(tabOption) });
	}, [className]);

	useEffect(() => {
		if (childBlocks) {
			childBlocks.forEach((childBlock) => {
				if (tabOption.tabBodyBorderTop === true) {
					updateBlockAttributes(childBlock.clientId, {
						tabBodyBorderTop: true,
					});
				} else {
					updateBlockAttributes(childBlock.clientId, {
						tabBodyBorderTop: false,
					});
				}
			});
		}
	}, [tabOption.tabBodyBorderTop]);

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
	}, [firstActive]);

	useEffect(() => {
		if (childBlocks) {
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
		if (childBlocks) {
			const vkTab = e.target.closest('.vk_tab');
			const vkTabLabels = vkTab.querySelector('.vk_tab_labels');

			// ブロック ID を抽出
			const TabLabelId = e.target.closest('.vk_tab_labels_label').id;
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
				activeLabel.classList.add('vk_tab_labels_label-state-inactive');
			});

			// クリックされた要素にアクティブを追加
			const newActiveLabel = vkTabLabels.querySelector(
				`#vk_tab_labels_label-${TabId}`
			);
			newActiveLabel.classList.add('vk_tab_labels_label-state-active');
			newActiveLabel.classList.remove(
				'vk_tab_labels_label-state-inactive'
			);

			/* 本体の処理 */
			childBlocks.forEach((childBlock, index) => {
				if (TabId === childBlock.clientId) {
					setAttributes({ firstActive: parseInt(index, 10) });
					// 子ブロックを選択状態にする -> タブ文字が隠れて編集できなくなるので一旦コメントアウト
					// dispatch('core/block-editor').selectBlock(
					//     childBlock.clientId
					// );
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

	if (childBlocks.length !== 0) {
		tablabelsEditList = childBlocks.map((childBlock, index) => {
			let activeLabelClass = '';
			if (firstActive === index) {
				activeLabelClass = ' vk_tab_labels_label-state-active';
			}
			let tabColorClass = '';
			let tabColorStyle = {};
			let tabSpanColorClass = '';
			let tabSpanColorStyle = {};
			if (childBlock.attributes.tabColor !== '') {
				if (tabOption.tabLabelBackground) {
					tabColorClass = ' has-background';
					if (!isHexColor(childBlock.attributes.tabColor)) {
						tabColorClass += ` has-${childBlock.attributes.tabColor}-background-color`;
					} else {
						tabColorStyle = {
							backgroundColor: childBlock.attributes.tabColor,
						};
					}
				} else if (tabOption.tabLabelBorderTop) {
					tabSpanColorClass = ' has-border-top';
					if (!isHexColor(childBlock.attributes.tabColor)) {
						tabSpanColorClass += ` has-${childBlock.attributes.tabColor}-border-color`;
					} else {
						tabSpanColorStyle = {
							borderTopColor: childBlock.attributes.tabColor,
						};
					}
				}
			}

			return (
				<li
					key={index}
					id={`vk_tab_labels_label-${childBlock.attributes.blockId}`}
					className={`vk_tab_labels_label${activeLabelClass}${tabColorClass}`}
					style={tabColorStyle}
				>
					<RichText
						tagName="div"
						className={tabSpanColorClass}
						style={tabSpanColorStyle}
						value={childBlock.attributes.tabLabel}
						onChange={(content) => {
							updateBlockAttributes(childBlock.clientId, {
								tabLabel: content,
							});
						}}
						placeholder={sprintf(
							// translators: Tab label [i]
							__('Tab Label [ %s ]', 'vk-Blocks-pro'),
							index + 1
						)}
						onClick={(e) => {
							liOnClick(e);
						}}
					/>
				</li>
			);
		});
		tablabelsEdit = (
			<ul className={tabListClassName}>{tablabelsEditList}</ul>
		);
	}

	const blockProps = useBlockProps({
		className: `vk_tab`,
		id: `vk-tab-id-${blockId}`,
	});

	useEffect(() => {
		const tabLabels = document.querySelectorAll('.vk_tab_labels_label');
		const richTextLabels = document.querySelectorAll(
			'.block-editor-rich-text__editable'
		);
		let clickedActiveLabel = null;

		tabLabels.forEach((label) => {
			if (!label.classList.contains('vk_tab_labels_label-state-active')) {
				label.classList.add('vk_tab_labels_label-state-inactive');
			}

			label.addEventListener('click', (e) => {
				const TabLabelId = e.target.closest('.vk_tab_labels_label').id;
				const TabId = TabLabelId.replace('vk_tab_labels_label-', '');

				// 現在のアクティブなラベルとボディを取得
				const activeLabels = document.querySelectorAll(
					'.vk_tab_labels_label-state-active'
				);
				activeLabels.forEach((activeLabel) => {
					activeLabel.classList.remove(
						'vk_tab_labels_label-state-active'
					);
					activeLabel.classList.add(
						'vk_tab_labels_label-state-inactive'
					);
				});

				// 新しいアクティブなラベルを設定
				const newActiveLabel = document.querySelector(
					`#vk_tab_labels_label-${TabId}`
				);
				newActiveLabel.classList.add(
					'vk_tab_labels_label-state-active'
				);
				newActiveLabel.classList.remove(
					'vk_tab_labels_label-state-inactive'
				);
				clickedActiveLabel = newActiveLabel; // クリックでアクティブになったタブを追跡

				e.target.setAttribute('tabindex', '0');
				e.target.setAttribute('aria-selected', 'true');

				e.target.focus();
			});

			// ホバー時のクラスを変更
			label.addEventListener('mouseover', function () {
				if (this !== clickedActiveLabel) {
					this.classList.remove('vk_tab_labels_label-state-inactive');
					this.classList.add('vk_tab_labels_label-state-active');
				}
			});

			// ホバーが外れた時のクラスを戻す
			label.addEventListener('mouseout', function () {
				if (
					this !== clickedActiveLabel &&
					!this.classList.contains('hovered-temp-active')
				) {
					this.classList.remove('vk_tab_labels_label-state-active');
					this.classList.add('vk_tab_labels_label-state-inactive');
				}
			});
		});

		// RichTextラベルにも同じクリックイベントを適用
		richTextLabels.forEach((richText) => {
			richText.addEventListener('click', (e) => {
				const TabLabelId = e.target.closest('.vk_tab_labels_label').id;
				const TabId = TabLabelId.replace('vk_tab_labels_label-', '');

				// 現在のアクティブなラベルとボディを取得
				const activeLabels = document.querySelectorAll(
					'.vk_tab_labels_label-state-active'
				);
				activeLabels.forEach((activeLabel) => {
					activeLabel.classList.remove(
						'vk_tab_labels_label-state-active'
					);
					activeLabel.classList.add(
						'vk_tab_labels_label-state-inactive'
					);
				});

				// 新しいアクティブなラベルを設定
				const newActiveLabel = document.querySelector(
					`#vk_tab_labels_label-${TabId}`
				);
				newActiveLabel.classList.add(
					'vk_tab_labels_label-state-active'
				);
				newActiveLabel.classList.remove(
					'vk_tab_labels_label-state-inactive'
				);
				clickedActiveLabel = newActiveLabel; // クリックでアクティブになったタブを追跡

				e.target.setAttribute('tabindex', '0');
				e.target.setAttribute('aria-selected', 'true');

				e.target.focus();
			});
		});

		// クリーンアップ関数を追加してイベントリスナーを削除
		return () => {
			tabLabels.forEach((label) => {
				label.removeEventListener('click', () => {});
				label.removeEventListener('mouseover', () => {});
				label.removeEventListener('mouseout', () => {});
			});
			richTextLabels.forEach((richText) => {
				richText.removeEventListener('click', () => {});
			});
		};
	}, [childBlocks]); // 修正：依存関係を適切に設定

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Tab size Setting', 'vk-blocks-pro')}>
					<RadioControl
						label={__('Tab Size ( Smart Phone )', 'vk-blocks-pro')}
						selected={tabSizeSp}
						options={[
							{
								label: __('Fit to the text', 'vk-blocks-pro'),
								value: 'fitText',
							},
							{
								label: __('Monospaced', 'vk-blocks-pro'),
								value: 'monospaced',
							},
						]}
						onChange={(value) => {
							setAttributes({ tabSizeSp: value });
						}}
					/>
					<RadioControl
						label={__('Tab Size ( Tablet )', 'vk-blocks-pro')}
						selected={tabSizeTab}
						options={[
							{
								label: __('Fit to the text', 'vk-blocks-pro'),
								value: 'fitText',
							},
							{
								label: __('Monospaced', 'vk-blocks-pro'),
								value: 'monospaced',
							},
						]}
						onChange={(value) => {
							setAttributes({ tabSizeTab: value });
						}}
					/>
					<RadioControl
						label={__('Tab Size ( PC )', 'vk-blocks-pro')}
						selected={tabSizePc}
						options={[
							{
								label: __('Fit to the text', 'vk-blocks-pro'),
								value: 'fitText',
							},
							{
								label: __('Monospaced', 'vk-blocks-pro'),
								value: 'monospaced',
							},
						]}
						onChange={(value) => {
							setAttributes({ tabSizePc: value });
						}}
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
