import { __ } from '@wordpress/i18n';
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
import ReactHtmlParser from 'react-html-parser';

export default function IconEdit(props) {
	const { attributes, setAttributes } = props;
	let {
		iconUrl,
		iconTarget,
		iconType,
		iconSize,
		iconMargin,
		iconRadius,
		iconUnit,
		iconAlign,
		color,
		faIcon,
	} = attributes;

	let containerClass;
	if (iconColor) {
		containerClass = `vk_icon vk_icon-align-${iconAlign} vk_icon-color-custom`;
	} else {
		containerClass = `vk_icon vk_icon-align-${iconAlign}`;
	}

	if (faIcon && !faIcon.match(/<i/)) {
		faIcon = `<i class="${faIcon}"></i>`;

		//過去のicon attribuet用 deprecated処理
	} else if (!faIcon && icon && !icon.match(/<i/)) {
		faIcon = `<i class="${icon}"></i>`;
	}

	let style;
	let iconColor;

	if (iconType === '0') {
		style = {
			backgroundColor: `${color}`,
			border: `1px solid ${color}`,
		};
		iconColor = `#ffffff`;
	} else {
		style = {
			backgroundColor: `transparent`,
			border: `1px solid ${color}`,
		};
		iconColor = `${color}`;
	}

	//過去バージョンをリカバリーした時にiconを正常に表示する
	if (faIcon && !faIcon.match(/<i/)) {
		faIcon = `<i class="${faIcon}"></i>`;

		//過去のicon attribuet用 deprecated処理
	} else if (!faIcon && icon && !icon.match(/<i/)) {
		faIcon = `<i class="${icon}"></i>`;
	}

	//add class and inline css
	const faIconFragment = faIcon.split(' ');
	faIconFragment[0] = faIconFragment[0] + ` style="color:${iconColor}" `;
	faIconFragment[1] = faIconFragment[1] + ` vk_icon_font `;
	const faIconTag = faIconFragment.join('');

	const blockProps = useBlockProps({
		className: containerClass,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('icon setting', 'vk-blocks')}>
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

					<BaseControl
						label={__('Icon Size:', 'vk-blocks')}
						id={`vk_icon-size`}
					>
						<RangeControl
							value={iconSize}
							onChange={(value) => {
								setAttributes({ iconSize: value });
							}}
							min="10"
							max="100"
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
							}}
							min="0"
							max="100"
						/>
					</BaseControl>
					<BaseControl
						label={__('Border radius', 'vk-blocks')}
						id={`vk_icon-radius`}
					>
						<RangeControl
							value={iconRadius}
							onChange={(value) => {
								setAttributes({ iconRadius: value });
							}}
							min="0"
							max="100"
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
							{__('No background', 'vk-blocks')}
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
							value={color}
							onChange={(value) => {
								if (value) {
									setAttributes({ color: value });
								} else {
									setAttributes({ color: '#0693e3' });
									setAttributes({ iconType: '0' });
								}
							}}
						/>
					</BaseControl>

					<BaseControl
						label={__('Icon ( Font Awesome )', 'vk-blocks')}
						id={`vk_icon-font`}
					>
						<FontAwesome attributeName={'faIcon'} {...props} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="vk_icon_outer" style={style}>
					{ReactHtmlParser(faIconTag)}
				</div>
			</div>
		</>
	);
}
