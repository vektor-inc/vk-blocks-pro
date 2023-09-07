/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	leftImageRightText,
	leftTextRightImage,
	largeImageAndImageLowerCharacter,
} from './icons';

const variations = [
	{
		name: 'left-image-right-text',
		title: __('Left image', 'vk-blocks-pro'),
		icon: leftImageRightText,
		attributes: {
			style: {
				spacing: {
					padding: {
						top: '1.5rem',
						right: '1.5rem',
						bottom: '1.5rem',
						left: '1.5rem',
					},
				},
				border: {
					color: '#0000001f',
					width: '1px',
					radius: '5px',
				},
			},
		},
		innerBlocks: [
			[
				'core/columns',
				{
					lock: {
						move: false,
						remove: true,
					},
					style: {
						spacing: {
							blockGap: { top: '1.5rem', left: '1.5rem' },
						},
					},
				},
				[
					[
						'core/column',
						{
							verticalAlignment: 'top',
							width: '33.3%',
						},
						[
							[
								'vk-blocks/blog-card-featured-image',
								{
									style: {
										border: {
											color: '#0000001f',
											width: '1px',
											radius: '5px',
										},
									},
								},
								[],
							],
						],
					],
					[
						'core/column',
						{
							lock: {
								move: false,
								remove: true,
							},
							width: '66.6%',
						},
						[
							['vk-blocks/blog-card-title', {}, []],
							['vk-blocks/blog-card-excerpt', {}, []],
							[
								'core/group',
								{
									style: {
										spacing: { blockGap: '6px' },
									},
									layout: {
										type: 'flex',
										flexWrap: 'nowrap',
										verticalAlignment: 'center',
									},
								},
								[
									[
										'vk-blocks/blog-card-site-logo',
										{
											style: {
												layout: {
													selfStretch: 'fixed',
													flexSize: '15px',
												},
											},
										},
										[],
									],
									['vk-blocks/blog-card-site-title', {}, []],
								],
							],
						],
					],
				],
			],
		],
		scope: ['block'],
	},
	{
		name: 'left-text-right-image',
		title: __('Right image', 'vk-blocks-pro'),
		icon: leftTextRightImage,
		attributes: {
			style: {
				spacing: {
					padding: {
						top: '1.5rem',
						right: '1.5rem',
						bottom: '1.5rem',
						left: '1.5rem',
					},
				},
				border: {
					color: '#0000001f',
					width: '1px',
					radius: '5px',
				},
			},
		},
		innerBlocks: [
			[
				'core/columns',
				{
					style: {
						spacing: {
							blockGap: { top: '1.5rem', left: '1.5rem' },
						},
					},
					className: 'vk_flex-wrap-reverse-on-mobile',
				},
				[
					[
						'core/column',
						{
							lock: {
								move: false,
								remove: true,
							},
							width: '66.6%',
						},
						[
							['vk-blocks/blog-card-title', {}, []],
							['vk-blocks/blog-card-excerpt', {}, []],
							[
								'core/group',
								{
									style: {
										spacing: { blockGap: '6px' },
									},
									layout: {
										type: 'flex',
										flexWrap: 'nowrap',
										verticalAlignment: 'center',
									},
								},
								[
									[
										'vk-blocks/blog-card-site-logo',
										{
											style: {
												layout: {
													selfStretch: 'fixed',
													flexSize: '15px',
												},
											},
										},
										[],
									],
									['vk-blocks/blog-card-site-title', {}, []],
								],
							],
						],
					],
					[
						'core/column',
						{
							lock: {
								move: false,
								remove: true,
							},
							verticalAlignment: 'top',
							width: '33.3%',
						},
						[
							[
								'vk-blocks/blog-card-featured-image',
								{
									style: {
										border: {
											color: '#0000001f',
											width: '1px',
											radius: '5px',
										},
									},
								},
								[],
							],
						],
					],
				],
			],
		],
		scope: ['block'],
	},
	{
		name: 'large-image-and-image-lower-character',
		title: __('Large image & image lower character', 'vk-blocks-pro'),
		icon: largeImageAndImageLowerCharacter,
		attributes: {
			style: {
				spacing: {
					padding: {
						top: '1.5rem',
						right: '1.5rem',
						bottom: '1.5rem',
						left: '1.5rem',
					},
				},
				border: {
					color: '#0000001f',
					width: '1px',
					radius: '5px',
				},
			},
		},
		innerBlocks: [
			[
				'vk-blocks/blog-card-featured-image',
				{
					style: {
						border: {
							color: '#0000001f',
							width: '1px',
							radius: '5px',
						},
					},
				},
				[],
			],
			['vk-blocks/blog-card-title', {}, []],
			['vk-blocks/blog-card-excerpt', {}, []],
			[
				'core/group',
				{
					style: {
						spacing: { blockGap: '6px' },
					},
					layout: {
						type: 'flex',
						flexWrap: 'nowrap',
						verticalAlignment: 'center',
					},
				},
				[
					[
						'vk-blocks/blog-card-site-logo',
						{
							style: {
								layout: {
									selfStretch: 'fixed',
									flexSize: '15px',
								},
							},
						},
						[],
					],
					['vk-blocks/blog-card-site-title', {}, []],
				],
			],
		],
		scope: ['block'],
	},
];

export default variations;
