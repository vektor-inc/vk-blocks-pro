/**
 * External dependencies
 */
import compareVersions from 'compare-versions';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';
/*globals vkBlocksObject */

export default function BlockManager() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	const block_manager_obj = { ...vkBlocksOption.block_manager };

	function getBlockInfo(blockName) {
		for (let i = 0; i < vkBlocksObject.blocks.length; i++) {
			if (vkBlocksObject.blocks[i].name === blockName) {
				return vkBlocksObject.blocks[i];
			}
		}
		return false;
	}

	const inserterOption = (block_key) => {
		let returnBool;
		if (block_manager_obj[block_key].inserter === null) {
			// 初期値
			if (
				getBlockInfo(block_key).not_recommended_version &&
				compareVersions(
					vkBlocksObject.vkBlocksVersion,
					getBlockInfo(block_key).not_recommended_version
				) > 0
			) {
				returnBool = false;
			} else {
				returnBool = true;
			}
		} else {
			returnBool = block_manager_obj[block_key].inserter;
		}
		return returnBool;
	};

	return (
		<>
			<section>
				<h3 id="block-manager-setting">
					{__('Block Manager', 'vk-blocks')}
				</h3>
				<ul className="blockManagerList">
					{Object.keys(block_manager_obj).map((block_key) => (
						<li key={block_key}>
							{(() => {
								if (
									getBlockInfo(block_key).is_recommended !==
									false
								) {
									return (
										<>
											<CheckboxControl
												name={`vk_blocks_options[${block_key}]`}
												label={
													getBlockInfo(block_key).name
												}
												checked={inserterOption(
													block_key
												)}
												onChange={(newValue) => {
													setVkBlocksOption({
														...vkBlocksOption,
														block_manager: {
															...vkBlocksOption.block_manager,
															[block_key]: {
																...vkBlocksOption
																	.block_manager[
																	block_key
																],
																inserter:
																	newValue,
															},
														},
													});
												}}
											/>
										</>
									);
								}
							})()}
						</li>
					))}
				</ul>
				<h4>{__('非推奨ブロック', 'vk-blocks')}</h4>
				{Object.keys(block_manager_obj).map((block_key) => (
					<div key={block_key}>
						{(() => {
							if (
								getBlockInfo(block_key).is_recommended === false
							) {
								return (
									<>
										<CheckboxControl
											name={`vk_blocks_options[${block_key}]`}
											label={
												getBlockInfo(block_key).title
											}
											checked={
												block_manager_obj[block_key]
													.inserter
											}
											onChange={(newValue) => {
												setVkBlocksOption({
													...vkBlocksOption,
													block_manager: {
														...vkBlocksOption.block_manager,
														[block_key]: {
															...vkBlocksOption
																.block_manager[
																block_key
															],
															inserter: newValue,
														},
													},
												});
											}}
										/>
									</>
								);
							}
						})()}
					</div>
				))}
			</section>
		</>
	);
}
