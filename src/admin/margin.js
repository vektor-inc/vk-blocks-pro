/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	SelectControl,
	__experimentalNumberControl as NumberControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	TextControl,
} from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { hightUnitOptions } from '@vkblocks/utils/unit-options';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

const MARGIN_SIZE_ARRAY = [
	{
		marginLabel: __('XXS', 'vk-blocks-pro'),
		marginValue: 'xxs',
	},
	{
		marginLabel: __('XS', 'vk-blocks-pro'),
		marginValue: 'xs',
	},
	{
		marginLabel: __('S', 'vk-blocks-pro'),
		marginValue: 'sm',
	},
	{
		marginLabel: __('M', 'vk-blocks-pro'),
		marginValue: 'md',
	},
	{
		marginLabel: __('L', 'vk-blocks-pro'),
		marginValue: 'lg',
	},
	{
		marginLabel: __('XL', 'vk-blocks-pro'),
		marginValue: 'xl',
	},
	{
		marginLabel: __('XXL', 'vk-blocks-pro'),
		marginValue: 'xxl',
	},
];

const DEVICE_ARRAY = [
	{
		deviceLabel: __('PC', 'vk-blocks-pro'),
		deviceValue: 'pc',
	},
	{
		deviceLabel: __('Tablet', 'vk-blocks-pro'),
		deviceValue: 'tablet',
	},
	{
		deviceLabel: __('Mobile', 'vk-blocks-pro'),
		deviceValue: 'mobile',
	},
];

export default function AdminMargin() {
	const { vkBlocksOption, setVkBlocksOption, setReloadFlag } =
		useContext(AdminContext);

	return (
		<>
			<section className="margin-setting">
				<h3 id="margin-setting">
					{__('Common Margin Setting', 'vk-blocks-pro')}
				</h3>
				<p>
					{__(
						'Please specify the size of the common margin used for responsive spacers, etc.',
						'vk-blocks-pro'
					)}
				</p>
				<div className="margin-setting__unit">
					<span>{__('Unit', 'vk-blocks-pro')}</span>
					<SelectControl
						name="vk_blocks_options[margin_unit]"
						className="vk_admin_selectControl unit-select"
						value={vkBlocksOption.margin_unit}
						onChange={(newValue) => {
							setVkBlocksOption({
								...vkBlocksOption,
								margin_unit: newValue,
							});
						}}
						options={hightUnitOptions}
					/>
				</div>
				<table className="margin-setting__table">
					<thead>
						<tr>
							<td></td>
							{DEVICE_ARRAY.map((device) => {
								const { deviceLabel } = device;
								return (
									<td
										key={deviceLabel}
										className="text-center nowrap"
									>
										{deviceLabel}
									</td>
								);
							})}
							<td>
								{__('Custom Value', 'vk-blocks-pro')}
								<span className="vk_admin_tooltip">
									<span className="vk_admin_tooltip__trigger">
										?
									</span>
									<span className="vk_admin_tooltip__body">
										{__(
											'If you enter a custom value, the values you entered will be used as a priority.',
											'vk-blocks-pro'
										)}
										<br />
										{__(
											'This item is mainly intended for inputting CSS variables for the margins specified by the theme. Thereby you can apply to the same margin size to the VK Blocks.',
											'vk-blocks-pro'
										)}
										<br />
										{/* 最後のセミコロンは勝手につくので例の最後のセミコロンは不要*/}
										{__('ex)', 'vk-blocks-pro')}
										{'var(--wp--custom--spacing--xx-small)'}
									</span>
								</span>
							</td>
						</tr>
					</thead>
					<tbody>
						{MARGIN_SIZE_ARRAY.map((size) => {
							const { marginLabel, marginValue } = size;
							return (
								<tr key={marginLabel}>
									<th className="nowrap">
										{__('Margin', 'vk-blocks-pro') +
											` [ ${marginLabel} ] `}
									</th>
									{DEVICE_ARRAY.map((device) => {
										const { deviceLabel, deviceValue } =
											device;
										{
											/* TextControlでは以前の実装が出来なかったので致し方なく__experimentalNumberControlを利用 */
										}
										return (
											<td key={deviceLabel}>
												<NumberControl
													className="margin_size_input"
													name={`vk_blocks_options[margin_size][${marginValue}][${deviceValue}]`}
													step="0.05"
													value={
														!vkBlocksOption
															.margin_size[
															marginValue
														][deviceValue]
															? ''
															: vkBlocksOption
																	.margin_size[
																	marginValue
															  ][deviceValue]
													}
													onChange={(newValue) => {
														setVkBlocksOption({
															...vkBlocksOption,
															margin_size: {
																...vkBlocksOption.margin_size,
																[marginValue]: {
																	...vkBlocksOption
																		.margin_size[
																		marginValue
																	],
																	[deviceValue]:
																		newValue,
																},
															},
														});
													}}
												/>
											</td>
										);
									})}
									<td className="margin-setting__custom">
										<TextControl
											className="margin-setting__custom__input"
											name={`vk_blocks_options[margin_size][${marginValue}][custom]`}
											value={
												!vkBlocksOption.margin_size[
													marginValue
												].custom
													? ''
													: vkBlocksOption
															.margin_size[
															marginValue
													  ].custom
											}
											onChange={(newValue) => {
												setVkBlocksOption({
													...vkBlocksOption,
													margin_size: {
														...vkBlocksOption.margin_size,
														[marginValue]: {
															...vkBlocksOption
																.margin_size[
																marginValue
															],
															custom: newValue,
														},
													},
												});
												setReloadFlag(true);
											}}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		</>
	);
}
