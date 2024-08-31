import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	Icon,
	BaseControl,
} from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import parse from 'html-react-parser';

/**
 * Internal dependencies
 */
import { ReactComponent as IconSVG } from './icon.svg';

const isValidBlockType = (name) => {
	const validBlockTypes = ['core/table'];
	return validBlockTypes.includes(name);
};

// クラス名を抽出する関数
const extractIconClass = (htmlString) => {
	const match = htmlString.match(/class="([^"]+)"/);
	return match ? match[1] : '';
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

		// FontAwesomeアイコンファミリーを取得
		const iconFamily = vkFontAwesome.iconFamily; // eslint-disable-line no-undef

		const updateScrollAttributes = (checked, value) => {
			let newClassName = className || '';

			// 現在のクラス名から is-style-vk-table-scrollable を削除
			newClassName = newClassName
				.replace('is-style-vk-table-scrollable', '')
				.trim();

			// scrollable クラスを付与または削除
			if (checked) {
				newClassName += ' is-style-vk-table-scrollable';
				setAttributes({
					className: newClassName.trim(),
					scrollable: checked,
					scrollBreakpoint: value,
				});
			} else {
				setAttributes({
					className: newClassName.trim(),
					scrollable: checked,
				});
			}
		};

		const handleToggleChange = (checked) => {
			updateScrollAttributes(checked, scrollBreakpoint);
		};

		const handleSelectChange = (value) => {
			setAttributes({
				scrollBreakpoint: value,
			});
		};

		// メッセージ表示のオン/オフを切り替える関数
		const handleScrollMessageToggle = (checked) => {
			setAttributes({ showScrollMessage: checked });
		};

		// メッセージテキストの変更を処理する関数
		const handleMessageTextChange = (value) => {
			setAttributes({ scrollMessageText: value });
		};

		// アイコンのスタイル
		const iconStyle = {
			width: '24px',
			height: '24px',
			...(scrollable && { color: '#fff', background: '#1e1e1e' }),
		};

		// 編集画面での属性を設定
		const blockProps = useBlockProps({
			className,
		});

		if (isValidBlockType(name) && props.isSelected) {
			// BlockEditの出力を取得し、figure要素を直接操作する
			const blockEditContent = <BlockEdit {...props} />;

			// 編集画面とフロントエンドの両方でメッセージを表示
			return (
				<>
					<div {...blockProps}>
						{scrollable && showScrollMessage && (
							<div
								className="vk-scroll-hint"
								data-scroll-breakpoint={scrollBreakpoint}
							>
								{/* アイコンの有無をチェックして表示 */}
								{scrollIconLeft && parse(scrollIconLeft)}
								<span>{scrollMessageText}</span>
								{scrollIconRight && parse(scrollIconRight)}
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
									<ToggleControl
										label={__(
											'Show Scroll Message',
											'vk-blocks-pro'
										)}
										checked={showScrollMessage}
										onChange={handleScrollMessageToggle}
									/>
									{showScrollMessage && (
										<>
											<TextControl
												label={__(
													'Scroll Message Text',
													'vk-blocks-pro'
												)}
												value={scrollMessageText}
												onChange={
													handleMessageTextChange
												}
											/>
											<h4 className={`mt-0 mb-2`}>
												{__('Icon', 'vk-blocks-pro') +
													' ( ' +
													iconFamily +
													' )'}
											</h4>
											<BaseControl
												label={__(
													'Before text',
													'vk-blocks-pro'
												)}
												id={`vk_alert-icon-left`}
											>
												<FontAwesome
													attributeName={
														'scrollIconLeft'
													}
													{...props}
												/>
											</BaseControl>
											<BaseControl
												label={__(
													'After text',
													'vk-blocks-pro'
												)}
												id={`vk_alert-icon-right`}
											>
												<FontAwesome
													attributeName={
														'scrollIconRight'
													}
													{...props}
												/>
											</BaseControl>
										</>
									)}
									<p>
										{__(
											'Table cells are no longer fixed width when horizontal scroll breakpoint is reached.',
											'vk-blocks-pro'
										)}
									</p>
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

			// showScrollMessage属性が有効な場合、data-hint-text属性を追加し、divを挿入
			if (attributes.showScrollMessage) {
				saveElementProps['data-hint-icon-left'] = extractIconClass(
					attributes.scrollIconLeft
				);
				saveElementProps['data-hint-icon-right'] = extractIconClass(
					attributes.scrollIconRight
				);

				// アイコンが存在する場合のみ挿入
				const iconLeftHtml = attributes.scrollIconLeft
					? parse(attributes.scrollIconLeft)
					: null;
				const iconRightHtml = attributes.scrollIconRight
					? parse(attributes.scrollIconRight)
					: null;

				saveElementProps.children = [
					<div
						key="scroll-message"
						data-scroll-breakpoint={attributes.scrollBreakpoint}
					>
						{iconLeftHtml}
						<span>{attributes.scrollMessageText}</span>
						{iconRightHtml}
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
			delete saveElementProps['data-hint-icon-left']; // 左アイコン属性を削除
			delete saveElementProps['data-hint-icon-right']; // 右アイコン属性を削除
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
		const minWidth = parseInt(breakpoint.replace(/\D/g, ''), 10);

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

			// ブレークポイントに基づく表示の制御
			const handleResize = () => {
				const currentWidth = window.innerWidth;
				if (currentWidth <= minWidth) {
					scrollHintDiv.style.display = 'block'; // ブレークポイント以下の幅では表示
				} else {
					scrollHintDiv.style.display = 'none'; // ブレークポイントを超えた幅では非表示
				}
			};

			// 初回の呼び出し
			handleResize();

			// リサイズイベントの設定
			window.addEventListener('resize', handleResize);
		}
	});
};

document.addEventListener('DOMContentLoaded', updateTableScrollAttributes);
