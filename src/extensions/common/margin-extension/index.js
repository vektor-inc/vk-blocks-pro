/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	ToolbarDropdownMenu,
	Popover,
	ButtonGroup,
	Button,
	ToolbarButton,
} from '@wordpress/components';
import { ReactComponent as Icon } from './icon.svg';
import { createRef, useState } from '@wordpress/element';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import { marginIcon, marginTopIcon, marginBottomIcon } from './icons';

const DEFAULT_MARGIN_BOTTOM_CONTROLS = [
	{
		title: __('0 bottom', 'vk-blocks'),
		marginClass: 'vk_block-margin-0--margin-bottom',
	},
	{
		title: __('sm bottom', 'vk-blocks'),
		marginClass: 'vk_block-margin-sm--margin-bottom',
	},
	{
		title: __('md bottom', 'vk-blocks'),
		marginClass: 'vk_block-margin-md--margin-bottom',
	},
	{
		title: __('lg bottom', 'vk-blocks'),
		marginClass: 'vk_block-margin-lg--margin-bottom',
	},
];

const DEFAULT_MARGIN_TOP_CONTROLS = [
	{
		title: __('0 top', 'vk-blocks'),
		marginClass: 'vk_block-margin-0--margin-top',
	},
	{
		title: __('sm top', 'vk-blocks'),
		marginClass: 'vk_block-margin-sm--margin-top',
	},
	{
		title: __('md top', 'vk-blocks'),
		marginClass: 'vk_block-margin-md--margin-top',
	},
	{
		title: __('lg top', 'vk-blocks'),
		marginClass: 'vk_block-margin-lg--margin-top',
	},
];

const DEFAULT_MARGIN_CONTROLS = [
	{
		title: __('0 top', 'vk-blocks'),
		marginClass: 'vk_block-margin-0--margin-top',
	},
	{
		title: __('sm top', 'vk-blocks'),
		marginClass: 'vk_block-margin-sm--margin-top',
	},
	{
		title: __('md top', 'vk-blocks'),
		marginClass: 'vk_block-margin-md--margin-top',
	},
	{
		title: __('lg top', 'vk-blocks'),
		marginClass: 'vk_block-margin-lg--margin-top',
	},
	{
		title: __('0 bottom', 'vk-blocks'),
		marginClass: 'vk_block-margin-0--margin-bottom',
	},
	{
		title: __('sm bottom', 'vk-blocks'),
		marginClass: 'vk_block-margin-sm--margin-bottom',
	},
	{
		title: __('md bottom', 'vk-blocks'),
		marginClass: 'vk_block-margin-md--margin-bottom',
	},
	{
		title: __('lg bottom', 'vk-blocks'),
		marginClass: 'vk_block-margin-lg--margin-bottom',
	},
];

// Check the keyword including str or not
export const inString = (str, keyword) => {
	// If keyword was included that return ( true or false )
	return str.indexOf(keyword) !== -1;
};

// The checking block is hidden function target or not
export const isHidden = (blockName) => {
	// Target of hidden function active
	const allowed = ['core', 'vk-blocks'];
	// name には allowed の項目が一つずつ入る
	// 判断中のブロック名の中にname( core or vk-blocks )がある（ undefinedじゃない ）場合
	// true を返す
	let hiddenReturn =
		allowed.find((name) => inString(blockName, name)) !== undefined;

	const excludes = [
		'core/calendar',
		'core/latest-comments',
		'core/archives',
		'core/tag-cloud',
		'core/shortcode',
		'core/rss',
		'vk-blocks/step-item',
		'vk-blocks/slider-item',
		'vk-blocks/card-item',
		'vk-blocks/icon-card-item',
		'vk-blocks/select-post-list-item',
	];
	const excludeBlock =
		excludes.find((excludeName) => inString(blockName, excludeName)) !==
		undefined;

	if (excludeBlock) {
		hiddenReturn = false;
	}
	return hiddenReturn;
};

/* Filter of blocks.registerBlockType
	/*-----------------------------------*/
addFilter(
	'blocks.registerBlockType',
	'vk-blocks/margin-extension',
	(settings) => {
		// If margin function target block...
		if (isHidden(settings.name)) {
			settings.attributes = {
				// Deploy original settings.attributes to array and...
				...settings.attributes,
				// Add margin attributes
				...{
					marginSetting: {
						type: 'string',
					},
					marginTop: {
						type: 'string',
					},
					marginBottom: {
						type: 'string',
					},
				},
			};
		}
		return settings;
	}
);

/* Filter of editor.BlockEdit
// 参考:
https://github.com/WordPress/gutenberg/blob/de333f52f7355c1a3ffc5738872d63831caed0b7/packages/block-editor/src/components/alignment-control/ui.js#L36
https://github.com/WordPress/gutenberg/blob/de333f52f7355c1a3ffc5738872d63831caed0b7/packages/block-library/src/heading/edit.js#L85-L90
	/*-----------------------------------*/
