import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { AdminContext } from './index';

export default function AdminToc() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	const handleHeadingLevelChange = (level, checked) => {
		const currentLevels = vkBlocksOption.tocHeadingLevels || ['h2', 'h3', 'h4'];
		let newLevels;

		if (checked) {
			newLevels = [...new Set([...currentLevels, level])].sort();
		} else {
			newLevels = currentLevels.filter((l) => l !== level);
		}

		setVkBlocksOption({
			...vkBlocksOption,
			tocHeadingLevels: newLevels,
		});
	};

	return (
		<div className="vk_admin_page_section" id="toc-setting">
			<h3>{ __('Table of Contents Settings', 'vk-blocks-pro') }</h3>
			<p>
				{ __('Configure which heading levels should be included in the table of contents.', 'vk-blocks-pro') }
			</p>
			<table className="form-table">
				<tbody>
					<tr>
						<th scope="row">
							{ __('Heading Levels to Include', 'vk-blocks-pro') }
						</th>
						<td>
							{['h2', 'h3', 'h4', 'h5', 'h6'].map((level) => (
								<label key={level} style={{ marginRight: '1em' }}>
									<input
										type="checkbox"
										value={level}
										checked={
											(vkBlocksOption.tocHeadingLevels || ['h2', 'h3', 'h4']).includes(
												level
											)
										}
										onChange={(e) =>
											handleHeadingLevelChange(level, e.target.checked)
										}
									/>{' '}
									{level.toUpperCase()}
								</label>
							))}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
} 