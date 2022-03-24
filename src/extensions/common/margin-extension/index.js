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
import { isExcludesBlocks } from '@vkblocks/utils/is-excludes-blocks';

const DEFAULT_MARGIN_TOP_CONTROLS = [
	{
		title: __('Top lg', 'vk-blocks'),
		marginClass: 'vk_block-margin-lg--margin-top',
		flag: 'top',
	},
	{
		title: __('Top md', 'vk-blocks'),
		marginClass: 'vk_block-margin-md--margin-top',
		flag: 'top',
	},
	{
		title: __('Top sm', 'vk-blocks'),
		marginClass: 'vk_block-margin-sm--margin-top',
		flag: 'top',
	},
	{
		title: __('Top 0', 'vk-blocks'),
		marginClass: 'vk_block-margin-0--margin-top',
		flag: 'top',
	},
];

const DEFAULT_MARGIN_BOTTOM_CONTROLS = [
	{
		title: __('Bottom 0', 'vk-blocks'),
		marginClass: 'vk_block-margin-0--margin-bottom',
		flag: 'bottom',
	},
	{
		title: __('Bottom sm', 'vk-blocks'),
		marginClass: 'vk_block-margin-sm--margin-bottom',
		flag: 'bottom',
	},
	{
		title: __('Bottom md', 'vk-blocks'),
		marginClass: 'vk_block-margin-md--margin-bottom',
		flag: 'bottom',
	},
	{
		title: __('Bottom lg', 'vk-blocks'),
		marginClass: 'vk_block-margin-lg--margin-bottom',
		flag: 'bottom',
	},
];

const DEFAULT_MARGIN_CONTROLS = [
	...DEFAULT_MARGIN_TOP_CONTROLS,
	...DEFAULT_MARGIN_BOTTOM_CONTROLS,
];

export const isAddMargin = (blockName) => {
	const addExclude = [
		'vk-blocks/slider-item',
		'vk-blocks/card-item',
		'vk-blocks/icon-card-item',
		'vk-blocks/select-post-list-item',
	];
	return isExcludesBlocks({ blockName, addExclude });
};

/* Filter of blocks.registerBlockType
	/*-----------------------------------*/
addFilter(
	'blocks.registerBlockType',
	'vk-blocks/margin-extension',
	(settings) => {
		// If margin function target block...
		if (isAddMargin(settings.name)) {
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

			if (isAddMargin(name)) {
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
										{activeMarginTop ||
										activeMarginBottom ? (
											<span style={{ marginLeft: '8px' }}>
												{activeMarginTop &&
													activeMarginTop.title}
												{activeMarginTop &&
													activeMarginBottom && (
														<br />
													)}
												{activeMarginBottom &&
													activeMarginBottom.title}
											</span>
										) : null}
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
			if (!isAddMargin(props.name)) {
				return <BlockListBlock {...props} />;
			}
			return <BlockListBlock {...props} className={attachedClass} />;
		};
	}, 'addMarginSetting')
);
