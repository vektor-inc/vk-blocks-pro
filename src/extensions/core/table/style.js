// React Component
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

// Function to extract class name from an HTML string
// Function to extract class name from an HTML string
// const extractIconClass = (htmlString) => {
// 	const match = htmlString.match(/class="([^"]+)"/);
// 	return match ? match[1] : '';
// };

// Define the valid block types
const isValidBlockType = (name) => {
	const validBlockTypes = ['core/table'];
	return validBlockTypes.includes(name);
};

// Add attributes to block settings
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

// Enhance the Block Edit component
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
			iconOutputLeft,
			iconOutputRight,
		} = attributes;

		// Add or remove the CSS class for scrollable style
		const updatedClassName = className ? className.split(' ') : [];
		if (
			scrollable &&
			!updatedClassName.includes('is-style-vk-table-scrollable')
		) {
			updatedClassName.push('is-style-vk-table-scrollable');
		} else if (
			!scrollable &&
			updatedClassName.includes('is-style-vk-table-scrollable')
		) {
			const index = updatedClassName.indexOf(
				'is-style-vk-table-scrollable'
			);
			if (index > -1) {
				updatedClassName.splice(index, 1);
			}
		}

		// Update className attribute
		setAttributes({ className: updatedClassName.join(' ') });

		// Block properties for managing className
		const blockProps = useBlockProps({
			className: updatedClassName.join(' '),
		});

		// Define icon styles
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

		// Handle scrollable toggle change
		const handleToggleChange = (checked) => {
			setAttributes({ scrollable: checked });

			if (!checked) {
				setAttributes({
					showScrollMessage: false,
					scrollBreakpoint: 'table-scrollable-mobile', // Reset to default breakpoint
				});
			}
		};

		// Handle breakpoint selection change
		const handleSelectChange = (value) => {
			setAttributes({ scrollBreakpoint: value });
		};

		// Update attributes after component mounts or updates
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

		return <BlockEdit {...props} {...blockProps} />;
	};
}, 'addMyCustomBlockControls');
addFilter('editor.BlockEdit', 'vk-blocks/table-style', addBlockControl);

// Add extra content for save
const addExtraProps = (saveElementProps, blockType, attributes) => {
	if (isValidBlockType(blockType.name)) {
		if (attributes.scrollable) {
			saveElementProps.className = saveElementProps.className
				? saveElementProps.className
				: '';
			saveElementProps.className += ' is-style-vk-table-scrollable';
			saveElementProps['data-scroll-breakpoint'] =
				attributes.scrollBreakpoint;

			// 'showScrollMessage' が true の場合のみ 'data-output-scroll-hint' を追加
			if (attributes.showScrollMessage) {
				saveElementProps['data-output-scroll-hint'] = 'true';
			} else {
				delete saveElementProps['data-output-scroll-hint']; // falseの場合は削除
			}

			// iconOutputLeft が true の場合のみ属性を追加
			if (attributes.iconOutputLeft && attributes.showScrollMessage) {
				saveElementProps['data-icon-output-left'] = 'true';
			} else {
				delete saveElementProps['data-icon-output-left']; // falseの場合は削除
			}

			// iconOutputRight が true の場合のみ属性を追加
			if (attributes.iconOutputRight && attributes.showScrollMessage) {
				saveElementProps['data-icon-output-right'] = 'true';
			} else {
				delete saveElementProps['data-icon-output-right']; // falseの場合は削除
			}
		} else {
			saveElementProps.className = saveElementProps.className
				.replace('is-style-vk-table-scrollable', '')
				.trim();
			delete saveElementProps['data-scroll-breakpoint'];
			delete saveElementProps['data-output-scroll-hint'];
			delete saveElementProps['data-icon-output-left'];
			delete saveElementProps['data-icon-output-right'];
		}
	}

	return saveElementProps;
};
addFilter(
	'blocks.getSaveContent.extraProps',
	'vk-blocks/table-style',
	addExtraProps
);
