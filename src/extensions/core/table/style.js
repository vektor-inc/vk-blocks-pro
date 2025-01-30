import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	Icon,
} from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ScrollHint from '@vkblocks/components/scroll-hint';

/**
 * Internal dependencies
 */
import { ReactComponent as IconSVG } from './icon.svg';

const isValidBlockType = (name) => {
	const validBlockTypes = ['core/table'];
	return validBlockTypes.includes(name);
};

export const addAttribute = (settings) => {
	if (isValidBlockType(settings.name)) {
		settings.attributes = {
			...settings.attributes,
			scrollable: {
				type: 'boolean',
			},
			scrollBreakpoint: {
				type: 'string',
				default: 'table-scrollable-mobile',
			},
			showScrollMessage: {
				type: 'boolean',
				default: false,
			},
			scrollMessageText: {
				type: 'string',
				default: __('You can scroll', 'vk-blocks-pro'),
			},
			scrollIconLeft: {
				type: 'string',
				default: 'fa-solid fa-caret-left',
			},
			scrollIconRight: {
				type: 'string',
				default: 'fa-solid fa-caret-right',
			},
			iconOutputLeft: {
				type: 'boolean',
				default: true,
			},
			iconOutputRight: {
				type: 'boolean',
				default: true,
			},
			cellVertical: {
				type: 'boolean',
				default: false,
			},
			cellVerticalBreakpoint: {
				type: 'string',
				default: 'table-cell-vertical-mobile',
			},
		};
	}
	return settings;
};
addFilter('blocks.registerBlockType', 'vk-blocks/table-style', addAttribute);

