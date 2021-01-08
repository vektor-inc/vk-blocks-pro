/**
 * card block type
 *
 */
import { Component } from './component';
import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';
import { CardAlignControls } from '@vkblocks/components/card-align-control';
import { deprecated } from './deprecated';
import removeProperty from '@vkblocks/utils/removeProperty';
import AdvancedViewportControl from '@vkblocks/components/advanced-viewport-control';
import AdvancedUnitControl from '@vkblocks/components/advanced-unit-control';
import { title, content, pictureJson } from '@vkblocks/utils/example-data';
import { ReactComponent as Icon } from './icon.svg';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment, useEffect } from '@wordpress/element';
import {
	PanelBody,
	BaseControl,
	TextControl,
	CheckboxControl,
} from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';

export const prefix = 'vk_card_';

registerBlockType('vk-blocks/card', {
	title: __('Card', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat',
	attributes: {
		postId: {
			type: 'number',
		},
		name: {
			type: 'string',
			default: '',
		},
		layout: {
			type: 'string',
			default: 'card',
		},
		col_xs: {
			type: 'number',
			default: 1,
		},
		col_sm: {
			type: 'number',
			default: 2,
		},
		col_md: {
			type: 'number',
			default: 3,
		},
		col_lg: {
			type: 'number',
			default: 3,
		},
		col_xl: {
			type: 'number',
			default: 3,
		},
		col_xxl: {
			type: 'number',
			default: 3,
		},
		display_title: {
			type: 'boolean',
			default: true,
		},
		display_excerpt: {
			type: 'boolean',
			default: true,
		},
		display_image: {
			type: 'boolean',
			default: true,
		},
		display_image_overlay_term: {
			type: 'boolean',
			default: true,
		},
		display_date: {
			type: 'boolean',
			default: false,
		},
		display_new: {
			type: 'boolean',
			default: true,
		},
		display_btn: {
			type: 'boolean',
			default: true,
		},
		new_date: {
			type: 'number',
			default: 7,
		},
		new_text: {
			type: 'string',
			default: 'New!!',
		},
		btn_text: {
			type: 'string',
			default: 'Read more',
		},
		btn_align: {
			type: 'string',
			default: 'text-right',
		},
		numberPosts: {
			type: 'number',
			default: 6,
		},
		isCheckedPostType: {
			type: 'string',
			default: '["post"]',
		},
		coreTerms: {
			type: 'string',
			default: '[]',
		},
		isCheckedTerms: {
			type: 'string',
			default: '{}',
		},
		activeControl: {
			type: 'string',
			default: '{"title": "left", "text":"left" ,"button":"right"}',
		},
		unit: {
			type: 'string',
			default: 'px',
		},
		pc: {
			type: 'number',
			default: 150,
		},
		tablet: {
			type: 'number',
			default: 150,
		},
		mobile: {
			type: 'number',
			default: 150,
		},
		clientId: {
			type: 'string',
			default: '',
		},
	},
	supports: {
		className: true,
	},
	example: {
		attributes: {
			layout: 'card',
			col_xs: 1,
			col_sm: 1,
			col_md: 1,
			col_lg: 1,
			col_xl: 1,
			col_xxl: 1,
			display_title: true,
			display_excerpt: true,
			display_image: true,
			display_btn: true,
			btn_text: 'Read more',
			activeControl: '{"title": "left", "text":"left", "button":"right"}',
		},
		innerBlocks: [
			{
				name: 'vk-blocks/card-item',
				attributes: {
					layout: 'card',
					col_xs: 1,
					col_sm: 1,
					col_md: 1,
					col_lg: 1,
					col_xl: 1,
					col_xxl: 1,
					display_title: true,
					display_excerpt: true,
					display_image: true,
					display_btn: true,
					btn_text: 'Read more',
					activeControl:
						'{"title": "left", "text":"left", "button":"right"}',
					title,
					excerpt_text: content,
					image: pictureJson,
				},
			},
		],
	},
	edit(props) {
		const { attributes, setAttributes, className, clientId, name } = props;
		attributes.name = name;
		setAttributes({ clientId });

		const selectEditor = select('core/block-editor')
			? select('core/block-editor')
			: select('core/editor');
		const dispatchEditor = dispatch('core/block-editor')
			? dispatch('core/block-editor')
			: dispatch('core/editor');

		const { getBlocksByClientId } = selectEditor;
		const { updateBlockAttributes } = dispatchEditor;

		const currentBlock = getBlocksByClientId(clientId);
		let beforeLength;
		let afterLength;

		if (
			currentBlock !== undefined &&
			currentBlock[0] !== null &&
			currentBlock[0].innerBlocks !== undefined
		) {
			const innerBlocks = currentBlock[0].innerBlocks;
			beforeLength = innerBlocks.length;

			if (beforeLength !== undefined) {
				if (beforeLength !== afterLength) {
					for (let i = 0; i < innerBlocks.length; i++) {
						if (innerBlocks[i] !== undefined) {
							//className以外の値で、子要素のattributesをアップデート
							const updateAttributes = removeProperty(
								attributes,
								'className'
							);
							updateBlockAttributes(
								innerBlocks[i].clientId,
								updateAttributes
							);
						}
					}
				}
				afterLength = beforeLength;
			}
		}

		return (
			<Fragment>
				<InspectorControls>
					<ColumnLayoutControl {...props} />
					<DisplayItemsControlForCards {...props} />
					<PanelBody
						title={__('Image Height', 'vk-blocks')}
						initialOpen={false}
					>
						<AdvancedUnitControl {...props} />
						<BaseControl
							label={__(
								'Slide Height for each device.',
								'vk-blocks'
							)}
							id={`vk_card-SlideHeight`}
						>
							<AdvancedViewportControl
								{...props}
								initial={{
									iPc: 150,
									iTablet: 150,
									iMobile: 150,
								}}
							/>
						</BaseControl>
					</PanelBody>
					<CardAlignControls {...props} />
				</InspectorControls>
				<Component
					attributes={attributes}
					className={className}
					setAttributes={setAttributes}
					for_={'edit'}
				/>
			</Fragment>
		);
	},
	save({ attributes }) {
		return <Component attributes={attributes} for_={'save'} />;
	},
	deprecated,
});

export const DisplayItemsControlForCards = (props) => {
	const { setAttributes, attributes } = props;
	const {
		// eslint-disable-next-line camelcase
		display_title,
		// eslint-disable-next-line camelcase
		display_excerpt,
		// eslint-disable-next-line camelcase
		display_image,
		// eslint-disable-next-line camelcase
		display_btn,
		// eslint-disable-next-line camelcase
		btn_text,
	} = attributes;
	return (
		<PanelBody title={__('Display item', 'vk-blocks')} initialOpen={false}>
			<CheckboxControl
				label={__('Title', 'vk-blocks')}
				className={'mb-1'}
				// eslint-disable-next-line camelcase
				checked={display_title}
				onChange={(checked) =>
					setAttributes({ display_title: checked })
				}
			/>
			<p className="alert alert-danger">
				{__(
					'Warning! When you hidden this item, you will lose the content.',
					'vk-blocks'
				)}
			</p>
			<CheckboxControl
				label={__('Excerpt Text', 'vk-blocks')}
				className={'mb-1'}
				// eslint-disable-next-line camelcase
				checked={display_excerpt}
				onChange={(checked) =>
					setAttributes({ display_excerpt: checked })
				}
			/>
			<p className="alert alert-danger">
				{__(
					'Warning! When you hidden this item, you will lose the content.',
					'vk-blocks'
				)}
			</p>
			<CheckboxControl
				label={__('Image', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				checked={display_image}
				onChange={(checked) =>
					setAttributes({ display_image: checked })
				}
			/>
			<CheckboxControl
				label={__('Button', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				checked={display_btn}
				onChange={(checked) => setAttributes({ display_btn: checked })}
			/>
			<h4 className={'postList_itemCard_button-option'}>
				{__('Button option', 'vk-blocks')}
			</h4>
			<p>
				{__(
					"Click each card block to set the target url. You can find the url form at it's sidebar.",
					'vk-blocks'
				)}
			</p>
			<TextControl
				label={__('Button text', 'vk-blocks')}
				// eslint-disable-next-line camelcase
				value={btn_text}
				onChange={(value) => setAttributes({ btn_text: value })}
			/>
		</PanelBody>
	);
};

const generateInlineCss = (attributes) => {
	let { clientId, mobile, tablet, pc, unit } = attributes;

	//For recovering block.
	if (undefined === unit) {
		unit = 'px';
	}
	if (undefined === mobile) {
		mobile = 150;
	}
	if (undefined === tablet) {
		tablet = 150;
	}
	if (undefined === pc) {
		pc = 150;
	}

	const cardImgSelector = `.${prefix}${clientId} .vk_card_item .vk_post_imgOuter::before`;
	return (
		<style type="text/css">{`@media (max-width: 576px) {
		${cardImgSelector}{
			padding-top:${mobile}${unit}!important;
		}
	}
	@media (min-width: 577px) and (max-width: 768px) {
		${cardImgSelector}{
			padding-top:${tablet}${unit}!important;
		}
	}
	@media (min-width: 769px) {
		${cardImgSelector}{
			padding-top:${pc}${unit}!important;
		}
	}`}</style>
	);
};

addFilter(
	'editor.BlockEdit',
	'vk-blocks/card-addInlineEditorsCss',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { attributes, setAttributes, clientId } = props;
			const { unit, pc, tablet, mobile } = attributes;

			if (
				'vk-blocks/card' === props.name &&
				(unit || pc || tablet || mobile)
			) {
				useEffect(() => {
					setAttributes({ clientId });
				}, []);

				const cssTag = generateInlineCss(attributes);

				return (
					<Fragment>
						{cssTag}
						<BlockEdit {...props} />
					</Fragment>
				);
			}
			return <BlockEdit {...props} />;
		};
	}, 'addInlineEditorsCss')
);

addFilter(
	'blocks.getSaveElement',
	'vk-blocks/card-addInlineFrontCss',
	(el, type, attributes) => {
		const { unit, pc, tablet, mobile } = attributes;
		if (
			'vk-blocks/card' === type.name &&
			(unit || pc || tablet || mobile)
		) {
			const cssTag = generateInlineCss(attributes);
			return (
				<div>
					{cssTag}
					{el}
				</div>
			);
		}
		return el;
	}
);
