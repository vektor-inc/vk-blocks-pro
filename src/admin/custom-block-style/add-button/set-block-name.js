/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SearchControl, RadioControl } from '@wordpress/components';
import { BlockIcon } from '@wordpress/block-editor';

export const SetBlockName = ({
	showBlockTypes,
	categories,
	blockName,
	setBlockName,
	search,
	setSearch,
}) => {
	const activeBlockType = showBlockTypes.find(
		(blockType) => blockType.name === blockName
	);

	return (
		<>
			<p>
				{__(
					'対象のブロック (必須/変更不可)',
					// 'Target Block (Required/Unchangeable)',
					'vk-blocks'
				)}
			</p>
			{!blockName && (
				<p className="custom_block_style_item_name_error">
					{__(
						'対象のブロックを設定してください。',
						// 'Set the target block.',
						'vk-blocks'
					)}
				</p>
			)}
			{activeBlockType && (
				<>
					<BlockIcon icon={activeBlockType.icon} />
					<span className="active_block_name">
						{activeBlockType.title}
					</span>
					<span className="custom_block_style_item_block_name_block_name">
						{blockName}
					</span>
				</>
			)}
			<SearchControl
				label={__(
					'ブロックの検索',
					// 'Search for a block',
					'vk-blocks'
				)}
				placeholder={__(
					'ブロックの検索',
					// 'Search for a block',
					'vk-blocks'
				)}
				value={search}
				onChange={(nextSearch) => setSearch(nextSearch)}
				className="block-manager__search"
			/>
			<div className="custom_block_style_block-manager__results">
				{categories.map((category) => {
					const propsBlockTypes =
						showBlockTypes &&
						showBlockTypes.filter((blockType) => {
							return (
								blockType &&
								blockType.category &&
								blockType.category === category.slug
							);
						});
					if (!propsBlockTypes.length) {
						return null;
					}
					return (
						<div key={category.slug}>
							{category.title}
							<ul className="block-manager__checklist">
								{propsBlockTypes.map((blockType) => {
									const optionsArray = [];
									optionsArray.push({
										label: (
											<span className="block_name_radio_label">
												{blockType.title}
												<BlockIcon
													icon={blockType.icon}
												/>
											</span>
										),
										value: blockType.name,
									});
									return (
										<RadioControl
											key={blockType.name}
											className="block_name_radio_control"
											selected={blockName}
											options={optionsArray}
											onChange={(value) =>
												setBlockName(value)
											}
										/>
									);
								})}
							</ul>
						</div>
					);
				})}
			</div>
		</>
	);
};
