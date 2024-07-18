import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, BaseControl } from '@wordpress/components';
import {
	InspectorControls,
	InnerBlocks,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import parse from 'html-react-parser';

export default function AlertEdit(props) {
	const { attributes, setAttributes } = props;
	const { style, icon, iconText } = attributes;
	const iconFamily = vkFontAwesome.iconFamily; // eslint-disable-line no-undef

	const blockProps = useBlockProps({
		className: `alert alert-${style}`,
	});

	let alertIcon = '';
	if (
		icon !== '' &&
		icon !== undefined
	) {
		alertIcon = (
			<div className="alert-icon">
				<div className="alert-icon-icon">{parse(icon)}</div>
				<div className="alert-icon-text">
					<RichText
						tagName="span"
						placeholder={__('Icon Text', 'vk-blocks-pro')}
						value={iconText}
						onChange={(value) => setAttributes({ iconText: value })}
					/>
				</div>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Style Settings', 'vk-blocks-pro')}>
					<BaseControl
						label={__('Alert Style', 'vk-blocks-pro')}
						id={`vk_alert-style`}
					>
						<SelectControl
							value={style}
							onChange={(value) =>
								setAttributes({ style: value })
							}
							options={[
								{
									label: __('Success', 'vk-blocks-pro'),
									value: 'success',
								},
								{
									label: __('Info', 'vk-blocks-pro'),
									value: 'info',
								},
								{
									label: __('Warning', 'vk-blocks-pro'),
									value: 'warning',
								},
								{
									label: __('Danger', 'vk-blocks-pro'),
									value: 'danger',
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						label={
							__('Icon', 'vk-blocks-pro') +
							' ( ' +
							iconFamily +
							' )'
						}
						id={`vk_alert-icon`}
					>
						<FontAwesome attributeName={'icon'} {...props} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{alertIcon}
				<div className="alert-content">
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
