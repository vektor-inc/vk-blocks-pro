/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { ToolbarDropdownMenu } from '@wordpress/components';
import { ReactComponent as Icon } from './icon.svg';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { find } from 'lodash';

const DEFAULT_MARGIN_CONTROLS = [
	{
		title: __('0', 'vk-blocks'),
		marginClass: 'vk_block-margin-0--margin-bottom',
	},
	{
		title: __('sm', 'vk-blocks'),
		marginClass: 'vk_block-margin-sm--margin-bottom',
	},
	{
		title: __('md', 'vk-blocks'),
		marginClass: 'vk_block-margin-md--margin-bottom',
	},
	{
		title: __('lg', 'vk-blocks'),
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
			const { marginSetting } = attributes;
			const marginControls = DEFAULT_MARGIN_CONTROLS;

			const activeMargin = find(
				marginControls,
				(control) => control.marginClass === marginSetting
			);

			if (isHidden(name)) {
				return (
					<>
						<BlockEdit {...props} />
						<BlockControls group="block">
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
										icon: <Icon />,
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
		const { marginSetting } = attributes;
		if (marginSetting) {
			if (element) {
				element = {
					...element,
					...{
						props: {
							...element.props,
							...{
								className: classnames(
									element.props.className,
									marginSetting
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
			const attachedClass = classnames(marginClassName, props.className);
			return <BlockListBlock {...props} className={attachedClass} />;
		};
	}, 'addMarginSetting')
);