addFilter(
	'editor.BlockEdit',
	'vk-blocks/margin-extension',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { name, attributes, setAttributes } = props;
			const { marginSetting, marginTop, marginBottom } = attributes;
			const marginTopControls = DEFAULT_MARGIN_TOP_CONTROLS;
			const marginBottomControls = DEFAULT_MARGIN_BOTTOM_CONTROLS;
			const marginControls = DEFAULT_MARGIN_CONTROLS;
			const containerRef = createRef();

			const activeMargin = find(
				marginControls,
				(control) => control.marginClass === marginSetting
			);

			const activeMarginTop = find(
				marginTopControls,
				(control) => control.marginClass === marginTop
			);
			const activeMarginBottom = find(
				marginBottomControls,
				(control) => control.marginClass === marginBottom
			);

			const [isAddingMargin, setIsAddingMargin] = useState(false);
			const toolBarClick = () => {
				setIsAddingMargin(!isAddingMargin);
			};

			const hideThresholdPopover = () => setIsAddingMargin(false);
			// https://github.com/WordPress/gutenberg/blob/a082a0b669b0395480e9a69d70ad5a1648c2f9d4/packages/components/src/dropdown/index.js#L66-L75
			const handleOnClickOutside = () => {
				const { ownerDocument } = containerRef.current;
				const toolbarButton = ownerDocument.activeElement.closest(
					'.vk-margin-extension-toolbar-button'
				);
				if (
					!containerRef.current.contains(
						ownerDocument.activeElement
					) &&
					(!toolbarButton ||
						toolbarButton.contains(containerRef.current))
				) {
					setIsAddingMargin(false);
				}
			};

			if (isHidden(name)) {
				return (
					<>
						<BlockEdit {...props} />
						<BlockControls group="block">
							<ToolbarButton
								onClick={() => {
									toolBarClick();
								}}
								className="vk-margin-extension-toolbar-button"
								ref={containerRef}
							>
								{activeMarginTop &&
									!activeMarginBottom &&
									marginTopIcon}
								{!activeMarginTop &&
									activeMarginBottom &&
									marginBottomIcon}
								{activeMarginTop &&
									activeMarginBottom &&
									marginIcon}
								{!activeMarginTop &&
									!activeMarginBottom &&
									marginIcon}
								{activeMarginTop && activeMarginTop.title}
								{activeMarginTop && activeMarginBottom && (
									<br />
								)}
								{activeMarginBottom && activeMarginBottom.title}
							</ToolbarButton>
							{isAddingMargin && (
								<Popover
									className="vk-margin-extension-popover components-dropdown__content components-dropdown-menu__popover"
									onFocusOutside={handleOnClickOutside}
									position="bottom right"
									onClose={hideThresholdPopover}
								>
									<ButtonGroup className="mb-1">
										{marginTopControls.map((control) => {
											const { marginClass, title } =
												control;
											const isActive =
												marginTop === marginClass;
											return (
												<Button
													className="vk-margin-extension-button"
													key={title}
													icon={marginTopIcon}
													isSmall
													isPrimary={
														marginTop ===
														marginClass
													}
													onClick={() => {
														// 選択されているものをクリックしたらundefinedをセットする
														const newClass =
															isActive
																? undefined
																: marginClass;
														setAttributes({
															marginTop: newClass,
														});
														setIsAddingMargin(
															false
														);
													}}
												>
													{title}
												</Button>
											);
										})}
									</ButtonGroup>
									<ButtonGroup>
										{marginBottomControls.map((control) => {
											const { marginClass, title } =
												control;
											const isActive =
												marginBottom === marginClass;
											return (
												<Button
													className="vk-margin-extension-button"
													key={title}
													icon={marginBottomIcon}
													isSmall
													isPrimary={
														marginBottom ===
														marginClass
													}
													onClick={() => {
														// 選択されているものをクリックしたらundefinedをセットする
														const newClass =
															isActive
																? undefined
																: marginClass;
														setAttributes({
															marginBottom:
																newClass,
														});
														setIsAddingMargin(
															false
														);
													}}
												>
													{title}
												</Button>
											);
										})}
									</ButtonGroup>
								</Popover>
							)}
							<ToolbarDropdownMenu
								icon={
									activeMargin ? (
										<>
											<Icon
												style={{ marginRight: '3px' }}
											/>
											{activeMargin.title}
										</>
									) : (
										Icon
									)
								}
								label={__(
									'Margin under the block',
									'vk-blocks'
								)}
								controls={marginControls.map((control) => {
									const { marginClass } = control;
									const isActive =
										marginSetting === marginClass;
									return {
										...control,
										isActive,
										icon: <marginBottom />,
										onClick: () => {
											// 選択されているものをクリックしたらundefinedをセットする
											const newClass = isActive
												? undefined
												: marginClass;
											setAttributes({
												marginSetting: newClass,
											});
										},
									};
								})}
							/>
						</BlockControls>
					</>
				);
			}
			return <BlockEdit {...props} />;
		};
	}, 'addHiddenSection')
);

/* Filter of blocks.getSaveElement
	/*-----------------------------------*/
addFilter(
	'blocks.getSaveElement',
	'vk-blocks/margin-extension',
	(element, blockType, attributes) => {
		const { marginControls, marginTop, marginBottom } = attributes;
		if (marginControls || marginTop || marginBottom) {
			if (element) {
				element = {
					...element,
					...{
						props: {
							...element.props,
							...{
								className: classnames(
									element.props.className,
									marginControls,
									marginTop,
									marginBottom
								),
							},
						},
					},
				};
			}
		}
		return element;
	}
);

/* Filter of editor.BlockListBlock
	/*-----------------------------------*/
addFilter(
	'editor.BlockListBlock',
	'vk-blocks/margin-extension',
	createHigherOrderComponent((BlockListBlock) => {
		return (props) => {
			const marginClassName = props.attributes.marginSetting;
			const marginTopClassName = props.attributes.marginTop;
			const marginBottomClassName = props.attributes.marginBottom;
			const attachedClass = classnames(
				marginClassName,
				marginTopClassName,
				marginBottomClassName,
				props.className
			);
			return <BlockListBlock {...props} className={attachedClass} />;
		};
	}, 'addMarginSetting')
);
