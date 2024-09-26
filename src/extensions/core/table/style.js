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
		} = attributes;

		const blockProps = useBlockProps({
			className: scrollable ? 'is-style-vk-table-scrollable' : '',
		});

		// アイコンスタイルを定義
		let iconStyle = {
			width: '24px',
			height: '24px',
		};

		if (scrollable) {
			iconStyle = {
				...iconStyle,
				color: '#fff',
				background: '#1e1e1e',
			};
		}

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

		// コンポーネントのマウントまたは更新後に属性を更新
		useEffect(() => {
			const updateTableScrollAttributes = () => {
				const tables = document.querySelectorAll(
					'.wp-block-table.is-style-vk-table-scrollable'
				);
				tables.forEach((table) => {
					const breakpoint =
						table.getAttribute('data-scroll-breakpoint') ||
						'table-scrollable-mobile';
					table.setAttribute('data-scroll-breakpoint', breakpoint);

					// data-output-scroll-hintがない場合、自動でfalseを設定
					if (!table.hasAttribute('data-output-scroll-hint')) {
						table.setAttribute('data-output-scroll-hint', 'false');
					}

					table.setAttribute(
						'data-output-scroll-hint',
						showScrollMessage ? 'true' : 'false'
					);

					// iconOutputLeftの制御
					table.setAttribute(
						'data-icon-output-left',
						iconOutputLeft ? 'true' : 'false'
					);

					// iconOutputRightの制御
					table.setAttribute(
						'data-icon-output-right',
						iconOutputRight ? 'true' : 'false'
					);
				});
			};

			updateTableScrollAttributes();
		}, [
			scrollable,
			scrollBreakpoint,
			showScrollMessage,
			scrollIconLeft,
			scrollIconRight,
			iconOutputLeft,
			iconOutputRight,
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
							icon={<Icon icon={IconSVG} style={iconStyle} />}
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
		saveElementProps.className = `${saveElementProps.className || ''} ${
			attributes.scrollable ? 'is-style-vk-table-scrollable' : ''
		}`.trim();

		// 'scrollable' が true の場合のみ 'data-scroll-breakpoint' を設定
		if (attributes.scrollable) {
			saveElementProps['data-scroll-breakpoint'] =
				attributes.scrollBreakpoint;
		} else {
			delete saveElementProps['data-scroll-breakpoint'];
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
		// scrollable が false の場合に不要な属性を削除
		delete saveElementProps['data-scroll-breakpoint'];
		delete saveElementProps['data-output-scroll-hint'];
		delete saveElementProps['data-icon-output-left'];
		delete saveElementProps['data-icon-output-right'];
	}

	return saveElementProps;
};
addFilter(
	'blocks.getSaveContent.extraProps',
	'vk-blocks/table-style',
	addExtraProps
);