export const addBlockControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { attributes, setAttributes, name } = props;
		const {
			scrollable,
			scrollBreakpoint,
			showScrollMessage,
			scrollMessageText,
			scrollIconLeft,
			scrollIconRight,
			iconOutputLeft,
			iconOutputRight,
			cellVertical,
			cellVerticalBreakpoint,
		} = attributes;

		const blockProps = useBlockProps({
			className:
				`${scrollable ? 'is-style-vk-table-scrollable' : ''} ${cellVertical ? 'is-style-vk-table-cell-vertical' : ''}`.trim(),
			...(scrollable && { 'data-scroll-breakpoint': scrollBreakpoint }),
			...(cellVertical && {
				'data-cell-vertical-breakpoint': cellVerticalBreakpoint,
			}),
		});

		// アイコンスタイルを定義
		const iconStyle = {
			width: '24px',
			height: '24px',
		};

		// scrollable に関連するアイコンスタイル
		const scrollableIconStyle = {
			color: scrollable ? '#fff' : 'initial', // scrollable が ON のときは白、OFF のときはデフォルト
			background: scrollable ? '#1e1e1e' : 'transparent', // scrollable が ON のときは背景色、OFF のときは透明
		};

		// cellVertical に関連するアイコンスタイル
		const cellVerticalIconStyle = {
			color: cellVertical ? '#fff' : 'initial', // cellVertical が ON のときは白、OFF のときはデフォルト
			background: cellVertical ? '#1e1e1e' : 'transparent', // cellVertical が ON のときは背景色、OFF のときは透明
		};

		// scrollable 用アイコンスタイルを独立して適用
		const scrollableIconStyleFinal = {
			...iconStyle,
			...scrollableIconStyle,
		};

		// cellVertical 用アイコンスタイルを独立して適用
		const cellVerticalIconStyleFinal = {
			...iconStyle,
			...cellVerticalIconStyle,
		};

		// スクロール可能トグル変更のハンドル
		const handleToggleChange = (checked) => {
			setAttributes({ scrollable: checked });

			if (!checked) {
				setAttributes({
					showScrollMessage: false,
					scrollBreakpoint: 'table-scrollable-mobile',
				});
			}
		};

		// ブレークポイント選択変更のハンドル
		const handleSelectChange = (value) => {
			setAttributes({ scrollBreakpoint: value });
		};

		// cellVerticalトグル変更のハンドル
		const handleCellVerticalToggleChange = (checked) => {
			setAttributes({ cellVertical: checked });

			if (!checked) {
				// OFF の場合、関連するクラスや属性をリセット
				setAttributes({
					cellVerticalBreakpoint: 'table-cell-vertical-mobile',
				});
			}
		};

		// cellVerticalブレークポイント選択変更のハンドル
		const handleCellVerticalSelectChange = (value) => {
			setAttributes({ cellVerticalBreakpoint: value });
		};

		// コンポーネントのマウントまたは更新後に属性を更新
		useEffect(() => {
			// 初期ロード時にクラスや属性を確認して scrollable を ON にする∂
			const checkTableScrollAttributes = () => {
				const tables = document.querySelectorAll('.wp-block-table');
				tables.forEach((table) => {
					// もし is-style-vk-table-scrollable クラスや data-scroll-breakpoint 属性がついていたら scrollable を ON に設定
					if (
						table.classList.contains(
							'is-style-vk-table-scrollable'
						) ||
						table.hasAttribute('data-scroll-breakpoint')
					) {
						setAttributes({ scrollable: true });
					}
				});
			};

			// コンポーネントの初回レンダリング時に実行
			checkTableScrollAttributes();
		}, []); // 初期レンダリング時のみ実行

		// scrollable、cellVertical の状態が確定したら処理を実行
		useEffect(() => {
			const updateTableAttributes = () => {
				// .wp-block-table を持つすべてのテーブル要素を取得
				const tables = document.querySelectorAll('.wp-block-table');
				tables.forEach((table) => {
					// scrollable 状態に応じてクラスと属性を更新
					if (!scrollable) {
						table.classList.remove('is-style-vk-table-scrollable');
						table.removeAttribute('data-scroll-breakpoint');
					} else {
						const breakpoint =
							table.getAttribute('data-scroll-breakpoint') ||
							'table-scrollable-mobile';
						table.classList.add('is-style-vk-table-scrollable');
						table.setAttribute(
							'data-scroll-breakpoint',
							breakpoint
						);
					}

					table.setAttribute(
						'data-output-scroll-hint',
						showScrollMessage ? 'true' : 'false'
					);

					table.setAttribute(
						'data-icon-output-left',
						iconOutputLeft ? 'true' : 'false'
					);

					table.setAttribute(
						'data-icon-output-right',
						iconOutputRight ? 'true' : 'false'
					);

					// cellVertical 状態に応じたクラスと属性を更新
					if (!cellVertical) {
						// cellVertical が OFF の場合
						table.classList.remove(
							'is-style-vk-table-cell-vertical'
						);
						table.removeAttribute('data-cell-vertical-breakpoint');
					} else {
						// cellVertical が ON の場合
						table.classList.add('is-style-vk-table-cell-vertical');
						table.setAttribute(
							'data-cell-vertical-breakpoint',
							cellVerticalBreakpoint
						);
					}
				});
			};

			// 状態が undefined でない場合のみ実行
			if (typeof scrollable !== 'undefined') {
				updateTableAttributes();
			}
		}, [
			scrollable,
			scrollBreakpoint,
			showScrollMessage,
			scrollIconLeft,
			scrollIconRight,
			iconOutputLeft,
			iconOutputRight,
			cellVertical,
			cellVerticalBreakpoint,
		]);

		if (isValidBlockType(name) && props.isSelected) {
			const blockEditContent = <BlockEdit {...props} />;

			return (
				<>
					<div {...blockProps}>
						{scrollable && showScrollMessage && (
							<div
								className="vk-scroll-hint"
								data-scroll-breakpoint={scrollBreakpoint}
								data-icon-output-left={
									iconOutputLeft ? 'true' : 'false'
								}
								data-icon-output-right={
									iconOutputRight ? 'true' : 'false'
								}
								data-hint-icon-left={
									iconOutputLeft ? scrollIconLeft : ''
								}
								data-hint-icon-right={
									iconOutputRight ? scrollIconRight : ''
								}
							>
								{iconOutputLeft && (
									<i
										className={`${scrollIconLeft} left-icon`}
									></i>
								)}
								<span>{scrollMessageText}</span>
								{iconOutputRight && (
									<i
										className={`${scrollIconRight} right-icon`}
									></i>
								)}
							</div>
						)}
						{blockEditContent}
					</div>
					<InspectorControls>
						<PanelBody
							title={__(
								'Table Horizontal Scroll',
								'vk-blocks-pro'
							)}
							icon={
								<Icon
									icon={IconSVG}
									style={scrollableIconStyleFinal}
								/>
							}
							initialOpen={false}
						>
							<ToggleControl
								label={__('Scrollable', 'vk-blocks-pro')}
								checked={scrollable}
								onChange={handleToggleChange}
							/>
							{scrollable && (
								<>
									<SelectControl
										label={__(
											'Horizontal Scroll Breakpoint',
											'vk-blocks-pro'
										)}
										value={scrollBreakpoint}
										options={[
											{
												label: __(
													'Mobile size',
													'vk-blocks-pro'
												),
												value: 'table-scrollable-mobile',
											},
											{
												label: __(
													'Tablet size',
													'vk-blocks-pro'
												),
												value: 'table-scrollable-tablet',
											},
											{
												label: __(
													'PC size',
													'vk-blocks-pro'
												),
												value: 'table-scrollable-pc',
											},
										]}
										onChange={handleSelectChange}
									/>
									<ScrollHint
										showScrollMessage={showScrollMessage}
										scrollMessageText={scrollMessageText}
										scrollIconLeft={scrollIconLeft}
										scrollIconRight={scrollIconRight}
										{...props}
									/>
								</>
							)}
						</PanelBody>
						<PanelBody
							title={__('Table Cell Vertical', 'vk-blocks-pro')}
							icon={
								<Icon
									icon={IconSVG}
									style={cellVerticalIconStyleFinal}
								/>
							}
							initialOpen={false}
						>
							<ToggleControl
								label={__('Cell Vertical', 'vk-blocks-pro')}
								checked={cellVertical}
								onChange={handleCellVerticalToggleChange}
							/>
							{cellVertical && (
								<>
									<SelectControl
										label={__(
											'Cell Vertical Breakpoint',
											'vk-blocks-pro'
										)}
										value={cellVerticalBreakpoint}
										options={[
											{
												label: __(
													'Mobile size',
													'vk-blocks-pro'
												),
												value: 'table-cell-vertical-mobile',
											},
											{
												label: __(
													'Tablet size',
													'vk-blocks-pro'
												),
												value: 'table-cell-vertical-tablet',
											},
											{
												label: __(
													'PC size',
													'vk-blocks-pro'
												),
												value: 'table-cell-vertical-pc',
											},
										]}
										onChange={
											handleCellVerticalSelectChange
										}
									/>
								</>
							)}
						</PanelBody>
					</InspectorControls>
				</>
			);
		}

		return <BlockEdit {...props} />;
	};
}, 'addMyCustomBlockControls');
addFilter('editor.BlockEdit', 'vk-blocks/table-style', addBlockControl);

