import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { AdminContext } from './index';
import { SelectControl } from '@wordpress/components';

// デフォルト値を定数として定義
const DEFAULT_TOC_LEVELS = ['h2', 'h3', 'h4', 'h5', 'h6'];

export default function AdminToc() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	const handleMaxLevelChange = (maxLevel) => {
		const levels = ['h2'];
		const levelNumbers = ['h3', 'h4', 'h5', 'h6'];
		const maxIndex = levelNumbers.indexOf(maxLevel);

		if (maxIndex !== -1) {
			levels.push(...levelNumbers.slice(0, maxIndex + 1));
		}

		setVkBlocksOption({
			...vkBlocksOption,
			tocHeadingLevels: levels,
		});
	};

	// 現在の最大レベルを取得
	const getCurrentMaxLevel = () => {
		const currentLevels =
			vkBlocksOption.tocHeadingLevels || DEFAULT_TOC_LEVELS;
		const maxLevel = currentLevels[currentLevels.length - 1];
		return maxLevel || 'h2';
	};

	return (
		<section className="vk_admin_page_section" id="toc-setting">
			<h3>{__('Table of Contents Setting', 'vk-blocks-pro')}</h3>
			<p>
				{__(
					'Configure the maximum heading level to include in the table of contents.',
					'vk-blocks-pro'
				)}
			</p>
			<SelectControl
				name="vk_blocks_options[tocHeadingLevels]"
				className="vk_admin_selectControl"
				value={getCurrentMaxLevel()}
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
