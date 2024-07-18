/**
 * table-style block type
 *
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, ToggleControl, Icon } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { ReactComponent as IconSVG } from './icon.svg';

const isValidBlockType = (name) => {
	const validBlockTypes = ['core/table'];
	return validBlockTypes.includes(name);
};

export const addAttribute = (settings) => {
	if (isValidBlockType(settings.name)) {
		settings.attributes = {
			...settings.attributes,
			scrollable: {
				type: 'boolean',
			},
		};
	}
	return settings;
};
addFilter('blocks.registerBlockType', 'vk-blocks/table-style', addAttribute);

export const addBlockControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (isValidBlockType(props.name) && props.isSelected) {
			const { attributes, setAttributes } = props;
			const { scrollable, className } = attributes;

			// アイコンのスタイル
			let iconStyle = {
				width: '24px',
				height: '24px',
			};

			if (scrollable) {
				iconStyle = {
					...iconStyle,
					color: '#fff',
					background: '#1e1e1e',
				};
			}

			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__('Table Option', 'vk-blocks-pro')}
							icon={<Icon icon={IconSVG} style={iconStyle} />}
							initialOpen={false}
						>
							<ToggleControl
								label={__('Scrollable', 'vk-blocks-pro')}
								checked={scrollable}
								onChange={(checked) => {
									let newClassName = className || '';

									// 現在のクラス名から is-style-vk-table-scrollable を削除
									newClassName = newClassName
										.replace(
											'is-style-vk-table-scrollable',
											''
										)
										.trim();

									// scrollable クラスを付与または削除
									if (checked) {
										newClassName +=
											' is-style-vk-table-scrollable';
									}

									setAttributes({
										className: newClassName.trim(),
										scrollable: checked,
									});
								}}
							/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		}

		return <BlockEdit {...props} />;
	};
}, 'addMyCustomBlockControls');
addFilter('editor.BlockEdit', 'vk-blocks/table-style', addBlockControl);
