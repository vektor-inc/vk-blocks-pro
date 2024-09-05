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
const extractIconClass = (htmlString) => {
	const match = htmlString.match(/class="([^"]+)"/);
	return match ? match[1] : '';
};

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
				default: '<i class="fa-solid fa-caret-left"></i>',
			},
			scrollIconRight: {
				type: 'string',
				default: '<i class="fa-solid fa-caret-right"></i>',
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

		// Handle scroll message toggle
		const handleScrollMessageToggle = (checked) => {
			setAttributes({ showScrollMessage: checked });
		};

		// Handle scroll message text change
		const handleMessageTextChange = (value) => {
			setAttributes({ scrollMessageText: value });
		};

		// Handle icon change
		const handleIconChange = (position, value) => {
			if (position === 'left') {
				const newIconClass = extractIconClass(value); // Extract class name
				setAttributes({ scrollIconLeft: newIconClass });
			} else if (position === 'right') {
				const newIconClass = extractIconClass(value); // Extract class name
				setAttributes({ scrollIconRight: newIconClass });
			}
		};

		// Toggle icon output
		const handleIconOutputToggle = (position) => {
			if (position === 'left') {
				setAttributes({ iconOutputLeft: !iconOutputLeft });
			} else if (position === 'right') {
				setAttributes({ iconOutputRight: !iconOutputRight });
			}
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
					table.setAttribute(
						'data-output-scroll-hint',
						showScrollMessage ? 'true' : 'false'
					);

					// Add or remove data-output-scroll-message based on showScrollMessage
					if (showScrollMessage) {
						table.setAttribute(
							'data-output-scroll-message',
							'true'
						);
					} else {
						table.removeAttribute('data-output-scroll-message');
					}

					// スクロールヒントアイコンの更新
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

						// アイコンの出力をチェックして動的に表示
						if (
							scrollHintDiv.getAttribute(
								'data-icon-output-left'
							) === 'true' &&
							iconLeftClass
						) {
							const leftIconElement =
								scrollHintDiv.querySelector('i.left-icon');
							if (!leftIconElement) {
								// 存在しない場合、動的にアイコンを追加
								scrollHintDiv.insertAdjacentHTML(
									'afterbegin',
									`<i class="${iconLeftClass} left-icon"></i>`
								);
							}
						} else {
							// アイコンの出力フラグがfalseの場合はアイコンを表示しない
							const leftIconElement =
								scrollHintDiv.querySelector('i.left-icon');
							if (leftIconElement) {
								leftIconElement.style.display = 'none';
							}
						}

						if (
							scrollHintDiv.getAttribute(
								'data-icon-output-right'
							) === 'true' &&
							iconRightClass
						) {
							const rightIconElement =
								scrollHintDiv.querySelector('i.right-icon');
							if (!rightIconElement) {
								// 存在しない場合、動的にアイコンを追加
								scrollHintDiv.insertAdjacentHTML(
									'beforeend',
									`<i class="${iconRightClass} right-icon"></i>`
								);
							}
						} else {
							// アイコンの出力フラグがfalseの場合はアイコンを表示しない
							const rightIconElement =
								scrollHintDiv.querySelector('i.right-icon');
							if (rightIconElement) {
								rightIconElement.style.display = 'none';
							}
						}
					}
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
								data-output-scroll-hint={
									showScrollMessage ? 'true' : 'false'
								}
								data-icon-output-left={
									iconOutputLeft ? 'true' : 'false'
								}
								data-icon-output-right={
									iconOutputRight ? 'true' : 'false'
								}
								data-hint-icon-left={
									iconOutputLeft
										? extractIconClass(scrollIconLeft)
										: ''
								}
								data-hint-icon-right={
									iconOutputRight
										? extractIconClass(scrollIconRight)
										: ''
								}
							>
								{iconOutputLeft && (
									<i
										className={`${extractIconClass(
											scrollIconLeft
										)} left-icon`}
									></i>
								)}
								<span>{scrollMessageText}</span>
								{iconOutputRight && (
									<i
										className={`${extractIconClass(
											scrollIconRight
										)} right-icon`}
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
										handleScrollMessageToggle={
											handleScrollMessageToggle
										}
										handleMessageTextChange={
											handleMessageTextChange
										}
										handleIconChange={handleIconChange}
										handleIconOutputToggle={
											handleIconOutputToggle
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
			saveElementProps['data-output-scroll-hint'] =
				attributes.showScrollMessage ? 'true' : 'false';
			saveElementProps['data-icon-output-left'] =
				attributes.iconOutputLeft ? 'true' : 'false';
			saveElementProps['data-icon-output-right'] =
				attributes.iconOutputRight ? 'true' : 'false';

			// Add Scroll Hint component if showScrollMessage is true
			if (attributes.showScrollMessage) {
				saveElementProps.children = [
					<div
						key="scroll-hint"
						className="vk-scroll-hint"
						data-scroll-breakpoint={attributes.scrollBreakpoint}
						data-output-scroll-hint={
							attributes.showScrollMessage ? 'true' : 'false'
						}
						data-icon-output-left={
							attributes.iconOutputLeft ? 'true' : 'false'
						}
						data-icon-output-right={
							attributes.iconOutputRight ? 'true' : 'false'
						}
						data-hint-icon-left={
							attributes.iconOutputLeft
								? extractIconClass(attributes.scrollIconLeft)
								: ''
						}
						data-hint-icon-right={
							attributes.iconOutputRight
								? extractIconClass(attributes.scrollIconRight)
								: ''
						}
					>
						{attributes.iconOutputLeft && (
							<i
								className={`${extractIconClass(
									attributes.scrollIconLeft
								)} left-icon`}
							></i>
						)}
						<span>{attributes.scrollMessageText}</span>
						{attributes.iconOutputRight && (
							<i
								className={`${extractIconClass(
									attributes.scrollIconRight
								)} right-icon`}
							></i>
						)}
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
			delete saveElementProps['data-output-scroll-hint'];
			delete saveElementProps['data-hint-icon-left'];
			delete saveElementProps['data-hint-icon-right'];
			delete saveElementProps['data-icon-output-left'];
			delete saveElementProps['data-icon-output-right'];
			delete saveElementProps['data-output-scroll-message']; // Remove data attribute if not needed
		}
	}

	return saveElementProps;
};
addFilter(
	'blocks.getSaveContent.extraProps',
	'vk-blocks/table-style',
	addExtraProps
);
