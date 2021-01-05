/**
 * step block type
 *
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { schema } from "./schema";
import { hiddenNewBlock } from "../../../utils/hiddenNewBlock";
const inserterVisible = hiddenNewBlock(5.3);
import { ReactComponent as Icon } from './icon.svg';

import { title, content } from "../../../utils/example-data";
import { edit } from "./edit";
import { save } from "./save";

registerBlockType("vk-blocks/step", {
	title: __("Step", "vk-blocks"), // Block title.
	icon: <Icon />,
	category: "vk-blocks-cat",
	attributes: schema,
	supports: {
		inserter: inserterVisible,
	},
	example: {
		attributes: {
			firstDotNum: 1,
		},
		innerBlocks: [
			{
				name: 'vk-blocks/step-item',
				attributes: {
					color: '#337ab7',
					style: 'solid',
					styleLine: 'default',
					dotCaption: 'STEP',
					dotNum: 1,
					faIcon: '',
				},
				innerBlocks: [
					{
						name: 'core/heading',
						attributes: {
							level: 4,
							content: title,
						},
					},
					{
						name: 'core/paragraph',
						attributes: {
							content: content,
						},
					},
				],
			},
		],
	},
	edit,
	save
});
