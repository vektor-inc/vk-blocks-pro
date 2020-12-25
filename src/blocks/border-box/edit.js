import { __ } from '@wordpress/i18n';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import { PanelBody, BaseControl, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import {
	InspectorControls,
	InnerBlocks,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';

export default function BorderBoxEdit(props) {
	const { attributes, setAttributes } = props;
	const { heading, color, faIcon, bgColor } = attributes;

	const inner = <InnerBlocks />;
	const title = (
		<RichText
			tagName="h4"
			className={'vk_borderBox_title'}
			onChange={(value) => setAttributes({ heading: value })}
			value={heading}
			placeholder={__('Please enter a title.', 'vk-blocks')}
		/>
	);

	const blockProps = useBlockProps({
		className: `vk_borderBox vk_borderBox-color-${color} vk_borderBox-background-${bgColor}`,
	});

	//Defaultクラスを設定
	if (-1 === blockProps.className.indexOf('is-style-')) {
		blockProps.className +=
			' is-style-vk_borderBox-style-solid-kado-tit-tab';
	}

	//iタグでdeprecatedが効かなかったので追加。
	let icon;
	if (faIcon.indexOf('<i class="') === -1) {
		icon = `<i class="${faIcon}"></i>`;
	} else {
		icon = faIcon;
	}

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Color', 'vk-blocks')}>
					<BaseControl
						id="border-color"
						label={__('Border Color', 'vk-blocks')}
					>
						<SelectControl
							value={color}
							onChange={(value) =>
								setAttributes({ color: value })
							}
							options={[
								{
									value: 'red',
									label: __('Red', 'vk-blocks'),
								},
								{
									value: 'orange',
									label: __('Orange', 'vk-blocks'),
								},
								{
									value: 'blue',
									label: __('Blue', 'vk-blocks'),
								},
								{
									value: 'green',
									label: __('Green', 'vk-blocks'),
								},
								{
									value: 'black',
									label: __('Black', 'vk-blocks'),
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						id="background-color"
						label={__('Background Color', 'vk-blocks')}
					>
						<SelectControl
							value={bgColor}
							onChange={(value) =>
								setAttributes({ bgColor: value })
							}
							options={[
								{
									value: 'transparent',
									label: __('Transparent', 'vk-blocks'),
								},
								{
									value: 'white',
									label: __('White', 'vk-blocks'),
								},
							]}
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Icon', 'vk-blocks')}>
					<BaseControl
						id="dot-fa"
						label={__('Icon ( Font Awesome )', 'vk-blocks')}
					>
						<FontAwesome
							attributeName={'faIcon'}
							{...{
								attributes,
								setAttributes,
							}}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="vk_borderBox_title_container">
					{ReactHtmlParser(icon)}
					{title}
				</div>
				<div className={`vk_borderBox_body`}>{inner}</div>
			</div>
		</Fragment>
	);
}
