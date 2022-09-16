/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	SelectControl,
	__experimentalNumberControl as NumberControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { AdminContext } from '@vkblocks/admin/index';

const MARGIN_SIZE_ARRAY = [
	{
		marginLabel: __('XS', 'vk-blocks'),
		marginValue: 'xs',
	},
	{
		marginLabel: __('S', 'vk-blocks'),
		marginValue: 'sm',
	},
	{
		marginLabel: __('M', 'vk-blocks'),
		marginValue: 'md',
	},
	{
		marginLabel: __('L', 'vk-blocks'),
		marginValue: 'lg',
	},
	{
		marginLabel: __('XL', 'vk-blocks'),
		marginValue: 'xl',
	},
];

const DEVICE_ARRAY = [
	{
		deviceLabel: __('PC', 'vk-blocks'),
		deviceValue: 'pc',
	},
	{
		deviceLabel: __('Tablet', 'vk-blocks'),
		deviceValue: 'tablet',
	},
	{
		deviceLabel: __('Mobile', 'vk-blocks'),
		deviceValue: 'mobile',
	},
];

export default function AdminMargin() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	return (
		<>
			<section>
				<h3 id="margin-setting">
					{__('Common Margin Setting', 'vk-blocks')}
				</h3>
				<p>
					{__(
						'Please specify the size of the common margin used for responsive spacers, etc.',
						'vk-blocks'
					)}
				</p>
				<div className="vk_admin_marginUnit">
					<span>{__('Unit', 'vk-blocks')}</span>
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
						options={[
							{
								label: __('px', 'vk-blocks'),
								value: 'px',
							},
							{
								label: __('em', 'vk-blocks'),
								value: 'em',
							},
							{
								label: __('rem', 'vk-blocks'),
								value: 'rem',
							},
						]}
					/>
				</div>
				<ul className="no-style spacer-input">
					{MARGIN_SIZE_ARRAY.map((size) => {
						const { marginLabel, marginValue } = size;
						return (
							<li key={marginLabel}>
								<span>
									{__('Margin', 'vk-blocks')} [ {marginLabel}{' '}
									] :
								</span>
								{DEVICE_ARRAY.map((device) => {
									const { deviceLabel, deviceValue } = device;
									{
										/* TextControlでは以前の実装が出来なかったので致し方なく__experimentalNumberControlを利用 */
									}
									return (
										<NumberControl
											className="margin_size_input"
											key={deviceLabel}
											label={deviceLabel}
											name={`vk_blocks_options[margin_size][${marginValue}][${deviceValue}]`}
											step="0.05"
											value={
												!vkBlocksOption.margin_size[
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
									);
								})}
							</li>
						);
					})}
				</ul>
			</section>
		</>
	);
}
