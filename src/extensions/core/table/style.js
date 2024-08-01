/**
 * table-style block type
 *
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	Icon,
} from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';

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
		};
	}
	return settings;
};
addFilter('blocks.registerBlockType', 'vk-blocks/table-style', addAttribute);

export const addBlockControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { attributes, setAttributes } = props;
		const { scrollable, scrollBreakpoint, className } = attributes;

		const [localScrollable, setLocalScrollable] = useState(scrollable);
		const [localScrollBreakpoint, setLocalScrollBreakpoint] =
			useState(scrollBreakpoint);

		useEffect(() => {
			if (scrollable !== localScrollable) {
				setLocalScrollable(scrollable);
			}
			if (scrollBreakpoint !== localScrollBreakpoint) {
				setLocalScrollBreakpoint(scrollBreakpoint);
			}
		}, [scrollable, scrollBreakpoint]);

		if (isValidBlockType(props.name) && props.isSelected) {
			// アイコンのスタイル
			let iconStyle = {
				width: '24px',
				height: '24px',
			};

			if (localScrollable) {
				iconStyle = {
					...iconStyle,
					color: '#fff',
					background: '#1e1e1e',
				};
			}

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
					setLocalScrollable(checked);
					setLocalScrollBreakpoint(value);
				} else {
					setAttributes({
						className: newClassName.trim(),
						scrollable: checked,
					});
					setLocalScrollable(checked);
				}
			};

			const handleToggleChange = (checked) => {
				updateScrollAttributes(checked, localScrollBreakpoint);
			};

			const handleSelectChange = (value) => {
				setLocalScrollBreakpoint(value);
				setAttributes({
					scrollBreakpoint: value,
				});
			};

			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__('Horizontal Scrolling Setting', 'vk-blocks-pro')}
							icon={<Icon icon={IconSVG} style={iconStyle} />}
							initialOpen={false}
						>
							<ToggleControl
								label={__('Scrollable', 'vk-blocks-pro')}
								checked={localScrollable}
								onChange={handleToggleChange}
							/>
							{localScrollable && (
								<SelectControl
									label={__(
										'Scroll Breakpoint',
										'vk-blocks-pro'
									)}
									value={localScrollBreakpoint}
									options={[
										{
											label: 'PC and up',
											value: 'table-scrollable-pc',
										},
										{
											label: 'Tablet and up',
											value: 'table-scrollable-tablet',
										},
										{
											label: 'Mobile and up',
											value: 'table-scrollable-mobile',
										},
									]}
									onChange={handleSelectChange}
								/>
							)}
							{localScrollable && (
								<RichText
									tagName="p"
									value={__(
										'Note: To check the screen width where horizontal scrolling will occur, please preview the page.',
										'vk-blocks-pro'
									)}
									allowedFormats={[]}
									disabled
								/>
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

const addExtraProps = (saveElementProps, blockType, attributes) => {
	if (isValidBlockType(blockType.name)) {
		if (attributes.scrollable) {
			saveElementProps.className = saveElementProps.className
				? saveElementProps.className
				: '';
			saveElementProps.className += ' is-style-vk-table-scrollable';
			saveElementProps['data-scroll-breakpoint'] =
				attributes.scrollBreakpoint;
		} else {
			saveElementProps.className = saveElementProps.className
				.replace('is-style-vk-table-scrollable', '')
				.trim();
			delete saveElementProps['data-scroll-breakpoint'];
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
		const selectedOption = table.querySelector(
			'option.table-scrollable-selected'
		);
		const breakpoint = selectedOption
			? selectedOption.value
			: 'table-scrollable-mobile';
		table.setAttribute('data-scroll-breakpoint', breakpoint);
		const minWidth = parseInt(breakpoint.replace(/\D/g, ''), 10);

		const handleResize = () => {
			const currentWidth = window.innerWidth;
			if (currentWidth <= minWidth) {
				table.style.overflowX = 'auto';
				table.style.webkitOverflowScrolling = 'touch';

				const innerTable = table.querySelector('table');
				if (innerTable) {
					innerTable.style.whiteSpace = 'nowrap';
				}
			} else {
				table.style.overflowX = '';
				table.style.webkitOverflowScrolling = '';

				const innerTable = table.querySelector('table');
				if (innerTable) {
					innerTable.style.whiteSpace = '';
				}
			}
		};

		// 初回の呼び出し
		handleResize();

		// リサイズイベントの設定
		window.addEventListener('resize', handleResize);
	});
};

document.addEventListener('DOMContentLoaded', updateTableScrollAttributes);
