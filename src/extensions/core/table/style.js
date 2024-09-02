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
import parse from 'html-react-parser';

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
				default: 'table-scrollable-mobile', // デフォルトをMobileブレイクポイントに設定
			},
			showScrollMessage: {
				// 新しい属性を追加
				type: 'boolean',
				default: false,
			},
			scrollMessageText: {
				// 新しい属性を追加
				type: 'string',
				default: __('You can scroll', 'vk-blocks-pro'), // デフォルトメッセージ
			},
			scrollIconLeft: {
				// 新しい属性を追加
				type: 'string',
				default: '<i class="fa-solid fa-caret-left"></i>', // デフォルトアイコン（左）
			},
			scrollIconRight: {
				// 新しい属性を追加
				type: 'string',
				default: '<i class="fa-solid fa-caret-right"></i>', // デフォルトアイコン（右）
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
			className,
			showScrollMessage,
			scrollMessageText,
			scrollIconLeft,
			scrollIconRight,
		} = attributes;

		const blockProps = useBlockProps({
			className,
		});

		// handleToggleChange関数の定義
		const handleToggleChange = (checked) => {
			setAttributes({ scrollable: checked });

			if (!checked) {
				setAttributes({
					showScrollMessage: false,
					scrollBreakpoint: 'table-scrollable-mobile', // デフォルトのブレイクポイントに戻す
				});
			}
		};

		// ブレイクポイント変更時のハンドリング関数
		const handleSelectChange = (value) => {
			setAttributes({ scrollBreakpoint: value });
		};

		// スクロールメッセージのトグル切り替え
		const handleScrollMessageToggle = (checked) => {
			setAttributes({ showScrollMessage: checked });
		};

		// スクロールメッセージのテキスト変更ハンドラー
		const handleMessageTextChange = (value) => {
			setAttributes({ scrollMessageText: value });
		};

		// アイコンのスタイル
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

		if (isValidBlockType(name) && props.isSelected) {
			const blockEditContent = <BlockEdit {...props} />;

			return (
				<>
					<div {...blockProps}>
						{scrollable && showScrollMessage && (
							<div
								className="vk-scroll-hint"
								data-scroll-breakpoint={scrollBreakpoint}
								data-hint-icon-left={scrollIconLeft}
								data-hint-icon-right={scrollIconRight}
							>
								{parse(scrollIconLeft)}
								<span>{scrollMessageText}</span>
								{parse(scrollIconRight)}
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
								onChange={handleToggleChange} // ここで正しい関数を参照
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
										handleScrollMessageToggle={
											handleScrollMessageToggle
										}
										handleMessageTextChange={
											handleMessageTextChange
										}
										{...props}
									/>
								</>
							)}
						</PanelBody>
					</InspectorControls>
				</>
			);
		}

		return <BlockEdit {...props} {...blockProps} />;
	};
}, 'addMyCustomBlockControls');
addFilter('editor.BlockEdit', 'vk-blocks/table-style', addBlockControl);

// 保存用のエクストラコンテンツを追加
const addExtraProps = (saveElementProps, blockType, attributes) => {
	if (isValidBlockType(blockType.name)) {
		if (attributes.scrollable) {
			saveElementProps.className = saveElementProps.className
				? saveElementProps.className
				: '';
			saveElementProps.className += ' is-style-vk-table-scrollable';
			saveElementProps['data-scroll-breakpoint'] =
				attributes.scrollBreakpoint;

			// Add the Scroll Hint component before the table if showScrollMessage is true
			if (attributes.showScrollMessage) {
				saveElementProps.children = [
					<div
						key="scroll-hint"
						className="vk-scroll-hint"
						data-scroll-breakpoint={attributes.scrollBreakpoint}
						data-hint-icon-left={attributes.scrollIconLeft}
						data-hint-icon-right={attributes.scrollIconRight}
					>
						{parse(attributes.scrollIconLeft)}
						<span>{attributes.scrollMessageText}</span>
						{parse(attributes.scrollIconRight)}
					</div>,
					saveElementProps.children,
				];
			} else {
				delete saveElementProps['data-hint-icon-left'];
				delete saveElementProps['data-hint-icon-right'];
			}
		} else {
			saveElementProps.className = saveElementProps.className
				.replace('is-style-vk-table-scrollable', '')
				.trim();
			delete saveElementProps['data-scroll-breakpoint'];
			delete saveElementProps['data-hint-icon-left'];
			delete saveElementProps['data-hint-icon-right'];
		}
	}

	return saveElementProps;
};
addFilter(
	'blocks.getSaveContent.extraProps',
	'vk-blocks/table-style',
	addExtraProps
);

// 横スクロールを処理する関数を定義
const updateTableScrollAttributes = () => {
	const tables = document.querySelectorAll(
		'.wp-block-table.is-style-vk-table-scrollable'
	);
	tables.forEach((table) => {
		const breakpoint =
			table.getAttribute('data-scroll-breakpoint') ||
			'table-scrollable-mobile';
		table.setAttribute('data-scroll-breakpoint', breakpoint);

		// スクロールヒントアイコンの生成
		const scrollHintDiv = table.previousElementSibling; // .vk-scroll-hint を取得
		if (
			scrollHintDiv &&
			scrollHintDiv.classList.contains('vk-scroll-hint')
		) {
			const iconLeftClass = scrollHintDiv.getAttribute(
				'data-hint-icon-left'
			);
			const iconRightClass = scrollHintDiv.getAttribute(
				'data-hint-icon-right'
			);

			// アイコンのクラス名をチェックし、設定する
			if (iconLeftClass) {
				scrollHintDiv.querySelector(
					'.fa-solid.fa-caret-left'
				).className = `fa-solid ${iconLeftClass}`;
			}
			if (iconRightClass) {
				scrollHintDiv.querySelector(
					'.fa-solid.fa-caret-right'
				).className = `fa-solid ${iconRightClass}`;
			}
		}
	});
};

document.addEventListener('DOMContentLoaded', updateTableScrollAttributes);
