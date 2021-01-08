/**
 * card block type
 *
 */
import { title, content, pictureJson } from '@vkblocks/utils/example-data';
import { ReactComponent as Icon } from './icon.svg';

import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import React from 'react';

export const prefix = 'vk_card_';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated/index';
const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Card', 'vk-blocks'),
	icon: <Icon />,
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
	edit,
	save,
	deprecated,
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
