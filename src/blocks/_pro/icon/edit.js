import { __ } from '@wordpress/i18n';
import { VKBIcon } from './component';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import {
	PanelBody,
	BaseControl,
	TextControl,
	CheckboxControl,
	RangeControl,
	ButtonGroup,
	Button,
	SelectControl,
} from '@wordpress/components';
import {
	InspectorControls,
	ColorPalette,
	useBlockProps,
} from '@wordpress/block-editor';

export default function IconEdit(props) {
	const { attributes, setAttributes } = props;
	let {
		faIcon,
		iconSize,
		iconMargin,
		iconRadius,
		iconUnit,
		iconAlign,
		iconType,
		iconColor,
		iconUrl,
		iconTarget,
	} = attributes;

	if (faIcon && !faIcon.match(/<i/)) {
		faIcon = `<i class="${faIcon}"></i>`;
	}

	const blockProps = useBlockProps({
		className: `vk_icon`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('icon setting', 'vk-blocks')}>
					<BaseControl
						label={__('Icon ( Font Awesome )', 'vk-blocks')}
						id={`vk_icon-font`}
					>
						<FontAwesome attributeName={'faIcon'} {...props} />
					</BaseControl>
					<BaseControl
						label={__('Icon Size:', 'vk-blocks')}
						id={`vk_icon-size`}
					>
						<RangeControl
							value={iconSize}
							onChange={(value) => {
								setAttributes({ iconSize: value });
								if (undefined === value) {
									setAttributes({ iconSize: 36 });
									setAttributes({ iconUnit: 'px' });
								}
							}}
							min={1}
							max={100}
							allowReset={true}
						/>
					</BaseControl>
					<BaseControl
						label={__('Margin', 'vk-blocks')}
						id={`vk_icon-margin`}
					>
						<RangeControl
							value={iconMargin}
							onChange={(value) => {
								setAttributes({ iconMargin: value });
								if (undefined === value) {
									setAttributes({ iconMargin: 40 });
									setAttributes({ iconUnit: 'px' });
								}
							}}
							min={0}
							max={100}
							allowReset={true}
						/>
					</BaseControl>
					<SelectControl
						label={__('Unit Type', 'vk-blocks')}
						value={iconUnit}
						onChange={(value) => {
							setAttributes({ iconUnit: value });
						}}
						options={[
							{
								value: 'px',
								label: __('px', 'vk-blocks'),
							},
							{
								value: 'em',
								label: __('em', 'vk-blocks'),
							},
							{
								value: 'rem',
								label: __('rem', 'vk-blocks'),
							},
							{
								value: 'vw',
								label: __('vw', 'vk-blocks'),
							},
						]}
					/>
					<p className={`mt-0 mb-2`}>
						{__('Icon Position:', 'vk-blocks')}
					</p>
					<ButtonGroup className={`mb-3`}>
						<Button
							isSmall
							isPrimary={iconAlign === 'left'}
							isSecondary={iconAlign !== 'left'}
							onClick={() => setAttributes({ iconAlign: 'left' })}
						>
							{__('Left', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={iconAlign === 'center'}
							isSecondary={iconAlign !== 'center'}
							onClick={() =>
								setAttributes({ iconAlign: 'center' })
							}
						>
							{__('Center', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={iconAlign === 'right'}
							isSecondary={iconAlign !== 'right'}
							onClick={() =>
								setAttributes({ iconAlign: 'right' })
							}
						>
							{__('Right', 'vk-blocks')}
						</Button>
					</ButtonGroup>
					<BaseControl
						label={__('Border radius', 'vk-blocks')}
						id={`vk_icon-radius`}
					>
						<RangeControl
							value={iconRadius}
							onChange={(value) =>
								setAttributes({
									iconRadius:
										value !== undefined ? value : 50,
								})
							}
							min={0}
							max={50}
							allowReset={true}
						/>
					</BaseControl>
					<p className={`mt-0 mb-2`}>
						{__('Icon Style:', 'vk-blocks')}
					</p>
					<ButtonGroup className={`mb-2`}>
						<Button
							isSmall
							isPrimary={iconType === '0'}
							isSecondary={iconType !== '0'}
							onClick={() => setAttributes({ iconType: '0' })}
						>
							{__('Solid color', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={iconType === '1'}
							isSecondary={iconType !== '1'}
							onClick={() => setAttributes({ iconType: '1' })}
						>
							{__('Icon & Frame', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={iconType === '2'}
							isSecondary={iconType !== '2'}
							onClick={() => setAttributes({ iconType: '2' })}
						>
							{__('Icon only', 'vk-blocks')}
						</Button>
					</ButtonGroup>
					<BaseControl>
						<ColorPalette
							value={iconColor}
							onChange={(value) => {
								if (value) {
									setAttributes({ iconColor: value });
								} else {
									setAttributes({ iconColor: '#0693e3' });
									setAttributes({ iconType: '0' });
								}
							}}
						/>
					</BaseControl>
					<TextControl
						label={__('Link URL', 'vk-blocks')}
						value={iconUrl}
						onChange={(value) => setAttributes({ iconUrl: value })}
					/>
					<CheckboxControl
						label={__('Open link new tab.', 'vk-blocks')}
						checked={iconTarget}
						onChange={(checked) =>
							setAttributes({ iconTarget: checked })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<VKBIcon
					lbSize={iconSize}
					lbMargin={iconMargin}
					lbRadius={iconRadius}
					lbUnit={iconUnit}
					lbAlign={iconAlign}
					lbType={iconType}
					lbColor={iconColor}
					lbFontAwesomeIcon={faIcon}
				/>
			</div>
		</>
	);
}
