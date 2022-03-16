/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { ToolbarDropdownMenu } from '@wordpress/components';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import { marginIcon, marginTopIcon, marginBottomIcon } from './icons';

const DEFAULT_MARGIN_TOP_CONTROLS = [
	{
		title: __('0 top', 'vk-blocks'),
		marginClass: 'vk_block-margin-0--margin-top',
		flag: 'top',
	},
	{
		title: __('sm top', 'vk-blocks'),
		marginClass: 'vk_block-margin-sm--margin-top',
		flag: 'top',
	},
	{
		title: __('md top', 'vk-blocks'),
		marginClass: 'vk_block-margin-md--margin-top',
		flag: 'top',
	},
	{
		title: __('lg top', 'vk-blocks'),
		marginClass: 'vk_block-margin-lg--margin-top',
		flag: 'top',
	},
];

const DEFAULT_MARGIN_BOTTOM_CONTROLS = [
	{
		title: __('0 bottom', 'vk-blocks'),
		marginClass: 'vk_block-margin-0--margin-bottom',
		flag: 'bottom',
	},
	{
		title: __('sm bottom', 'vk-blocks'),
		marginClass: 'vk_block-margin-sm--margin-bottom',
		flag: 'bottom',
	},
	{
		title: __('md bottom', 'vk-blocks'),
		marginClass: 'vk_block-margin-md--margin-bottom',
		flag: 'bottom',
	},
	{
		title: __('lg bottom', 'vk-blocks'),
		marginClass: 'vk_block-margin-lg--margin-bottom',
		flag: 'bottom',
	},
];

const DEFAULT_MARGIN_CONTROLS = [
	...DEFAULT_MARGIN_TOP_CONTROLS,
	...DEFAULT_MARGIN_BOTTOM_CONTROLS,
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
	/*-----------------------------------*/
addFilter(
	'editor.BlockEdit',
	'vk-blocks/margin-extension',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { name, attributes, setAttributes } = props;
			const { marginTop, marginBottom } = attributes;
			const marginTopControls = DEFAULT_MARGIN_TOP_CONTROLS;
			const marginBottomControls = DEFAULT_MARGIN_BOTTOM_CONTROLS;
			const marginControls = DEFAULT_MARGIN_CONTROLS;

			const activeMarginTop = find(
				marginTopControls,
				(control) => control.marginClass === marginTop
			);
			const activeMarginBottom = find(
				marginBottomControls,
				(control) => control.marginClass === marginBottom
			);

			if (isHidden(name)) {
				return (
					<>
						<BlockEdit {...props} />
						<BlockControls group="block">
							<ToolbarDropdownMenu
								icon={
									<>
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
										{activeMarginTop &&
											activeMarginTop.title}
										{activeMarginTop &&
											activeMarginBottom && <br />}
										{activeMarginBottom &&
											activeMarginBottom.title}
									</>
								}
								label={__('Margin the block', 'vk-blocks')}
								controls={marginControls.map((control) => {
									const { marginClass, flag } = control;
									const isActive =
										marginTop === marginClass ||
										marginBottom === marginClass;
									return {
										...control,
										isActive,
										icon:
											flag === 'top'
												? marginTopIcon
												: marginBottomIcon,
										onClick: () => {
											// 選択されているものをクリックしたらundefinedをセットする
											const newClass = isActive
												? undefined
												: marginClass;
											if (flag === 'top') {
												setAttributes({
													marginTop: newClass,
												});
											} else {
												setAttributes({
													marginBottom: newClass,
												});
											}
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
		const { marginTop, marginBottom } = attributes;
		if (marginTop || marginBottom) {
			if (element) {
				element = {
					...element,
					...{
						props: {
							...element.props,
							...{
								className: classnames(
									element.props.className,
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
			const marginTopClassName = props.attributes.marginTop;
			const marginBottomClassName = props.attributes.marginBottom;
			const attachedClass = classnames(
				marginTopClassName,
				marginBottomClassName,
				props.className
			);
			return <BlockListBlock {...props} className={attachedClass} />;
		};
	}, 'addMarginSetting')
);
