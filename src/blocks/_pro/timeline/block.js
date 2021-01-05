/**
 * timeline block type
 *
 */
import { hiddenNewBlock } from '@vkblocks/utils/hiddenNewBlock';
import { ReactComponent as Icon } from './icon.svg';
import { title } from '@vkblocks/utils/example-data';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

const inserterVisible = hiddenNewBlock(5.3);

registerBlockType('vk-blocks/timeline', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Timeline', 'vk-blocks'), // Block title.
	icon: <Icon />, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'vk-blocks-cat', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {},
	supports: {
		inserter: inserterVisible,
	},
	example: {
		innerBlocks: [
			{
				name: 'vk-blocks/timeline-item',
				attributes: {
					label: '6:00AM',
					color: '#337ab7',
					style: 'outlined',
					styleLine: 'default',
				},
				innerBlocks: [
					{
						name: 'core/heading',
						attributes: {
							level: 4,
							content: title,
						},
					},
				],
			},
		],
	},

	edit({ className }) {
		const containerClass = ' vk_timeline';
		const ALLOWED_BLOCKS = ['vk-blocks/timeline-item'];
		const TEMPLATE = [ALLOWED_BLOCKS];
		return (
			<Fragment>
				<div className={className + containerClass}>
					<InnerBlocks
						template={TEMPLATE}
						allowedBlocks={ALLOWED_BLOCKS}
					/>
				</div>
			</Fragment>
		);
	},
	save({ className }) {
		const containerClass = ' vk_timeline';
		return (
			<div className={className + containerClass}>
				<InnerBlocks.Content />
			</div>
		);
	},

	//Please comment out, when you need to use deprecated.
	// deprecated:deprecated
});
