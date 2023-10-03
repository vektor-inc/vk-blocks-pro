/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import { ExternalLink } from '@wordpress/components';

export const SCOPE_OPTIONS = [
	{
		name: 'inserter',
		label: __('インサーター', 'vk-blocks-pro'),
		help: createInterpolateElement(
			__(
				'インサーターに表示されます。 <Link>インサーターについてさらに詳しく</Link>.',
				'vk-blocks-pro'
			),
			{
				Link: (
					<ExternalLink
						href={__(
							// 'https://wordpress.org/documentation/article/adding-a-new-block/#what-is-the-inserter',
							'https://ja.wordpress.org/support/article/adding-a-new-block/#%e3%82%a4%e3%83%b3%e3%82%b5%e3%83%bc%e3%82%bf%e3%83%bc%e3%81%a8%e3%81%af',
							'vk-blocks-pro'
						)}
					/>
				),
			}
		),
	},
	{
		name: 'block',
		label: __('ブロック', 'vk-blocks-pro'),
		help: __('バリエーションピッカーに表示されます。', 'vk-blocks-pro'),
	},
	{
		name: 'transform',
		label: __('変換', 'vk-blocks-pro'),
		help: __('ブロックバリエーション変換で表示されます。', 'vk-blocks-pro'),
	},
];
