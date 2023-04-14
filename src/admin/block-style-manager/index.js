/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockStyleManagerCategory from './category';
/*globals vkBlocksObject */

export default function BlockStyleManager() {
	// blockJsonからtitleを取得
	const getBlockTitle = (name) => {
		const blockJsonList = vkBlocksObject.blockJsonLists.find(
			(item) => item.name === name
		);
		return blockJsonList && blockJsonList.title
			? blockJsonList.title
			: name;
	};

	return (
		<>
			<section>
				<h3 id="block-style-manager-setting">
					{__('Block Style Manager Setting', 'vk-blocks')}
				</h3>
				<p>
					{__(
						'VK Blockが追加しているブロックスタイルをオフにします。',
						'vk-blocks'
					)}
				</p>
				<div
					tabIndex="0"
					role="region"
					className="block-manager__results"
				>
					{Object.keys(vkBlocksObject.blocksStyleLists).map(
						(blockName) => {
							return (
								<BlockStyleManagerCategory
									key={blockName}
									blockName={blockName}
									blockTitle={getBlockTitle(blockName)}
									blockStyleTypes={
										vkBlocksObject.blocksStyleLists[
											blockName
										]
									}
								/>
							);
						}
					)}
				</div>
			</section>
		</>
	);
}