// 保存時に追加のプロパティを設定
const addExtraProps = (saveElementProps, blockType, attributes) => {
	if (isValidBlockType(blockType.name)) {
		// 'scrollable' が true の場合のみ 'is-style-vk-table-scrollable' クラスと 'data-scroll-breakpoint' を設定
		if (attributes.scrollable) {
			saveElementProps.className =
				`${saveElementProps.className || ''} is-style-vk-table-scrollable`.trim();
			saveElementProps['data-scroll-breakpoint'] =
				attributes.scrollBreakpoint;
		}

		// cellVerticalがtrueの場合にcellVerticalBreakpointを設定
		if (attributes.cellVertical) {
			saveElementProps.className += ` is-style-vk-table-cell-vertical`;
			saveElementProps['data-cell-vertical-breakpoint'] =
				attributes.cellVerticalBreakpoint;
		} else {
			// cellVerticalがfalseの場合、不要なクラスや属性を削除
			saveElementProps.className = saveElementProps.className
				.replace('is-style-vk-table-cell-vertical', '')
				.trim();
			delete saveElementProps['data-cell-vertical-breakpoint'];
		}

		// 'showScrollMessage' が true の場合のみ 'data-output-scroll-hint' を追加
		if (attributes.showScrollMessage) {
			saveElementProps['data-output-scroll-hint'] = 'true';
		} else {
			delete saveElementProps['data-output-scroll-hint'];
		}

		// iconOutputLeft が true の場合のみ属性を追加
		if (attributes.iconOutputLeft && attributes.showScrollMessage) {
			saveElementProps['data-icon-output-left'] = 'true';
		} else {
			delete saveElementProps['data-icon-output-left'];
		}

		// iconOutputRight が true の場合のみ属性を追加
		if (attributes.iconOutputRight && attributes.showScrollMessage) {
			saveElementProps['data-icon-output-right'] = 'true';
		} else {
			delete saveElementProps['data-icon-output-right'];
		}
	} else {
		// 他のブロックでは不要な属性を削除
		delete saveElementProps['data-scroll-breakpoint'];
		delete saveElementProps['data-output-scroll-hint'];
		delete saveElementProps['data-icon-output-left'];
		delete saveElementProps['data-icon-output-right'];
		delete saveElementProps['data-cell-vertical-breakpoint'];
	}

	return saveElementProps;
};
addFilter(
	'blocks.getSaveContent.extraProps',
	'vk-blocks/table-style',
	addExtraProps
);

const removeVkTableMobileBlockFromEditor = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			const { attributes, setAttributes } = props;

			// `cellVertical` が `true` の場合のみ `.vk-table--mobile-block` を削除
			if (
				attributes?.cellVertical &&
				attributes?.className?.includes('vk-table--mobile-block')
			) {
				const updatedClassName = attributes.className
					.replace(/\bvk-table--mobile-block\b/g, '')
					.trim();

				// `setAttributes` を使用して `className` を更新
				if (updatedClassName !== attributes.className) {
					setAttributes({ className: updatedClassName });
				}
			}

			return <BlockListBlock {...props} />;
		};
	},
	'withRemoveVkTableMobileBlock'
);

addFilter(
	'editor.BlockListBlock',
	'vk-blocks/remove-vk-table-mobile-block',
	removeVkTableMobileBlockFromEditor
);
