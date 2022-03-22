import { __ } from '@wordpress/i18n';
import {
	// eslint-disable-next-line
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	ComboboxControl,
	ToggleControl,
	Button,
	ButtonGroup,
	BaseControl,
} from '@wordpress/components';
import { ColorPalette } from '@wordpress/block-editor';

const CommonItemControl = (props) => {
	const { attributes, setAttributes } = props;

	const {
		headerDisplay,
		footerDisplay,
		containerSpace,
		borderRadius,
		border,
		borderColor,
		textColor,
		backgroundColor,
		headerImageAspectRatio,
		headerImageFit,
	} = attributes;

	const options = [
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

	return (
		<>
			<BoxControl
				label={__('Column padding', 'vk-blocks')}
				values={containerSpace}
				onChange={(nextValues) =>
					setAttributes({ containerSpace: nextValues })
				}
			/>
			<hr />
			<label htmlFor="vk_hiddenControl-hiddenColumnHeaderMediaArea">
				{__('Column header media area', 'vk-blocks')}
			</label>
			<br />
			<ButtonGroup className={`mb-3`}>
				<Button
					isSmall
					isPrimary={headerDisplay === 'display'}
					isSecondary={headerDisplay !== 'display'}
					onClick={() => setAttributes({ headerDisplay: 'display' })}
				>
					{__('Display', 'vk-blocks')}
				</Button>
				<Button
					isSmall
					isPrimary={headerDisplay === 'hide'}
					isSecondary={headerDisplay !== 'hide'}
					onClick={() => setAttributes({ headerDisplay: 'hide' })}
				>
					{__('Hide', 'vk-blocks')}
				</Button>
				<Button
					isSmall
					isPrimary={headerDisplay === 'delete'}
					isSecondary={headerDisplay !== 'delete'}
					onClick={() => setAttributes({ headerDisplay: 'delete' })}
				>
					{__('Delete', 'vk-blocks')}
				</Button>
			</ButtonGroup>
			{(() => {
				if (headerDisplay === 'display') {
					return (
						<>
							<ComboboxControl
								label="Card header image aspect ratio"
								value={headerImageAspectRatio}
								onChange={(value) =>
									setAttributes({
										headerImageAspectRatio: value,
									})
								}
								options={options}
							/>
							<ToggleControl
								label={__('Image fit to column', 'vk-blocks')}
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
			<label htmlFor="vk_hiddenControl-hiddenColumnFooterButtonArea">
				{__('Column footer button area', 'vk-blocks')}
			</label>
			<br />
			<ButtonGroup className={`mb-3`}>
				<Button
					isSmall
					isPrimary={footerDisplay === 'display'}
					isSecondary={footerDisplay !== 'display'}
					onClick={() => setAttributes({ footerDisplay: 'display' })}
				>
					{__('Display', 'vk-blocks')}
				</Button>
				<Button
					isSmall
					isPrimary={footerDisplay === 'hide'}
					isSecondary={footerDisplay !== 'hide'}
					onClick={() => setAttributes({ footerDisplay: 'hide' })}
				>
					{__('Hide', 'vk-blocks')}
				</Button>
				<Button
					isSmall
					isPrimary={footerDisplay === 'delete'}
					isSecondary={footerDisplay !== 'delete'}
					onClick={() => setAttributes({ footerDisplay: 'delete' })}
				>
					{__('Delete', 'vk-blocks')}
				</Button>
			</ButtonGroup>

			<h4>{__('Color Settings', 'vk-blocks')}</h4>
			<BaseControl
				label={__('Text Color', 'vk-blocks')}
				id={`vk_gridcolcard_text_color`}
			>
				<ColorPalette
					value={textColor}
					onChange={(value) => setAttributes({ textColor: value })}
				/>
			</BaseControl>
			<BaseControl
				label={__('Background Color', 'vk-blocks')}
				id={`vk_gridcolcard_background_color`}
			>
				<ColorPalette
					value={backgroundColor}
					onChange={(value) =>
						setAttributes({ backgroundColor: value })
					}
				/>
			</BaseControl>
			<hr />
			<UnitControl
				label={__('Column Radius', 'vk-blocks')}
				value={borderRadius}
				onChange={(value) => setAttributes({ borderRadius: value })}
			/>
			<br />
			<ToggleControl
				label={__('Border', 'vk-blocks')}
				checked={border}
				onChange={(checked) => setAttributes({ border: checked })}
			/>
			{(() => {
				if (border) {
					return (
						<>
							<BaseControl
								label={__('Border Color', 'vk-blocks')}
								id={`vk_gridcolcard_border_color`}
							>
								<ColorPalette
									value={borderColor}
									onChange={(value) =>
										setAttributes({ borderColor: value })
									}
								/>
							</BaseControl>
						</>
					);
				}
			})()}
		</>
	);
};

export default CommonItemControl;
