import { __ } from '@wordpress/i18n';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import {
	PanelBody,
	BaseControl,
	TextControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';
import {
	InspectorControls,
	ColorPalette,
	useBlockProps,
} from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';

export default function IconEdit(props) {
	const { attributes, setAttributes } = props;
	let { color, icon, faIcon, url, bgType, iconSize, iconAlign } = attributes;

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

	if (bgType === '0') {
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
						label={__('Icon URL', 'vk-blocks')}
						value={url}
						onChange={(value) => setAttributes({ iconUrl: value })}
					/>
					<p className={'mt-0 mb-2'}>
						{__('Icon Size:', 'vk-blocks')}
					</p>
					<ButtonGroup className={`mb-3`}>
						<Button
							isSmall
							isPrimary={iconSize === 'lg'}
							isSecondary={iconSize !== 'lg'}
							onClick={() => setAttributes({ iconSize: 'lg' })}
						>
							{__('Large', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={iconSize === 'md'}
							isSecondary={iconSize !== 'md'}
							onClick={() => setAttributes({ iconSize: 'md' })}
						>
							{__('Normal', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={iconSize === 'sm'}
							isSecondary={iconSize !== 'sm'}
							onClick={() => setAttributes({ iconSize: 'sm' })}
						>
							{__('Small', 'vk-blocks')}
						</Button>
					</ButtonGroup>

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
							isPrimary={bgType === '0'}
							isSecondary={bgType !== '0'}
							onClick={() => setAttributes({ bgType: '0' })}
						>
							{__('Solid color', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={bgType === '1'}
							isSecondary={bgType !== '1'}
							onClick={() => setAttributes({ bgType: '1' })}
						>
							{__('Icon & Frame', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={bgType === '2'}
							isSecondary={bgType !== '2'}
							onClick={() => setAttributes({ bgType: '2' })}
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
									setAttributes({ bgType: '0' });
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
