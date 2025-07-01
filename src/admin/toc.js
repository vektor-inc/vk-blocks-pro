import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { AdminContext } from './index';
import { SelectControl } from '@wordpress/components';
import {
	generateHeadingLevels,
	getCurrentMaxLevel,
} from '@vkblocks/utils/heading-level-utils';

export default function AdminToc() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	const handleMaxLevelChange = (maxLevel) => {
		const levels = generateHeadingLevels(maxLevel);

		setVkBlocksOption({
			...vkBlocksOption,
			toc_heading_levels: levels,
		});
	};

	// 現在の最大レベルを取得
	const getCurrentMaxLevelForAdmin = () => {
		return getCurrentMaxLevel(vkBlocksOption.toc_heading_levels);
	};

	return (
		<section className="vk_admin_page_section" id="toc-setting">
			<h3>{__('Table of Contents Setting', 'vk-blocks-pro')}</h3>
			<p>
				{__(
					'Please specify a common heading level setting to be used across the site.',
					'vk-blocks-pro'
				)}
			</p>
			<SelectControl
				name="vk_blocks_options[toc_heading_levels]"
				className="vk_admin_selectControl"
				value={getCurrentMaxLevelForAdmin()}
				options={[
					{ label: 'H2', value: 'h2' },
					{ label: 'H3', value: 'h3' },
					{ label: 'H4', value: 'h4' },
					{ label: 'H5', value: 'h5' },
					{ label: 'H6', value: 'h6' },
				]}
				onChange={(value) => handleMaxLevelChange(value)}
			/>
			<p className="description">
				{__(
					'Headings from H2 up to the selected level will be included.',
					'vk-blocks-pro'
				)}
			</p>
		</section>
	);
}
