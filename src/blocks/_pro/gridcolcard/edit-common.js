import { __ } from '@wordpress/i18n';
import {
	__experimentalBoxControl as OldBoxControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	BoxControl as NewBoxControl,
	__experimentalUnitControl as UnitControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	ComboboxControl,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	BaseControl,
} from '@wordpress/components';
import { AdvancedColorPalette } from '@vkblocks/components/advanced-color-palette';
import { AdvancedColorGradientControl } from '@vkblocks/components/advanced-color-gradient-control';

const BoxControl = OldBoxControl || NewBoxControl; // Fallback to the new BoxControl if the old one is not available

const CommonItemControl = (props) => {
	const { attributes, setAttributes } = props;

	const {
		headerDisplay,
		footerDisplay,
		containerSpace,
		borderRadius,
		border,
		borderWidth,
		borderStyle,
		headerImageAspectRatio,
		headerImageFit,
	} = attributes;

	const options = [
		{
			value: 'auto',
			label: 'auto',
		},
		{
			value: '1/1',
			label: '1:1',
		},
		{
			value: '4/3',
			label: '4:3',
		},
		{
			value: '1.414/1',
			label: '1.414:1 (golden ratio)',
		},
		{
			value: '1.618/1',
			label: '1.618:1 (1:√２ silver ratio)',
		},
		{
			value: '2/1',
			label: '2:1',
		},
		{
			value: '2.414/1',
			label: '2.414:1 (1:1+√２ silver ratio)',
		},
		{
			value: '16/9',
			label: '16:9',
		},
	];

	const borderStyleOptions = [
		{ value: 'solid', label: __('Solid', 'vk-blocks-pro') },
		{ value: 'dashed', label: __('Dashed', 'vk-blocks-pro') },
		{ value: 'dotted', label: __('Dotted', 'vk-blocks-pro') },
	];

	return (
		<>
			<BoxControl
				label={__('Column padding', 'vk-blocks-pro')}
				values={containerSpace}
				onChange={(nextValues) =>
					setAttributes({ containerSpace: nextValues })
				}
			/>
			<hr />
			<ToggleGroupControl
				label={__('Column header media area', 'vk-blocks-pro')}
				value={headerDisplay}
				onChange={(value) => setAttributes({ headerDisplay: value })}
				isBlock
			>
				<ToggleGroupControlOption
					value="display"
					label={__('Display', 'vk-blocks-pro')}
				/>
				<ToggleGroupControlOption
					value="hide"
					label={__('Hide', 'vk-blocks-pro')}
				/>
				<ToggleGroupControlOption
					value="delete"
					label={__('Delete', 'vk-blocks-pro')}
				/>
			</ToggleGroupControl>
			{(() => {
				if (headerDisplay === 'display') {
					return (
						<>
							<ComboboxControl
								label={__(
									'Card header image aspect ratio',
									'vk-blocks-pro'
								)}
								value={headerImageAspectRatio}
								onChange={(value) =>
									setAttributes({
										headerImageAspectRatio: value,
									})
								}
								options={options}
							/>
							<ToggleControl
								label={__(
									'Image fit to column',
									'vk-blocks-pro'
								)}
								checked={headerImageFit}
								onChange={(checked) =>
									setAttributes({ headerImageFit: checked })
								}
							/>
						</>
					);
				}
			})()}
			<hr />
			<ToggleGroupControl
				label={__('Column footer button area', 'vk-blocks-pro')}
				value={footerDisplay}
				onChange={(value) => setAttributes({ footerDisplay: value })}
				isBlock
			>
				<ToggleGroupControlOption
					value="display"
					label={__('Display', 'vk-blocks-pro')}
				/>
				<ToggleGroupControlOption
					value="hide"
					label={__('Hide', 'vk-blocks-pro')}
				/>
				<ToggleGroupControlOption
					value="delete"
					label={__('Delete', 'vk-blocks-pro')}
				/>
			</ToggleGroupControl>

			<h4>{__('Color Settings', 'vk-blocks-pro')}</h4>
			<BaseControl
				label={__('Text Color', 'vk-blocks-pro')}
				id={`vk_gridcolcard_text_color`}
			>
				<AdvancedColorPalette schema={'textColor'} {...props} />
			</BaseControl>
			<BaseControl
				label={__('Background Color', 'vk-blocks-pro')}
				id={`vk_gridcolcard_background_color`}
			>
				<AdvancedColorGradientControl
					colorSchema="backgroundColor"
					gradientSchema="backgroundGradient"
					{...props}
				/>
			</BaseControl>
			<hr />
			<UnitControl
				label={__('Column Radius', 'vk-blocks-pro')}
				value={borderRadius}
				onChange={(value) => setAttributes({ borderRadius: value })}
			/>
			<br />
			<ToggleControl
				label={__('Border', 'vk-blocks-pro')}
				checked={border}
				onChange={(checked) => setAttributes({ border: checked })}
			/>
			{(() => {
				if (border) {
					return (
						<>
							<UnitControl
								label={__('Border Width', 'vk-blocks-pro')}
								value={borderWidth}
								onChange={(newBorderWidth) =>
									setAttributes({
										borderWidth: newBorderWidth,
									})
								}
								min={1}
								max={10}
							/>
							<BaseControl
								label={__('Border Color', 'vk-blocks-pro')}
								id={`vk_gridcolcard_border_color`}
							>
								<AdvancedColorPalette
									schema={'borderColor'}
									{...props}
								/>
							</BaseControl>
							<ToggleGroupControl
								label={__('Border Style', 'vk-blocks-pro')}
								value={borderStyle}
								onChange={(value) => setAttributes({ borderStyle: value })}
								isBlock
							>
								{borderStyleOptions.map((option) => (
									<ToggleGroupControlOption
										key={option.value}
										value={option.value}
										label={option.label}
									/>
								))}
							</ToggleGroupControl>
						</>
					);
				}
			})()}
		</>
	);
};

export default CommonItemControl;
