import {
	InnerBlocks,
	useBlockProps,
	RichText,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { PanelBody, RadioControl } from '@wordpress/components';
import { useEffect, useMemo } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';
import { sanitizeSlug } from '@vkblocks/utils/sanitizeSlug';

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
		tabDisplayOptionsSp,
		tabDisplayOptionsTab,
		tabDisplayOptionsPc,
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
		(select) => select(blockEditorStore).getBlock(clientId).innerBlocks,
		[clientId]
	);

	// 選択されたブロックを監視
	const selectedBlockClientId = useSelect(
		(select) => select(blockEditorStore).getSelectedBlockClientId(),
		[]
	);

	// 選択されたブロックがタブアイテムの場合、対応するタブをアクティブにする
	useEffect(() => {
		if (selectedBlockClientId && childBlocks) {
			const selectedTabIndex = childBlocks.findIndex(
				(childBlock) => childBlock.clientId === selectedBlockClientId
			);

			// 選択されたブロックが現在のタブブロックの子ブロックの場合のみ処理
			if (selectedTabIndex !== -1 && selectedTabIndex !== firstActive) {
				// firstActiveを更新
				setAttributes({ firstActive: selectedTabIndex });

				// タブラベルの見た目を更新
				setTimeout(() => {
					updateTabLabelAppearance(selectedTabIndex);
				}, 100);
			}
		}
	}, [selectedBlockClientId, childBlocks, firstActive, blockId, clientId]);

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
					iconBefore: childBlock.attributes.iconBefore,
					iconAfter: childBlock.attributes.iconAfter,
					iconSizeBefore: childBlock.attributes.iconSizeBefore,
					iconSizeAfter: childBlock.attributes.iconSizeAfter,
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

	const tabBodyBorderTop = useMemo(() => {
		const tabOption = JSON.parse(tabOptionJSON);
		return tabOption.tabBodyBorderTop;
	}, [tabOptionJSON]);

	useEffect(() => {
		if (childBlocks) {
			childBlocks.forEach((childBlock) => {
				updateBlockAttributes(childBlock.clientId, {
					tabBodyBorderTop,
				});
			});
		}
	}, [tabBodyBorderTop, childBlocks]);

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
	}, [firstActive, childBlocks]);

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

	useEffect(() => {
		// 初期読み込み時にアクティブタブを設定
		const activeLabel = document.querySelector(
			'.vk_tab_labels_label-state-active'
		);
		if (activeLabel) {
			activeLabel.classList.add('vk_tab_labels_label-state-active');
			activeLabel.classList.remove('vk_tab_labels_label-state-inactive');
		}
		const inactiveLabels = document.querySelectorAll(
			'.vk_tab_labels_label:not(.vk_tab_labels_label-state-active)'
		);
		inactiveLabels.forEach((label) => {
			label.classList.add('vk_tab_labels_label-state-inactive');
			if (
				!label
					.closest('.vk_tab')
					.classList.contains('is-style-vk_tab_labels-line')
			) {
				label.style.setProperty(
					'background-color',
					'var(--vk-color-bg-inactive)',
					'important'
				);
			}
		});
	}, []);

	const liOnClick = (e) => {
		if (childBlocks) {
			// iframeの有無を確認し、適切なdocumentを取得
			const iframe = document.querySelector(
				'.block-editor-iframe__container iframe'
			);
			const targetDocument = iframe?.contentWindow?.document || document;

			const vkTab = e.target.closest('.vk_tab');
			if (!vkTab) {
				return;
			}

			const vkTabLabels = vkTab.querySelector('.vk_tab_labels');
			if (!vkTabLabels) {
				return;
			}

			// ブロック ID を抽出
			const TabLabelId = e.target.closest('.vk_tab_labels_label')?.id;
			if (!TabLabelId) {
				return;
			}

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
				if (
					!activeLabel
						.closest('.vk_tab')
						.classList.contains('is-style-vk_tab_labels-line')
				) {
					activeLabel.style.setProperty(
						'background-color',
						'var(--vk-color-bg-inactive)',
						'important'
					);
				}
			});

			// クリックされた要素にアクティブを追加
			const newActiveLabel = vkTabLabels.querySelector(
				`#vk_tab_labels_label-${TabId}`
			);
			if (newActiveLabel) {
				newActiveLabel.classList.add(
					'vk_tab_labels_label-state-active'
				);
				newActiveLabel.classList.remove(
					'vk_tab_labels_label-state-inactive'
				);
				newActiveLabel.style.removeProperty('background-color');
			}

			const activeTabBody = targetDocument.querySelector(
				`#block-${TabId}`
			);
			if (activeTabBody) {
				const activeTabBodyStyle =
					window.getComputedStyle(activeTabBody);
				if (
					!newActiveLabel
						.closest('.vk_tab')
						.classList.contains('is-style-vk_tab_labels-line')
				) {
					newActiveLabel.style.backgroundColor =
						activeTabBodyStyle.borderTopColor || '';
				}
			}

			/* 本体の処理 */
			childBlocks.forEach((childBlock, index) => {
				if (TabId === childBlock.clientId) {
					setAttributes({ firstActive: parseInt(index, 10) });
					// 子ブロックを選択状態にする -> タブ文字が隠れて編集できなくなるので一旦コメントアウト
					// dispatch('core/block-editor').selectBlock(
					//  childBlock.clientId
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
	if (tabDisplayOptionsSp === 'wrap2rows') {
		tabListClassName += ' vk_tab_labels--wrap-2rows-sp';
	} else if (tabDisplayOptionsSp === 'scroll') {
		tabListClassName += ' vk_tab_labels--scroll-sp';
	}
	if (tabDisplayOptionsTab === 'wrap2rows') {
		tabListClassName += ' vk_tab_labels--wrap-2rows-tab';
	} else if (tabDisplayOptionsTab === 'scroll') {
		tabListClassName += ' vk_tab_labels--scroll-tab';
	}
	if (tabDisplayOptionsPc === 'wrap2rows') {
		tabListClassName += ' vk_tab_labels--wrap-2rows-pc';
	} else if (tabDisplayOptionsPc === 'scroll') {
		tabListClassName += ' vk_tab_labels--scroll-pc';
	}
	tabSizes.forEach((tabSize) => {
		if (tabSize.attribute !== null && tabSize.attribute !== undefined) {
			tabListClassName += ` ${tabSizePrefix}--${tabSize.name}-${tabSize.attribute}`;
		}
	});

	// Remove scroll or wrap classes if "Not set" is selected
	if (tabDisplayOptionsSp === 'notSet') {
		tabListClassName = tabListClassName
			.replace(' vk_tab_labels--wrap-2rows-sp', '')
			.replace(' vk_tab_labels--scroll-sp', '');
	}
	if (tabDisplayOptionsTab === 'notSet') {
		tabListClassName = tabListClassName
			.replace(' vk_tab_labels--wrap-2rows-tab', '')
			.replace(' vk_tab_labels--scroll-tab', '');
	}
	if (tabDisplayOptionsPc === 'notSet') {
		tabListClassName = tabListClassName
			.replace(' vk_tab_labels--wrap-2rows-pc', '')
			.replace(' vk_tab_labels--scroll-pc', '');
	}

	let tablabelsEditList = '';
	let tablabelsEdit = '';

	if (childBlocks.length !== 0) {
		tablabelsEditList = childBlocks.map((childBlock, index) => {
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

			// アイコンがある場合のクラスを追加
			if (
				childBlock.attributes.iconBefore ||
				childBlock.attributes.iconAfter
			) {
				tabSpanColorClass += ' vk_tab_labels_label-icon';
			}

			if (childBlock.attributes.tabColor !== '') {
				if (tabOption.tabLabelBackground) {
					tabColorClass = ' has-background';
					if (!isHexColor(childBlock.attributes.tabColor)) {
						tabColorClass += ` has-${sanitizeSlug(childBlock.attributes.tabColor)}-background-color`;
					} else {
						tabColorStyle.backgroundColor =
							childBlock.attributes.tabColor;
					}
				} else if (tabOption.tabLabelBorderTop) {
					tabSpanColorClass = '';
					if (!isHexColor(childBlock.attributes.tabColor)) {
						tabSpanColorClass += ` has-${sanitizeSlug(childBlock.attributes.tabColor)}-border-color`;
					} else {
						tabSpanColorStyle.borderTopColor =
							childBlock.attributes.tabColor;
					}
					// Only set color if the label is active
					if (firstActive === index) {
						tabColorStyle.color = childBlock.attributes.tabColor;
						const borderColorClassMatch = tabSpanColorClass.match(
							/has-(.*)-border-color/
						);
						if (borderColorClassMatch) {
							// Correctly add the color class without duplicating 'has-border-top-HOGEHOGE'
							tabSpanColorClass = tabSpanColorClass.replace(
								/ has-border-top-HOGEHOGE/,
								''
							);
							tabSpanColorClass += ` has-${sanitizeSlug(borderColorClassMatch[1])}-color`;
						}
					}
				}
			}

			return (
				<li
					key={index}
					id={`vk_tab_labels_label-${childBlock.attributes.blockId}`}
					className={`vk_tab_labels_label${activeLabelClass}${tabColorClass}`}
					style={tabColorStyle}
					onClick={liOnClick}
					onMouseOver={(e) => {
						if (
							!e.currentTarget.classList.contains(
								'vk_tab_labels_label-state-active'
							)
						) {
							const activeTabBody = document.querySelector(
								`#block-${childBlock.attributes.blockId}`
							);
							// Only proceed if activeTabBody is a valid element
							if (activeTabBody) {
								const activeTabBodyStyle =
									window.getComputedStyle(activeTabBody);
								if (
									!e.currentTarget
										.closest('.vk_tab')
										.classList.contains(
											'is-style-vk_tab_labels-line'
										)
								) {
									e.currentTarget.style.backgroundColor =
										activeTabBodyStyle.borderTopColor || '';
								}
							}
							e.currentTarget.classList.add(
								'hovered-temp-active'
							);
						}
					}}
					onMouseOut={(e) => {
						if (
							!e.currentTarget.classList.contains(
								'vk_tab_labels_label-state-active'
							)
						) {
							if (
								!e.currentTarget
									.closest('.vk_tab')
									.classList.contains(
										'is-style-vk_tab_labels-line'
									)
							) {
								e.currentTarget.style.setProperty(
									'background-color',
									'var(--vk-color-bg-inactive)',
									'important'
								);
							} else {
								e.currentTarget.style.backgroundColor = '';
							}
							e.currentTarget.classList.remove(
								'hovered-temp-active'
							);
						}
					}}
					onFocus={(e) => {
						if (
							!e.currentTarget.classList.contains(
								'vk_tab_labels_label-state-active'
							)
						) {
							const activeTabBody = document.querySelector(
								`#block-${childBlock.attributes.blockId}`
							);
							// activeTabBodyが存在する場合のみ、getComputedStyleを実行する
							if (activeTabBody) {
								const activeTabBodyStyle =
									window.getComputedStyle(activeTabBody);
								if (
									!e.currentTarget
										.closest('.vk_tab')
										.classList.contains(
											'is-style-vk_tab_labels-line'
										)
								) {
									e.currentTarget.style.backgroundColor =
										activeTabBodyStyle.borderTopColor || '';
								}
							}
							e.currentTarget.classList.add(
								'hovered-temp-active'
							);
						}
					}}
					onBlur={(e) => {
						if (
							!e.currentTarget.classList.contains(
								'vk_tab_labels_label-state-active'
							)
						) {
							if (
								!e.currentTarget
									.closest('.vk_tab')
									.classList.contains(
										'is-style-vk_tab_labels-line'
									)
							) {
								e.currentTarget.style.setProperty(
									'background-color',
									'var(--vk-color-bg-inactive)',
									'important'
								);
							} else {
								e.currentTarget.style.backgroundColor = '';
							}
							e.currentTarget.classList.remove(
								'hovered-temp-active'
							);
						}
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							liOnClick(e);
						}
					}}
					tabIndex="0"
					aria-selected={firstActive === index}
					role="tab"
				>
					<div
						className={tabSpanColorClass}
						style={tabSpanColorStyle}
					>
						{childBlock.attributes.iconBefore && (
							<span className="vk_tab_labels_label-icon-before">
								<i
									className={childBlock.attributes.iconBefore}
									style={{
										fontSize:
											childBlock.attributes
												.iconSizeBefore,
									}}
								></i>
							</span>
						)}
						<RichText
							tagName={
								childBlock.attributes.iconBefore ||
								childBlock.attributes.iconAfter
									? 'span'
									: undefined
							}
							value={childBlock.attributes.tabLabel}
							onChange={(content) => {
								updateBlockAttributes(childBlock.clientId, {
									tabLabel: content,
								});
							}}
							placeholder={sprintf(
								// translators: %s is the tab number
								__('Tab Label [ %s ]', 'vk-blocks-pro'),
								index + 1
							)}
							onClick={(e) => {
								e.stopPropagation();
								liOnClick(e, index);
							}}
						/>
						{childBlock.attributes.iconAfter && (
							<span className="vk_tab_labels_label-icon-after">
								<i
									className={childBlock.attributes.iconAfter}
									style={{
										fontSize:
											childBlock.attributes.iconSizeAfter,
									}}
								></i>
							</span>
						)}
					</div>
				</li>
			);
		});
		tablabelsEdit = (
			<ul className={tabListClassName} role="tablist">
				{tablabelsEditList}
			</ul>
		);
	}

	const blockProps = useBlockProps({
		className: `vk_tab`,
		id: `vk-tab-id-${blockId || clientId}`,
	});

	// タブラベルの見た目を更新する共通関数
	const updateTabLabelAppearance = (selectedTabIndex) => {
		const iframe = document.querySelector(
			'.block-editor-iframe__container iframe'
		);
		const targetDocument = iframe?.contentWindow?.document || document;

		// 現在のタブブロックを特定
		const targetBlockId = blockId || clientId;
		let vkTab = targetDocument.querySelector(`#vk-tab-id-${targetBlockId}`);

		// デバッグ：実際に存在するタブブロックを確認
		const allVkTabs = targetDocument.querySelectorAll('.vk_tab');

		// 見つからない場合は、block-プレフィックスで検索
		if (!vkTab) {
			vkTab = targetDocument.querySelector(`#block-${targetBlockId}`);
		}

		// 見つからない場合は、clientIdで再試行
		if (!vkTab && blockId !== clientId) {
			vkTab = targetDocument.querySelector(`#vk-tab-id-${clientId}`);
			if (!vkTab) {
				vkTab = targetDocument.querySelector(`#block-${clientId}`);
			}
		}

		// それでも見つからない場合は、最初の.vk_tabを使用（単一の場合のみ）
		if (!vkTab && allVkTabs.length === 1) {
			vkTab = allVkTabs[0];
		}

		// 早期リターン: タブブロックが見つからない場合
		if (!vkTab) {
			return;
		}

		const vkTabLabels = vkTab.querySelector('.vk_tab_labels');
		if (!vkTabLabels) {
			return;
		}

		// 全てのタブラベルを取得
		const allLabels = vkTabLabels.querySelectorAll('.vk_tab_labels_label');

		// 変数の最適化: ラインスタイルかどうかを事前に計算
		const isLineStyle = vkTab.classList.contains(
			'is-style-vk_tab_labels-line'
		);

		// 全てのタブを非アクティブにする
		allLabels.forEach((label) => {
			label.classList.remove('vk_tab_labels_label-state-active');
			label.classList.add('vk_tab_labels_label-state-inactive');
			if (!isLineStyle) {
				label.style.setProperty(
					'background-color',
					'var(--vk-color-bg-inactive)',
					'important'
				);
			}
		});

		// 選択されたタブをアクティブにする
		const targetLabel = allLabels[selectedTabIndex];
		if (!targetLabel) {
			return;
		}

		targetLabel.classList.add('vk_tab_labels_label-state-active');
		targetLabel.classList.remove('vk_tab_labels_label-state-inactive');
		targetLabel.style.removeProperty('background-color');

		// タブボディの色を取得してラベルに適用
		const selectedChildBlock = childBlocks[selectedTabIndex];
		const tabBodyBlockId =
			selectedChildBlock.attributes.blockId ||
			selectedChildBlock.clientId;
		const activeTabBody = targetDocument.querySelector(
			`#block-${tabBodyBlockId}`
		);

		if (!activeTabBody || isLineStyle) {
			return;
		}

		const activeTabBodyStyle = window.getComputedStyle(activeTabBody);
		const borderTopColor = activeTabBodyStyle.borderTopColor;

		if (
			borderTopColor &&
			borderTopColor !== 'rgba(0, 0, 0, 0)' &&
			borderTopColor !== 'transparent'
		) {
			targetLabel.style.setProperty(
				'background-color',
				borderTopColor,
				'important'
			);
		} else {
			// フォールバック：タブの色属性を使用
			const tabColor = selectedChildBlock.attributes.tabColor;
			if (tabColor) {
				targetLabel.style.setProperty(
					'background-color',
					tabColor,
					'important'
				);
			}
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Tab Size Setting', 'vk-blocks-pro')}>
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
				<PanelBody title={__('Tab Display Options', 'vk-blocks-pro')}>
					<p>
						{__(
							'If there are many labels or the screen width is narrow, you can adjust it here. *Tab size setting will not be effective.',
							'vk-blocks-pro'
						)}
					</p>
					<RadioControl
						label={__(
							'Tab Display Options ( Smart Phone )',
							'vk-blocks-pro'
						)}
						selected={tabDisplayOptionsSp}
						options={[
							{
								label: __('Not set', 'vk-blocks-pro'),
								value: 'notSet',
							},
							{
								label: __('Scroll', 'vk-blocks-pro'),
								value: 'scroll',
							},
							{
								label: __('Wrap to 2 rows', 'vk-blocks-pro'),
								value: 'wrap2rows',
							},
						]}
						onChange={(value) => {
							setAttributes({ tabDisplayOptionsSp: value });
						}}
					/>
					<RadioControl
						label={__(
							'Tab Display Options ( Tablet )',
							'vk-blocks-pro'
						)}
						selected={tabDisplayOptionsTab}
						options={[
							{
								label: __('Not set', 'vk-blocks-pro'),
								value: 'notSet',
							},
							{
								label: __('Scroll', 'vk-blocks-pro'),
								value: 'scroll',
							},
							{
								label: __('Wrap to 2 rows', 'vk-blocks-pro'),
								value: 'wrap2rows',
							},
						]}
						onChange={(value) => {
							setAttributes({ tabDisplayOptionsTab: value });
						}}
					/>
					<RadioControl
						label={__(
							'Tab Display Options ( PC )',
							'vk-blocks-pro'
						)}
						selected={tabDisplayOptionsPc}
						options={[
							{
								label: __('Not set', 'vk-blocks-pro'),
								value: 'notSet',
							},
							{
								label: __('Scroll', 'vk-blocks-pro'),
								value: 'scroll',
							},
							{
								label: __('Wrap to 2 rows', 'vk-blocks-pro'),
								value: 'wrap2rows',
							},
						]}
						onChange={(value) => {
							setAttributes({ tabDisplayOptionsPc: value });
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
