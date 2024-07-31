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
import { InspectorControls } from '@wordpress/block-editor';
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
		const [localScrollBreakpoint, setLocalScrollBreakpoint] = useState(scrollBreakpoint);

		useEffect(() => {
			const tableElement = document.querySelector('.is-style-vk-table-scrollable');
			if (tableElement) {
				if (localScrollable) {
					tableElement.setAttribute('data-scroll-breakpoint', localScrollBreakpoint);
				} else {
					tableElement.removeAttribute('data-scroll-breakpoint');
				}
			}
		}, [localScrollBreakpoint, localScrollable]);

		useEffect(() => {
			const selectElement = document.querySelector('.components-select-control__input');
			const options = selectElement?.options;
			if (options) {
				for (let i = 0; i < options.length; i++) {
					if (options[i].value === localScrollBreakpoint) {
						options[i].setAttribute('id', 'table-scrollable-selected');
					} else {
						options[i].removeAttribute('id');
					}
				}
			}
		}, [localScrollBreakpoint]);

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
				} else {
					removeTableScroll();
				}

				setAttributes({
					className: newClassName.trim(),
					scrollable: checked,
					scrollBreakpoint: value === 'table-scrollable-mobile' ? 'table-scrollable-mobile' : value,
				});

				setLocalScrollable(checked);
				setLocalScrollBreakpoint(value === 'table-scrollable-mobile' ? 'table-scrollable-mobile' : value);

				// スクロール機能を呼び出し
				updateTableScrollAttributes();
			};

			const handleToggleChange = (checked) => {
				updateScrollAttributes(checked, localScrollBreakpoint);
			};

			const handleSelectChange = (value) => {
				setLocalScrollBreakpoint(value);
				setAttributes({
					scrollBreakpoint: value,
				});
				updateTableScrollAttributes();
			};

			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__('Table Option', 'vk-blocks-pro')}
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
									label={__('Scroll Breakpoint', 'vk-blocks-pro')}
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
		const selectedOption = table.querySelector('option#table-scrollable-selected');
		const breakpoint = selectedOption ? selectedOption.value : 'table-scrollable-mobile';
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

// スクロール機能を取り外し
const removeTableScroll = () => {
	const tables = document.querySelectorAll(
		'.wp-block-table.is-style-vk-table-scrollable'
	);
	tables.forEach((table) => {
		table.style.overflowX = '';
		table.style.webkitOverflowScrolling = '';
		table.removeAttribute('data-scroll-breakpoint');

		const innerTable = table.querySelector('table');
		if (innerTable) {
			innerTable.style.whiteSpace = '';
		}
	});
};

document.addEventListener('DOMContentLoaded', updateTableScrollAttributes);
